import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Player, KrumpStyle, Move, TrainingStats, Equipment, EquipmentType, PlayerStats, Gender } from '@/types/game';

const initialPlayer: Player = {
  name: '',
  gender: 'male',
  rank: 'Micro',
  primaryStyle: 'RAW',
  learnedStyles: [],
  stats: {
    strength: 10,
    defense: 10,
    speed: 10,
    charisma: 10,
    stamina: 100,
    technique: 10
  },
  experience: 0,
  streetCredibility: 0,
  level: 1,
  training: {
    labbing: 0,
    nutrition: 0,
    physical: 0,
    cultural: 0
  },
  learnedMoves: [
    { id: 'chest_pop_1', name: 'Basic Chest Pop', type: 'chest_pop', power: 15, style: 'RAW', energyCost: 10, comboMultiplier: 1.2 },
    { id: 'stomp_1', name: 'Power Stomp', type: 'stomp', power: 20, style: 'RAW', energyCost: 15, comboMultiplier: 1.1 },
    { id: 'arm_swing_1', name: 'Wide Swing', type: 'arm_swing', power: 18, style: 'RAW', energyCost: 12, comboMultiplier: 1.3 },
    { id: 'jab_1', name: 'Quick Jab', type: 'jab', power: 12, style: 'RAW', energyCost: 8, comboMultiplier: 1.4 }
  ],
  equippedItems: {
    shoes: null,
    hat: null,
    jacket: null,
    pants: null,
  }
};

const playerSlice = createSlice({
  name: 'player',
  initialState: initialPlayer,
  reducers: {
    createCharacter: (state, action: PayloadAction<{ name: string; gender: Gender; primaryStyle: KrumpStyle }>) => {
      state.name = action.payload.name;
      state.gender = action.payload.gender;
      state.primaryStyle = action.payload.primaryStyle;
      state.learnedStyles = [action.payload.primaryStyle];
    },
    
    gainExperience: (state, action: PayloadAction<number>) => {
      state.experience += action.payload;
      
      // Level up logic
      const newLevel = Math.floor(state.experience / 100) + 1;
      if (newLevel > state.level) {
        state.level = newLevel;
        // Increase stats on level up
        state.stats.strength += 2;
        state.stats.defense += 2;
        state.stats.speed += 2;
        state.stats.charisma += 2;
        state.stats.technique += 2;
      }
    },
    
    gainStreetCred: (state, action: PayloadAction<number>) => {
      state.streetCredibility += action.payload;
    },
    
    learnStyle: (state, action: PayloadAction<KrumpStyle>) => {
      if (!state.learnedStyles.includes(action.payload)) {
        state.learnedStyles.push(action.payload);
      }
    },
    
    learnMove: (state, action: PayloadAction<Move>) => {
      const existingMove = state.learnedMoves.find(move => move.id === action.payload.id);
      if (!existingMove) {
        state.learnedMoves.push(action.payload);
      }
    },
    
    trainSkill: (state, action: PayloadAction<{ skill: keyof TrainingStats; amount: number }>) => {
      state.training[action.payload.skill] += action.payload.amount;
      
      // Training affects stats
      switch (action.payload.skill) {
        case 'physical':
          state.stats.strength += Math.floor(action.payload.amount / 10);
          state.stats.stamina += action.payload.amount;
          break;
        case 'labbing':
          state.stats.technique += Math.floor(action.payload.amount / 10);
          break;
        case 'nutrition':
          state.stats.defense += Math.floor(action.payload.amount / 10);
          break;
        case 'cultural':
          state.stats.charisma += Math.floor(action.payload.amount / 10);
          break;
      }
    },
    
    rankUp: (state) => {
      const ranks: Player['rank'][] = [
        'Micro', 'Infant', 'Tiny', 'Child', 'Baby', 'Kid', 
        'Boy', 'Young', 'Lil', 'Jr', 'Twin'
      ];
      const currentIndex = ranks.indexOf(state.rank);
      if (currentIndex < ranks.length - 1) {
        state.rank = ranks[currentIndex + 1];
      }
    },
    
    restoreStamina: (state, action: PayloadAction<number>) => {
      state.stats.stamina = Math.min(100, state.stats.stamina + action.payload);
    },

    equipItem: (state, action: PayloadAction<Equipment>) => {
      const equipment = action.payload;
      state.equippedItems[equipment.type] = equipment;
    },

    unequipItem: (state, action: PayloadAction<EquipmentType>) => {
      state.equippedItems[action.payload] = null;
    }
  }
});

export const { 
  createCharacter, 
  gainExperience, 
  gainStreetCred, 
  learnStyle, 
  learnMove, 
  trainSkill, 
  rankUp,
  restoreStamina,
  equipItem,
  unequipItem
} = playerSlice.actions;

export default playerSlice.reducer;