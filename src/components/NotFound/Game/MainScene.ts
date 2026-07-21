import Phaser from 'phaser';

import {
  BASE_SPEED,
  GAME_FONT,
  GAME_HEIGHT,
  GAME_WIDTH,
  GRAVITY_Y,
  GROUND_HEIGHT,
  GROUND_Y,
  HIGH_SCORE_KEY,
  IMAGES,
  IMAGE_SCALE,
  INVINCIBLE_MS,
  JUMP_VELOCITY,
  MAX_LIVES,
  MAX_SPEED,
  REGISTRY_AUTOSTART,
  REGISTRY_REDUCED_MOTION,
  SPAWN_GAP_FLOOR_MS,
  SPAWN_GAP_MAX_MS,
  SPAWN_GAP_MIN_MS,
  SPEED_RAMP_PER_SEC,
} from './constants';

type GameState = 'idle' | 'running' | 'gameover';

type Obstacle = {
  sprites: Phaser.GameObjects.Image[];
  baseY: number;
  bobPhase: number;
  isBee: boolean;
};

// 障害物同士・プレイヤーの当たり判定を見た目より少し狭める
const HIT_SHRINK = 8;
// デザイン上のゲーム画面(y=376〜824)の上端をキャンバス(高さ500)の下端に合わせるオフセット
const DESIGN_OFFSET_Y = 52;

export default class MainScene extends Phaser.Scene {
  private gameState: GameState = 'idle';
  private reducedMotion = false;
  private speed = BASE_SPEED;
  private distance = 0;
  private elapsedSec = 0;
  private lives = MAX_LIVES;
  private invincibleUntil = 0;
  private playerVy = 0;
  private grounded = true;
  private highScore = 0;

  private player!: Phaser.GameObjects.Image;
  private ground!: Phaser.GameObjects.TileSprite;
  private hearts: Phaser.GameObjects.Image[] = [];
  private skyDecors: Phaser.GameObjects.Image[] = [];
  private groundDecors: Phaser.GameObjects.Image[] = [];
  private idleDecors: Phaser.GameObjects.Image[] = [];
  private obstacles: Obstacle[] = [];
  private scoreText!: Phaser.GameObjects.Text;
  private promptText!: Phaser.GameObjects.Text;
  private overlayObjects: Phaser.GameObjects.GameObject[] = [];
  private spawnTimer?: Phaser.Time.TimerEvent;
  private blinkTween?: Phaser.Tweens.Tween;

  constructor() {
    super('main');
  }

  init() {
    this.gameState = 'idle';
    this.speed = BASE_SPEED;
    this.distance = 0;
    this.elapsedSec = 0;
    this.lives = MAX_LIVES;
    this.invincibleUntil = 0;
    this.playerVy = 0;
    this.grounded = true;
    this.hearts = [];
    this.skyDecors = [];
    this.groundDecors = [];
    this.idleDecors = [];
    this.obstacles = [];
    this.overlayObjects = [];
    this.spawnTimer = undefined;
    this.blinkTween = undefined;
    this.reducedMotion =
      this.registry.get(REGISTRY_REDUCED_MOTION) === true;
    this.highScore = this.readHighScore();
  }

  preload() {
    IMAGES.forEach(({ key, file }) => {
      this.load.image(key, `/images/404/${file}`);
    });
  }

  create() {
    this.createSky();
    this.createGround();
    this.createIdleDecors();
    this.createPlayer();
    this.createHud();
    this.bindInput();

    if (this.registry.get(REGISTRY_AUTOSTART) === true) {
      this.registry.set(REGISTRY_AUTOSTART, false);
      this.startRun();
    }
  }

  private addImage(key: string, x: number, y: number) {
    return this.add.image(x, y, key).setOrigin(0, 0).setScale(IMAGE_SCALE);
  }

  private createSky() {
    const clouds: [string, number, number][] = [
      ['cloud-a', 64, 104],
      ['cloud-b', 561, 45],
      ['cloud-c', 1191, 52],
      ['plane', 761, 33],
    ];
    clouds.forEach(([key, x, y]) => {
      this.skyDecors.push(this.addImage(key, x, y + DESIGN_OFFSET_Y));
    });
  }

  private createGround() {
    this.ground = this.add
      .tileSprite(
        0,
        GAME_HEIGHT - GROUND_HEIGHT,
        GAME_WIDTH,
        GROUND_HEIGHT,
        'ground',
      )
      .setOrigin(0, 0)
      .setTileScale(IMAGE_SCALE);

    const decors: [string, number, number][] = [
      ['flowers', 638, 313],
      ['signboard', 1164, 252],
      ['cat', 1190, 206],
    ];
    decors.forEach(([key, x, y]) => {
      this.groundDecors.push(this.addImage(key, x, y + DESIGN_OFFSET_Y));
    });
  }

  // デザイン(H-1 409)の待機画面に置かれている障害物風の飾り。当たり判定なしで流れて消える
  private createIdleDecors() {
    const decors: [string, number, number][] = [
      ['brick', 464, 203],
      ['brick', 511, 203],
      ['brick', 559, 156],
      ['brick', 880, 302],
      ['brick', 880, 256],
      ['bee', 953, 109],
      ['snake', 1015, 313],
    ];
    decors.forEach(([key, x, y]) => {
      this.idleDecors.push(this.addImage(key, x, y + DESIGN_OFFSET_Y));
    });
  }

  private createPlayer() {
    this.player = this.add
      .image(203, GROUND_Y, 'player')
      .setOrigin(0, 1)
      .setScale(IMAGE_SCALE);
  }

  private createHud() {
    for (let i = 0; i < MAX_LIVES; i += 1) {
      this.hearts.push(this.addImage('heart-full', 48 + i * 33, 24));
    }
    this.scoreText = this.add
      .text(GAME_WIDTH - 48, 24, '', {
        fontFamily: GAME_FONT,
        fontSize: '24px',
        color: '#ffffff',
      })
      .setOrigin(1, 0);
    this.updateScoreText();

    this.promptText = this.add
      .text(GAME_WIDTH / 2, 200, 'PRESS SPACE / TAP TO START', {
        fontFamily: GAME_FONT,
        fontSize: '32px',
        color: '#ffffff',
        stroke: '#342525',
        strokeThickness: 6,
      })
      .setOrigin(0.5, 0.5);
  }

  private bindInput() {
    this.input.keyboard?.addCapture(['SPACE', 'UP']);
    this.input.keyboard?.on('keydown-SPACE', this.handleAction, this);
    this.input.keyboard?.on('keydown-UP', this.handleAction, this);
    this.input.on('pointerdown', this.handleAction, this);
  }

  private handleAction() {
    if (this.gameState === 'idle') {
      this.startRun();
      return;
    }
    if (this.gameState === 'running') {
      this.jump();
      return;
    }
    this.registry.set(REGISTRY_AUTOSTART, true);
    this.scene.restart();
  }

  private startRun() {
    this.gameState = 'running';
    this.promptText.setVisible(false);
    this.scheduleNextSpawn();
  }

  private jump() {
    if (!this.grounded) {return;}
    this.grounded = false;
    this.playerVy = JUMP_VELOCITY;
  }

  private scheduleNextSpawn() {
    const scale = BASE_SPEED / this.speed;
    const gap = Math.max(
      SPAWN_GAP_FLOOR_MS,
      Phaser.Math.Between(SPAWN_GAP_MIN_MS, SPAWN_GAP_MAX_MS) * scale,
    );
    this.spawnTimer = this.time.delayedCall(gap, () => {
      this.spawnObstacle();
      this.scheduleNextSpawn();
    });
  }

  private spawnObstacle() {
    const x = GAME_WIDTH + 100;
    const roll = Math.random();
    const sprites: Phaser.GameObjects.Image[] = [];
    let baseY = 0;
    let isBee = false;

    if (roll < 0.4) {
      // ヘビ(地上)
      const snake = this.addImage('snake', x, 0);
      snake.setY(GROUND_Y - snake.displayHeight);
      sprites.push(snake);
    } else if (roll < 0.7) {
      // ハチ(低空)
      isBee = true;
      const bee = this.addImage('bee', x, 0);
      baseY = GROUND_Y - bee.displayHeight - 55;
      bee.setY(baseY);
      sprites.push(bee);
    } else {
      // レンガ(1〜2段)
      const stack = roll < 0.9 ? 1 : 2;
      for (let i = 0; i < stack; i += 1) {
        const brick = this.addImage('brick', x, 0);
        brick.setY(GROUND_Y - brick.displayHeight * (i + 1));
        sprites.push(brick);
      }
    }

    this.obstacles.push({
      sprites,
      baseY,
      bobPhase: Math.random() * Math.PI * 2,
      isBee,
    });
  }

  update(time: number, deltaMs: number) {
    if (this.gameState !== 'running') {return;}
    const dt = deltaMs / 1000;

    this.elapsedSec += dt;
    this.speed = Math.min(
      MAX_SPEED,
      BASE_SPEED + this.elapsedSec * SPEED_RAMP_PER_SEC,
    );
    this.distance += this.speed * dt;
    this.updateScoreText();

    // 地面・装飾のスクロール(tilePosition はテクスチャ座標なので 1/IMAGE_SCALE 倍)
    this.ground.tilePositionX += (this.speed * dt) / IMAGE_SCALE;
    this.scrollWithWrap(this.groundDecors, this.speed * dt);
    this.scrollWithWrap(this.skyDecors, this.speed * 0.35 * dt);

    this.idleDecors = this.idleDecors.filter((decor) => {
      decor.x -= this.speed * dt;
      if (decor.x < -decor.displayWidth - 50) {
        decor.destroy();
        return false;
      }
      return true;
    });

    this.updatePlayer(dt);
    this.updateObstacles(time, dt);
  }

  private scrollWithWrap(decors: Phaser.GameObjects.Image[], dx: number) {
    decors.forEach((decor) => {
      decor.x -= dx;
      if (decor.x < -decor.displayWidth - 50) {
        decor.x += GAME_WIDTH + 200;
      }
    });
  }

  private updatePlayer(dt: number) {
    if (!this.grounded) {
      this.playerVy += GRAVITY_Y * dt;
      const nextY = this.player.y + this.playerVy * dt;
      if (nextY >= GROUND_Y) {
        this.player.setY(GROUND_Y);
        this.playerVy = 0;
        this.grounded = true;
      } else {
        this.player.setY(nextY);
      }
    }
  }

  private updateObstacles(time: number, dt: number) {
    const playerRect = new Phaser.Geom.Rectangle(
      this.player.x + HIT_SHRINK,
      this.player.y - this.player.displayHeight + HIT_SHRINK,
      this.player.displayWidth - HIT_SHRINK * 2,
      this.player.displayHeight - HIT_SHRINK * 2,
    );
    const invincible = this.time.now < this.invincibleUntil;

    this.obstacles = this.obstacles.filter((obstacle) => {
      let offscreen = false;
      obstacle.sprites.forEach((sprite) => {
        sprite.x -= this.speed * dt;
        if (obstacle.isBee && !this.reducedMotion) {
          sprite.setY(
            obstacle.baseY + Math.sin(time * 0.006 + obstacle.bobPhase) * 18,
          );
        }
        if (sprite.x < -sprite.displayWidth - 50) {offscreen = true;}
      });
      if (offscreen) {
        obstacle.sprites.forEach((sprite) => sprite.destroy());
        return false;
      }
      if (!invincible) {
        const hit = obstacle.sprites.some((sprite) =>
          Phaser.Geom.Intersects.RectangleToRectangle(
            playerRect,
            new Phaser.Geom.Rectangle(
              sprite.x + HIT_SHRINK,
              sprite.y + HIT_SHRINK,
              sprite.displayWidth - HIT_SHRINK * 2,
              sprite.displayHeight - HIT_SHRINK * 2,
            ),
          ),
        );
        if (hit) {this.onHit();}
      }
      return true;
    });
  }

  private onHit() {
    this.lives -= 1;
    this.hearts.forEach((heart, index) => {
      heart.setTexture(index < this.lives ? 'heart-full' : 'heart-empty');
    });
    this.invincibleUntil = this.time.now + INVINCIBLE_MS;

    if (this.lives <= 0) {
      this.gameOver();
      return;
    }

    if (this.reducedMotion) {
      this.player.setAlpha(0.5);
      this.time.delayedCall(INVINCIBLE_MS, () => this.player.setAlpha(1));
    } else {
      this.blinkTween = this.tweens.add({
        targets: this.player,
        alpha: 0.2,
        duration: 100,
        yoyo: true,
        repeat: 7,
        onComplete: () => this.player.setAlpha(1),
      });
    }
  }

  private gameOver() {
    this.gameState = 'gameover';
    this.spawnTimer?.remove();
    this.blinkTween?.stop();
    this.player.setAlpha(1);

    const score = this.currentScore();
    if (score > this.highScore) {
      this.highScore = score;
      this.writeHighScore(score);
    }
    this.updateScoreText();

    const overlay = this.add
      .rectangle(0, 0, GAME_WIDTH, GAME_HEIGHT, 0x342525, 0.6)
      .setOrigin(0, 0);
    const title = this.add
      .text(GAME_WIDTH / 2, 170, 'GAME OVER', {
        fontFamily: GAME_FONT,
        fontSize: '56px',
        color: '#ffffff',
      })
      .setOrigin(0.5, 0.5);
    const result = this.add
      .text(
        GAME_WIDTH / 2,
        240,
        `SCORE ${score}   HI ${this.highScore}`,
        {
          fontFamily: GAME_FONT,
          fontSize: '32px',
          color: '#ffffff',
        },
      )
      .setOrigin(0.5, 0.5);
    const prompt = this.add
      .text(GAME_WIDTH / 2, 300, 'PRESS SPACE / TAP TO RESTART', {
        fontFamily: GAME_FONT,
        fontSize: '24px',
        color: '#ffffff',
      })
      .setOrigin(0.5, 0.5);
    this.overlayObjects = [overlay, title, result, prompt];
  }

  private currentScore() {
    return Math.floor(this.distance / 100);
  }

  private updateScoreText() {
    this.scoreText.setText(
      `SCORE ${this.currentScore()}   HI ${this.highScore}`,
    );
  }

  private readHighScore() {
    try {
      return Number(window.localStorage.getItem(HIGH_SCORE_KEY)) || 0;
    } catch {
      return 0;
    }
  }

  private writeHighScore(score: number) {
    try {
      window.localStorage.setItem(HIGH_SCORE_KEY, String(score));
    } catch {
      // localStorage が使えない環境では何もしない
    }
  }
}
