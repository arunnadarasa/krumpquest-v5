import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BattleState, OpponentData, Move } from '@/types/game';

const initialBattleState: BattleState = {
  isActive: false,
  currentOpponent: null,
  playerHealth: 100,
  opponentHealth: 100,
  playerStamina: 100,
  opponentStamina: 100,
  maxPlayerStamina: 100,
  maxOpponentStamina: 100,
  currentCombo: [],
  battlePhase: 'select',
  comboMultiplier: 1,
  turn: 'player',
  playerStats: null
};

const battleSlice = createSlice({
  name: 'battle',
  initialState: initialBattleState,
  reducers: {
    startBattle: (state, action: PayloadAction<{ opponent: OpponentData; playerStamina: number; playerStats: any }>) => {
      state.isActive = true;
      state.currentOpponent = action.payload.opponent;
      state.playerHealth = 100;
      state.opponentHealth = 100;
      state.playerStamina = action.payload.playerStamina;
      state.opponentStamina = action.payload.opponent.stats.stamina;
      state.maxPlayerStamina = action.payload.playerStamina;
      state.maxOpponentStamina = action.payload.opponent.stats.stamina;
      state.currentCombo = [];
      state.battlePhase = 'select';
      state.comboMultiplier = 1;
      state.turn = 'player';
      state.playerStats = action.payload.playerStats;
    },
    
    endBattle: (state) => {
      state.isActive = false;
      state.currentOpponent = null;
      state.playerHealth = 100;
      state.opponentHealth = 100;
      state.playerStamina = 100;
      state.opponentStamina = 100;
      state.maxPlayerStamina = 100;
      state.maxOpponentStamina = 100;
      state.currentCombo = [];
      state.battlePhase = 'select';
      state.comboMultiplier = 1;
      state.turn = 'player';
      state.playerStats = null;
    },
    
    addMoveToCombo: (state, action: PayloadAction<Move>) => {
      state.currentCombo.push(action.payload);
      // Increase combo multiplier based on move chain
      state.comboMultiplier = Math.min(3, 1 + (state.currentCombo.length * 0.2));
    },
    
    executeCombo: (state) => {
      if (state.currentCombo.length > 0) {
        // Calculate base damage with stats integration
        let baseDamage = state.currentCombo.reduce((sum, move) => sum + move.power, 0);
        const totalStaminaCost = state.currentCombo.reduce((sum, move) => sum + move.energyCost, 0);
        
        // Apply stat-based modifiers
        if (state.turn === 'player' && state.playerStats) {
          // Strength increases damage output (10% per 10 strength above 50)
          const strengthModifier = 1 + ((state.playerStats.strength - 50) * 0.01);
          // Technique improves combo effectiveness (5% per 10 technique above 50)
          const techniqueModifier = 1 + ((state.playerStats.technique - 50) * 0.005);
          baseDamage *= Math.max(0.5, strengthModifier * techniqueModifier);
        } else if (state.turn === 'opponent' && state.currentOpponent) {
          // Apply opponent stat modifiers
          const strengthModifier = 1 + ((state.currentOpponent.stats.strength - 50) * 0.01);
          const techniqueModifier = 1 + ((state.currentOpponent.stats.technique - 50) * 0.005);
          baseDamage *= Math.max(0.5, strengthModifier * techniqueModifier);
        }
        
        // Apply combo multiplier
        const totalDamage = Math.round(baseDamage * state.comboMultiplier);
        
        // Calculate defensive reduction
        let finalDamage = totalDamage;
        if (state.turn === 'player' && state.currentOpponent) {
          // Opponent defense reduces incoming damage (5% per 10 defense above 50)
          const defenseReduction = 1 - ((state.currentOpponent.stats.defense - 50) * 0.005);
          finalDamage *= Math.max(0.3, defenseReduction);
        } else if (state.turn === 'opponent' && state.playerStats) {
          // Player defense reduces incoming damage
          const defenseReduction = 1 - ((state.playerStats.defense - 50) * 0.005);
          finalDamage *= Math.max(0.3, defenseReduction);
        }
        
        // Apply 40% damage cap
        const maxDamagePerRound = 40; // 40% of 100 HP
        const cappedDamage = Math.min(Math.round(finalDamage), maxDamagePerRound);
        
        if (state.turn === 'player') {
          state.opponentHealth = Math.max(0, Math.round(state.opponentHealth - cappedDamage));
          state.playerStamina = Math.max(0, state.playerStamina - totalStaminaCost);
        } else {
          state.playerHealth = Math.max(0, Math.round(state.playerHealth - cappedDamage));
          state.opponentStamina = Math.max(0, state.opponentStamina - totalStaminaCost);
        }
        
        state.currentCombo = [];
        state.comboMultiplier = 1;
        state.battlePhase = 'execute';
      }
    },
    
    switchTurn: (state) => {
      state.turn = state.turn === 'player' ? 'opponent' : 'player';
      state.battlePhase = 'select';
    },
    
    setBattlePhase: (state, action: PayloadAction<BattleState['battlePhase']>) => {
      state.battlePhase = action.payload;
    },
    
    takeDamage: (state, action: PayloadAction<{ target: 'player' | 'opponent'; damage: number }>) => {
      const roundedDamage = Math.round(action.payload.damage);
      if (action.payload.target === 'player') {
        state.playerHealth = Math.max(0, Math.round(state.playerHealth - roundedDamage));
      } else {
        state.opponentHealth = Math.max(0, Math.round(state.opponentHealth - roundedDamage));
      }
    },
    
    clearCombo: (state) => {
      state.currentCombo = [];
      state.comboMultiplier = 1;
    },
    
    restTurn: (state) => {
      const staminaRestore = Math.round(state.turn === 'player' ? state.maxPlayerStamina * 0.4 : state.maxOpponentStamina * 0.4);
      if (state.turn === 'player') {
        state.playerStamina = Math.min(state.maxPlayerStamina, state.playerStamina + staminaRestore);
      } else {
        state.opponentStamina = Math.min(state.maxOpponentStamina, state.opponentStamina + staminaRestore);
      }
      state.battlePhase = 'execute';
    },
    
    regenerateStamina: (state) => {
      const regenAmount = 15;
      if (state.turn === 'player') {
        state.playerStamina = Math.min(state.maxPlayerStamina, state.playerStamina + regenAmount);
      } else {
        state.opponentStamina = Math.min(state.maxOpponentStamina, state.opponentStamina + regenAmount);
      }
    }
  }
});

export const { 
  startBattle, 
  endBattle, 
  addMoveToCombo, 
  executeCombo, 
  switchTurn, 
  setBattlePhase, 
  takeDamage,
  clearCombo,
  restTurn,
  regenerateStamina
} = battleSlice.actions;

export default battleSlice.reducer;