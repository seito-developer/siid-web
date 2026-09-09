// Jicooのページのみローカルfixtureに置換。実予約を送信せず高さ通知を再現する。
// LP2_TEST_ORIGIN=http://localhost:3001 node scripts/lp2/check-booking-layout.cjs
const origin = process.env.LP2_TEST_ORIGIN || "http://localhost:3102";
const { chromium } = require("playwright");
const assert = require("node:assert/strict");
(async () => {
  const browser = await chromium.launch();
  for (const width of [1440, 839, 390, 319]) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    await page.route("https://www.jicoo.com/event_types/*/widget", (r) =>
      r.fulfill({
        contentType: "text/html",
        body: '<html><body><input aria-label="test" /></body></html>',
      }),
    );
    await page.goto(`${origin}/siid/lp-2#counselling`);
    const widget = page.locator('[data-url*="jicoo"]');
    await widget.scrollIntoViewIfNeeded();
    await page.waitForFunction(() =>
      document.querySelector('[data-url*="jicoo"] iframe'),
    );
    const frame = page.frames().find((f) => f.url().includes("jicoo"));
    await frame.waitForLoadState();
    const measure = () =>
      widget.evaluate((el) => ({
        height: el.getBoundingClientRect().height,
        frameBottom: el.querySelector("iframe").getBoundingClientRect().bottom,
        cardBottom: el.parentElement.getBoundingClientRect().bottom,
        scrollY,
      }));
    for (const h of [654, 1200, 700, 1180, 650]) {
      await frame.evaluate(
        (value) => parent.postMessage({ name: "windowHeight", value }, "*"),
        h,
      );
      await page.waitForTimeout(100);
      const m = await measure();
      console.log(width, h, m);
      if (h === 1200) page.high = m.height;
      if (h === 700)
        assert(m.height >= page.high - 1, "予約入力中に高さが縮んだ");
      assert(m.cardBottom >= m.frameBottom, "白いカードからはみ出した");
    }
    await page.evaluate(() => scrollBy(0, -100));
    const before = await page.evaluate(() => scrollY);
    await frame.evaluate(() =>
      parent.postMessage({ name: "scrollWidgetTop" }, "*"),
    );
    await page.waitForTimeout(100);
    assert(
      Math.abs((await page.evaluate(() => scrollY)) - before) < 2,
      "強制スクロールが発生",
    );
    const stable = await measure();
    await page.evaluate(() =>
      window.postMessage({ name: "windowHeight", value: 1800 }, "*"),
    );
    await frame.evaluate(() =>
      parent.postMessage({ name: "windowHeight", value: "invalid" }, "*"),
    );
    await page.waitForTimeout(100);
    assert.equal(
      (await measure()).height,
      stable.height,
      "無効な通知を受理した",
    );
    await frame.evaluate(
      (url) => parent.postMessage({ name: "redirectUrl", value: url }, "*"),
      width < 768 ? "/siid/lp-2/complete" : `${origin}/siid/lp-2/complete`,
    );
    await page.waitForURL("**/lp-2/complete");
    await page.close();
  }
  await browser.close();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
