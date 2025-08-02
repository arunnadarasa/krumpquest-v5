// Helper functions for interaction text and handling
export const getInteractionText = (type: string): string => {
  switch (type) {
    case 'dance_studio':
      return 'ENTER';
    case 'cypher':
      return 'JOIN';
    case 'record_shop':
      return 'BROWSE';
    case 'club':
      return 'ENTER';
    case 'training_spot':
      return 'TRAIN';
    case 'battle_trigger':
      return 'BATTLE';
    case 'npc':
      return 'TALK';
    case 'training_center':
      return 'TRAIN';
    case 'wisdom_center':
      return 'LEARN';
    default:
      return 'INTERACT';
  }
};