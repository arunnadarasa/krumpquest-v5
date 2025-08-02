import { KrumpStyle, Gender } from '@/types/game';

// Import all male style-specific sprites
import rawSprite from '@/features/player/assets/sprites/raw-player-sprite.png';
import goofySprite from '@/features/player/assets/sprites/goofy-player-sprite.png';
import ruggedSprite from '@/features/player/assets/sprites/rugged-player-sprite.png';
import beastySprite from '@/features/player/assets/sprites/beasty-player-sprite.png';
import grimeySprite from '@/features/player/assets/sprites/grimey-player-sprite.png';
import flashySprite from '@/features/player/assets/sprites/flashy-player-sprite.png';
import cockySprite from '@/features/player/assets/sprites/cocky-player-sprite.png';
import jerkySprite from '@/features/player/assets/sprites/jerky-player-sprite.png';
import bullySprite from '@/features/player/assets/sprites/bully-player-sprite.png';
import tricksSprite from '@/features/player/assets/sprites/tricks-player-sprite.png';
import fastSprite from '@/features/player/assets/sprites/fast-player-sprite.png';
import technicalSprite from '@/features/player/assets/sprites/technical-player-sprite.png';
import gullySprite from '@/features/player/assets/sprites/gully-player-sprite.png';

// Import all female style-specific sprites
import rawFemaleSprite from '@/features/player/assets/sprites/female/raw-female-sprite.png';
import goofyFemaleSprite from '@/features/player/assets/sprites/female/goofy-female-sprite.png';
import ruggedFemaleSprite from '@/features/player/assets/sprites/female/rugged-female-sprite.png';
import beastyFemaleSprite from '@/features/player/assets/sprites/female/beasty-female-sprite.png';
import grimeyFemaleSprite from '@/features/player/assets/sprites/female/grimey-female-sprite.png';
import flashyFemaleSprite from '@/features/player/assets/sprites/female/flashy-female-sprite.png';
import cockyFemaleSprite from '@/features/player/assets/sprites/female/cocky-female-sprite.png';
import jerkyFemaleSprite from '@/features/player/assets/sprites/female/jerky-female-sprite.png';
import bullyFemaleSprite from '@/features/player/assets/sprites/female/bully-female-sprite.png';
import tricksFemaleSprite from '@/features/player/assets/sprites/female/tricks-female-sprite.png';
import fastFemaleSprite from '@/features/player/assets/sprites/female/fast-female-sprite.png';
import technicalFemaleSprite from '@/features/player/assets/sprites/female/technical-female-sprite.png';
import gullyFemaleSprite from '@/features/player/assets/sprites/female/gully-female-sprite.png';

// Fallback to original sprite
import playerBase from '@/features/player/assets/player-base.png';

// Mapping objects for style to sprite by gender
const maleStyleSprites: Record<KrumpStyle, string> = {
  RAW: rawSprite,
  GOOFY: goofySprite,
  RUGGED: ruggedSprite,
  BEASTY: beastySprite,
  GRIMEY: grimeySprite,
  FLASHY: flashySprite,
  COCKY: cockySprite,
  JERKY: jerkySprite,
  BULLY: bullySprite,
  TRICKS: tricksSprite,
  FAST: fastSprite,
  TECHNICAL: technicalSprite,
  GULLY: gullySprite,
};

const femaleStyleSprites: Record<KrumpStyle, string> = {
  RAW: rawFemaleSprite,
  GOOFY: goofyFemaleSprite,
  RUGGED: ruggedFemaleSprite,
  BEASTY: beastyFemaleSprite,
  GRIMEY: grimeyFemaleSprite,
  FLASHY: flashyFemaleSprite,
  COCKY: cockyFemaleSprite,
  JERKY: jerkyFemaleSprite,
  BULLY: bullyFemaleSprite,
  TRICKS: tricksFemaleSprite,
  FAST: fastFemaleSprite,
  TECHNICAL: technicalFemaleSprite,
  GULLY: gullyFemaleSprite,
};

/**
 * Get the appropriate player sprite based on their gender and primary Krump style
 * @param style - The player's primary Krump style
 * @param gender - The player's gender ('male' or 'female')
 * @returns The sprite path for the given style and gender
 */
export const getPlayerSprite = (style: KrumpStyle, gender: Gender = 'male'): string => {
  const sprites = gender === 'female' ? femaleStyleSprites : maleStyleSprites;
  return sprites[style] || playerBase;
};

/**
 * Get all available style sprites for a specific gender
 * @param gender - The gender to get sprites for
 * @returns Object containing all style sprites for the specified gender
 */
export const getAllStyleSprites = (gender: Gender = 'male'): Record<KrumpStyle, string> => {
  return gender === 'female' ? femaleStyleSprites : maleStyleSprites;
};