import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useAppDispatch, useAppSelector } from '@/hooks/useAppSelector';
import { trainSkill } from '@/store/slices/playerSlice';
import { setGamePhase, goBackToPrevious } from '@/store/slices/gameSlice';
import { TrainingStats } from '@/types/game';
import { getPlayerSprite } from '@/utils/playerSprites';
import trainingCenterBg from '@/assets/training-center-bg.jpg';

const trainingTypes = [
  {
    key: 'labbing' as keyof TrainingStats,
    name: 'Labbing',
    description: 'Practice moves to improve technique and unlock combos',
    icon: '🎯',
    statBoost: 'Technique',
    color: 'text-blue-400',
    statKey: 'technique' as const,
    battleEffect: 'Improves combo effectiveness and precision'
  },
  {
    key: 'nutrition' as keyof TrainingStats,
    name: 'Nutrition',
    description: 'Eat well to boost stamina and defensive capabilities',
    icon: '🍎',
    statBoost: 'Defense & Stamina',
    color: 'text-green-400',
    statKey: 'defense' as const,
    battleEffect: 'Reduces incoming damage and increases stamina'
  },
  {
    key: 'physical' as keyof TrainingStats,
    name: 'Physical Training',
    description: 'Work out to increase strength and power',
    icon: '💪',
    statBoost: 'Strength & Stamina',
    color: 'text-red-400',
    statKey: 'strength' as const,
    battleEffect: 'Increases damage output in battles'
  },
  {
    key: 'cultural' as keyof TrainingStats,
    name: 'Cultural Learning',
    description: 'Attend workshops to boost charisma and learn new styles',
    icon: '📚',
    statBoost: 'Charisma',
    color: 'text-purple-400',
    statKey: 'charisma' as const,
    battleEffect: 'Improves crowd appeal and opponent intimidation'
  }
];

export default function TrainingCenter() {
  const dispatch = useAppDispatch();
  const { training, stats, primaryStyle, name } = useAppSelector(state => state.player);
  const { previousPhase } = useAppSelector(state => state.game);
  const [justTrained, setJustTrained] = useState<string | null>(null);
  const [showDetails, setShowDetails] = useState<string | null>(null);

  const handleTrain = (skill: keyof TrainingStats) => {
    dispatch(trainSkill({ skill, amount: 10 }));
    setJustTrained(skill);
    setTimeout(() => setJustTrained(null), 2000);
  };

  const handleBackToMap = () => {
    if (previousPhase === 'overworld_exploration') {
      dispatch(setGamePhase('overworld_exploration'));
    } else {
      dispatch(setGamePhase('world_map'));
    }
  };

  const handleWisdom = () => {
    dispatch(setGamePhase('krump_wisdom'));
  };

  const getStatProgress = (stat: keyof typeof stats, training: keyof TrainingStats) => {
    const currentStat = stats[stat];
    const trainingLevel = training ? training : 0;
    return {
      current: currentStat,
      nextLevel: Math.floor(currentStat / 10) * 10 + 10,
      progress: (currentStat % 10) * 10
    };
  };

  const getTrainingEffectiveness = (trainingKey: keyof TrainingStats) => {
    const level = training[trainingKey];
    if (level < 50) return { label: 'Beginner', color: 'text-yellow-400', multiplier: 1 };
    if (level < 100) return { label: 'Intermediate', color: 'text-orange-400', multiplier: 1.2 };
    if (level < 200) return { label: 'Advanced', color: 'text-blue-400', multiplier: 1.5 };
    return { label: 'Master', color: 'text-purple-400', multiplier: 2 };
  };

  return (
    <div 
      className="min-h-screen relative"
      style={{
        backgroundImage: `url(${trainingCenterBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Dark overlay with glassmorphism effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
      
      <div className="relative z-10 min-h-screen p-3 md:p-4 pb-20 md:pb-4">
        <div className="max-w-6xl mx-auto space-y-4 md:space-y-8">
          <div className="text-center space-y-2 md:space-y-4">
            <h1 className="text-2xl md:text-4xl font-bold text-glow text-white">Training Center</h1>
            <p className="text-sm md:text-lg text-accent/90">
              Improve your skills to dominate the streets
            </p>
          </div>

          {/* Player Character Display - Mobile Optimized */}
          <div className="glass rounded-xl border border-primary/30 p-4 md:p-6 backdrop-blur-lg animate-fade-in">
            <div className="flex items-center gap-4 md:gap-6">
              <img 
                src={getPlayerSprite(primaryStyle)} 
                alt="Player Character"
                className="w-12 h-18 md:w-20 md:h-30 object-contain animate-float pixel-art flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h2 className="text-lg md:text-2xl font-bold text-white text-glow truncate">{name}</h2>
                <p className="text-sm md:text-base text-accent/90">Style: {primaryStyle}</p>
                <div className="mt-2">
                  <Badge variant="outline" className="text-xs text-primary border-primary/50">
                    Total Training: {Object.values(training).reduce((sum, val) => sum + val, 0)}
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Stats Display - Mobile Compact */}
          <div className="glass rounded-xl border border-accent/30 p-4 md:p-6 backdrop-blur-lg">
            <h3 className="text-lg md:text-2xl font-bold text-accent text-glow mb-4 md:mb-6">Battle Ready Stats</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
              {Object.entries(stats).map(([statName, value]) => {
                const effectiveness = value >= 80 ? 'Excellent' : value >= 60 ? 'Good' : value >= 40 ? 'Average' : 'Needs Work';
                const effectivenessColor = value >= 80 ? 'text-green-400' : value >= 60 ? 'text-blue-400' : value >= 40 ? 'text-yellow-400' : 'text-red-400';
                
                return (
                  <div key={statName} className="glass p-3 md:p-4 rounded-lg border border-white/10">
                    <div className="flex justify-between items-center mb-1 md:mb-2">
                      <p className="text-xs md:text-sm text-white/80 capitalize truncate">{statName}</p>
                      <Badge variant="outline" className={`text-xs ${effectivenessColor} hidden md:inline-flex`}>
                        {effectiveness}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1 md:gap-2">
                      <p className="text-lg md:text-2xl font-bold text-primary">{value}</p>
                      <div className="flex-1">
                        <Progress value={(value % 10) * 10} className="h-1.5 md:h-2" />
                      </div>
                    </div>
                    <p className="text-xs text-white/60 mt-1">
                      Next: {Math.floor(value / 10) * 10 + 10}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Enhanced Training Options - Mobile Single Column */}
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            {trainingTypes.map((trainingType) => {
              const effectiveness = getTrainingEffectiveness(trainingType.key);
              const isJustTrained = justTrained === trainingType.key;
              const isDetailView = showDetails === trainingType.key;
              
              return (
                <div 
                  key={trainingType.key} 
                  className={`glass rounded-xl border border-accent/30 p-4 md:p-6 backdrop-blur-lg hover-lift transition-all duration-300 ${
                    isJustTrained ? 'ring-2 ring-primary animate-pulse' : ''
                  }`}
                >
                  <div className="space-y-3 md:space-y-4">
                    {/* Header - Mobile Optimized */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 md:gap-3 flex-1 min-w-0">
                        <span className="text-2xl md:text-3xl flex-shrink-0">{trainingType.icon}</span>
                        <div className="flex-1 min-w-0">
                          <div className={`text-base md:text-lg font-bold ${trainingType.color} truncate`}>
                            {trainingType.name}
                          </div>
                          <div className="flex items-center gap-1 md:gap-2 flex-wrap">
                            <Badge variant="outline" className={`text-xs ${effectiveness.color}`}>
                              {effectiveness.label}
                            </Badge>
                            <span className="text-xs text-white/60 hidden md:inline">
                              x{effectiveness.multiplier} effectiveness
                            </span>
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowDetails(isDetailView ? null : trainingType.key)}
                        className="text-accent hover:text-accent/80 min-w-[44px] h-[44px] md:min-w-auto md:h-auto"
                      >
                        {isDetailView ? '−' : '?'}
                      </Button>
                    </div>
                    
                    {/* Description - Shorter on Mobile */}
                    <p className="text-xs md:text-sm text-white/70 leading-relaxed">
                      {trainingType.description}
                    </p>

                    {/* Battle Effect Details - Collapsible */}
                    {isDetailView && (
                      <div className="glass p-3 rounded-lg bg-primary/10 border border-primary/20 animate-fade-in">
                        <p className="text-sm text-primary font-medium mb-1">Battle Effect:</p>
                        <p className="text-xs text-white/80">{trainingType.battleEffect}</p>
                        <p className="text-xs text-white/60 mt-1">
                          Current Stat: {stats[trainingType.statKey]} (+{((stats[trainingType.statKey] - 50) * (trainingType.statKey === 'strength' || trainingType.statKey === 'technique' ? 1 : 0.5)).toFixed(1)}% battle modifier)
                        </p>
                      </div>
                    )}
                    
                    {/* Training Progress - Compact */}
                    <div className="space-y-2 md:space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-white/80">Level {Math.floor(training[trainingType.key] / 100)}</span>
                        <span className="text-accent font-bold">{training[trainingType.key]}</span>
                      </div>
                      
                      <div className="space-y-1">
                        <Progress 
                          value={(training[trainingType.key] % 100)} 
                          className="h-2 md:h-3"
                        />
                        <div className="flex justify-between text-xs text-white/60">
                          <span>Progress</span>
                          <span>Next: {Math.floor(training[trainingType.key] / 100) * 100 + 100}</span>
                        </div>
                      </div>

                      {/* Stat Boost Preview - Compact */}
                      <div className="glass p-2 rounded border border-white/10">
                        <div className="text-xs text-white/70 mb-1">Next boost:</div>
                        <div className="text-sm text-accent font-medium">
                          {trainingType.statBoost}: +{Math.ceil(10 * effectiveness.multiplier)}
                        </div>
                      </div>
                    </div>
                    
                    {/* Training Button - Mobile Touch-Friendly */}
                    <Button
                      onClick={() => handleTrain(trainingType.key)}
                      variant="neon"
                      className={`w-full h-12 md:h-auto text-sm md:text-base transition-all duration-300 ${
                        isJustTrained ? 'bg-primary text-black font-bold' : ''
                      }`}
                      disabled={isJustTrained}
                    >
                      {isJustTrained ? '✓ Trained!' : `Train (+${Math.ceil(10 * effectiveness.multiplier)} XP)`}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation - Mobile Fixed Bottom */}
          <div className="md:flex md:justify-center md:gap-4">
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-black/90 backdrop-blur-lg border-t border-white/10 md:relative md:bottom-auto md:left-auto md:right-auto md:p-0 md:bg-transparent md:backdrop-blur-none md:border-t-0">
              <div className="flex gap-2 md:gap-4 max-w-sm mx-auto md:max-w-none">
                <Button 
                  onClick={handleBackToMap} 
                  variant="outline" 
                  size="lg" 
                  className="flex-1 h-12 md:h-auto md:flex-none bg-white/10 text-white border-white/20 hover:bg-white/20"
                >
                  <span className="md:hidden">← Back</span>
                  <span className="hidden md:inline">
                    {previousPhase === 'overworld_exploration' ? 'Back to City' : 'Back to World Map'}
                  </span>
                </Button>
                <Button 
                  onClick={handleWisdom} 
                  variant="outline" 
                  size="lg" 
                  className="flex-1 h-12 md:h-auto md:flex-none bg-primary/10 text-primary border-primary/20 hover:bg-primary/20"
                >
                  <span className="md:hidden">📚 Wisdom</span>
                  <span className="hidden md:inline">📚 Seek Wisdom</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}