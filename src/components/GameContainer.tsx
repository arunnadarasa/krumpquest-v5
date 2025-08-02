import React from 'react';
import { useAppSelector } from '@/hooks/useAppSelector';
import { AudioProvider } from './AudioProvider';
import GameLanding from './GameLanding';
import CharacterCreation from './CharacterCreation';
import WorldMap from './WorldMap';
import TrainingCenter from './TrainingCenter';
import BattleArena from './BattleArena';
import EquipmentSelection from './EquipmentSelection';
import KrumpWisdom from './KrumpWisdom';
import AnimeOverworldExploration from './AnimeOverworldExploration';
import RecordShop from './RecordShop';

export default function GameContainer() {
  const currentPhase = useAppSelector(state => state.game.currentPhase);

  const renderCurrentPhase = () => {
    switch (currentPhase) {
      case 'menu':
        return <GameLanding />;
      case 'character_creation':
        return <CharacterCreation />;
      case 'world_map':
        return <WorldMap />;
      case 'training':
        return <TrainingCenter />;
      case 'equipment':
        return <EquipmentSelection />;
      case 'battle':
        return <BattleArena />;
      case 'krump_wisdom':
        return <KrumpWisdom />;
      case 'overworld_exploration':
        return <AnimeOverworldExploration />;
      case 'record_shop':
        return <RecordShop />;
      default:
        return <GameLanding />;
    }
  };

  return (
    <div className="dark">
      <AudioProvider>
        {renderCurrentPhase()}
      </AudioProvider>
    </div>
  );
}