export const GAME_WIDTH = 1440;
export const GAME_HEIGHT = 500;
// SP(〜1279px)では横長すぎて縮小されるため、16:9 のキャンバスに切り替える
export const GAME_WIDTH_SP = Math.round((GAME_HEIGHT * 16) / 9);
export const GROUND_HEIGHT = 139;
// 地面タイル上端から草の接地面までのオフセット
export const GROUND_SURFACE_OFFSET = 40;
export const GROUND_Y = GAME_HEIGHT - GROUND_HEIGHT + GROUND_SURFACE_OFFSET;

export const SKY_COLOR = '#29bdf3';

export const BASE_SPEED = 380;
export const MAX_SPEED = 820;
export const SPEED_RAMP_PER_SEC = 14;
export const JUMP_VELOCITY = -950;
export const GRAVITY_Y = 2200;
export const MAX_LIVES = 3;
export const INVINCIBLE_MS = 1500;

// ハチの上下浮遊の振れ幅(px)と、イモムシが地面スクロールに上乗せで這う速度(px/s)
export const BEE_BOB_AMPLITUDE = 12;
export const SNAKE_CRAWL_SPEED = 40;

// ゲーム開始から最初の障害物出現までの猶予
export const FIRST_SPAWN_DELAY_MS = 2500;

export const SPAWN_GAP_MIN_MS = 1400;
export const SPAWN_GAP_MAX_MS = 2200;
export const SPAWN_GAP_FLOOR_MS = 650;

export const HIGH_SCORE_KEY = 'siid_404_high_score';
export const REGISTRY_REDUCED_MOTION = 'reducedMotion';
export const REGISTRY_AUTOSTART = 'autostart';

export const GAME_FONT = '"Bagor", "Poppins", sans-serif';

// 画像は Figma から @2x で書き出しているため表示時は 0.5 倍する
export const IMAGE_SCALE = 0.5;

export const IMAGES: { key: string; file: string }[] = [
  { key: 'player', file: 'player.png' },
  { key: 'heart-full', file: 'heart-full.png' },
  { key: 'heart-empty', file: 'heart-empty.png' },
  { key: 'bee', file: 'bee.png' },
  { key: 'snake', file: 'snake.png' },
  { key: 'brick', file: 'brick.png' },
  { key: 'cloud-a', file: 'cloud-a.png' },
  { key: 'cloud-b', file: 'cloud-b.png' },
  { key: 'cloud-c', file: 'cloud-c.png' },
  { key: 'plane', file: 'plane.png' },
  { key: 'signboard', file: 'signboard.png' },
  { key: 'cat', file: 'cat.png' },
  { key: 'flowers', file: 'flowers.png' },
  { key: 'ground', file: 'ground-tile.png' },
];
