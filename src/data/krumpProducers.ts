export interface KrumpProducer {
  id: string;
  name: string;
  style: string;
  description: string;
  notableTracks?: string[];
  region?: string;
  country: string;
  countryFlag: string;
}

export const krumpProducers: KrumpProducer[] = [
  // France
  {
    id: 'big-rulez',
    name: 'Big Rulez',
    style: 'Hard-hitting',
    description: 'Pioneer of aggressive Krump beats with signature heavy bass lines from the French underground scene.',
    notableTracks: ['Street Thunder', 'Raw Power', 'Parisian Nights'],
    region: 'Paris',
    country: 'France',
    countryFlag: '🇫🇷'
  },
  {
    id: 'morf',
    name: 'Morf',
    style: 'Experimental',
    description: 'French innovator known for genre-bending Krump production and avant-garde sound design.',
    notableTracks: ['Morpheus Dreams', 'Reality Shift', 'French Revolution'],
    region: 'Lyon',
    country: 'France',
    countryFlag: '🇫🇷'
  },
  {
    id: 'tha-noizz',
    name: 'Tha Noizz',
    style: 'Industrial',
    description: 'Master of chaotic soundscapes bringing French industrial influence to Krump.',
    notableTracks: ['Noise Machine', 'Static Storm', 'Parisian Underground'],
    region: 'Marseille',
    country: 'France',
    countryFlag: '🇫🇷'
  },
  {
    id: 'sniper',
    name: 'Sniper',
    style: 'Precision',
    description: 'Known for precise, surgical beats that hit exactly where they need to in the French scene.',
    notableTracks: ['Headshot', 'Target Practice', 'Precision Strike'],
    region: 'Nice',
    country: 'France',
    countryFlag: '🇫🇷'
  },
  {
    id: 'flipside',
    name: 'Flipside',
    style: 'Versatile',
    description: 'Shows both sides of French Krump with versatile production styles.',
    notableTracks: ['Two Faced', 'Double Take', 'French Duality'],
    region: 'Bordeaux',
    country: 'France',
    countryFlag: '🇫🇷'
  },
  {
    id: 'no-script',
    name: 'No Script',
    style: 'Freestyle',
    description: 'French improvisation master with no predetermined structure or script.',
    notableTracks: ['Off Script', 'Improv Master', 'French Flow'],
    region: 'Toulouse',
    country: 'France',
    countryFlag: '🇫🇷'
  },

  // Germany
  {
    id: 'mindlezz',
    name: 'Mindlezz',
    style: 'Psychedelic',
    description: 'German producer creating mind-bending beats that push Krump boundaries.',
    notableTracks: ['Mental Warfare', 'Consciousness', 'Berlin Madness'],
    region: 'Berlin',
    country: 'Germany',
    countryFlag: '🇩🇪'
  },
  {
    id: 'gullytraxx',
    name: 'GullyTraxx',
    style: 'Underground',
    description: 'German underground specialist keeping it real with street-level production.',
    notableTracks: ['Underground King', 'Gully Anthem', 'German Streets'],
    region: 'Hamburg',
    country: 'Germany',
    countryFlag: '🇩🇪'
  },
  {
    id: 'hype-stereo',
    name: 'Hype Stereo',
    style: 'Energetic',
    description: 'High-energy German producer with infectious stereo sound that ignites crowds.',
    notableTracks: ['Hype Train', 'Stereo Blast', 'German Energy'],
    region: 'Munich',
    country: 'Germany',
    countryFlag: '🇩🇪'
  },

  // USA
  {
    id: 'roxxdamus',
    name: 'Roxxdamus',
    style: 'Rock-fusion',
    description: 'American pioneer blending rock elements with Krump for unique aggressive sound.',
    notableTracks: ['Rock the Block', 'Stone Cold Beat', 'American Anthem'],
    region: 'Los Angeles',
    country: 'USA',
    countryFlag: '🇺🇸'
  },
  {
    id: 'realraw',
    name: 'RealRaw',
    style: 'Authentic',
    description: 'Keeps it 100% real with raw, unfiltered American Krump production.',
    notableTracks: ['Keep It Real', 'Raw Energy', 'West Coast Truth'],
    region: 'Compton',
    country: 'USA',
    countryFlag: '🇺🇸'
  },
  {
    id: 'profac',
    name: 'ProfaC',
    style: 'Academic',
    description: 'American scholar bringing complex musical theory to street beats.',
    notableTracks: ['The Lesson', 'Professor Beats', 'Education'],
    region: 'Oakland',
    country: 'USA',
    countryFlag: '🇺🇸'
  },
  {
    id: '20-killz',
    name: '20 Killz',
    style: 'Lethal',
    description: 'Deadly American beats that eliminate competition every time.',
    notableTracks: ['Murder Scene', 'Death Blow', 'Killshot'],
    region: 'Detroit',
    country: 'USA',
    countryFlag: '🇺🇸'
  },
  {
    id: '10xgully',
    name: '10xGully',
    style: 'Street',
    description: 'Ten times more gully than the rest, straight from American streets.',
    notableTracks: ['Street Code', 'Gully Life', 'Brooklyn Vibe'],
    region: 'Brooklyn',
    country: 'USA',
    countryFlag: '🇺🇸'
  },
  {
    id: 'steako',
    name: 'Steako',
    style: 'Beef',
    description: 'American producer bringing confrontational beef with aggressive Krump beats.',
    notableTracks: ['Beef Mode', 'Steak Sauce', 'Texas Heat'],
    region: 'Houston',
    country: 'USA',
    countryFlag: '🇺🇸'
  },
  {
    id: 'konkrete',
    name: 'Konkrete',
    style: 'Hard',
    description: 'Concrete-hard American beats that never crack under pressure.',
    notableTracks: ['Concrete Jungle', 'Unbreakable', 'Steel City'],
    region: 'Chicago',
    country: 'USA',
    countryFlag: '🇺🇸'
  },
  {
    id: 'tight-eyex',
    name: 'Tight Eyex',
    style: 'Focused',
    description: 'Laser-focused American production with tight, precise arrangements.',
    notableTracks: ['Eagle Eye', 'Focus Mode', 'Sharp Vision'],
    region: 'Atlanta',
    country: 'USA',
    countryFlag: '🇺🇸'
  },
  {
    id: 'gutta',
    name: 'Gutta',
    style: 'Raw',
    description: 'Straight from the American gutter with unpolished, raw energy.',
    notableTracks: ['Gutter Ball', 'Street Life', 'Hood Stories'],
    region: 'Philadelphia',
    country: 'USA',
    countryFlag: '🇺🇸'
  },
  {
    id: 'lil-galvatron',
    name: 'Lil Galvatron',
    style: 'Robotic',
    description: 'Futuristic American producer with robot-inspired beats and mechanical precision.',
    notableTracks: ['Transformer', 'Robot Rock', 'Future Sound'],
    region: 'Miami',
    country: 'USA',
    countryFlag: '🇺🇸'
  },
  {
    id: 'tha-j-squad',
    name: 'Tha J-Squad',
    style: 'Collective',
    description: 'American collective bringing multiple perspectives to Krump production.',
    notableTracks: ['Squad Up', 'Team Work', 'Unity Sound'],
    region: 'New York',
    country: 'USA',
    countryFlag: '🇺🇸'
  },
  {
    id: '300',
    name: '300',
    style: 'Warrior',
    description: 'American Spartan-inspired beats for warriors ready for battle.',
    notableTracks: ['Sparta', 'This Is War', 'Warrior Spirit'],
    region: 'Las Vegas',
    country: 'USA',
    countryFlag: '🇺🇸'
  },
  {
    id: 'ill-boy',
    name: 'Ill Boy',
    style: 'Sick',
    description: 'American producer with ill beats that make listeners feel the rhythm sickness.',
    notableTracks: ['Sick Beat', 'Ill Intent', 'Fever Dream'],
    region: 'Phoenix',
    country: 'USA',
    countryFlag: '🇺🇸'
  },
  {
    id: 'dracula',
    name: 'Dracula',
    style: 'Gothic',
    description: 'Dark American producer with vampiric beats that drain opponents\' life.',
    notableTracks: ['Blood Moon', 'Vampire\'s Dance', 'Night Stalker'],
    region: 'New Orleans',
    country: 'USA',
    countryFlag: '🇺🇸'
  },

  // Ukraine
  {
    id: 'playa',
    name: 'Playa',
    style: 'Smooth',
    description: 'Ukrainian master bringing a smoother, more melodic approach to Krump beats.',
    notableTracks: ['Player\'s Paradise', 'Smooth Criminal', 'Kiev Nights'],
    region: 'Kiev',
    country: 'Ukraine',
    countryFlag: '🇺🇦'
  },

  // South Africa
  {
    id: 'bteck',
    name: 'BTeck',
    style: 'Technical',
    description: 'South African technical wizard creating complex, layered Krump compositions.',
    notableTracks: ['Algorithm', 'Digital Warfare', 'Cape Town Tech'],
    region: 'Cape Town',
    country: 'South Africa',
    countryFlag: '🇿🇦'
  },

  // Chile
  {
    id: 'koba',
    name: 'Koba',
    style: 'Traditional',
    description: 'Chilean producer preserving classic Krump sound while adding South American touches.',
    notableTracks: ['Old School', 'Tradition', 'Santiago Sound'],
    region: 'Santiago',
    country: 'Chile',
    countryFlag: '🇨🇱'
  },

  // UK
  {
    id: 'braze',
    name: 'Braze',
    style: 'Bold',
    description: 'British producer with bold and brash beats that demand attention and respect.',
    notableTracks: ['Brass Knuckles', 'Bold Move', 'London Calling'],
    region: 'London',
    country: 'UK',
    countryFlag: '🇬🇧'
  },

  // Russia
  {
    id: 'ugly-fate',
    name: 'Ugly Fate',
    style: 'Dark',
    description: 'Russian producer exploring dark, twisted beats and the ugly side of fate.',
    notableTracks: ['Ugly Truth', 'Twisted Fate', 'Moscow Shadows'],
    region: 'Moscow',
    country: 'Russia',
    countryFlag: '🇷🇺'
  },

  // Italy
  {
    id: 'trust',
    name: 'Trust',
    style: 'Reliable',
    description: 'Italian producer creating trustworthy beats you can always count on.',
    notableTracks: ['Trust Fall', 'Reliable', 'Roman Empire'],
    region: 'Rome',
    country: 'Italy',
    countryFlag: '🇮🇹'
  }
];

export const getProducersByCountry = (country: string) => {
  return krumpProducers.filter(producer => producer.country === country);
};

export const getAllCountries = () => {
  return [...new Set(krumpProducers.map(producer => producer.country))].sort();
};