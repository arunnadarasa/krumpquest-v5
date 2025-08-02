import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAppDispatch } from '@/hooks/useAppSelector';
import { startNewGame, setGamePhase } from '@/store/slices/gameSlice';
import heroImage from '@/assets/krump-quest-hero.jpg';

const GameLanding = () => {
  const [currentView, setCurrentView] = useState<'landing' | 'classes' | 'create'>('landing');
  const dispatch = useAppDispatch();

  const krumpStyles = [
    {
      name: "RAW",
      description: "Pure power through basic moves",
      type: "Tank/Berserker",
      color: "krump-raw",
      stats: { strength: 95, defense: 70, speed: 60, charisma: 50 },
      specialty: "Devastating basic combos with maximum impact"
    },
    {
      name: "GOOFY", 
      description: "Crowd control and energy manipulation",
      type: "Support/Entertainer",
      color: "krump-goofy",
      stats: { strength: 50, defense: 60, speed: 70, charisma: 95 },
      specialty: "Comedic distractions and team buffs"
    },
    {
      name: "RUGGED",
      description: "Essence over flash, spiritual connection", 
      type: "Purist/Monk",
      color: "krump-rugged",
      stats: { strength: 75, defense: 80, speed: 65, charisma: 70 },
      specialty: "Clean essential moves with perfect form"
    },
    {
      name: "BEASTY",
      description: "Animalistic aggression and primal power",
      type: "Berserker/Wild", 
      color: "krump-beasty",
      stats: { strength: 100, defense: 40, speed: 80, charisma: 60 },
      specialty: "Feral combinations and intimidation"
    },
    {
      name: "GRIMEY",
      description: "Psychological warfare and dirty tactics",
      type: "Rogue/Trickster",
      color: "krump-grimey", 
      stats: { strength: 70, defense: 50, speed: 75, charisma: 65 },
      specialty: "Mind games and opponent debuffs"
    },
    {
      name: "FLASHY",
      description: "Rapid footwork and precision strikes",
      type: "Rogue/Speedster",
      color: "krump-flashy",
      stats: { strength: 60, defense: 50, speed: 100, charisma: 85 },
      specialty: "Lightning-fast foot combinations"
    },
    {
      name: "COCKY",
      description: "Confidence-based power amplification", 
      type: "Paladin/Showboat",
      color: "krump-cocky",
      stats: { strength: 85, defense: 60, speed: 70, charisma: 90 },
      specialty: "Arrogant displays that boost self"
    },
    {
      name: "JERKY", 
      description: "Unconventional rhythm and creative expression",
      type: "Artist/Unique",
      color: "krump-jerky",
      stats: { strength: 65, defense: 55, speed: 75, charisma: 80 },
      specialty: "Non-flowing artistic combinations"
    },
    {
      name: "BULLY",
      description: "Intimidation and overwhelming pressure",
      type: "Warrior/Aggressor", 
      color: "krump-bully",
      stats: { strength: 90, defense: 70, speed: 65, charisma: 75 },
      specialty: "Aggressive rushdown tactics"
    },
    {
      name: "TRICKS",
      description: "Complex move combinations and versatility",
      type: "Mage/Combo",
      color: "krump-tricks", 
      stats: { strength: 70, defense: 60, speed: 85, charisma: 80 },
      specialty: "Multi-hit combo mastery"
    },
    {
      name: "FAST",
      description: "Speed and rapid-fire attacks",
      type: "Ninja/Rush",
      color: "krump-fast",
      stats: { strength: 65, defense: 50, speed: 95, charisma: 70 },
      specialty: "Blitz attacks and rapid sequences"
    },
    {
      name: "TECHNICAL",
      description: "Balanced perfection and audience appeal", 
      type: "Sage/Crowd-Pleaser",
      color: "krump-technical",
      stats: { strength: 75, defense: 75, speed: 75, charisma: 85 },
      specialty: "Smooth-flashy hybrids"
    }
  ];

  const StatBar = ({ value, max = 100 }: { value: number; max?: number }) => (
    <div className="w-full bg-muted rounded-full h-2">
      <div 
        className="bg-gradient-primary h-2 rounded-full transition-all duration-500"
        style={{ width: `${(value / max) * 100}%` }}
      />
    </div>
  );

  if (currentView === 'landing') {
    return (
      <div className="min-h-screen bg-background relative overflow-hidden">
        {/* Dynamic Background Elements */}
        <div className="absolute inset-0 opacity-30">
          <div className="floating absolute top-20 left-10 w-32 h-32 bg-primary/20 rounded-full blur-xl"></div>
          <div className="floating absolute top-40 right-20 w-24 h-24 bg-secondary/20 rounded-full blur-lg" style={{animationDelay: '1s'}}></div>
          <div className="floating absolute bottom-20 left-1/4 w-40 h-40 bg-accent/20 rounded-full blur-2xl" style={{animationDelay: '2s'}}></div>
        </div>

        {/* Hero Section */}
        <div 
          className="relative h-screen flex items-center justify-center bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background/90" />
          
          <div className="relative z-10 text-center max-w-4xl mx-auto px-6 animate-slide-in-up">
            <h1 className="font-orbitron font-black text-6xl md:text-8xl mb-6 text-holographic">
              KRUMP QUEST
            </h1>
            <h2 className="font-exo text-2xl md:text-4xl text-glow-secondary mb-4 font-bold animate-slide-in-left">
              Rise of the Street Kingdom
            </h2>
            <p className="text-muted-foreground text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
              Master the ancient art of Krump dancing. Battle legendary OGs across 15 countries. 
              Rise from Micro to Twin rank in this epic street dance RPG.
            </p>
            
            <div className="flex justify-center animate-scale-in">
              <Button 
                variant="premium" 
                size="xxl"
                onClick={() => dispatch(startNewGame())}
                className="font-orbitron hover-lift pulse-glow"
              >
                Start Your Journey
              </Button>
            </div>

            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="glass-strong rounded-xl p-6 hover-lift">
                <div className="text-3xl font-bold text-glow mb-2">12</div>
                <div className="text-sm text-muted-foreground font-medium">Krump Styles</div>
              </div>
              <div className="glass-strong rounded-xl p-6 hover-lift" style={{animationDelay: '0.1s'}}>
                <div className="text-3xl font-bold text-glow-secondary mb-2">15</div>
                <div className="text-sm text-muted-foreground font-medium">Countries</div>
              </div>
              <div className="glass-strong rounded-xl p-6 hover-lift" style={{animationDelay: '0.2s'}}>
                <div className="text-3xl font-bold text-glow-accent mb-2">10</div>
                <div className="text-sm text-muted-foreground font-medium">Rank Levels</div>
              </div>
              <div className="glass-strong rounded-xl p-6 hover-lift" style={{animationDelay: '0.3s'}}>
                <div className="text-3xl font-bold text-glow mb-2">∞</div>
                <div className="text-sm text-muted-foreground font-medium">Combinations</div>
              </div>
            </div>
          </div>
        </div>

        {/* Game Features */}
        <div className="py-24 px-6 relative">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-orbitron text-5xl font-bold text-center mb-16 text-holographic">
              Master the Streets
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="glass hover-lift group cursor-pointer animate-slide-in-left">
                <CardHeader>
                  <CardTitle className="font-exo text-2xl text-glow group-hover:text-glow-accent transition-all">
                    Turn-Based Battles
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    Master rhythm-based combat using Chest Pops, Stomps, Arm Swings, and Jabs. 
                    Chain moves into devastating combos that flow like poetry in motion.
                  </p>
                </CardContent>
              </Card>

              <Card className="glass hover-lift group cursor-pointer animate-slide-in-up" style={{animationDelay: '0.2s'}}>
                <CardHeader>
                  <CardTitle className="font-exo text-2xl text-glow-secondary group-hover:text-glow-accent transition-all">
                    Global Journey
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    Travel to 15 countries, each with unique OG bosses and regional dance styles. 
                    Learn from legendary mentors and discover hidden techniques worldwide.
                  </p>
                </CardContent>
              </Card>

              <Card className="glass hover-lift group cursor-pointer animate-slide-in-left" style={{animationDelay: '0.4s'}}>
                <CardHeader>
                  <CardTitle className="font-exo text-2xl text-glow-accent group-hover:text-glow transition-all">
                    Deep Progression
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    Train through Labbing, Nutrition, Physical Training, and Cultural Learning. 
                    Rise through 10 ranks from Micro to Twin in your ultimate quest.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentView === 'classes') {
    return (
      <div className="min-h-screen bg-background py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Button 
              variant="ghost" 
              onClick={() => setCurrentView('landing')}
              className="mb-6 font-exo"
            >
              ← Back to Home
            </Button>
            <h1 className="font-orbitron text-5xl font-bold mb-4 text-foreground">
              Choose Your Krump Style
            </h1>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              Each style defines your combat approach, stat growth, and special abilities. 
              Master your chosen path or learn multiple styles to become unstoppable.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
            {krumpStyles.map((style) => (
              <Card 
                key={style.name}
                className="bg-card/90 backdrop-blur-sm border-primary/20 hover:border-primary/60 transition-all duration-300 hover:shadow-neon cursor-pointer group"
                onClick={() => setCurrentView('create')}
              >
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="font-orbitron text-2xl text-foreground group-hover:text-primary transition-colors">
                      {style.name}
                    </CardTitle>
                    <Badge 
                      variant="outline" 
                      className={`border-${style.color} text-${style.color} bg-${style.color}/10`}
                    >
                      {style.type.split('/')[0]}
                    </Badge>
                  </div>
                  <CardDescription className="text-muted-foreground">
                    {style.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="text-sm font-medium text-accent">
                    Specialty: {style.specialty}
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Strength</span>
                      <span className="text-foreground">{style.stats.strength}</span>
                    </div>
                    <StatBar value={style.stats.strength} />
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Defense</span>
                      <span className="text-foreground">{style.stats.defense}</span>
                    </div>
                    <StatBar value={style.stats.defense} />
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Speed</span>
                      <span className="text-foreground">{style.stats.speed}</span>
                    </div>
                    <StatBar value={style.stats.speed} />
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Charisma</span>
                      <span className="text-foreground">{style.stats.charisma}</span>
                    </div>
                    <StatBar value={style.stats.charisma} />
                  </div>
                  
                  <Button 
                    variant="krump" 
                    className="w-full font-exo group-hover:bg-primary group-hover:text-primary-foreground"
                  >
                    Select {style.name}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <h1 className="font-orbitron text-4xl font-bold mb-4 text-foreground">
          Character Creation Coming Soon
        </h1>
        <p className="text-muted-foreground mb-8">
          This is where you'll customize your street dancer's appearance and gear.
        </p>
        <Button 
          variant="street" 
          onClick={() => setCurrentView('classes')}
          className="font-exo"
        >
          Back to Style Selection
        </Button>
      </div>
    </div>
  );
};

export default GameLanding;