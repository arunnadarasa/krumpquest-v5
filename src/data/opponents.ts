import { OpponentData, Move, KrumpStyle } from '@/types/game';

// Location-specific moves for each country
export const locationMoves: Record<string, Move[]> = {
  'usa-la': [
    {
      id: 'hood-stomp',
      name: 'Hood Stomp',
      type: 'stomp',
      power: 25,
      style: 'RAW',
      energyCost: 15,
      comboMultiplier: 1.2
    },
    {
      id: 'street-swagger',
      name: 'Street Swagger',
      type: 'arm_swing',
      power: 20,
      style: 'RUGGED',
      energyCost: 12,
      comboMultiplier: 1.1
    },
    {
      id: 'raw-punch',
      name: 'Raw Punch',
      type: 'jab',
      power: 18,
      style: 'RAW',
      energyCost: 10,
      comboMultiplier: 1.0
    },
    {
      id: 'gritty-pop',
      name: 'Gritty Pop',
      type: 'chest_pop',
      power: 22,
      style: 'RUGGED',
      energyCost: 14,
      comboMultiplier: 1.1
    }
  ],
  
  'japan-tokyo': [
    {
      id: 'precision-strike',
      name: 'Precision Strike',
      type: 'jab',
      power: 30,
      style: 'TECHNICAL',
      energyCost: 18,
      comboMultiplier: 1.5
    },
    {
      id: 'tech-flow',
      name: 'Tech Flow',
      type: 'arm_swing',
      power: 28,
      style: 'TECHNICAL',
      energyCost: 20,
      comboMultiplier: 1.4
    },
    {
      id: 'flashy-combo',
      name: 'Flashy Combo',
      type: 'chest_pop',
      power: 32,
      style: 'FLASHY',
      energyCost: 22,
      comboMultiplier: 1.6
    },
    {
      id: 'calculated-stomp',
      name: 'Calculated Stomp',
      type: 'stomp',
      power: 35,
      style: 'TECHNICAL',
      energyCost: 25,
      comboMultiplier: 1.3
    }
  ],
  
  'korea-seoul': [
    {
      id: 'lightning-jab',
      name: 'Lightning Jab',
      type: 'jab',
      power: 24,
      style: 'FAST',
      energyCost: 12,
      comboMultiplier: 1.8
    },
    {
      id: 'speed-burst',
      name: 'Speed Burst',
      type: 'arm_swing',
      power: 26,
      style: 'FAST',
      energyCost: 15,
      comboMultiplier: 1.7
    },
    {
      id: 'trick-maneuver',
      name: 'Trick Maneuver',
      type: 'chest_pop',
      power: 38,
      style: 'TRICKS',
      energyCost: 28,
      comboMultiplier: 2.0
    },
    {
      id: 'rapid-stomp',
      name: 'Rapid Stomp',
      type: 'stomp',
      power: 22,
      style: 'FAST',
      energyCost: 10,
      comboMultiplier: 1.6
    }
  ],
  
  'france-paris': [
    {
      id: 'artistic-flair',
      name: 'Artistic Flair',
      type: 'arm_swing',
      power: 42,
      style: 'COCKY',
      energyCost: 30,
      comboMultiplier: 1.8
    },
    {
      id: 'ego-boost',
      name: 'Ego Boost',
      type: 'chest_pop',
      power: 45,
      style: 'COCKY',
      energyCost: 32,
      comboMultiplier: 1.9
    },
    {
      id: 'technical-prowess',
      name: 'Technical Prowess',
      type: 'jab',
      power: 40,
      style: 'TECHNICAL',
      energyCost: 28,
      comboMultiplier: 1.7
    },
    {
      id: 'sophisticated-stomp',
      name: 'Sophisticated Stomp',
      type: 'stomp',
      power: 38,
      style: 'COCKY',
      energyCost: 26,
      comboMultiplier: 1.6
    }
  ],
  
  'germany-berlin': [
    {
      id: 'beast-slam',
      name: 'Beast Slam',
      type: 'stomp',
      power: 55,
      style: 'BEASTY',
      energyCost: 40,
      comboMultiplier: 2.2
    },
    {
      id: 'primal-rage',
      name: 'Primal Rage',
      type: 'chest_pop',
      power: 50,
      style: 'BEASTY',
      energyCost: 35,
      comboMultiplier: 2.0
    },
    {
      id: 'gully-strike',
      name: 'Gully Strike',
      type: 'jab',
      power: 48,
      style: 'GULLY',
      energyCost: 38,
      comboMultiplier: 1.9
    },
    {
      id: 'intimidation-swing',
      name: 'Intimidation Swing',
      type: 'arm_swing',
      power: 52,
      style: 'BEASTY',
      energyCost: 42,
      comboMultiplier: 2.1
    }
  ],

  'brazil-rio': [
    {
      id: 'carnival-bounce',
      name: 'Carnival Bounce',
      type: 'chest_pop',
      power: 58,
      style: 'GOOFY',
      energyCost: 45,
      comboMultiplier: 2.3
    },
    {
      id: 'samba-flash',
      name: 'Samba Flash',
      type: 'arm_swing',
      power: 56,
      style: 'FLASHY',
      energyCost: 42,
      comboMultiplier: 2.2
    },
    {
      id: 'feather-jab',
      name: 'Feather Jab',
      type: 'jab',
      power: 52,
      style: 'GOOFY',
      energyCost: 38,
      comboMultiplier: 2.0
    },
    {
      id: 'rio-stomp',
      name: 'Rio Stomp',
      type: 'stomp',
      power: 60,
      style: 'FLASHY',
      energyCost: 48,
      comboMultiplier: 2.4
    }
  ],

  'uk-london': [
    {
      id: 'underground-slam',
      name: 'Underground Slam',
      type: 'stomp',
      power: 62,
      style: 'GRIMEY',
      energyCost: 50,
      comboMultiplier: 2.5
    },
    {
      id: 'gritty-pop',
      name: 'Gritty Pop',
      type: 'chest_pop',
      power: 58,
      style: 'GULLY',
      energyCost: 45,
      comboMultiplier: 2.3
    },
    {
      id: 'street-wisdom',
      name: 'Street Wisdom',
      type: 'jab',
      power: 55,
      style: 'GRIMEY',
      energyCost: 42,
      comboMultiplier: 2.1
    },
    {
      id: 'london-fog',
      name: 'London Fog',
      type: 'arm_swing',
      power: 60,
      style: 'GULLY',
      energyCost: 48,
      comboMultiplier: 2.4
    }
  ],

  'russia-moscow': [
    {
      id: 'siberian-strike',
      name: 'Siberian Strike',
      type: 'jab',
      power: 65,
      style: 'BULLY',
      energyCost: 52,
      comboMultiplier: 2.6
    },
    {
      id: 'iron-stomp',
      name: 'Iron Stomp',
      type: 'stomp',
      power: 68,
      style: 'RUGGED',
      energyCost: 55,
      comboMultiplier: 2.7
    },
    {
      id: 'kremlin-crush',
      name: 'Kremlin Crush',
      type: 'chest_pop',
      power: 62,
      style: 'BULLY',
      energyCost: 48,
      comboMultiplier: 2.5
    },
    {
      id: 'cold-shoulder',
      name: 'Cold Shoulder',
      type: 'arm_swing',
      power: 58,
      style: 'RUGGED',
      energyCost: 45,
      comboMultiplier: 2.2
    }
  ],

  'india-mumbai': [
    {
      id: 'bollywood-bounce',
      name: 'Bollywood Bounce',
      type: 'chest_pop',
      power: 70,
      style: 'JERKY',
      energyCost: 58,
      comboMultiplier: 2.8
    },
    {
      id: 'spice-jab',
      name: 'Spice Jab',
      type: 'jab',
      power: 65,
      style: 'TECHNICAL',
      energyCost: 52,
      comboMultiplier: 2.6
    },
    {
      id: 'monsoon-swing',
      name: 'Monsoon Swing',
      type: 'arm_swing',
      power: 68,
      style: 'JERKY',
      energyCost: 55,
      comboMultiplier: 2.7
    },
    {
      id: 'taj-stomp',
      name: 'Taj Stomp',
      type: 'stomp',
      power: 72,
      style: 'TECHNICAL',
      energyCost: 60,
      comboMultiplier: 2.9
    }
  ],

  'australia-sydney': [
    {
      id: 'outback-fury',
      name: 'Outback Fury',
      type: 'stomp',
      power: 75,
      style: 'RAW',
      energyCost: 62,
      comboMultiplier: 3.0
    },
    {
      id: 'boomerang-jab',
      name: 'Boomerang Jab',
      type: 'jab',
      power: 70,
      style: 'BEASTY',
      energyCost: 58,
      comboMultiplier: 2.8
    },
    {
      id: 'sydney-slam',
      name: 'Sydney Slam',
      type: 'chest_pop',
      power: 72,
      style: 'RAW',
      energyCost: 60,
      comboMultiplier: 2.9
    },
    {
      id: 'kangaroo-kick',
      name: 'Kangaroo Kick',
      type: 'arm_swing',
      power: 68,
      style: 'BEASTY',
      energyCost: 55,
      comboMultiplier: 2.7
    }
  ],

  'mexico-mexicocity': [
    {
      id: 'lucha-libre-slam',
      name: 'Lucha Libre Slam',
      type: 'stomp',
      power: 78,
      style: 'TRICKS',
      energyCost: 65,
      comboMultiplier: 3.1
    },
    {
      id: 'mariachi-flash',
      name: 'Mariachi Flash',
      type: 'arm_swing',
      power: 75,
      style: 'FLASHY',
      energyCost: 62,
      comboMultiplier: 3.0
    },
    {
      id: 'aztec-jab',
      name: 'Aztec Jab',
      type: 'jab',
      power: 72,
      style: 'TRICKS',
      energyCost: 58,
      comboMultiplier: 2.9
    },
    {
      id: 'mexico-pop',
      name: 'Mexico Pop',
      type: 'chest_pop',
      power: 70,
      style: 'FLASHY',
      energyCost: 55,
      comboMultiplier: 2.8
    }
  ],

  'egypt-cairo': [
    {
      id: 'pharaoh-stomp',
      name: 'Pharaoh Stomp',
      type: 'stomp',
      power: 80,
      style: 'COCKY',
      energyCost: 68,
      comboMultiplier: 3.2
    },
    {
      id: 'pyramid-precision',
      name: 'Pyramid Precision',
      type: 'jab',
      power: 78,
      style: 'TECHNICAL',
      energyCost: 65,
      comboMultiplier: 3.1
    },
    {
      id: 'nile-flow',
      name: 'Nile Flow',
      type: 'arm_swing',
      power: 75,
      style: 'COCKY',
      energyCost: 62,
      comboMultiplier: 3.0
    },
    {
      id: 'desert-storm',
      name: 'Desert Storm',
      type: 'chest_pop',
      power: 82,
      style: 'TECHNICAL',
      energyCost: 70,
      comboMultiplier: 3.3
    }
  ],

  'canada-toronto': [
    {
      id: 'arctic-blast',
      name: 'Arctic Blast',
      type: 'chest_pop',
      power: 85,
      style: 'FAST',
      energyCost: 72,
      comboMultiplier: 3.4
    },
    {
      id: 'hockey-check',
      name: 'Hockey Check',
      type: 'arm_swing',
      power: 80,
      style: 'GRIMEY',
      energyCost: 68,
      comboMultiplier: 3.2
    },
    {
      id: 'maple-jab',
      name: 'Maple Jab',
      type: 'jab',
      power: 78,
      style: 'FAST',
      energyCost: 65,
      comboMultiplier: 3.1
    },
    {
      id: 'toronto-stomp',
      name: 'Toronto Stomp',
      type: 'stomp',
      power: 82,
      style: 'GRIMEY',
      energyCost: 70,
      comboMultiplier: 3.3
    }
  ],

  'italy-rome': [
    {
      id: 'renaissance-flair',
      name: 'Renaissance Flair',
      type: 'arm_swing',
      power: 88,
      style: 'GOOFY',
      energyCost: 75,
      comboMultiplier: 3.5
    },
    {
      id: 'colosseum-slam',
      name: 'Colosseum Slam',
      type: 'stomp',
      power: 85,
      style: 'COCKY',
      energyCost: 72,
      comboMultiplier: 3.4
    },
    {
      id: 'venetian-jab',
      name: 'Venetian Jab',
      type: 'jab',
      power: 80,
      style: 'GOOFY',
      energyCost: 68,
      comboMultiplier: 3.2
    },
    {
      id: 'roman-pop',
      name: 'Roman Pop',
      type: 'chest_pop',
      power: 82,
      style: 'COCKY',
      energyCost: 70,
      comboMultiplier: 3.3
    }
  ],

  'south-africa-capetown': [
    {
      id: 'township-thunder',
      name: 'Township Thunder',
      type: 'stomp',
      power: 90,
      style: 'GULLY',
      energyCost: 78,
      comboMultiplier: 3.6
    },
    {
      id: 'mandela-strength',
      name: 'Mandela Strength',
      type: 'chest_pop',
      power: 88,
      style: 'BULLY',
      energyCost: 75,
      comboMultiplier: 3.5
    },
    {
      id: 'cape-jab',
      name: 'Cape Jab',
      type: 'jab',
      power: 85,
      style: 'GULLY',
      energyCost: 72,
      comboMultiplier: 3.4
    },
    {
      id: 'ubuntu-swing',
      name: 'Ubuntu Swing',
      type: 'arm_swing',
      power: 82,
      style: 'BULLY',
      energyCost: 70,
      comboMultiplier: 3.3
    }
  ]
};

// Opponent data for each location boss
export const locationOpponents: Record<string, OpponentData> = {
  'usa-la': {
    id: 'big-homie',
    name: 'Big Homie',
    rank: 'Kid',
    primaryStyle: 'RAW',
    stats: {
      strength: 25,
      defense: 20,
      speed: 15,
      charisma: 18,
      stamina: 22,
      technique: 12
    },
    moves: locationMoves['usa-la'],
    isOG: true
  },
  
  'japan-tokyo': {
    id: 'tech-master-yuki',
    name: 'Tech Master Yuki',
    rank: 'Boy',
    primaryStyle: 'TECHNICAL',
    stats: {
      strength: 30,
      defense: 25,
      speed: 28,
      charisma: 22,
      stamina: 26,
      technique: 35
    },
    moves: locationMoves['japan-tokyo'],
    isOG: true
  },
  
  'korea-seoul': {
    id: 'speed-king-jin',
    name: 'Speed King Jin',
    rank: 'Young',
    primaryStyle: 'FAST',
    stats: {
      strength: 28,
      defense: 22,
      speed: 40,
      charisma: 25,
      stamina: 30,
      technique: 28
    },
    moves: locationMoves['korea-seoul'],
    isOG: true
  },
  
  'france-paris': {
    id: 'artiste-supreme',
    name: 'Artiste Supreme',
    rank: 'Lil',
    primaryStyle: 'COCKY',
    stats: {
      strength: 35,
      defense: 30,
      speed: 32,
      charisma: 45,
      stamina: 32,
      technique: 38
    },
    moves: locationMoves['france-paris'],
    isOG: true
  },
  
  'germany-berlin': {
    id: 'beast-of-berlin',
    name: 'Beast of Berlin',
    rank: 'Jr',
    primaryStyle: 'BEASTY',
    stats: {
      strength: 50,
      defense: 45,
      speed: 25,
      charisma: 30,
      stamina: 48,
      technique: 35
    },
    moves: locationMoves['germany-berlin'],
    isOG: true
  },

  'brazil-rio': {
    id: 'carnival-king-carlos',
    name: 'Carnival King Carlos',
    rank: 'Twin',
    primaryStyle: 'GOOFY',
    stats: {
      strength: 55,
      defense: 50,
      speed: 45,
      charisma: 65,
      stamina: 52,
      technique: 40
    },
    moves: locationMoves['brazil-rio'],
    isOG: true
  },

  'uk-london': {
    id: 'underground-legend-max',
    name: 'Underground Legend Max',
    rank: 'Twin',
    primaryStyle: 'GRIMEY',
    stats: {
      strength: 60,
      defense: 55,
      speed: 40,
      charisma: 35,
      stamina: 58,
      technique: 45
    },
    moves: locationMoves['uk-london'],
    isOG: true
  },

  'russia-moscow': {
    id: 'iron-dancer-dmitri',
    name: 'Iron Dancer Dmitri',
    rank: 'Twin',
    primaryStyle: 'BULLY',
    stats: {
      strength: 68,
      defense: 62,
      speed: 35,
      charisma: 40,
      stamina: 65,
      technique: 48
    },
    moves: locationMoves['russia-moscow'],
    isOG: true
  },

  'india-mumbai': {
    id: 'bollywood-beast-raj',
    name: 'Bollywood Beast Raj',
    rank: 'Twin',
    primaryStyle: 'JERKY',
    stats: {
      strength: 65,
      defense: 58,
      speed: 55,
      charisma: 70,
      stamina: 60,
      technique: 62
    },
    moves: locationMoves['india-mumbai'],
    isOG: true
  },

  'australia-sydney': {
    id: 'outback-fury-jake',
    name: 'Outback Fury Jake',
    rank: 'Twin',
    primaryStyle: 'RAW',
    stats: {
      strength: 75,
      defense: 65,
      speed: 50,
      charisma: 45,
      stamina: 70,
      technique: 52
    },
    moves: locationMoves['australia-sydney'],
    isOG: true
  },

  'mexico-mexicocity': {
    id: 'lucha-libre-luis',
    name: 'Lucha Libre Luis',
    rank: 'Twin',
    primaryStyle: 'TRICKS',
    stats: {
      strength: 70,
      defense: 60,
      speed: 65,
      charisma: 55,
      stamina: 68,
      technique: 72
    },
    moves: locationMoves['mexico-mexicocity'],
    isOG: true
  },

  'egypt-cairo': {
    id: 'pharaoh-of-flow-amara',
    name: 'Pharaoh of Flow Amara',
    rank: 'Twin',
    primaryStyle: 'COCKY',
    stats: {
      strength: 72,
      defense: 68,
      speed: 58,
      charisma: 80,
      stamina: 65,
      technique: 78
    },
    moves: locationMoves['egypt-cairo'],
    isOG: true
  },

  'canada-toronto': {
    id: 'arctic-storm-zoe',
    name: 'Arctic Storm Zoe',
    rank: 'Twin',
    primaryStyle: 'FAST',
    stats: {
      strength: 68,
      defense: 62,
      speed: 85,
      charisma: 50,
      stamina: 72,
      technique: 65
    },
    moves: locationMoves['canada-toronto'],
    isOG: true
  },

  'italy-rome': {
    id: 'renaissance-rebel-marco',
    name: 'Renaissance Rebel Marco',
    rank: 'Twin',
    primaryStyle: 'GOOFY',
    stats: {
      strength: 75,
      defense: 70,
      speed: 60,
      charisma: 85,
      stamina: 68,
      technique: 75
    },
    moves: locationMoves['italy-rome'],
    isOG: true
  },

  'south-africa-capetown': {
    id: 'township-thunder-nomsa',
    name: 'Township Thunder Nomsa',
    rank: 'Twin',
    primaryStyle: 'GULLY',
    stats: {
      strength: 80,
      defense: 75,
      speed: 55,
      charisma: 60,
      stamina: 85,
      technique: 70
    },
    moves: locationMoves['south-africa-capetown'],
    isOG: true
  }
};

// Mini-boss versions for cypher battles - reduced stats and different styles
export const locationMiniBosses: Record<string, OpponentData> = {
  'usa-la': {
    id: 'underground-legend-max',
    name: 'Underground Legend Max',
    rank: 'Baby',
    primaryStyle: 'GULLY',
    stats: {
      strength: 18,
      defense: 15,
      speed: 12,
      charisma: 14,
      stamina: 17,
      technique: 9
    },
    moves: locationMoves['usa-la'].slice(0, 3),
    isOG: false
  },
  
  'japan-tokyo': {
    id: 'tech-disciple-akira',
    name: 'Tech Disciple Akira',
    rank: 'Child',
    primaryStyle: 'TRICKS',
    stats: {
      strength: 22,
      defense: 18,
      speed: 20,
      charisma: 16,
      stamina: 19,
      technique: 25
    },
    moves: locationMoves['japan-tokyo'].slice(0, 3),
    isOG: false
  },
  
  'korea-seoul': {
    id: 'rhythm-runner-lee',
    name: 'Rhythm Runner Lee',
    rank: 'Tiny',
    primaryStyle: 'JERKY',
    stats: {
      strength: 20,
      defense: 16,
      speed: 28,
      charisma: 18,
      stamina: 22,
      technique: 20
    },
    moves: locationMoves['korea-seoul'].slice(0, 3),
    isOG: false
  },
  
  'france-paris': {
    id: 'street-artiste-pierre',
    name: 'Street Artiste Pierre',
    rank: 'Child',
    primaryStyle: 'FLASHY',
    stats: {
      strength: 25,
      defense: 20,
      speed: 22,
      charisma: 28,
      stamina: 24,
      technique: 18
    },
    moves: locationMoves['france-paris'].slice(0, 3),
    isOG: false
  },
  
  'uk-london': {
    id: 'grime-warrior-jamie',
    name: 'Grime Warrior Jamie',
    rank: 'Baby',
    primaryStyle: 'GRIMEY',
    stats: {
      strength: 24,
      defense: 22,
      speed: 26,
      charisma: 20,
      stamina: 28,
      technique: 16
    },
    moves: locationMoves['uk-london'].slice(0, 3),
    isOG: false
  },
  
  'germany-berlin': {
    id: 'underground-beast-hans',
    name: 'Underground Beast Hans',
    rank: 'Tiny',
    primaryStyle: 'RUGGED',
    stats: {
      strength: 32,
      defense: 28,
      speed: 20,
      charisma: 22,
      stamina: 30,
      technique: 14
    },
    moves: locationMoves['germany-berlin'].slice(0, 3),
    isOG: false
  },
  
  'canada-toronto': {
    id: 'polar-storm-alex',
    name: 'Polar Storm Alex',
    rank: 'Child',
    primaryStyle: 'BULLY',
    stats: {
      strength: 28,
      defense: 26,
      speed: 18,
      charisma: 24,
      stamina: 32,
      technique: 20
    },
    moves: locationMoves['canada-toronto'].slice(0, 3),
    isOG: false
  },
  
  'australia-sydney': {
    id: 'surf-fury-blake',
    name: 'Surf Fury Blake',
    rank: 'Baby',
    primaryStyle: 'GOOFY',
    stats: {
      strength: 26,
      defense: 24,
      speed: 30,
      charisma: 28,
      stamina: 26,
      technique: 22
    },
    moves: locationMoves['australia-sydney'].slice(0, 3),
    isOG: false
  },
  
  'brazil-rio': {
    id: 'carnival-prince-diego',
    name: 'Carnival Prince Diego',
    rank: 'Tiny',
    primaryStyle: 'FAST',
    stats: {
      strength: 30,
      defense: 25,
      speed: 35,
      charisma: 32,
      stamina: 28,
      technique: 24
    },
    moves: locationMoves['brazil-rio'].slice(0, 3),
    isOG: false
  },
  
  'italy-rome': {
    id: 'renaissance-apprentice-luca',
    name: 'Renaissance Apprentice Luca',
    rank: 'Child',
    primaryStyle: 'COCKY',
    stats: {
      strength: 28,
      defense: 26,
      speed: 24,
      charisma: 35,
      stamina: 30,
      technique: 32
    },
    moves: locationMoves['italy-rome'].slice(0, 3),
    isOG: false
  },
  
  'india-mumbai': {
    id: 'bollywood-rookie-dev',
    name: 'Bollywood Rookie Dev',
    rank: 'Baby',
    primaryStyle: 'TECHNICAL',
    stats: {
      strength: 24,
      defense: 28,
      speed: 32,
      charisma: 30,
      stamina: 34,
      technique: 38
    },
    moves: locationMoves['india-mumbai'].slice(0, 3),
    isOG: false
  },
  
  'egypt-cairo': {
    id: 'desert-flow-omar',
    name: 'Desert Flow Omar',
    rank: 'Tiny',
    primaryStyle: 'RAW',
    stats: {
      strength: 32,
      defense: 30,
      speed: 28,
      charisma: 26,
      stamina: 36,
      technique: 22
    },
    moves: locationMoves['egypt-cairo'].slice(0, 3),
    isOG: false
  },
  
  'mexico-mexicocity': {
    id: 'libre-spirit-miguel',
    name: 'Libre Spirit Miguel',
    rank: 'Child',
    primaryStyle: 'BEASTY',
    stats: {
      strength: 35,
      defense: 32,
      speed: 26,
      charisma: 28,
      stamina: 38,
      technique: 26
    },
    moves: locationMoves['mexico-mexicocity'].slice(0, 3),
    isOG: false
  },
  
  'russia-moscow': {
    id: 'steel-dancer-ivan',
    name: 'Steel Dancer Ivan',
    rank: 'Baby',
    primaryStyle: 'RUGGED',
    stats: {
      strength: 38,
      defense: 36,
      speed: 22,
      charisma: 24,
      stamina: 40,
      technique: 28
    },
    moves: locationMoves['russia-moscow'].slice(0, 3),
    isOG: false
  },
  
  'south-africa-capetown': {
    id: 'township-spirit-thabo',
    name: 'Township Spirit Thabo',
    rank: 'Tiny',
    primaryStyle: 'GULLY',
    stats: {
      strength: 42,
      defense: 38,
      speed: 34,
      charisma: 45,
      stamina: 60,
      technique: 50
    },
    moves: locationMoves['south-africa-capetown'].slice(0, 3),
    isOG: false
  }
};

// Player reward moves that can be learned after defeating bosses
export const rewardMoves: Record<string, Move[]> = {
  'usa-la': [
    {
      id: 'street-wisdom',
      name: 'Street Wisdom',
      type: 'chest_pop',
      power: 20,
      style: 'RAW',
      energyCost: 12,
      comboMultiplier: 1.2
    }
  ],
  
  'japan-tokyo': [
    {
      id: 'technical-mastery',
      name: 'Technical Mastery',
      type: 'jab',
      power: 25,
      style: 'TECHNICAL',
      energyCost: 16,
      comboMultiplier: 1.5
    }
  ],
  
  'korea-seoul': [
    {
      id: 'speed-demon',
      name: 'Speed Demon',
      type: 'arm_swing',
      power: 22,
      style: 'FAST',
      energyCost: 12,
      comboMultiplier: 1.8
    }
  ],
  
  'france-paris': [
    {
      id: 'artistic-expression',
      name: 'Artistic Expression',
      type: 'chest_pop',
      power: 35,
      style: 'COCKY',
      energyCost: 25,
      comboMultiplier: 1.7
    }
  ],
  
  'germany-berlin': [
    {
      id: 'beast-mode',
      name: 'Beast Mode',
      type: 'stomp',
      power: 45,
      style: 'BEASTY',
      energyCost: 35,
      comboMultiplier: 2.0
    }
  ],

  'brazil-rio': [
    {
      id: 'carnival-spirit',
      name: 'Carnival Spirit',
      type: 'chest_pop',
      power: 50,
      style: 'GOOFY',
      energyCost: 40,
      comboMultiplier: 2.2
    }
  ],

  'uk-london': [
    {
      id: 'underground-respect',
      name: 'Underground Respect',
      type: 'arm_swing',
      power: 55,
      style: 'GRIMEY',
      energyCost: 45,
      comboMultiplier: 2.3
    }
  ],

  'russia-moscow': [
    {
      id: 'iron-will',
      name: 'Iron Will',
      type: 'jab',
      power: 60,
      style: 'BULLY',
      energyCost: 50,
      comboMultiplier: 2.4
    }
  ],

  'india-mumbai': [
    {
      id: 'bollywood-mastery',
      name: 'Bollywood Mastery',
      type: 'chest_pop',
      power: 65,
      style: 'JERKY',
      energyCost: 55,
      comboMultiplier: 2.5
    }
  ],

  'australia-sydney': [
    {
      id: 'outback-power',
      name: 'Outback Power',
      type: 'stomp',
      power: 70,
      style: 'RAW',
      energyCost: 60,
      comboMultiplier: 2.6
    }
  ],

  'mexico-mexicocity': [
    {
      id: 'lucha-technique',
      name: 'Lucha Technique',
      type: 'arm_swing',
      power: 75,
      style: 'TRICKS',
      energyCost: 65,
      comboMultiplier: 2.7
    }
  ],

  'egypt-cairo': [
    {
      id: 'pharaoh-wisdom',
      name: 'Pharaoh Wisdom',
      type: 'jab',
      power: 80,
      style: 'COCKY',
      energyCost: 70,
      comboMultiplier: 2.8
    }
  ],

  'canada-toronto': [
    {
      id: 'arctic-speed',
      name: 'Arctic Speed',
      type: 'chest_pop',
      power: 85,
      style: 'FAST',
      energyCost: 75,
      comboMultiplier: 2.9
    }
  ],

  'italy-rome': [
    {
      id: 'renaissance-art',
      name: 'Renaissance Art',
      type: 'arm_swing',
      power: 90,
      style: 'GOOFY',
      energyCost: 80,
      comboMultiplier: 3.0
    }
  ],

  'south-africa-capetown': [
    {
      id: 'township-power',
      name: 'Township Power',
      type: 'stomp',
      power: 95,
      style: 'GULLY',
      energyCost: 85,
      comboMultiplier: 3.1
    }
  ]
};

// Experience and street cred rewards for each location
export const locationRewards: Record<string, { experience: number; streetCred: number }> = {
  'usa-la': { experience: 100, streetCred: 50 },
  'japan-tokyo': { experience: 200, streetCred: 100 },
  'korea-seoul': { experience: 300, streetCred: 150 },
  'france-paris': { experience: 400, streetCred: 200 },
  'germany-berlin': { experience: 500, streetCred: 250 },
  'brazil-rio': { experience: 600, streetCred: 300 },
  'uk-london': { experience: 700, streetCred: 350 },
  'russia-moscow': { experience: 800, streetCred: 400 },
  'india-mumbai': { experience: 900, streetCred: 450 },
  'australia-sydney': { experience: 1000, streetCred: 500 },
  'mexico-mexicocity': { experience: 1100, streetCred: 550 },
  'egypt-cairo': { experience: 1200, streetCred: 600 },
  'canada-toronto': { experience: 1300, streetCred: 650 },
  'italy-rome': { experience: 1400, streetCred: 700 },
  'south-africa-capetown': { experience: 1500, streetCred: 750 }
};