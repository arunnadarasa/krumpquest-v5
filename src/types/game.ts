export type Gender = 'male' | 'female';

export type KrumpStyle = 
  | 'RAW' 
  | 'GOOFY' 
  | 'RUGGED' 
  | 'BEASTY' 
  | 'GRIMEY' 
  | 'FLASHY' 
  | 'COCKY' 
  | 'JERKY' 
  | 'BULLY' 
  | 'TRICKS' 
  | 'FAST' 
  | 'TECHNICAL' 
  | 'GULLY';

export type Rank = 
  | 'Micro' 
  | 'Infant' 
  | 'Tiny' 
  | 'Child' 
  | 'Baby' 
  | 'Kid' 
  | 'Boy' 
  | 'Young' 
  | 'Lil' 
  | 'Jr' 
  | 'Twin';

export type MoveType = 'chest_pop' | 'stomp' | 'arm_swing' | 'jab';

export interface Move {
  id: string;
  name: string;
  type: MoveType;
  power: number;
  style: KrumpStyle;
  energyCost: number;
  comboMultiplier: number;
}

export interface PlayerStats {
  strength: number;
  defense: number;
  speed: number;
  charisma: number;
  stamina: number;
  technique: number;
}

export interface TrainingStats {
  labbing: number;
  nutrition: number;
  physical: number;
  cultural: number;
}

export interface CountryLocation {
  id: string;
  name: string;
  country: string;
  city: string;
  ogBoss: string;
  difficulty: number;
  unlocked: boolean;
  completed: boolean;
  primaryStyles: KrumpStyle[];
}

export interface Player {
  name: string;
  gender: Gender;
  rank: Rank;
  primaryStyle: KrumpStyle;
  learnedStyles: KrumpStyle[];
  stats: PlayerStats;
  experience: number;
  streetCredibility: number;
  level: number;
  training: TrainingStats;
  learnedMoves: Move[];
  equippedItems: EquippedItems;
}

export interface OpponentData {
  id: string;
  name: string;
  rank: Rank;
  primaryStyle: KrumpStyle;
  stats: PlayerStats;
  moves: Move[];
  isOG: boolean;
}

export interface BattleState {
  isActive: boolean;
  currentOpponent: OpponentData | null;
  playerHealth: number;
  opponentHealth: number;
  playerStamina: number;
  opponentStamina: number;
  maxPlayerStamina: number;
  maxOpponentStamina: number;
  currentCombo: Move[];
  battlePhase: 'select' | 'execute' | 'result' | 'victory' | 'defeat';
  comboMultiplier: number;
  turn: 'player' | 'opponent';
  playerStats: PlayerStats | null;
}

export interface GameWorld {
  currentLocation: CountryLocation | null;
  unlockedLocations: CountryLocation[];
  completedBosses: string[];
  availableWorkshops: Workshop[];
}

export interface Workshop {
  id: string;
  name: string;
  location: string;
  style: KrumpStyle;
  cost: number;
  requirements: string[];
  unlocked: boolean;
}

export type EquipmentType = 'shoes' | 'hat' | 'jacket' | 'pants';

export interface Equipment {
  id: string;
  name: string;
  type: EquipmentType;
  brand: string;
  statBoosts: Partial<PlayerStats>;
  unlocked: boolean;
}

export interface EquippedItems {
  shoes: Equipment | null;
  hat: Equipment | null;
  jacket: Equipment | null;
  pants: Equipment | null;
}

export interface Vector2D {
  x: number;
  y: number;
}

export interface Interactable {
  id: string;
  position: Vector2D;
  type: 'npc' | 'battle_trigger' | 'landmark' | 'exit' | 'dance_studio' | 'cypher' | 'record_shop' | 'club' | 'training_spot' | 'training_center' | 'wisdom_center';
  data?: any;
  size?: Vector2D;
  sprite?: string;
  animation?: string;
}

export interface OverworldMap {
  id: string;
  name: string;
  width: number;
  height: number;
  tileSize: number;
  collisionMap: number[][];
  spawnPoint: Vector2D;
  interactables: Interactable[];
  backgroundImage?: string;
  tileSet?: {
    ground: number[][];
    buildings: number[][];
    details: number[][];
  };
  districts?: {
    id: string;
    name: string;
    bounds: { x: number; y: number; width: number; height: number };
    theme: string;
  }[];
  atmosphere?: {
    timeOfDay: 'morning' | 'day' | 'evening' | 'night';
    weather: 'clear' | 'rain' | 'fog';
    ambientColor: string;
  };
}

export interface OverworldState {
  currentMap: OverworldMap | null;
  playerPosition: Vector2D;
  cameraPosition: Vector2D;
  isMoving: boolean;
  movementQueue: string[];
  lastMoveTime: number;
  moveSpeed: number;
}

export interface GameState {
  player: Player;
  battle: BattleState;
  world: GameWorld;
  overworld: OverworldState;
  gamePhase: 'menu' | 'character_creation' | 'world_map' | 'battle' | 'training' | 'equipment' | 'overworld_exploration' | 'krump_wisdom';
}