import { configureStore } from '@reduxjs/toolkit';
import playerReducer from './slices/playerSlice';
import battleReducer from './slices/battleSlice';
import worldReducer from './slices/worldSlice';
import gameReducer from './slices/gameSlice';
import overworldReducer from './slices/overworldSlice';
import dialogueReducer from './slices/dialogueSlice';

export const store = configureStore({
  reducer: {
    player: playerReducer,
    battle: battleReducer,
    world: worldReducer,
    game: gameReducer,
    overworld: overworldReducer,
    dialogue: dialogueReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;