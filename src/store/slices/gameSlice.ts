import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type GamePhase = 'menu' | 'character_creation' | 'world_map' | 'battle' | 'training' | 'equipment' | 'krump_wisdom' | 'wisdom' | 'overworld_exploration' | 'record_shop';

interface GameState {
  currentPhase: GamePhase;
  isLoading: boolean;
  soundEnabled: boolean;
  musicVolume: number;
  sfxVolume: number;
}

const initialState: GameState = {
  currentPhase: 'menu',
  isLoading: false,
  soundEnabled: true,
  musicVolume: 0.7,
  sfxVolume: 0.8
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setGamePhase: (state, action: PayloadAction<GamePhase>) => {
      state.currentPhase = action.payload;
    },
    
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    
    toggleSound: (state) => {
      state.soundEnabled = !state.soundEnabled;
    },
    
    setMusicVolume: (state, action: PayloadAction<number>) => {
      state.musicVolume = Math.max(0, Math.min(1, action.payload));
    },
    
    setSfxVolume: (state, action: PayloadAction<number>) => {
      state.sfxVolume = Math.max(0, Math.min(1, action.payload));
    },
    
    startNewGame: (state) => {
      state.currentPhase = 'character_creation';
    },
    
    returnToMenu: (state) => {
      state.currentPhase = 'menu';
    }
  }
});

export const { 
  setGamePhase, 
  setLoading, 
  toggleSound, 
  setMusicVolume, 
  setSfxVolume, 
  startNewGame, 
  returnToMenu 
} = gameSlice.actions;

export default gameSlice.reducer;