import { Equipment, EquipmentType } from '@/types/game';

export const equipmentData: Equipment[] = [
  // Shoes
  {
    id: 'timberland_boots',
    name: 'Timberland Boots',
    type: 'shoes' as EquipmentType,
    brand: 'Timberland',
    statBoosts: { strength: 3 },
    unlocked: true,
  },
  {
    id: 'nike_air_force',
    name: 'Nike Air Force 1',
    type: 'shoes' as EquipmentType,
    brand: 'Nike',
    statBoosts: { speed: 3 },
    unlocked: true,
  },
  {
    id: 'adidas_originals',
    name: 'Adidas Originals',
    type: 'shoes' as EquipmentType,
    brand: 'Adidas',
    statBoosts: { stamina: 5 },
    unlocked: true,
  },

  // Snapbacks
  {
    id: 'new_era_cap',
    name: 'New Era Snapback',
    type: 'hat' as EquipmentType,
    brand: 'New Era',
    statBoosts: { charisma: 4 },
    unlocked: true,
  },
  {
    id: 'mitchell_ness_cap',
    name: 'Mitchell & Ness Classic',
    type: 'hat' as EquipmentType,
    brand: 'Mitchell & Ness',
    statBoosts: { technique: 3 },
    unlocked: true,
  },
  {
    id: 'fitted_cap',
    name: 'Fitted Classic Cap',
    type: 'hat' as EquipmentType,
    brand: 'Fitted',
    statBoosts: { defense: 2 },
    unlocked: true,
  },

  // Baseball Jackets
  {
    id: 'supreme_jacket',
    name: 'Supreme Baseball Jacket',
    type: 'jacket' as EquipmentType,
    brand: 'Supreme',
    statBoosts: { charisma: 3 },
    unlocked: true,
  },
  {
    id: 'nike_jacket',
    name: 'Nike Varsity Jacket',
    type: 'jacket' as EquipmentType,
    brand: 'Nike',
    statBoosts: { speed: 2 },
    unlocked: true,
  },
  {
    id: 'adidas_jacket',
    name: 'Adidas Track Jacket',
    type: 'jacket' as EquipmentType,
    brand: 'Adidas',
    statBoosts: { stamina: 3 },
    unlocked: true,
  },

  // Black Jeans
  {
    id: 'levis_jeans',
    name: "Levi's 511 Black Jeans",
    type: 'pants' as EquipmentType,
    brand: "Levi's",
    statBoosts: { defense: 3 },
    unlocked: true,
  },
  {
    id: 'true_religion_jeans',
    name: 'True Religion Black Jeans',
    type: 'pants' as EquipmentType,
    brand: 'True Religion',
    statBoosts: { charisma: 2 },
    unlocked: true,
  },
  {
    id: 'gstar_jeans',
    name: 'G-Star RAW Black Jeans',
    type: 'pants' as EquipmentType,
    brand: 'G-Star',
    statBoosts: { technique: 2 },
    unlocked: true,
  },
];

export const getEquipmentByType = (type: EquipmentType): Equipment[] => {
  return equipmentData.filter(item => item.type === type);
};

export const getEquipmentById = (id: string): Equipment | undefined => {
  return equipmentData.find(item => item.id === id);
};