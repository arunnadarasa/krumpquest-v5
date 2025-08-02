import { OverworldMap } from '@/types/game';
import { createCityTileMap, generateCollisionFromTiles } from '@/utils/pixelArtTiles';

export const overworldMaps: Record<string, OverworldMap> = {
  'usa-la': {
    id: 'usa-la',
    name: 'Los Angeles - Venice & Downtown',
    width: 32,
    height: 24,
    tileSize: 32,
    tileSet: {
      ground: createCityTileMap('usa-la', 32, 24),
      buildings: [],
      details: []
    },
    collisionMap: generateCollisionFromTiles(createCityTileMap('usa-la', 32, 24)),
    spawnPoint: { x: 64, y: 64 },
    districts: [
      {
        id: 'venice-beach',
        name: 'Venice Beach',
        bounds: { x: 2, y: 2, width: 14, height: 10 },
        theme: 'beach-urban'
      },
      {
        id: 'downtown',
        name: 'Downtown LA',
        bounds: { x: 18, y: 6, width: 12, height: 16 },
        theme: 'urban-core'
      },
      {
        id: 'warehouse-district',
        name: 'Warehouse District',
        bounds: { x: 6, y: 14, width: 10, height: 8 },
        theme: 'industrial'
      }
    ],
    atmosphere: {
      timeOfDay: 'day',
      weather: 'clear',
      ambientColor: '#FFE4B5'
    },
    interactables: [
      {
        id: 'movement-lifestyle-studio',
        position: { x: 12 * 32, y: 4 * 32 },
        type: 'dance_studio',
        data: { 
          name: 'Movement Lifestyle Studio',
          styles: ['RAW', 'BEASTY'],
          trainers: ['og-trainer-mike']
        },
        size: { x: 96, y: 64 }
      },
      {
        id: 'fat-beats-records',
        position: { x: 22 * 32, y: 10 * 32 },
        type: 'record_shop',
        data: { 
          name: 'Fat Beats Records',
          inventory: ['krump-beats-vol1', 'la-underground-mix']
        },
        size: { x: 64, y: 64 }
      },
      {
        id: 'warehouse-training',
        position: { x: 10 * 32, y: 18 * 32 },
        type: 'training_spot',
        data: { 
          name: 'Abandoned Warehouse',
          specialTraining: 'power-moves',
          difficulty: 3
        },
        size: { x: 128, y: 96 }
      },
      {
        id: 'big-homie-battle',
        position: { x: 26 * 32, y: 20 * 32 },
        type: 'battle_trigger',
        data: { 
          bossId: 'big-homie',
          location: 'Downtown LA Rooftop',
          unlockRequirement: 3
        },
        size: { x: 64, y: 64 }
      },
      // NPCs
      {
        id: 'venice-local-npc',
        position: { x: 6 * 32, y: 8 * 32 },
        type: 'npc',
        data: { 
          npcId: 'venice-local',
          name: 'Marcus "The Original"'
        },
        size: { x: 32, y: 32 }
      },
      {
        id: 'studio-owner-npc',
        position: { x: 14 * 32, y: 5 * 32 },
        type: 'npc',
        data: { 
          npcId: 'studio-owner',
          name: 'Carmen Rodriguez'
        },
        size: { x: 32, y: 32 }
      },
      // Training Center Access
      {
        id: 'training-center-access',
        position: { x: 4 * 32, y: 16 * 32 },
        type: 'training_center',
        data: { 
          name: 'Venice Training Center',
          description: 'Advanced Krump Training'
        },
        size: { x: 96, y: 64 }
      },
      // Wisdom Center Access
      {
        id: 'wisdom-center-access',
        position: { x: 28 * 32, y: 4 * 32 },
        type: 'wisdom_center',
        data: { 
          name: 'Krump Wisdom Library',
          description: 'Learn the History and Culture'
        },
        size: { x: 96, y: 64 }
      }
    ]
  },
  'japan-tokyo': {
    id: 'japan-tokyo',
    name: 'Tokyo - Shibuya & Harajuku',
    width: 36,
    height: 28,
    tileSize: 32,
    tileSet: {
      ground: createCityTileMap('japan-tokyo', 36, 28),
      buildings: [],
      details: []
    },
    collisionMap: generateCollisionFromTiles(createCityTileMap('japan-tokyo', 36, 28)),
    spawnPoint: { x: 64, y: 64 },
    districts: [
      {
        id: 'shibuya',
        name: 'Shibuya Crossing',
        bounds: { x: 2, y: 2, width: 16, height: 12 },
        theme: 'neon-urban'
      },
      {
        id: 'harajuku',
        name: 'Harajuku District',
        bounds: { x: 20, y: 4, width: 14, height: 10 },
        theme: 'pop-culture'
      },
      {
        id: 'underground',
        name: 'Underground Scene',
        bounds: { x: 8, y: 16, width: 20, height: 10 },
        theme: 'underground'
      }
    ],
    atmosphere: {
      timeOfDay: 'night',
      weather: 'clear',
      ambientColor: '#4B0082'
    },
    interactables: [
      {
        id: 'en-dance-studio',
        position: { x: 25 * 32, y: 7 * 32 },
        type: 'dance_studio',
        data: { 
          name: 'EN Dance Studio',
          styles: ['TECHNICAL', 'FAST'],
          trainers: ['master-ken']
        },
        size: { x: 128, y: 96 }
      },
      {
        id: 'tower-records-shibuya',
        position: { x: 14 * 32, y: 5 * 32 },
        type: 'record_shop',
        data: { 
          name: 'Tower Records Shibuya',
          inventory: ['tokyo-underground', 'j-krump-fusion']
        }
      },
      {
        id: 'underground-club',
        position: { x: 18 * 32, y: 21 * 32 },
        type: 'club',
        data: { 
          name: 'Underground Tokyo',
          events: ['midnight-battles', 'krump-vs-bboy']
        },
        size: { x: 160, y: 96 }
      },
      {
        id: 'tech-master-yuki-battle',
        position: { x: 30 * 32, y: 24 * 32 },
        type: 'battle_trigger',
        data: { 
          bossId: 'tech-master-yuki',
          location: 'Neon Arcade',
          unlockRequirement: 5
        }
      },
      // NPCs
      {
        id: 'shibuya-guide-npc',
        position: { x: 12 * 32, y: 10 * 32 },
        type: 'npc',
        data: { 
          npcId: 'shibuya-guide',
          name: 'Kenji "Speed Demon"'
        },
        size: { x: 32, y: 32 }
      },
      // Training Center Access
      {
        id: 'tokyo-training-center',
        position: { x: 6 * 32, y: 20 * 32 },
        type: 'training_center',
        data: { 
          name: 'Tokyo Dojo',
          description: 'Technical Krump Mastery'
        },
        size: { x: 96, y: 64 }
      },
      // Wisdom Center Access
      {
        id: 'tokyo-wisdom-center',
        position: { x: 32 * 32, y: 6 * 32 },
        type: 'wisdom_center',
        data: { 
          name: 'Ancient Knowledge Temple',
          description: 'Eastern Philosophy meets Krump'
        },
        size: { x: 96, y: 64 }
      }
    ]
  },
  'france-paris': {
    id: 'france-paris',
    name: 'Paris - Seine & Montmartre',
    width: 30,
    height: 22,
    tileSize: 32,
    tileSet: {
      ground: createCityTileMap('france-paris', 30, 22),
      buildings: [],
      details: []
    },
    collisionMap: generateCollisionFromTiles(createCityTileMap('france-paris', 30, 22)),
    spawnPoint: { x: 64, y: 64 },
    districts: [
      {
        id: 'seine-riverside',
        name: 'Seine Riverside',
        bounds: { x: 2, y: 8, width: 26, height: 6 },
        theme: 'riverside'
      },
      {
        id: 'montmartre',
        name: 'Montmartre Heights',
        bounds: { x: 6, y: 2, width: 18, height: 6 },
        theme: 'artistic'
      },
      {
        id: 'metro-tunnels',
        name: 'Metro Underground',
        bounds: { x: 8, y: 16, width: 14, height: 4 },
        theme: 'underground'
      }
    ],
    atmosphere: {
      timeOfDay: 'evening',
      weather: 'clear',
      ambientColor: '#D4AF37'
    },
    interactables: [
      {
        id: 'studio-harmonic',
        position: { x: 12 * 32, y: 4 * 32 },
        type: 'dance_studio',
        data: { 
          name: 'Studio Harmonic',
          styles: ['FLASHY', 'TECHNICAL']
        }
      },
      {
        id: 'artiste-supreme-battle',
        position: { x: 22 * 32, y: 18 * 32 },
        type: 'battle_trigger',
        data: { bossId: 'artiste-supreme' }
      },
      // NPCs
      {
        id: 'seine-artist-npc',
        position: { x: 10 * 32, y: 10 * 32 },
        type: 'npc',
        data: { 
          npcId: 'seine-artist',
          name: 'Marcel "Le Artiste"'
        },
        size: { x: 32, y: 32 }
      },
      {
        id: 'montmartre-artist-npc',
        position: { x: 18 * 32, y: 5 * 32 },
        type: 'npc',
        data: { 
          npcId: 'montmartre-artist',
          name: 'Camille "La Visionnaire"'
        },
        size: { x: 32, y: 32 }
      },
      // Training Center Access
      {
        id: 'paris-training-center',
        position: { x: 8 * 32, y: 5 * 32 },
        type: 'training_center',
        data: { 
          name: 'École de Danse',
          description: 'Artistic Krump Excellence'
        },
        size: { x: 96, y: 64 }
      },
      // Wisdom Center Access
      {
        id: 'paris-wisdom-center',
        position: { x: 24 * 32, y: 3 * 32 },
        type: 'wisdom_center',
        data: { 
          name: 'Bibliothèque de la Danse',
          description: 'Dance Culture Archives'
        },
        size: { x: 96, y: 64 }
      }
    ]
  },
  'germany-berlin': {
    id: 'germany-berlin',
    name: 'Berlin - Underground Scene',
    width: 34,
    height: 26,
    tileSize: 32,
    tileSet: {
      ground: createCityTileMap('germany-berlin', 34, 26),
      buildings: [],
      details: []
    },
    collisionMap: generateCollisionFromTiles(createCityTileMap('germany-berlin', 34, 26)),
    spawnPoint: { x: 64, y: 64 },
    districts: [
      {
        id: 'kreuzberg',
        name: 'Kreuzberg District',
        bounds: { x: 2, y: 2, width: 14, height: 12 },
        theme: 'alternative'
      },
      {
        id: 'friedrichshain',
        name: 'Friedrichshain',
        bounds: { x: 18, y: 4, width: 14, height: 10 },
        theme: 'industrial'
      },
      {
        id: 'underground-tunnels',
        name: 'Underground Network',
        bounds: { x: 6, y: 16, width: 22, height: 8 },
        theme: 'underground'
      }
    ],
    atmosphere: {
      timeOfDay: 'night',
      weather: 'fog',
      ambientColor: '#2F4F4F'
    },
    interactables: [
      {
        id: 'maze-club',
        position: { x: 20 * 32, y: 20 * 32 },
        type: 'club',
        data: { name: 'Maze Club Berlin' }
      },
      {
        id: 'beast-of-berlin-battle',
        position: { x: 28 * 32, y: 22 * 32 },
        type: 'battle_trigger',
        data: { bossId: 'beast-of-berlin' }
      },
      // NPCs
      {
        id: 'underground-veteran-npc',
        position: { x: 10 * 32, y: 10 * 32 },
        type: 'npc',
        data: { 
          npcId: 'underground-veteran',
          name: 'Klaus "Untergrund"'
        },
        size: { x: 32, y: 32 }
      },
      // Training Center Access
      {
        id: 'berlin-training-center',
        position: { x: 4 * 32, y: 20 * 32 },
        type: 'training_center',
        data: { 
          name: 'Underground Gym',
          description: 'Raw Power Training'
        },
        size: { x: 96, y: 64 }
      },
      // Wisdom Center Access
      {
        id: 'berlin-wisdom-center',
        position: { x: 30 * 32, y: 8 * 32 },
        type: 'wisdom_center',
        data: { 
          name: 'Street Philosophy Hub',
          description: 'Underground Culture Studies'
        },
        size: { x: 96, y: 64 }
      }
    ]
  },
  'korea-seoul': {
    id: 'korea-seoul',
    name: 'Seoul - Gangnam & Hongdae',
    width: 32,
    height: 24,
    tileSize: 32,
    tileSet: {
      ground: createCityTileMap('korea-seoul', 32, 24),
      buildings: [],
      details: []
    },
    collisionMap: generateCollisionFromTiles(createCityTileMap('korea-seoul', 32, 24)),
    spawnPoint: { x: 64, y: 64 },
    districts: [
      {
        id: 'gangnam',
        name: 'Gangnam District',
        bounds: { x: 2, y: 2, width: 14, height: 10 },
        theme: 'luxury-neon'
      },
      {
        id: 'hongdae',
        name: 'Hongdae Area',
        bounds: { x: 18, y: 6, width: 12, height: 16 },
        theme: 'youth-culture'
      },
      {
        id: 'itaewon',
        name: 'Itaewon District',
        bounds: { x: 6, y: 14, width: 10, height: 8 },
        theme: 'international'
      }
    ],
    atmosphere: {
      timeOfDay: 'night',
      weather: 'clear',
      ambientColor: '#FF1493'
    },
    interactables: [
      {
        id: 'rhythm-dance-academy',
        position: { x: 22 * 32, y: 10 * 32 },
        type: 'dance_studio',
        data: { 
          name: 'Rhythm Dance Academy',
          styles: ['FAST', 'TECHNICAL'],
          trainers: ['master-kim']
        },
        size: { x: 96, y: 64 }
      },
      {
        id: 'seoul-records',
        position: { x: 12 * 32, y: 4 * 32 },
        type: 'record_shop',
        data: { 
          name: 'Seoul Sound Records',
          inventory: ['k-krump-beats', 'seoul-underground']
        },
        size: { x: 64, y: 64 }
      },
      {
        id: 'speed-king-jin-battle',
        position: { x: 26 * 32, y: 20 * 32 },
        type: 'battle_trigger',
        data: { 
          bossId: 'speed-king-jin',
          location: 'Neon Plaza',
          unlockRequirement: 4
        },
        size: { x: 64, y: 64 }
      },
      // NPCs
      {
        id: 'hongdae-street-dancer',
        position: { x: 8 * 32, y: 8 * 32 },
        type: 'npc',
        data: { 
          npcId: 'hongdae-street-dancer',
          name: 'Jin "K-Krump King"'
        },
        size: { x: 32, y: 32 }
      },
      {
        id: 'kpop-fusion-expert',
        position: { x: 20 * 32, y: 12 * 32 },
        type: 'npc',
        data: { 
          npcId: 'kpop-fusion-expert',
          name: 'Mina "Fusion Master"'
        },
        size: { x: 32, y: 32 }
      },
      {
        id: 'seoul-training-center',
        position: { x: 4 * 32, y: 16 * 32 },
        type: 'training_center',
        data: { 
          name: 'Seoul Speed Center',
          description: 'Lightning Fast Training'
        },
        size: { x: 96, y: 64 }
      },
      {
        id: 'seoul-wisdom-center',
        position: { x: 28 * 32, y: 4 * 32 },
        type: 'wisdom_center',
        data: { 
          name: 'K-Culture Institute',
          description: 'Modern Dance Heritage'
        },
        size: { x: 96, y: 64 }
      }
    ]
  },
  'brazil-rio': {
    id: 'brazil-rio',
    name: 'Rio de Janeiro - Copacabana & Favela',
    width: 36,
    height: 28,
    tileSize: 32,
    tileSet: {
      ground: createCityTileMap('brazil-rio', 36, 28),
      buildings: [],
      details: []
    },
    collisionMap: generateCollisionFromTiles(createCityTileMap('brazil-rio', 36, 28)),
    spawnPoint: { x: 64, y: 64 },
    districts: [
      {
        id: 'copacabana',
        name: 'Copacabana Beach',
        bounds: { x: 2, y: 2, width: 32, height: 8 },
        theme: 'beach-carnival'
      },
      {
        id: 'favela-hills',
        name: 'Favela Hills',
        bounds: { x: 4, y: 12, width: 14, height: 14 },
        theme: 'colorful-streets'
      },
      {
        id: 'downtown-rio',
        name: 'Downtown Rio',
        bounds: { x: 20, y: 14, width: 14, height: 12 },
        theme: 'urban-carnival'
      }
    ],
    atmosphere: {
      timeOfDay: 'day',
      weather: 'clear',
      ambientColor: '#FFD700'
    },
    interactables: [
      {
        id: 'favela-dance-studio',
        position: { x: 10 * 32, y: 18 * 32 },
        type: 'dance_studio',
        data: { 
          name: 'Favela Flow Studio',
          styles: ['GOOFY', 'FLASHY'],
          trainers: ['professor-carlos']
        },
        size: { x: 128, y: 96 }
      },
      {
        id: 'rio-vinyl',
        position: { x: 26 * 32, y: 18 * 32 },
        type: 'record_shop',
        data: { 
          name: 'Rio Vinyl Paradise',
          inventory: ['carnival-krump', 'favela-beats']
        },
        size: { x: 64, y: 64 }
      },
      {
        id: 'carnival-king-carlos-battle',
        position: { x: 30 * 32, y: 24 * 32 },
        type: 'battle_trigger',
        data: { 
          bossId: 'carnival-king-carlos',
          location: 'Christ the Redeemer Plaza',
          unlockRequirement: 3
        },
        size: { x: 64, y: 64 }
      },
      // NPCs
      {
        id: 'favela-dance-mentor',
        position: { x: 14 * 32, y: 16 * 32 },
        type: 'npc',
        data: { 
          npcId: 'favela-dance-mentor',
          name: 'Paulo "Favela Flow"'
        },
        size: { x: 32, y: 32 }
      },
      {
        id: 'carnival-expert',
        position: { x: 22 * 32, y: 4 * 32 },
        type: 'npc',
        data: { 
          npcId: 'carnival-expert',
          name: 'Isabella "Carnival Queen"'
        },
        size: { x: 32, y: 32 }
      },
      {
        id: 'rio-training-center',
        position: { x: 6 * 32, y: 20 * 32 },
        type: 'training_center',
        data: { 
          name: 'Carnival Training Ground',
          description: 'Rhythm and Flow Mastery'
        },
        size: { x: 96, y: 64 }
      },
      {
        id: 'rio-wisdom-center',
        position: { x: 32 * 32, y: 6 * 32 },
        type: 'wisdom_center',
        data: { 
          name: 'Samba Heritage Center',
          description: 'Brazilian Dance Culture'
        },
        size: { x: 96, y: 64 }
      }
    ]
  },
  'uk-london': {
    id: 'uk-london',
    name: 'London - East End & Underground',
    width: 30,
    height: 24,
    tileSize: 32,
    tileSet: {
      ground: createCityTileMap('uk-london', 30, 24),
      buildings: [],
      details: []
    },
    collisionMap: generateCollisionFromTiles(createCityTileMap('uk-london', 30, 24)),
    spawnPoint: { x: 64, y: 64 },
    districts: [
      {
        id: 'east-london',
        name: 'East London',
        bounds: { x: 2, y: 2, width: 12, height: 10 },
        theme: 'gritty-urban'
      },
      {
        id: 'underground-tunnels',
        name: 'Underground Tunnels',
        bounds: { x: 4, y: 14, width: 22, height: 8 },
        theme: 'underground'
      },
      {
        id: 'thames-riverside',
        name: 'Thames Riverside',
        bounds: { x: 16, y: 4, width: 12, height: 8 },
        theme: 'industrial-riverside'
      }
    ],
    atmosphere: {
      timeOfDay: 'evening',
      weather: 'rain',
      ambientColor: '#696969'
    },
    interactables: [
      {
        id: 'brick-lane-studio',
        position: { x: 22 * 32, y: 8 * 32 },
        type: 'dance_studio',
        data: { 
          name: 'Brick Lane Movement',
          styles: ['GULLY', 'RAW'],
          trainers: ['master-mike']
        },
        size: { x: 96, y: 64 }
      },
      {
        id: 'rough-trade-records',
        position: { x: 12 * 32, y: 4 * 32 },
        type: 'record_shop',
        data: { 
          name: 'Rough Trade East',
          inventory: ['uk-underground', 'london-krump']
        },
        size: { x: 64, y: 64 }
      },
      {
        id: 'underground-legend-max-battle',
        position: { x: 24 * 32, y: 20 * 32 },
        type: 'battle_trigger',
        data: { 
          bossId: 'underground-legend-max',
          location: 'Abandoned Tube Station',
          unlockRequirement: 6
        },
        size: { x: 64, y: 64 }
      },
      // NPCs
      {
        id: 'east-end-veteran',
        position: { x: 10 * 32, y: 8 * 32 },
        type: 'npc',
        data: { 
          npcId: 'east-end-veteran',
          name: 'Tommy "Underground"'
        },
        size: { x: 32, y: 32 }
      },
      {
        id: 'grime-scene-expert',
        position: { x: 18 * 32, y: 18 * 32 },
        type: 'npc',
        data: { 
          npcId: 'grime-scene-expert',
          name: 'Jade "Grime Queen"'
        },
        size: { x: 32, y: 32 }
      },
      {
        id: 'london-training-center',
        position: { x: 6 * 32, y: 18 * 32 },
        type: 'training_center',
        data: { 
          name: 'Underground Gym',
          description: 'Gritty Street Training'
        },
        size: { x: 96, y: 64 }
      },
      {
        id: 'london-wisdom-center',
        position: { x: 26 * 32, y: 6 * 32 },
        type: 'wisdom_center',
        data: { 
          name: 'Street Culture Archive',
          description: 'UK Urban Heritage'
        },
        size: { x: 96, y: 64 }
      }
    ]
  },
  'russia-moscow': {
    id: 'russia-moscow',
    name: 'Moscow - Red Square & Industrial',
    width: 32,
    height: 26,
    tileSize: 32,
    tileSet: {
      ground: createCityTileMap('russia-moscow', 32, 26),
      buildings: [],
      details: []
    },
    collisionMap: generateCollisionFromTiles(createCityTileMap('russia-moscow', 32, 26)),
    spawnPoint: { x: 64, y: 64 },
    districts: [
      {
        id: 'red-square',
        name: 'Red Square Area',
        bounds: { x: 12, y: 2, width: 8, height: 8 },
        theme: 'historic-soviet'
      },
      {
        id: 'industrial-district',
        name: 'Industrial District',
        bounds: { x: 2, y: 12, width: 14, height: 12 },
        theme: 'brutalist-industrial'
      },
      {
        id: 'metro-stations',
        name: 'Metro Underground',
        bounds: { x: 18, y: 14, width: 12, height: 10 },
        theme: 'soviet-underground'
      }
    ],
    atmosphere: {
      timeOfDay: 'night',
      weather: 'fog',
      ambientColor: '#4682B4'
    },
    interactables: [
      {
        id: 'factory-dance-hall',
        position: { x: 8 * 32, y: 18 * 32 },
        type: 'dance_studio',
        data: { 
          name: 'Factory Dance Hall',
          styles: ['BEASTY', 'RAW'],
          trainers: ['comrade-viktor']
        },
        size: { x: 128, y: 96 }
      },
      {
        id: 'moscow-vinyl',
        position: { x: 22 * 32, y: 18 * 32 },
        type: 'record_shop',
        data: { 
          name: 'Moscow Underground Records',
          inventory: ['siberian-beats', 'moscow-underground']
        },
        size: { x: 64, y: 64 }
      },
      {
        id: 'iron-dancer-dmitri-battle',
        position: { x: 28 * 32, y: 22 * 32 },
        type: 'battle_trigger',
        data: { 
          bossId: 'iron-dancer-dmitri',
          location: 'Kremlin Courtyard',
          unlockRequirement: 5
        },
        size: { x: 64, y: 64 }
      },
      // NPCs
      {
        id: 'red-square-veteran',
        position: { x: 18 * 32, y: 8 * 32 },
        type: 'npc',
        data: { 
          npcId: 'red-square-veteran',
          name: 'Dmitri "Iron Soul"'
        },
        size: { x: 32, y: 32 }
      },
      {
        id: 'metro-dancer',
        position: { x: 24 * 32, y: 18 * 32 },
        type: 'npc',
        data: { 
          npcId: 'metro-dancer',
          name: 'Katya "Metro Queen"'
        },
        size: { x: 32, y: 32 }
      },
      {
        id: 'moscow-training-center',
        position: { x: 4 * 32, y: 20 * 32 },
        type: 'training_center',
        data: { 
          name: 'Siberian Training Camp',
          description: 'Iron Will Training'
        },
        size: { x: 96, y: 64 }
      },
      {
        id: 'moscow-wisdom-center',
        position: { x: 24 * 32, y: 4 * 32 },
        type: 'wisdom_center',
        data: { 
          name: 'Soviet Culture Museum',
          description: 'Revolutionary Dance History'
        },
        size: { x: 96, y: 64 }
      }
    ]
  },
  'india-mumbai': {
    id: 'india-mumbai',
    name: 'Mumbai - Bollywood & Streets',
    width: 34,
    height: 28,
    tileSize: 32,
    tileSet: {
      ground: createCityTileMap('india-mumbai', 34, 28),
      buildings: [],
      details: []
    },
    collisionMap: generateCollisionFromTiles(createCityTileMap('india-mumbai', 34, 28)),
    spawnPoint: { x: 64, y: 64 },
    districts: [
      {
        id: 'bollywood-studios',
        name: 'Bollywood Studios',
        bounds: { x: 2, y: 2, width: 14, height: 10 },
        theme: 'film-glamour'
      },
      {
        id: 'street-markets',
        name: 'Street Markets',
        bounds: { x: 6, y: 14, width: 16, height: 12 },
        theme: 'colorful-chaos'
      },
      {
        id: 'marine-drive',
        name: 'Marine Drive',
        bounds: { x: 24, y: 6, width: 8, height: 20 },
        theme: 'coastal-urban'
      }
    ],
    atmosphere: {
      timeOfDay: 'evening',
      weather: 'clear',
      ambientColor: '#FF8C00'
    },
    interactables: [
      {
        id: 'dance-academy-mumbai',
        position: { x: 14 * 32, y: 18 * 32 },
        type: 'dance_studio',
        data: { 
          name: 'Mumbai Dance Academy',
          styles: ['FLASHY', 'GOOFY'],
          trainers: ['guru-raj']
        },
        size: { x: 128, y: 96 }
      },
      {
        id: 'music-bazaar',
        position: { x: 28 * 32, y: 12 * 32 },
        type: 'record_shop',
        data: { 
          name: 'Music Bazaar',
          inventory: ['bollywood-krump', 'mumbai-beats']
        },
        size: { x: 64, y: 64 }
      },
      {
        id: 'bollywood-beast-raj-battle',
        position: { x: 30 * 32, y: 24 * 32 },
        type: 'battle_trigger',
        data: { 
          bossId: 'bollywood-beast-raj',
          location: 'Film Studio Set',
          unlockRequirement: 4
        },
        size: { x: 64, y: 64 }
      },
      // NPCs
      {
        id: 'bollywood-choreographer',
        position: { x: 10 * 32, y: 8 * 32 },
        type: 'npc',
        data: { 
          npcId: 'bollywood-choreographer',
          name: 'Arjun "Bollywood Beast"'
        },
        size: { x: 32, y: 32 }
      },
      {
        id: 'street-sage',
        position: { x: 18 * 32, y: 16 * 32 },
        type: 'npc',
        data: { 
          npcId: 'street-sage',
          name: 'Priya "Street Sage"'
        },
        size: { x: 32, y: 32 }
      },
      {
        id: 'mumbai-training-center',
        position: { x: 10 * 32, y: 20 * 32 },
        type: 'training_center',
        data: { 
          name: 'Bollywood Training Studio',
          description: 'Dramatic Expression Training'
        },
        size: { x: 96, y: 64 }
      },
      {
        id: 'mumbai-wisdom-center',
        position: { x: 26 * 32, y: 8 * 32 },
        type: 'wisdom_center',
        data: { 
          name: 'Dance Heritage Center',
          description: 'Classical meets Street'
        },
        size: { x: 96, y: 64 }
      }
    ]
  },
  'australia-sydney': {
    id: 'australia-sydney',
    name: 'Sydney - Bondi & Urban Core',
    width: 32,
    height: 24,
    tileSize: 32,
    tileSet: {
      ground: createCityTileMap('australia-sydney', 32, 24),
      buildings: [],
      details: []
    },
    collisionMap: generateCollisionFromTiles(createCityTileMap('australia-sydney', 32, 24)),
    spawnPoint: { x: 64, y: 64 },
    districts: [
      {
        id: 'bondi-beach',
        name: 'Bondi Beach',
        bounds: { x: 2, y: 2, width: 28, height: 6 },
        theme: 'surf-culture'
      },
      {
        id: 'urban-core',
        name: 'Urban Core',
        bounds: { x: 8, y: 10, width: 16, height: 12 },
        theme: 'modern-urban'
      },
      {
        id: 'harbor-area',
        name: 'Harbor Area',
        bounds: { x: 20, y: 16, width: 10, height: 6 },
        theme: 'harbor-industrial'
      }
    ],
    atmosphere: {
      timeOfDay: 'day',
      weather: 'clear',
      ambientColor: '#87CEEB'
    },
    interactables: [
      {
        id: 'sydney-dance-studio',
        position: { x: 16 * 32, y: 16 * 32 },
        type: 'dance_studio',
        data: { 
          name: 'Sydney Movement Studio',
          styles: ['COCKY', 'FAST'],
          trainers: ['master-jake']
        },
        size: { x: 96, y: 64 }
      },
      {
        id: 'harbor-records',
        position: { x: 24 * 32, y: 18 * 32 },
        type: 'record_shop',
        data: { 
          name: 'Harbor Sound Records',
          inventory: ['outback-beats', 'sydney-underground']
        },
        size: { x: 64, y: 64 }
      },
      {
        id: 'outback-fury-jake-battle',
        position: { x: 28 * 32, y: 20 * 32 },
        type: 'battle_trigger',
        data: { 
          bossId: 'outback-fury-jake',
          location: 'Opera House Steps',
          unlockRequirement: 3
        },
        size: { x: 64, y: 64 }
      },
      // NPCs
      {
        id: 'bondi-surfer-dancer',
        position: { x: 12 * 32, y: 4 * 32 },
        type: 'npc',
        data: { 
          npcId: 'bondi-surfer-dancer',
          name: 'Shane "Wave Rider"'
        },
        size: { x: 32, y: 32 }
      },
      {
        id: 'aboriginal-elder',
        position: { x: 20 * 32, y: 14 * 32 },
        type: 'npc',
        data: { 
          npcId: 'aboriginal-elder',
          name: 'Billy "Dreamtime"'
        },
        size: { x: 32, y: 32 }
      },
      {
        id: 'sydney-training-center',
        position: { x: 4 * 32, y: 16 * 32 },
        type: 'training_center',
        data: { 
          name: 'Outback Training Ground',
          description: 'Wild Style Training'
        },
        size: { x: 96, y: 64 }
      },
      {
        id: 'sydney-wisdom-center',
        position: { x: 26 * 32, y: 6 * 32 },
        type: 'wisdom_center',
        data: { 
          name: 'Aboriginal Culture Center',
          description: 'Ancient Movement Wisdom'
        },
        size: { x: 96, y: 64 }
      }
    ]
  },
  'mexico-mexicocity': {
    id: 'mexico-mexicocity',
    name: 'Mexico City - Historic & Lucha',
    width: 30,
    height: 26,
    tileSize: 32,
    tileSet: {
      ground: createCityTileMap('mexico-mexicocity', 30, 26),
      buildings: [],
      details: []
    },
    collisionMap: generateCollisionFromTiles(createCityTileMap('mexico-mexicocity', 30, 26)),
    spawnPoint: { x: 64, y: 64 },
    districts: [
      {
        id: 'historic-center',
        name: 'Historic Center',
        bounds: { x: 6, y: 2, width: 18, height: 8 },
        theme: 'colonial-aztec'
      },
      {
        id: 'lucha-arena-district',
        name: 'Lucha Arena District',
        bounds: { x: 2, y: 12, width: 12, height: 12 },
        theme: 'wrestling-culture'
      },
      {
        id: 'street-markets',
        name: 'Street Markets',
        bounds: { x: 16, y: 14, width: 12, height: 10 },
        theme: 'vibrant-markets'
      }
    ],
    atmosphere: {
      timeOfDay: 'evening',
      weather: 'clear',
      ambientColor: '#FF6347'
    },
    interactables: [
      {
        id: 'lucha-dance-academy',
        position: { x: 8 * 32, y: 18 * 32 },
        type: 'dance_studio',
        data: { 
          name: 'Lucha Dance Academy',
          styles: ['BULLY', 'GOOFY'],
          trainers: ['maestro-luis']
        },
        size: { x: 128, y: 96 }
      },
      {
        id: 'mercado-music',
        position: { x: 22 * 32, y: 18 * 32 },
        type: 'record_shop',
        data: { 
          name: 'Mercado Musical',
          inventory: ['mariachi-krump', 'aztec-beats']
        },
        size: { x: 64, y: 64 }
      },
      {
        id: 'lucha-libre-luis-battle',
        position: { x: 26 * 32, y: 22 * 32 },
        type: 'battle_trigger',
        data: { 
          bossId: 'lucha-libre-luis',
          location: 'Arena Mexico',
          unlockRequirement: 4
        },
        size: { x: 64, y: 64 }
      },
      // NPCs
      {
        id: 'lucha-libre-veteran',
        position: { x: 7 * 32, y: 15 * 32 },
        type: 'npc',
        data: { 
          npcId: 'lucha-libre-veteran',
          name: 'Carlos "El Luchador"'
        },
        size: { x: 32, y: 32 }
      },
      {
        id: 'aztec-dancer',
        position: { x: 12 * 32, y: 5 * 32 },
        type: 'npc',
        data: { 
          npcId: 'aztec-dancer',
          name: 'Maria "Aztec Flame"'
        },
        size: { x: 32, y: 32 }
      },
      {
        id: 'mexico-training-center',
        position: { x: 4 * 32, y: 20 * 32 },
        type: 'training_center',
        data: { 
          name: 'Aztec Warrior Training',
          description: 'Ancient Power Training'
        },
        size: { x: 96, y: 64 }
      },
      {
        id: 'mexico-wisdom-center',
        position: { x: 24 * 32, y: 4 * 32 },
        type: 'wisdom_center',
        data: { 
          name: 'Casa de la Cultura',
          description: 'Aztec Dance Heritage'
        },
        size: { x: 96, y: 64 }
      }
    ]
  },
  'egypt-cairo': {
    id: 'egypt-cairo',
    name: 'Cairo - Ancient & Modern',
    width: 32,
    height: 28,
    tileSize: 32,
    tileSet: {
      ground: createCityTileMap('egypt-cairo', 32, 28),
      buildings: [],
      details: []
    },
    collisionMap: generateCollisionFromTiles(createCityTileMap('egypt-cairo', 32, 28)),
    spawnPoint: { x: 64, y: 64 },
    districts: [
      {
        id: 'ancient-quarters',
        name: 'Ancient Quarters',
        bounds: { x: 2, y: 2, width: 14, height: 12 },
        theme: 'pharaonic-mystical'
      },
      {
        id: 'modern-downtown',
        name: 'Modern Downtown',
        bounds: { x: 18, y: 6, width: 12, height: 16 },
        theme: 'modern-cairo'
      },
      {
        id: 'nile-riverside',
        name: 'Nile Riverside',
        bounds: { x: 6, y: 16, width: 20, height: 10 },
        theme: 'riverside-ancient'
      }
    ],
    atmosphere: {
      timeOfDay: 'evening',
      weather: 'clear',
      ambientColor: '#DAA520'
    },
    interactables: [
      {
        id: 'cairo-dance-temple',
        position: { x: 24 * 32, y: 12 * 32 },
        type: 'dance_studio',
        data: { 
          name: 'Cairo Dance Temple',
          styles: ['TRICKS', 'TECHNICAL'],
          trainers: ['pharaoh-amara']
        },
        size: { x: 128, y: 96 }
      },
      {
        id: 'nile-records',
        position: { x: 16 * 32, y: 20 * 32 },
        type: 'record_shop',
        data: { 
          name: 'Nile Sound Bazaar',
          inventory: ['pharaoh-beats', 'cairo-underground']
        },
        size: { x: 64, y: 64 }
      },
      {
        id: 'pharaoh-of-flow-amara-battle',
        position: { x: 28 * 32, y: 24 * 32 },
        type: 'battle_trigger',
        data: { 
          bossId: 'pharaoh-of-flow-amara',
          location: 'Great Sphinx Plaza',
          unlockRequirement: 5
        },
        size: { x: 64, y: 64 }
      },
      // NPCs
      {
        id: 'pharaoh-mystic',
        position: { x: 12 * 32, y: 6 * 32 },
        type: 'npc',
        data: { 
          npcId: 'pharaoh-mystic',
          name: 'Hassan "Desert Storm"'
        },
        size: { x: 32, y: 32 }
      },
      {
        id: 'nile-philosopher',
        position: { x: 20 * 32, y: 22 * 32 },
        type: 'npc',
        data: { 
          npcId: 'nile-philosopher',
          name: 'Amira "Nile Wisdom"'
        },
        size: { x: 32, y: 32 }
      },
      {
        id: 'cairo-training-center',
        position: { x: 4 * 32, y: 18 * 32 },
        type: 'training_center',
        data: { 
          name: 'Pharaoh Training Chambers',
          description: 'Ancient Power Awakening'
        },
        size: { x: 96, y: 64 }
      },
      {
        id: 'cairo-wisdom-center',
        position: { x: 26 * 32, y: 8 * 32 },
        type: 'wisdom_center',
        data: { 
          name: 'Library of Alexandria',
          description: 'Ancient Dance Scrolls'
        },
        size: { x: 96, y: 64 }
      }
    ]
  },
  'canada-toronto': {
    id: 'canada-toronto',
    name: 'Toronto - Downtown & Waterfront',
    width: 28,
    height: 22,
    tileSize: 32,
    tileSet: {
      ground: createCityTileMap('canada-toronto', 28, 22),
      buildings: [],
      details: []
    },
    collisionMap: generateCollisionFromTiles(createCityTileMap('canada-toronto', 28, 22)),
    spawnPoint: { x: 64, y: 64 },
    districts: [
      {
        id: 'downtown-core',
        name: 'Downtown Core',
        bounds: { x: 8, y: 2, width: 12, height: 10 },
        theme: 'clean-urban'
      },
      {
        id: 'waterfront',
        name: 'Waterfront',
        bounds: { x: 2, y: 14, width: 24, height: 6 },
        theme: 'lakeside-modern'
      },
      {
        id: 'underground-path',
        name: 'Underground PATH',
        bounds: { x: 6, y: 8, width: 16, height: 4 },
        theme: 'winter-underground'
      }
    ],
    atmosphere: {
      timeOfDay: 'evening',
      weather: 'fog',
      ambientColor: '#E6E6FA'
    },
    interactables: [
      {
        id: 'toronto-dance-center',
        position: { x: 18 * 32, y: 16 * 32 },
        type: 'dance_studio',
        data: { 
          name: 'Toronto Movement Center',
          styles: ['RUGGED', 'FAST'],
          trainers: ['master-zoe']
        },
        size: { x: 96, y: 64 }
      },
      {
        id: 'queen-street-records',
        position: { x: 10 * 32, y: 4 * 32 },
        type: 'record_shop',
        data: { 
          name: 'Queen Street Records',
          inventory: ['arctic-beats', 'toronto-underground']
        },
        size: { x: 64, y: 64 }
      },
      {
        id: 'arctic-storm-zoe-battle',
        position: { x: 24 * 32, y: 18 * 32 },
        type: 'battle_trigger',
        data: { 
          bossId: 'arctic-storm-zoe',
          location: 'Frozen Harbourfront',
          unlockRequirement: 4
        },
        size: { x: 64, y: 64 }
      },
      // NPCs
      {
        id: 'cn-tower-dancer',
        position: { x: 16 * 32, y: 8 * 32 },
        type: 'npc',
        data: { 
          npcId: 'cn-tower-dancer',
          name: 'Alex "Maple Leaf"'
        },
        size: { x: 32, y: 32 }
      },
      {
        id: 'multicultural-mentor',
        position: { x: 12 * 32, y: 18 * 32 },
        type: 'npc',
        data: { 
          npcId: 'multicultural-mentor',
          name: 'Preet "Unity"'
        },
        size: { x: 32, y: 32 }
      },
      {
        id: 'toronto-training-center',
        position: { x: 4 * 32, y: 16 * 32 },
        type: 'training_center',
        data: { 
          name: 'Arctic Training Facility',
          description: 'Cold Weather Conditioning'
        },
        size: { x: 96, y: 64 }
      },
      {
        id: 'toronto-wisdom-center',
        position: { x: 22 * 32, y: 4 * 32 },
        type: 'wisdom_center',
        data: { 
          name: 'Multicultural Heritage Center',
          description: 'Global Dance Fusion'
        },
        size: { x: 96, y: 64 }
      }
    ]
  },
  'italy-rome': {
    id: 'italy-rome',
    name: 'Rome - Historic & Trastevere',
    width: 30,
    height: 24,
    tileSize: 32,
    tileSet: {
      ground: createCityTileMap('italy-rome', 30, 24),
      buildings: [],
      details: []
    },
    collisionMap: generateCollisionFromTiles(createCityTileMap('italy-rome', 30, 24)),
    spawnPoint: { x: 64, y: 64 },
    districts: [
      {
        id: 'historic-center',
        name: 'Historic Center',
        bounds: { x: 8, y: 2, width: 14, height: 10 },
        theme: 'renaissance-classical'
      },
      {
        id: 'trastevere',
        name: 'Trastevere',
        bounds: { x: 2, y: 14, width: 12, height: 8 },
        theme: 'bohemian-artistic'
      },
      {
        id: 'modern-suburbs',
        name: 'Modern Suburbs',
        bounds: { x: 16, y: 14, width: 12, height: 8 },
        theme: 'contemporary-urban'
      }
    ],
    atmosphere: {
      timeOfDay: 'evening',
      weather: 'clear',
      ambientColor: '#DEB887'
    },
    interactables: [
      {
        id: 'trastevere-studio',
        position: { x: 8 * 32, y: 18 * 32 },
        type: 'dance_studio',
        data: { 
          name: 'Trastevere Arte Studio',
          styles: ['FLASHY', 'TRICKS'],
          trainers: ['maestro-marco']
        },
        size: { x: 128, y: 96 }
      },
      {
        id: 'vatican-records',
        position: { x: 22 * 32, y: 18 * 32 },
        type: 'record_shop',
        data: { 
          name: 'Vatican Sound Records',
          inventory: ['renaissance-beats', 'roma-underground']
        },
        size: { x: 64, y: 64 }
      },
      {
        id: 'renaissance-rebel-marco-battle',
        position: { x: 26 * 32, y: 20 * 32 },
        type: 'battle_trigger',
        data: { 
          bossId: 'renaissance-rebel-marco',
          location: 'Pantheon Plaza',
          unlockRequirement: 5
        },
        size: { x: 64, y: 64 }
      },
      // NPCs
      {
        id: 'renaissance-artist',
        position: { x: 12 * 32, y: 8 * 32 },
        type: 'npc',
        data: { 
          npcId: 'renaissance-artist',
          name: 'Lorenzo "Il Maestro"'
        },
        size: { x: 32, y: 32 }
      },
      {
        id: 'trastevere-local',
        position: { x: 6 * 32, y: 16 * 32 },
        type: 'npc',
        data: { 
          npcId: 'trastevere-local',
          name: 'Francesca "Bella Danza"'
        },
        size: { x: 32, y: 32 }
      },
      {
        id: 'rome-training-center',
        position: { x: 4 * 32, y: 18 * 32 },
        type: 'training_center',
        data: { 
          name: 'Gladiator Training Ground',
          description: 'Ancient Warrior Training'
        },
        size: { x: 96, y: 64 }
      },
      {
        id: 'rome-wisdom-center',
        position: { x: 24 * 32, y: 4 * 32 },
        type: 'wisdom_center',
        data: { 
          name: 'Renaissance Art Academy',
          description: 'Classical Movement Arts'
        },
        size: { x: 96, y: 64 }
      }
    ]
  },
  'south-africa-capetown': {
    id: 'south-africa-capetown',
    name: 'Cape Town - Township & City Bowl',
    width: 32,
    height: 26,
    tileSize: 32,
    tileSet: {
      ground: createCityTileMap('south-africa-capetown', 32, 26),
      buildings: [],
      details: []
    },
    collisionMap: generateCollisionFromTiles(createCityTileMap('south-africa-capetown', 32, 26)),
    spawnPoint: { x: 64, y: 64 },
    districts: [
      {
        id: 'township-areas',
        name: 'Township Areas',
        bounds: { x: 2, y: 2, width: 14, height: 12 },
        theme: 'vibrant-community'
      },
      {
        id: 'city-bowl',
        name: 'City Bowl',
        bounds: { x: 18, y: 6, width: 12, height: 10 },
        theme: 'urban-mountain'
      },
      {
        id: 'waterfront',
        name: 'V&A Waterfront',
        bounds: { x: 6, y: 16, width: 20, height: 8 },
        theme: 'harbor-tourism'
      }
    ],
    atmosphere: {
      timeOfDay: 'day',
      weather: 'clear',
      ambientColor: '#FF4500'
    },
    interactables: [
      {
        id: 'cape-town-dance-academy',
        position: { x: 24 * 32, y: 12 * 32 },
        type: 'dance_studio',
        data: { 
          name: 'Cape Town Dance Academy',
          styles: ['GULLY', 'JERKY'],
          trainers: ['mama-nomsa']
        },
        size: { x: 128, y: 96 }
      },
      {
        id: 'waterfront-records',
        position: { x: 16 * 32, y: 20 * 32 },
        type: 'record_shop',
        data: { 
          name: 'African Rhythm Records',
          inventory: ['township-beats', 'cape-jazz-krump']
        },
        size: { x: 64, y: 64 }
      },
      {
        id: 'township-thunder-nomsa-battle',
        position: { x: 28 * 32, y: 22 * 32 },
        type: 'battle_trigger',
        data: { 
          bossId: 'township-thunder-nomsa',
          location: 'Table Mountain Base',
          unlockRequirement: 4
        },
        size: { x: 64, y: 64 }
      },
      // NPCs
      {
        id: 'township-elder',
        position: { x: 10 * 32, y: 6 * 32 },
        type: 'npc',
        data: { 
          npcId: 'township-elder',
          name: 'Mandla "Ubuntu Spirit"'
        },
        size: { x: 32, y: 32 }
      },
      {
        id: 'waterfront-guide',
        position: { x: 18 * 32, y: 18 * 32 },
        type: 'npc',
        data: { 
          npcId: 'waterfront-guide',
          name: 'Zara "Mountain Dance"'
        },
        size: { x: 32, y: 32 }
      },
      {
        id: 'capetown-training-center',
        position: { x: 4 * 32, y: 18 * 32 },
        type: 'training_center',
        data: { 
          name: 'Ubuntu Training Ground',
          description: 'Community Spirit Training'
        },
        size: { x: 96, y: 64 }
      },
      {
        id: 'capetown-wisdom-center',
        position: { x: 26 * 32, y: 8 * 32 },
        type: 'wisdom_center',
        data: { 
          name: 'African Heritage Center',
          description: 'Ancestral Dance Wisdom'
        },
        size: { x: 96, y: 64 }
      }
    ]
  }
};