import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OverworldState, OverworldMap, Vector2D } from '@/types/game';

const initialOverworldState: OverworldState = {
  currentMap: null,
  playerPosition: { x: 0, y: 0 },
  cameraPosition: { x: 0, y: 0 },
  isMoving: false,
  movementQueue: [],
  lastMoveTime: 0,
  moveSpeed: 100, // pixels per second
};

const overworldSlice = createSlice({
  name: 'overworld',
  initialState: initialOverworldState,
  reducers: {
    setCurrentMap: (state, action: PayloadAction<OverworldMap>) => {
      state.currentMap = action.payload;
      state.playerPosition = { ...action.payload.spawnPoint };
      state.cameraPosition = { ...action.payload.spawnPoint };
    },
    
    setPlayerPosition: (state, action: PayloadAction<Vector2D>) => {
      state.playerPosition = action.payload;
    },
    
    setCameraPosition: (state, action: PayloadAction<Vector2D>) => {
      state.cameraPosition = action.payload;
    },
    
    setMoving: (state, action: PayloadAction<boolean>) => {
      state.isMoving = action.payload;
    },
    
    addMovementToQueue: (state, action: PayloadAction<string>) => {
      state.movementQueue.push(action.payload);
    },
    
    removeMovementFromQueue: (state, action: PayloadAction<string>) => {
      state.movementQueue = state.movementQueue.filter(move => move !== action.payload);
    },
    
    clearMovementQueue: (state) => {
      state.movementQueue = [];
    },
    
    setLastMoveTime: (state, action: PayloadAction<number>) => {
      state.lastMoveTime = action.payload;
    },
    
    clearCurrentMap: (state) => {
      state.currentMap = null;
      state.playerPosition = { x: 0, y: 0 };
      state.cameraPosition = { x: 0, y: 0 };
      state.isMoving = false;
      state.movementQueue = [];
    }
  }
});

export const {
  setCurrentMap,
  setPlayerPosition,
  setCameraPosition,
  setMoving,
  addMovementToQueue,
  removeMovementFromQueue,
  clearMovementQueue,
  setLastMoveTime,
  clearCurrentMap
} = overworldSlice.actions;

export default overworldSlice.reducer;