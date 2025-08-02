import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GameWorld, CountryLocation, Workshop } from '@/types/game';

const initialLocations: CountryLocation[] = [
  {
    id: 'usa-la',
    name: 'Los Angeles',
    country: 'USA',
    city: 'Los Angeles',
    ogBoss: 'Big Homie',
    difficulty: 1,
    unlocked: true,
    completed: false,
    primaryStyles: ['RAW', 'RUGGED']
  },
  {
    id: 'japan-tokyo',
    name: 'Tokyo',
    country: 'Japan',
    city: 'Tokyo',
    ogBoss: 'Tech Master Yuki',
    difficulty: 2,
    unlocked: false,
    completed: false,
    primaryStyles: ['TECHNICAL', 'FLASHY']
  },
  {
    id: 'korea-seoul',
    name: 'Seoul',
    country: 'South Korea',
    city: 'Seoul',
    ogBoss: 'Speed King Jin',
    difficulty: 3,
    unlocked: false,
    completed: false,
    primaryStyles: ['FAST', 'TRICKS']
  },
  {
    id: 'france-paris',
    name: 'Paris',
    country: 'France',
    city: 'Paris',
    ogBoss: 'Artiste Supreme',
    difficulty: 4,
    unlocked: false,
    completed: false,
    primaryStyles: ['COCKY', 'TECHNICAL']
  },
  {
    id: 'germany-berlin',
    name: 'Berlin',
    country: 'Germany',
    city: 'Berlin',
    ogBoss: 'Beast of Berlin',
    difficulty: 5,
    unlocked: false,
    completed: false,
    primaryStyles: ['BEASTY', 'GULLY']
  },
  {
    id: 'brazil-rio',
    name: 'Rio de Janeiro',
    country: 'Brazil',
    city: 'Rio de Janeiro',
    ogBoss: 'Carnival King Carlos',
    difficulty: 6,
    unlocked: false,
    completed: false,
    primaryStyles: ['GOOFY', 'FLASHY']
  },
  {
    id: 'uk-london',
    name: 'London',
    country: 'United Kingdom',
    city: 'London',
    ogBoss: 'Underground Legend Max',
    difficulty: 7,
    unlocked: false,
    completed: false,
    primaryStyles: ['GRIMEY', 'GULLY']
  },
  {
    id: 'russia-moscow',
    name: 'Moscow',
    country: 'Russia',
    city: 'Moscow',
    ogBoss: 'Iron Dancer Dmitri',
    difficulty: 8,
    unlocked: false,
    completed: false,
    primaryStyles: ['BULLY', 'RUGGED']
  },
  {
    id: 'india-mumbai',
    name: 'Mumbai',
    country: 'India',
    city: 'Mumbai',
    ogBoss: 'Bollywood Beast Raj',
    difficulty: 9,
    unlocked: false,
    completed: false,
    primaryStyles: ['JERKY', 'TECHNICAL']
  },
  {
    id: 'australia-sydney',
    name: 'Sydney',
    country: 'Australia',
    city: 'Sydney',
    ogBoss: 'Outback Fury Jake',
    difficulty: 10,
    unlocked: false,
    completed: false,
    primaryStyles: ['RAW', 'BEASTY']
  },
  {
    id: 'mexico-mexicocity',
    name: 'Mexico City',
    country: 'Mexico',
    city: 'Mexico City',
    ogBoss: 'Lucha Libre Luis',
    difficulty: 11,
    unlocked: false,
    completed: false,
    primaryStyles: ['TRICKS', 'FLASHY']
  },
  {
    id: 'egypt-cairo',
    name: 'Cairo',
    country: 'Egypt',
    city: 'Cairo',
    ogBoss: 'Pharaoh of Flow Amara',
    difficulty: 12,
    unlocked: false,
    completed: false,
    primaryStyles: ['COCKY', 'TECHNICAL']
  },
  {
    id: 'canada-toronto',
    name: 'Toronto',
    country: 'Canada',
    city: 'Toronto',
    ogBoss: 'Arctic Storm Zoe',
    difficulty: 13,
    unlocked: false,
    completed: false,
    primaryStyles: ['FAST', 'GRIMEY']
  },
  {
    id: 'italy-rome',
    name: 'Rome',
    country: 'Italy',
    city: 'Rome',
    ogBoss: 'Renaissance Rebel Marco',
    difficulty: 14,
    unlocked: false,
    completed: false,
    primaryStyles: ['GOOFY', 'COCKY']
  },
  {
    id: 'south-africa-capetown',
    name: 'Cape Town',
    country: 'South Africa',
    city: 'Cape Town',
    ogBoss: 'Township Thunder Nomsa',
    difficulty: 15,
    unlocked: false,
    completed: false,
    primaryStyles: ['GULLY', 'BULLY']
  }
];

const initialWorld: GameWorld = {
  currentLocation: null,
  unlockedLocations: initialLocations.filter(loc => loc.unlocked),
  completedBosses: [],
  availableWorkshops: []
};

const worldSlice = createSlice({
  name: 'world',
  initialState: initialWorld,
  reducers: {
    setCurrentLocation: (state, action: PayloadAction<CountryLocation>) => {
      state.currentLocation = action.payload;
    },
    
    unlockLocation: (state, action: PayloadAction<string>) => {
      const location = initialLocations.find(loc => loc.id === action.payload);
      if (location && !state.unlockedLocations.find(loc => loc.id === action.payload)) {
        state.unlockedLocations.push({ ...location, unlocked: true });
      }
    },
    
    completeLocation: (state, action: PayloadAction<string>) => {
      const location = state.unlockedLocations.find(loc => loc.id === action.payload);
      if (location) {
        location.completed = true;
        if (!state.completedBosses.includes(location.ogBoss)) {
          state.completedBosses.push(location.ogBoss);
        }
        
        // Auto-unlock next location based on progression order
        const locationOrder = ['usa-la', 'japan-tokyo', 'korea-seoul', 'france-paris', 'germany-berlin', 'brazil-rio', 'uk-london', 'russia-moscow', 'india-mumbai', 'australia-sydney', 'mexico-mexicocity', 'egypt-cairo', 'canada-toronto', 'italy-rome', 'south-africa-capetown'];
        const currentIndex = locationOrder.indexOf(action.payload);
        const nextLocationId = locationOrder[currentIndex + 1];
        
        if (nextLocationId) {
          const nextLocation = initialLocations.find(loc => loc.id === nextLocationId);
          if (nextLocation && !state.unlockedLocations.find(loc => loc.id === nextLocationId)) {
            state.unlockedLocations.push({ ...nextLocation, unlocked: true });
          }
        }
      }
    },
    
    addWorkshop: (state, action: PayloadAction<Workshop>) => {
      const exists = state.availableWorkshops.find(w => w.id === action.payload.id);
      if (!exists) {
        state.availableWorkshops.push(action.payload);
      }
    },
    
    unlockWorkshop: (state, action: PayloadAction<string>) => {
      const workshop = state.availableWorkshops.find(w => w.id === action.payload);
      if (workshop) {
        workshop.unlocked = true;
      }
    },
    
    clearCurrentLocation: (state) => {
      state.currentLocation = null;
    }
  }
});

export const { 
  setCurrentLocation, 
  unlockLocation, 
  completeLocation, 
  addWorkshop, 
  unlockWorkshop,
  clearCurrentLocation 
} = worldSlice.actions;

export default worldSlice.reducer;