import laStreetBg from '@/features/battle/assets/backgrounds/usa-la-street.png';
import tokyoStreetBg from '@/features/battle/assets/backgrounds/japan-tokyo-street.png';
import seoulStreetBg from '@/features/battle/assets/backgrounds/korea-seoul-street.png';
import parisStreetBg from '@/features/battle/assets/backgrounds/france-paris-street.png';
import berlinStreetBg from '@/features/battle/assets/backgrounds/germany-berlin-street.png';
import rioStreetBg from '@/features/battle/assets/backgrounds/brazil-rio-street.png';
import londonStreetBg from '@/features/battle/assets/backgrounds/uk-london-street.png';
import moscowStreetBg from '@/features/battle/assets/backgrounds/russia-moscow-street.png';
import mumbaiStreetBg from '@/features/battle/assets/backgrounds/india-mumbai-street.png';
import sydneyStreetBg from '@/features/battle/assets/backgrounds/australia-sydney-street.png';
import mexicoCityStreetBg from '@/features/battle/assets/backgrounds/mexico-mexicocity-street.png';
import cairoStreetBg from '@/features/battle/assets/backgrounds/egypt-cairo-street.png';
import torontoStreetBg from '@/features/battle/assets/backgrounds/canada-toronto-street.png';
import romeStreetBg from '@/features/battle/assets/backgrounds/italy-rome-street.png';
import capeTownStreetBg from '@/features/battle/assets/backgrounds/south-africa-capetown-street.png';

/**
 * Maps location IDs to their corresponding battle background images
 */
const battleBackgrounds: Record<string, string> = {
  'usa-la': laStreetBg,
  'japan-tokyo': tokyoStreetBg,
  'korea-seoul': seoulStreetBg,
  'france-paris': parisStreetBg,
  'germany-berlin': berlinStreetBg,
  'brazil-rio': rioStreetBg,
  'uk-london': londonStreetBg,
  'russia-moscow': moscowStreetBg,
  'india-mumbai': mumbaiStreetBg,
  'australia-sydney': sydneyStreetBg,
  'mexico-mexicocity': mexicoCityStreetBg,
  'egypt-cairo': cairoStreetBg,
  'canada-toronto': torontoStreetBg,
  'italy-rome': romeStreetBg,
  'south-africa-capetown': capeTownStreetBg,
};

/**
 * Get the battle background image for a specific location
 * @param locationId - The ID of the location
 * @returns The battle background image path
 */
export const getBattleBackground = (locationId: string): string => {
  return battleBackgrounds[locationId] || laStreetBg; // fallback to LA
};

/**
 * Get all available battle backgrounds
 * @returns Record of all location battle backgrounds
 */
export const getAllBattleBackgrounds = (): Record<string, string> => {
  return battleBackgrounds;
};