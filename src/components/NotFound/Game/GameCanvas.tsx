'use client';

import React, { useEffect, useRef } from 'react';

import Phaser from 'phaser';

import { BREAK_POINT } from '@/constants/common';

import {
  GAME_HEIGHT,
  GAME_WIDTH,
  GAME_WIDTH_SP,
  REGISTRY_REDUCED_MOTION,
  SKY_COLOR,
} from './constants';
import styles from './GameCanvas.module.css';
import MainScene from './MainScene';

export default function GameCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const gameRef = useRef<Phaser.Game | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || gameRef.current) {return undefined;}

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    const pcQuery = window.matchMedia(`(min-width: ${BREAK_POINT}px)`);

    const createGame = () => {
      const game = new Phaser.Game({
        type: Phaser.AUTO,
        parent: container,
        // SP はセクションの aspect-ratio(16:9)に合わせてレターボックスを出さない
        width: pcQuery.matches ? GAME_WIDTH : GAME_WIDTH_SP,
        height: GAME_HEIGHT,
        backgroundColor: SKY_COLOR,
        pixelArt: true,
        scale: {
          mode: Phaser.Scale.FIT,
          autoCenter: Phaser.Scale.CENTER_BOTH,
        },
        scene: [MainScene],
      });
      game.registry.set(REGISTRY_REDUCED_MOTION, reducedMotion);
      gameRef.current = game;
    };

    // ブレイクポイントを跨いだらキャンバス解像度ごと作り直す
    const handleBreakpointChange = () => {
      gameRef.current?.destroy(true);
      gameRef.current = null;
      createGame();
    };

    createGame();
    pcQuery.addEventListener('change', handleBreakpointChange);

    return () => {
      pcQuery.removeEventListener('change', handleBreakpointChange);
      gameRef.current?.destroy(true);
      gameRef.current = null;
    };
  }, []);

  return <div ref={containerRef} className={styles.GameCanvas} />;
}
