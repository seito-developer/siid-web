// Claude(Anthropic)のロゴを模したモノクロのスターバースト
export default function ClaudeIcon() {
  const rays = Array.from({ length: 12 }, (_, i) => ({ angle: i * 30, length: i % 3 === 0 ? 20 : 16 }));

  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g stroke="black" strokeWidth="4.6" strokeLinecap="round">
        {rays.map(({ angle, length }) => (
          <line key={angle} x1="24" y1="24" x2="24" y2={24 - length} transform={`rotate(${angle} 24 24)`} />
        ))}
      </g>
    </svg>
  );
}
