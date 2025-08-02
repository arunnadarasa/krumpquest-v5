import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useAppDispatch, useAppSelector } from '@/hooks/useAppSelector';
import { startBattle, endBattle, addMoveToCombo, executeCombo, switchTurn, setBattlePhase, restTurn, regenerateStamina, clearCombo } from '@/store/slices/battleSlice';
import { setGamePhase, goBackToPrevious } from '@/store/slices/gameSlice';
import { gainExperience, gainStreetCred, learnMove, rankUp } from '@/store/slices/playerSlice';
import { completeLocation, clearCurrentLocation } from '@/store/slices/worldSlice';
import { Move, MoveType, KrumpStyle } from '@/types/game';
import { locationOpponents, locationRewards, rewardMoves } from '@/data/opponents';
import { HealthBar } from '@/features/battle/components/HealthBar';
import { StaminaBar } from '@/features/battle/components/StaminaBar';
import { getPlayerSprite } from '@/utils/playerSprites';
import { getBattleBackground } from '@/utils/battleBackgrounds';
import bigHomieSprite from '@/features/opponents/assets/portraits/big-homie-sprite.png';
import techMasterYukiSprite from '@/features/opponents/assets/portraits/tech-master-yuki-sprite.png';
import speedKingJinSprite from '@/features/opponents/assets/portraits/speed-king-jin-sprite.png';
import artisteSupremeSprite from '@/features/opponents/assets/portraits/artiste-supreme-sprite.png';
import beastOfBerlinSprite from '@/features/opponents/assets/portraits/beast-of-berlin-sprite.png';
import carnivalKingCarlosSprite from '@/features/opponents/assets/portraits/carnival-king-carlos-sprite.png';
import undergroundLegendMaxSprite from '@/features/opponents/assets/portraits/underground-legend-max-sprite.png';
import ironDancerDmitriSprite from '@/features/opponents/assets/portraits/iron-dancer-dmitri-sprite.png';
import bollywoodBeastRajSprite from '@/features/opponents/assets/portraits/bollywood-beast-raj-sprite.png';
import outbackFuryJakeSprite from '@/features/opponents/assets/portraits/outback-fury-jake-sprite.png';
import luchaLibreLuisSprite from '@/features/opponents/assets/portraits/lucha-libre-luis-sprite.png';
import pharaohOfFlowAmaraSprite from '@/features/opponents/assets/portraits/pharaoh-of-flow-amara-sprite.png';
import arcticStormZoeSprite from '@/features/opponents/assets/portraits/arctic-storm-zoe-sprite.png';
import renaissanceRebelMarcoSprite from '@/features/opponents/assets/portraits/renaissance-rebel-marco-sprite.png';
import townshipThunderNomsaSprite from '@/features/opponents/assets/portraits/township-thunder-nomsa-sprite.png';

// Sample moves for demo
const basicMoves: Move[] = [
  { id: 'chest_pop_1', name: 'Basic Chest Pop', type: 'chest_pop', power: 15, style: 'RAW', energyCost: 10, comboMultiplier: 1.2 },
  { id: 'stomp_1', name: 'Power Stomp', type: 'stomp', power: 20, style: 'RAW', energyCost: 15, comboMultiplier: 1.1 },
  { id: 'arm_swing_1', name: 'Wide Swing', type: 'arm_swing', power: 18, style: 'RAW', energyCost: 12, comboMultiplier: 1.3 },
  { id: 'jab_1', name: 'Quick Jab', type: 'jab', power: 12, style: 'RAW', energyCost: 8, comboMultiplier: 1.4 }
];

// Dynamic sprite mapping for each opponent
const getOpponentSprite = (opponentId: string) => {
  switch (opponentId) {
    case 'big-homie':
      return bigHomieSprite;
    case 'tech-master-yuki':
      return techMasterYukiSprite;
    case 'speed-king-jin':
      return speedKingJinSprite;
    case 'artiste-supreme':
      return artisteSupremeSprite;
    case 'beast-of-berlin':
      return beastOfBerlinSprite;
    case 'carnival-king-carlos':
      return carnivalKingCarlosSprite;
    case 'underground-legend-max':
      return undergroundLegendMaxSprite;
    case 'iron-dancer-dmitri':
      return ironDancerDmitriSprite;
    case 'bollywood-beast-raj':
      return bollywoodBeastRajSprite;
    case 'outback-fury-jake':
      return outbackFuryJakeSprite;
    case 'lucha-libre-luis':
      return luchaLibreLuisSprite;
    case 'pharaoh-of-flow-amara':
      return pharaohOfFlowAmaraSprite;
    case 'arctic-storm-zoe':
      return arcticStormZoeSprite;
    case 'renaissance-rebel-marco':
      return renaissanceRebelMarcoSprite;
    case 'township-thunder-nomsa':
      return townshipThunderNomsaSprite;
    default:
      return bigHomieSprite; // fallback to default sprite
  }
};

export default function BattleArena() {
  const dispatch = useAppDispatch();
  const battle = useAppSelector(state => state.battle);
  const { currentLocation } = useAppSelector(state => state.world);
  const player = useAppSelector(state => state.player);
  
  // Calculate effective stats with equipment boosts
  const getEffectiveStats = () => {
    const baseStats = player.stats;
    const equippedItems = player.equippedItems;
    
    const totalBoosts = {
      strength: 0,
      defense: 0,
      speed: 0,
      charisma: 0,
      stamina: 0,
      technique: 0,
    };

    Object.values(equippedItems).forEach(item => {
      if (item) {
        Object.entries(item.statBoosts).forEach(([stat, boost]) => {
          if (typeof boost === 'number' && stat in totalBoosts) {
            totalBoosts[stat as keyof typeof totalBoosts] += boost;
          }
        });
      }
    });

    return {
      strength: baseStats.strength + totalBoosts.strength,
      defense: baseStats.defense + totalBoosts.defense,
      speed: baseStats.speed + totalBoosts.speed,
      charisma: baseStats.charisma + totalBoosts.charisma,
      stamina: baseStats.stamina + totalBoosts.stamina,
      technique: baseStats.technique + totalBoosts.technique,
    };
  };

  const effectiveStats = getEffectiveStats();
  const [aiAction, setAiAction] = useState<string>('');

  useEffect(() => {
    // Only initialize location-based boss battles if no battle is already active
    if (currentLocation && !battle.isActive && !battle.currentOpponent) {
      console.log('BattleArena: Initializing battle for location:', currentLocation.id, 'expected boss:', currentLocation.ogBoss);
      
      // Get opponent data from our location opponents
      const opponent = locationOpponents[currentLocation.id];
      
      if (opponent) {
        console.log('BattleArena: Found opponent:', opponent.name, 'for location:', currentLocation.id);
        
        // Validate that the opponent matches the expected boss
        if (opponent.name !== currentLocation.ogBoss) {
          console.error('BattleArena: Opponent mismatch! Expected:', currentLocation.ogBoss, 'Got:', opponent.name);
          return; // Don't start battle with wrong opponent
        }
        
        const playerStamina = effectiveStats.stamina;
        dispatch(startBattle({ opponent, playerStamina, playerStats: effectiveStats }));
      } else {
        console.error('BattleArena: No opponent found for location:', currentLocation.id);
      }
    }
  }, [currentLocation, battle.isActive, battle.currentOpponent, dispatch, effectiveStats.stamina]);

  const handleMoveSelect = (move: Move) => {
    if (battle.turn === 'player' && battle.battlePhase === 'select') {
      // Check if player has enough stamina for the move
      const currentComboStamina = battle.currentCombo.reduce((sum, m) => sum + m.energyCost, 0);
      const totalStaminaCost = currentComboStamina + move.energyCost;
      
      if (totalStaminaCost <= battle.playerStamina) {
        dispatch(addMoveToCombo(move));
      }
    }
  };

  const calculateComboDamage = () => {
    return Math.round(battle.currentCombo.reduce((sum, move) => 
      sum + (move.power * battle.comboMultiplier), 0
    ));
  };

  const getCappedDamage = (damage: number) => {
    const maxDamagePerRound = 40; // 40% of 100 HP
    return Math.min(damage, maxDamagePerRound);
  };

  const isDamageCapped = (damage: number) => {
    return damage > 40;
  };

  const handleExecuteCombo = () => {
    if (battle.currentCombo.length > 0) {
      dispatch(executeCombo());
      setTimeout(() => {
        dispatch(regenerateStamina());
        dispatch(switchTurn());
      }, 1500);
    }
  };

  const handleRest = () => {
    dispatch(restTurn());
    setTimeout(() => {
      dispatch(switchTurn());
    }, 1500);
  };

  const handleEndBattle = (won: boolean) => {
    if (won && currentLocation) {
      // Award location-specific rewards
      const rewards = locationRewards[currentLocation.id];
      if (rewards) {
        dispatch(gainExperience(rewards.experience));
        dispatch(gainStreetCred(rewards.streetCred));
      }
      
      // Learn reward moves
      const moves = rewardMoves[currentLocation.id];
      if (moves) {
        moves.forEach(move => dispatch(learnMove(move)));
      }
      
      // Check for rank progression on battle victory
      const newExperience = player.experience + (rewards?.experience || 0);
      const newStreetCred = player.streetCredibility + (rewards?.streetCred || 0);
      
      // Rank up conditions: combination of experience milestones and street cred thresholds
      const shouldRankUp = () => {
        const ranks = ['Micro', 'Infant', 'Tiny', 'Child', 'Baby', 'Kid', 'Boy', 'Young', 'Lil', 'Jr', 'Twin'];
        const currentRankIndex = ranks.indexOf(player.rank);
        
        // Basic rank progression every 200 experience + 50 street cred
        const experienceThreshold = (currentRankIndex + 1) * 200;
        const streetCredThreshold = (currentRankIndex + 1) * 50;
        
        return newExperience >= experienceThreshold && newStreetCred >= streetCredThreshold;
      };
      
      if (shouldRankUp()) {
        dispatch(rankUp());
      }
      
      dispatch(completeLocation(currentLocation.id));
    }
    
    // Clear the current location to prevent state persistence issues
    dispatch(clearCurrentLocation());
    dispatch(endBattle());
    dispatch(goBackToPrevious());
  };

  // Check for battle end conditions
  useEffect(() => {
    if (battle.playerHealth <= 0) {
      handleEndBattle(false);
    } else if (battle.opponentHealth <= 0) {
      handleEndBattle(true);
    }
  }, [battle.playerHealth, battle.opponentHealth]);

  // Opponent AI Logic
  useEffect(() => {
    if (battle.turn === 'opponent' && battle.battlePhase === 'select' && battle.currentOpponent) {
      const performOpponentTurn = async () => {
        // Show thinking message
        setAiAction('Opponent is thinking...');
        await new Promise(resolve => setTimeout(resolve, 1500));

        // AI move selection based on style and stamina
        const availableMoves = battle.currentOpponent!.moves;
        const opponentStyle = battle.currentOpponent!.primaryStyle;
        const healthRatio = battle.opponentHealth / 100;
        const staminaRatio = battle.opponentStamina / battle.maxOpponentStamina;
        
        // Filter moves by what the AI can afford
        const affordableMoves = availableMoves.filter(move => move.energyCost <= battle.opponentStamina);
        
        if (affordableMoves.length === 0) {
          // No stamina for moves - AI will rest
          setAiAction('Opponent is exhausted and resting...');
          await new Promise(resolve => setTimeout(resolve, 1000));
          dispatch(restTurn());
          setTimeout(() => {
            setAiAction('');
            dispatch(switchTurn());
          }, 1500);
          return;
        }
        
        // Determine strategy based on health and stamina
        let selectedMoves: Move[] = [];
        
        if (healthRatio < 0.3) {
          // Desperate - use highest damage move affordable
          selectedMoves = affordableMoves
            .sort((a, b) => b.power - a.power)
            .slice(0, 1);
        } else if (staminaRatio < 0.4) {
          // Low stamina - use efficient moves
          selectedMoves = affordableMoves
            .filter(move => move.energyCost <= 20)
            .slice(0, 1);
        } else {
          // Build combo based on available stamina and style
          let remainingStamina = battle.opponentStamina;
          selectedMoves = [];
          
          // Style-based move selection
          let preferredMoves = affordableMoves;
          if (opponentStyle === 'RAW') {
            preferredMoves = affordableMoves.filter(m => m.type === 'stomp' || m.type === 'arm_swing');
            if (preferredMoves.length === 0) preferredMoves = affordableMoves;
          } else if (opponentStyle === 'FAST') {
            preferredMoves = affordableMoves.filter(m => m.type === 'jab' || m.type === 'chest_pop');
            if (preferredMoves.length === 0) preferredMoves = affordableMoves;
          } else if (opponentStyle === 'TECHNICAL') {
            // Technical fighters build longer combos
            preferredMoves = affordableMoves.sort((a, b) => a.energyCost - b.energyCost);
          }
          
          // Build combo with available stamina
          for (const move of preferredMoves) {
            if (move.energyCost <= remainingStamina && selectedMoves.length < 3) {
              selectedMoves.push(move);
              remainingStamina -= move.energyCost;
            }
          }
          
          // Ensure at least one move if possible
          if (selectedMoves.length === 0 && affordableMoves.length > 0) {
            selectedMoves = [affordableMoves[0]];
          }
        }

        // Execute selected moves
        for (const [index, move] of selectedMoves.entries()) {
          dispatch(addMoveToCombo(move));
          setAiAction(`Selected: ${move.name}`);
          await new Promise(resolve => setTimeout(resolve, 800));
        }

        // Show execution message
        setAiAction('Executing combo...');
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Execute the combo
        dispatch(executeCombo());
        
        // Clear AI action and switch turns
        setTimeout(() => {
          setAiAction('');
          dispatch(regenerateStamina());
          dispatch(switchTurn());
        }, 1500);
      };

      performOpponentTurn();
    }
  }, [battle.turn, battle.battlePhase, battle.currentOpponent, battle.opponentStamina, battle.maxOpponentStamina, dispatch]);

  if (!battle.isActive || !battle.currentOpponent) {
    return <div>Loading battle...</div>;
  }

  return (
    <div 
      className="min-h-screen max-h-screen relative overflow-y-auto"
      style={{
        backgroundImage: `url(${getBattleBackground(currentLocation?.id || 'los-angeles')})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Enhanced dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
      
      {/* Battle UI Container */}
      <div className="relative z-10 min-h-screen flex flex-col pb-safe">
        
        {/* Top Section: Turn Indicator & Location */}
        <div className="flex-none p-2 md:p-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
            {/* Large Turn Indicator */}
            <div className={`px-4 py-2 md:px-6 md:py-3 rounded-full border-2 backdrop-blur-md transition-all duration-500 ${
              battle.turn === 'player' 
                ? 'bg-primary/20 border-primary text-primary animate-pulse' 
                : 'bg-destructive/20 border-destructive text-destructive animate-pulse'
            }`}>
              <span className="text-lg md:text-xl font-bold">
                {battle.turn === 'player' ? '🎮 YOUR TURN' : '🤖 OPPONENT TURN'}
              </span>
            </div>

            {/* Location Info */}
            <div className="text-center sm:text-right">
              <div className="text-xs md:text-sm text-muted-foreground">Battle Location</div>
              <div className="text-sm md:text-lg font-bold text-accent">
                {currentLocation ? `${currentLocation.city}, ${currentLocation.country}` : 'Street Battle'}
              </div>
            </div>
          </div>
        </div>

        {/* Main Battle Area */}
        {/* Mobile Layout: Centered vertical stack */}
        <div className="flex-1 lg:hidden space-y-4 p-2 md:p-4">
          {/* Player Character - Centered */}
          <div className="flex justify-center">
            <div className="w-full max-w-xs space-y-2 md:space-y-4">
              {/* Player Character */}
              <div className="glass p-3 md:p-4 rounded-xl border border-primary/30 min-h-[140px] md:min-h-[160px]">
                <div className="flex flex-col items-center justify-center space-y-2 h-full min-h-[120px] md:min-h-[140px]">
                  <div className="flex items-center justify-center">
                    <img 
                      src={getPlayerSprite(player.primaryStyle, player.gender)} 
                      alt="Player Character"
                      className="w-16 h-24 md:w-24 md:h-36 object-contain animate-float pixel-art"
                    />
                  </div>
                  <div className="text-center">
                    <div className="text-sm md:text-lg font-bold text-primary">{player.name}</div>
                    <div className="text-xs text-muted-foreground">Rank: {player.rank}</div>
                    <div className="text-xs text-accent font-medium">Style: {player.primaryStyle}</div>
                  </div>
                </div>
              </div>

              {/* Player Health & Stamina */}
              <div className="glass p-2 md:p-4 rounded-xl border border-primary/30 space-y-2">
                <HealthBar 
                  current={Math.round(battle.playerHealth)} 
                  max={100} 
                  isPlayer={true} 
                />
                <StaminaBar 
                  current={battle.playerStamina} 
                  max={battle.maxPlayerStamina} 
                  isPlayer={true} 
                />
              </div>
            </div>
          </div>

          {/* Central VS Display */}
          <div className="text-center py-2">
            <div className="text-4xl font-bold text-white text-glow animate-pulse mb-1">VS</div>
            <div className="text-xs text-muted-foreground">Street Krump Battle</div>
          </div>

          {/* Opponent Character - Centered */}
          <div className="flex justify-center">
            <div className="w-full max-w-xs space-y-2 md:space-y-4">
              {/* Opponent Character */}
              <div className="glass p-3 md:p-4 rounded-xl border border-destructive/30 min-h-[140px] md:min-h-[160px]">
                <div className="flex flex-col items-center justify-center space-y-2 h-full min-h-[120px] md:min-h-[140px]">
                  <div className="flex items-center justify-center">
                    <img 
                      src={getOpponentSprite(battle.currentOpponent.id)} 
                      alt="Opponent Character"
                      className="w-16 h-24 md:w-24 md:h-36 object-contain animate-float pixel-art"
                      style={{ transform: 'scaleX(-1)' }}
                    />
                  </div>
                  <div className="text-center">
                    <div className="text-sm md:text-lg font-bold text-destructive">{battle.currentOpponent.name}</div>
                    <div className="text-xs text-muted-foreground">Rank: {battle.currentOpponent.rank}</div>
                    <div className="text-xs text-accent font-medium">Style: {battle.currentOpponent.primaryStyle}</div>
                  </div>
                </div>
              </div>

              {/* Opponent Health & Stamina */}
              <div className="glass p-2 md:p-4 rounded-xl border border-destructive/30 space-y-2">
                <HealthBar 
                  current={Math.round(battle.opponentHealth)} 
                  max={100} 
                  isPlayer={false} 
                />
                <StaminaBar 
                  current={battle.opponentStamina} 
                  max={battle.maxOpponentStamina} 
                  isPlayer={false} 
                />
              </div>
            </div>
          </div>

          {/* Combo Display Area */}
          {battle.currentCombo.length > 0 && (
            <div className="glass p-6 rounded-xl border border-accent/50 bg-gradient-to-r from-accent/10 to-primary/10">
              <div className="text-center space-y-4">
                <h3 className="text-xl font-bold text-accent">
                  {battle.turn === 'player' ? '🔥 YOUR COMBO' : '⚡ OPPONENT COMBO'}
                </h3>
                
                {/* Combo Chain Visual */}
                <div className="flex flex-wrap justify-center gap-2">
                  {battle.currentCombo.map((move, index) => (
                    <div key={index} className="relative">
                      <Badge variant="outline" className="px-3 py-2 text-sm font-bold border-2 border-accent bg-accent/20">
                        {move.name}
                      </Badge>
                      {index < battle.currentCombo.length - 1 && (
                        <span className="absolute -right-3 top-1/2 transform -translate-y-1/2 text-accent font-bold">→</span>
                      )}
                    </div>
                  ))}
                </div>

                {/* Combo Stats */}
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="glass p-3 rounded-lg">
                    <div className="text-sm text-muted-foreground">Combo Multiplier</div>
                    <div className="text-xl font-bold text-accent">x{battle.comboMultiplier.toFixed(1)}</div>
                  </div>
                  <div className="glass p-3 rounded-lg">
                    <div className="text-sm text-muted-foreground">Potential Damage</div>
                    <div className={`text-xl font-bold ${isDamageCapped(calculateComboDamage()) ? 'text-orange-400' : 'text-green-400'}`}>
                      {calculateComboDamage()}
                      {isDamageCapped(calculateComboDamage()) && (
                        <span className="text-sm text-red-400 ml-1">→ {getCappedDamage(calculateComboDamage())}</span>
                      )}
                    </div>
                  </div>
                </div>

                {isDamageCapped(calculateComboDamage()) && (
                  <div className="bg-orange-500/20 border border-orange-500/50 rounded-lg p-3">
                    <p className="text-sm text-orange-400 font-medium">
                      ⚠️ Damage exceeds 40% limit per round!
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* AI Action Display */}
          {aiAction && battle.turn === 'opponent' && (
            <div className="glass p-4 rounded-xl border border-destructive/50 bg-destructive/10">
              <div className="text-center">
                <div className="text-lg font-bold text-destructive mb-2">🤖 AI THINKING</div>
                <p className="text-destructive">{aiAction}</p>
              </div>
            </div>
          )}
        </div>

        {/* Desktop Layout: Keep current 3-column layout */}
        <div className="hidden lg:flex flex-1 lg:grid lg:grid-cols-12 gap-2 md:gap-4 p-2 md:p-4">
          
          {/* Left Panel: Player Info & Health */}
          <div className="col-span-3 space-y-2 md:space-y-4">
            {/* Player Character */}
            <div className="glass p-3 md:p-4 rounded-xl border border-primary/30 min-h-[140px] md:min-h-[160px]">
              <div className="flex flex-col items-center justify-center space-y-2 h-full min-h-[120px] md:min-h-[140px]">
                <div className="flex items-center justify-center">
                  <img 
                    src={getPlayerSprite(player.primaryStyle, player.gender)} 
                    alt="Player Character"
                    className="w-16 h-24 md:w-24 md:h-36 object-contain animate-float pixel-art"
                  />
                </div>
                <div className="text-center">
                  <div className="text-sm md:text-lg font-bold text-primary">{player.name}</div>
                  <div className="text-xs text-muted-foreground">Rank: {player.rank}</div>
                  <div className="text-xs text-accent font-medium">Style: {player.primaryStyle}</div>
                </div>
              </div>
            </div>

            {/* Player Health & Stamina */}
            <div className="glass p-2 md:p-4 rounded-xl border border-primary/30 space-y-2">
              <HealthBar 
                current={Math.round(battle.playerHealth)} 
                max={100} 
                isPlayer={true} 
              />
              <StaminaBar 
                current={battle.playerStamina} 
                max={battle.maxPlayerStamina} 
                isPlayer={true} 
              />
            </div>
          </div>

          {/* Center Panel: Battle Action Area */}
          <div className="col-span-6 space-y-2 md:space-y-4">
            
            {/* Central VS Display */}
            <div className="text-center py-2 md:py-8">
              <div className="text-4xl md:text-8xl font-bold text-white text-glow animate-pulse mb-1 md:mb-2">VS</div>
              <div className="text-xs md:text-sm text-muted-foreground">Street Krump Battle</div>
            </div>

            {/* Combo Display Area */}
            {battle.currentCombo.length > 0 && (
              <div className="glass p-6 rounded-xl border border-accent/50 bg-gradient-to-r from-accent/10 to-primary/10">
                <div className="text-center space-y-4">
                  <h3 className="text-xl font-bold text-accent">
                    {battle.turn === 'player' ? '🔥 YOUR COMBO' : '⚡ OPPONENT COMBO'}
                  </h3>
                  
                  {/* Combo Chain Visual */}
                  <div className="flex flex-wrap justify-center gap-2">
                    {battle.currentCombo.map((move, index) => (
                      <div key={index} className="relative">
                        <Badge variant="outline" className="px-3 py-2 text-sm font-bold border-2 border-accent bg-accent/20">
                          {move.name}
                        </Badge>
                        {index < battle.currentCombo.length - 1 && (
                          <span className="absolute -right-3 top-1/2 transform -translate-y-1/2 text-accent font-bold">→</span>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Combo Stats */}
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="glass p-3 rounded-lg">
                      <div className="text-sm text-muted-foreground">Combo Multiplier</div>
                      <div className="text-xl font-bold text-accent">x{battle.comboMultiplier.toFixed(1)}</div>
                    </div>
                    <div className="glass p-3 rounded-lg">
                      <div className="text-sm text-muted-foreground">Potential Damage</div>
                      <div className={`text-xl font-bold ${isDamageCapped(calculateComboDamage()) ? 'text-orange-400' : 'text-green-400'}`}>
                        {calculateComboDamage()}
                        {isDamageCapped(calculateComboDamage()) && (
                          <span className="text-sm text-red-400 ml-1">→ {getCappedDamage(calculateComboDamage())}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {isDamageCapped(calculateComboDamage()) && (
                    <div className="bg-orange-500/20 border border-orange-500/50 rounded-lg p-3">
                      <p className="text-sm text-orange-400 font-medium">
                        ⚠️ Damage exceeds 40% limit per round!
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* AI Action Display */}
            {aiAction && battle.turn === 'opponent' && (
              <div className="glass p-4 rounded-xl border border-destructive/50 bg-destructive/10">
                <div className="text-center">
                  <div className="text-lg font-bold text-destructive mb-2">🤖 AI THINKING</div>
                  <p className="text-destructive">{aiAction}</p>
                </div>
              </div>
            )}
          </div>

          {/* Right Panel: Opponent Info & Health */}
          <div className="col-span-3 space-y-2 md:space-y-4">
            {/* Opponent Character */}
            <div className="glass p-3 md:p-4 rounded-xl border border-destructive/30 min-h-[140px] md:min-h-[160px]">
              <div className="flex flex-col items-center justify-center space-y-2 h-full min-h-[120px] md:min-h-[140px]">
                <div className="flex items-center justify-center">
                  <img 
                    src={getOpponentSprite(battle.currentOpponent.id)} 
                    alt="Opponent Character"
                    className="w-16 h-24 md:w-24 md:h-36 object-contain animate-float pixel-art"
                    style={{ transform: 'scaleX(-1)' }}
                  />
                </div>
                <div className="text-center">
                  <div className="text-sm md:text-lg font-bold text-destructive">{battle.currentOpponent.name}</div>
                  <div className="text-xs text-muted-foreground">Rank: {battle.currentOpponent.rank}</div>
                  <div className="text-xs text-accent font-medium">Style: {battle.currentOpponent.primaryStyle}</div>
                </div>
              </div>
            </div>

            {/* Opponent Health & Stamina */}
            <div className="glass p-2 md:p-4 rounded-xl border border-destructive/30 space-y-2">
              <HealthBar 
                current={Math.round(battle.opponentHealth)} 
                max={100} 
                isPlayer={false} 
              />
              <StaminaBar 
                current={battle.opponentStamina} 
                max={battle.maxOpponentStamina} 
                isPlayer={false} 
              />
            </div>
          </div>
        </div>

        {/* Bottom Section: Move Selection & Actions - Compact */}
        {battle.turn === 'player' && battle.battlePhase === 'select' && (
          <div className="flex-none p-1 md:p-2 sticky bottom-0 bg-background/90 backdrop-blur-md border-t border-primary/20">
            <div className="glass p-2 md:p-3 rounded-xl border border-primary/50 bg-gradient-to-r from-primary/5 to-accent/5">
              
              {/* Move Selection Header - Compact */}
              <div className="text-center mb-2 md:mb-3">
                <h3 className="text-sm md:text-lg font-bold text-primary mb-1">🎯 SELECT MOVES</h3>
                <p className="text-xs text-muted-foreground hidden md:block">Build combos by chaining moves</p>
              </div>

              {/* Move Grid - Compact */}
              <div className="mb-2 md:mb-3">
                <div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-1 md:gap-2">
                {player.learnedMoves.map((move) => {
                  const currentComboStamina = battle.currentCombo.reduce((sum, m) => sum + m.energyCost, 0);
                  const canAfford = (currentComboStamina + move.energyCost) <= battle.playerStamina;
                  
                  return (
                    <Button
                      key={move.id}
                      onClick={() => handleMoveSelect(move)}
                      variant={canAfford ? "outline" : "secondary"}
                      disabled={!canAfford}
                      className={`h-auto p-1 md:p-2 flex flex-col space-y-0.5 md:space-y-1 transition-all duration-200 hover:scale-105 min-h-[36px] md:min-h-[40px] ${
                        canAfford 
                          ? 'border-primary/50 hover:border-primary hover:bg-primary/10' 
                          : 'opacity-50 cursor-not-allowed'
                      }`}
                    >
                      <div className="font-bold text-[9px] md:text-xs leading-tight">{move.name}</div>
                      <div className="text-[8px] md:text-xs opacity-80 leading-tight">
                        ⚡{move.power} 🔋{move.energyCost}
                      </div>
                      <Badge variant="secondary" className="text-[7px] md:text-xs py-0 px-0.5 md:px-1">
                        {move.type.replace('_', ' ')}
                      </Badge>
                    </Button>
                  );
                })}
                </div>
              </div>

              {/* Action Buttons - Compact */}
              <div className="flex justify-center space-x-1 md:space-x-2 flex-wrap gap-1 md:gap-2">
                <Button
                  onClick={handleExecuteCombo}
                  disabled={battle.currentCombo.length === 0}
                  variant="default"
                  className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 font-bold px-2 md:px-4 py-1 md:py-2 text-xs md:text-sm"
                >
                  🚀 EXECUTE ({battle.currentCombo.length})
                </Button>
                
                <Button
                  onClick={handleRest}
                  variant="outline"
                  className="border-blue-500 text-blue-400 hover:bg-blue-500/20 px-2 md:px-3 py-1 md:py-2 text-xs md:text-sm"
                >
                  💤 REST
                </Button>
                
                <Button 
                  onClick={() => dispatch(clearCombo())}
                  variant="outline"
                  disabled={battle.currentCombo.length === 0}
                  className="border-orange-500 text-orange-400 hover:bg-orange-500/20 px-2 md:px-3 py-1 md:py-2 text-xs md:text-sm"
                >
                  🗑️ CLEAR
                </Button>
                
                <Button
                  onClick={() => dispatch(goBackToPrevious())}
                  variant="outline"
                  className="border-red-500 text-red-400 hover:bg-red-500/20 px-2 md:px-3 py-1 md:py-2 text-xs md:text-sm"
                >
                  🏃 RETREAT
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}