'use client';

import React, { useEffect, useRef } from 'react';

import Phaser from 'phaser';

import {
  GAME_HEIGHT,
  GAME_WIDTH,
  REGISTRY_REDUCED_MOTION,
  SKY_COLOR,
} from './constants';
import styles from './GameCanvas.module.css';
import MainScene from './MainScene';

export default function GameCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const gameRef = useRef<Phaser.Game | null>(null);

  useEffect(() => {
    if (!containerRef.current || gameRef.current) {return undefined;}

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    const game = new Phaser.Game({
      type: Phaser.AUTO,
      parent: containerRef.current,
      width: GAME_WIDTH,
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

    return () => {
      game.destroy(true);
      gameRef.current = null;
    };
  }, []);

  return <div ref={containerRef} className={styles.GameCanvas} />;
}
