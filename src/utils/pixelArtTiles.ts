// Pixel Art Tile System for City-Focused Overworld Maps
export interface TileData {
  id: number;
  name: string;
  color: string;
  collision: boolean;
  animated?: boolean;
  frames?: string[];
}

// Define tile IDs and their properties
export const TILE_DEFINITIONS: Record<number, TileData> = {
  // Ground tiles (0-99)
  0: { id: 0, name: 'void', color: '#000000', collision: false },
  1: { id: 1, name: 'street_asphalt', color: '#2D2D2D', collision: false },
  2: { id: 2, name: 'sidewalk', color: '#4A4A4A', collision: false },
  3: { id: 3, name: 'crosswalk', color: '#FFFFFF', collision: false },
  4: { id: 4, name: 'grass', color: '#2D5A2D', collision: false },
  5: { id: 5, name: 'concrete', color: '#6B6B6B', collision: false },
  6: { id: 6, name: 'dirt', color: '#8B4513', collision: false },
  7: { id: 7, name: 'water', color: '#4682B4', collision: true, animated: true },
  8: { id: 8, name: 'plaza_tiles', color: '#D2B48C', collision: false },
  9: { id: 9, name: 'basketball_court', color: '#8B4513', collision: false },

  // Building/Structure tiles (100-199)
  100: { id: 100, name: 'building_wall', color: '#696969', collision: true },
  101: { id: 101, name: 'building_window', color: '#87CEEB', collision: true },
  102: { id: 102, name: 'building_door', color: '#8B4513', collision: false },
  103: { id: 103, name: 'building_roof', color: '#A0522D', collision: true },
  104: { id: 104, name: 'fence', color: '#654321', collision: true },
  105: { id: 105, name: 'car', color: '#FF6347', collision: true },
  106: { id: 106, name: 'streetlight', color: '#FFD700', collision: true },
  107: { id: 107, name: 'trash_can', color: '#2F4F4F', collision: true },
  108: { id: 108, name: 'bench', color: '#8B4513', collision: true },
  109: { id: 109, name: 'tree', color: '#228B22', collision: true },

  // Special/Interactive tiles (200-299)
  200: { id: 200, name: 'dance_studio_entrance', color: '#FF69B4', collision: false },
  201: { id: 201, name: 'cypher_circle', color: '#FFD700', collision: false },
  202: { id: 202, name: 'record_shop', color: '#9932CC', collision: false },
  203: { id: 203, name: 'club_entrance', color: '#FF1493', collision: false },
  204: { id: 204, name: 'training_area', color: '#32CD32', collision: false },
  205: { id: 205, name: 'graffiti_wall', color: '#FF4500', collision: true },
  206: { id: 206, name: 'stage_platform', color: '#FFD700', collision: false },
  207: { id: 207, name: 'speaker_stack', color: '#2F4F4F', collision: true },
  208: { id: 208, name: 'neon_sign', color: '#00FFFF', collision: true, animated: true },
  209: { id: 209, name: 'metro_entrance', color: '#4169E1', collision: false },
};

// City-specific tile patterns
export const CITY_TILE_PATTERNS = {
  'usa-la': {
    mainStreetTiles: [1, 2, 3], // asphalt, sidewalk, crosswalk
    buildingTiles: [100, 101, 102], // wall, window, door
    specialTiles: [200, 201, 204], // dance studio, cypher, training
    atmosphereTiles: [106, 109], // streetlight, palm trees
  },
  'japan-tokyo': {
    mainStreetTiles: [1, 2, 8], // asphalt, sidewalk, plaza tiles
    buildingTiles: [100, 101, 208], // wall, window, neon signs
    specialTiles: [202, 203, 209], // record shop, club, metro
    atmosphereTiles: [106, 105], // streetlight, cars
  },
  'france-paris': {
    mainStreetTiles: [5, 2, 8], // concrete, sidewalk, plaza
    buildingTiles: [100, 101, 102, 103], // classic buildings
    specialTiles: [200, 205, 206], // dance studio, graffiti, stage
    atmosphereTiles: [108, 109], // benches, trees
  },
  'germany-berlin': {
    mainStreetTiles: [1, 2, 6], // asphalt, sidewalk, dirt
    buildingTiles: [100, 205, 102], // wall, graffiti, door
    specialTiles: [203, 204, 207], // club, training, speakers
    atmosphereTiles: [107, 104], // trash cans, fence
  },
};

// Generate collision map from tile data
export const generateCollisionFromTiles = (tileMap: number[][]): number[][] => {
  return tileMap.map(row => 
    row.map(tileId => TILE_DEFINITIONS[tileId]?.collision ? 1 : 0)
  );
};

// Generate tile-based map layouts
export const createCityTileMap = (cityId: string, width: number, height: number): number[][] => {
  const patterns = CITY_TILE_PATTERNS[cityId] || CITY_TILE_PATTERNS['usa-la'];
  const map: number[][] = [];

  for (let y = 0; y < height; y++) {
    map[y] = [];
    for (let x = 0; x < width; x++) {
      // Border walls
      if (x === 0 || x === width - 1 || y === 0 || y === height - 1) {
        map[y][x] = 100; // building wall
      }
      // Create street grid pattern
      else if (y % 6 === 3 || x % 8 === 4) {
        map[y][x] = patterns.mainStreetTiles[0]; // main street
      }
      // Sidewalks next to streets
      else if ((y % 6 === 2 || y % 6 === 4) || (x % 8 === 3 || x % 8 === 5)) {
        map[y][x] = patterns.mainStreetTiles[1]; // sidewalk
      }
      // Building blocks
      else if ((x % 8 < 3 || x % 8 > 5) && (y % 6 < 2 || y % 6 > 4)) {
        if (Math.random() > 0.3) {
          map[y][x] = patterns.buildingTiles[0]; // building wall
        } else {
          map[y][x] = patterns.buildingTiles[1]; // building window
        }
      }
      // Plaza/open areas
      else {
        map[y][x] = patterns.mainStreetTiles[2] || 2; // plaza/crosswalk
      }
    }
  }

  // Add special locations and interactive elements
  addSpecialLocations(map, patterns, width, height);
  return map;
};

const addSpecialLocations = (map: number[][], patterns: any, width: number, height: number) => {
  // Add dance studios
  const studioCount = Math.floor(Math.random() * 3) + 2;
  for (let i = 0; i < studioCount; i++) {
    const x = Math.floor(Math.random() * (width - 4)) + 2;
    const y = Math.floor(Math.random() * (height - 4)) + 2;
    if (map[y][x] === patterns.mainStreetTiles[1]) {
      map[y][x] = patterns.specialTiles[0]; // dance studio
    }
  }

  // Add cypher circles in open areas
  const cypherCount = Math.floor(Math.random() * 2) + 1;
  for (let i = 0; i < cypherCount; i++) {
    const x = Math.floor(Math.random() * (width - 6)) + 3;
    const y = Math.floor(Math.random() * (height - 6)) + 3;
    if (map[y][x] === patterns.mainStreetTiles[2]) {
      map[y][x] = patterns.specialTiles[1]; // cypher circle
    }
  }

  // Add atmosphere elements
  for (let i = 0; i < 10; i++) {
    const x = Math.floor(Math.random() * width);
    const y = Math.floor(Math.random() * height);
    if (map[y][x] === patterns.mainStreetTiles[1] && Math.random() > 0.7) {
      map[y][x] = patterns.atmosphereTiles[Math.floor(Math.random() * patterns.atmosphereTiles.length)];
    }
  }
};

export const renderPixelArtTile = (
  ctx: CanvasRenderingContext2D,
  tileId: number,
  x: number,
  y: number,
  tileSize: number
) => {
  const tile = TILE_DEFINITIONS[tileId];
  if (!tile) return;

  ctx.fillStyle = tile.color;
  ctx.fillRect(x, y, tileSize, tileSize);

  // Add texture/details for specific tiles
  switch (tileId) {
    case 1: // street asphalt
      ctx.fillStyle = '#1A1A1A';
      ctx.fillRect(x + 2, y + 2, tileSize - 4, 2);
      break;
    case 3: // crosswalk
      ctx.fillStyle = '#FFFFFF';
      for (let i = 0; i < 4; i++) {
        ctx.fillRect(x + i * 8, y, 4, tileSize);
      }
      break;
    case 101: // building window
      ctx.fillStyle = '#FFFF88';
      ctx.fillRect(x + 4, y + 4, tileSize - 8, tileSize - 8);
      break;
    case 201: // cypher circle
      ctx.strokeStyle = '#FFD700';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(x + tileSize/2, y + tileSize/2, tileSize/3, 0, 2 * Math.PI);
      ctx.stroke();
      break;
  }
};