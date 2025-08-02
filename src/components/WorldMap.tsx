import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAppDispatch, useAppSelector } from '@/hooks/useAppSelector';
import { setCurrentLocation } from '@/store/slices/worldSlice';
import { setGamePhase } from '@/store/slices/gameSlice';
import { setCurrentMap } from '@/store/slices/overworldSlice';
import { overworldMaps } from '@/data/overworldMaps';
import { getPlayerSprite } from '@/utils/playerSprites';
import { CountryLocation } from '@/types/game';
import worldMapBg from '@/assets/world-map-background.jpg';
import berlinBg from '@/assets/locations/berlin-bg.jpg';
import cairoBg from '@/assets/locations/cairo-bg.jpg';
import capeTownBg from '@/assets/locations/cape-town-bg.jpg';
import londonBg from '@/assets/locations/london-bg.jpg';
import losAngelesBg from '@/assets/locations/los-angeles-bg.jpg';
import mexicoCityBg from '@/assets/locations/mexico-city-bg.jpg';
import moscowBg from '@/assets/locations/moscow-bg.jpg';
import mumbaiBg from '@/assets/locations/mumbai-bg.jpg';
import parisBg from '@/assets/locations/paris-bg.jpg';
import rioBg from '@/assets/locations/rio-bg.jpg';
import romeBg from '@/assets/locations/rome-bg.jpg';
import seoulBg from '@/assets/locations/seoul-bg.jpg';
import sydneyBg from '@/assets/locations/sydney-bg.jpg';
import tokyoBg from '@/assets/locations/tokyo-bg.jpg';
import torontoBg from '@/assets/locations/toronto-bg.jpg';

// Location background mapping
const getLocationBackground = (locationId: string) => {
  switch (locationId) {
    case 'germany-berlin': return berlinBg;
    case 'egypt-cairo': return cairoBg;
    case 'south-africa-capetown': return capeTownBg;
    case 'uk-london': return londonBg;
    case 'usa-la': return losAngelesBg;
    case 'mexico-mexicocity': return mexicoCityBg;
    case 'russia-moscow': return moscowBg;
    case 'india-mumbai': return mumbaiBg;
    case 'france-paris': return parisBg;
    case 'brazil-rio': return rioBg;
    case 'italy-rome': return romeBg;
    case 'korea-seoul': return seoulBg;
    case 'australia-sydney': return sydneyBg;
    case 'japan-tokyo': return tokyoBg;
    case 'canada-toronto': return torontoBg;
    default: return losAngelesBg;
  }
};

export default function WorldMap() {
  const dispatch = useAppDispatch();
  const { unlockedLocations } = useAppSelector(state => state.world);
  const { name, rank, primaryStyle, level, streetCredibility, gender } = useAppSelector(state => state.player);

  const handleLocationSelect = (location: CountryLocation) => {
    dispatch(setCurrentLocation(location));
    dispatch(setGamePhase('equipment'));
  };

  const handleExploreLocation = (location: CountryLocation) => {
    dispatch(setCurrentLocation(location));
    const map = overworldMaps[location.id];
    if (map) {
      dispatch(setCurrentMap(map));
      dispatch(setGamePhase('overworld_exploration'));
    }
  };

  const handleTraining = () => {
    dispatch(setGamePhase('training'));
  };

  const handleWisdom = () => {
    dispatch(setGamePhase('krump_wisdom'));
  };

  const handleRecordShop = () => {
    dispatch(setGamePhase('record_shop'));
  };

  return (
    <div 
      className="min-h-screen relative"
      style={{
        backgroundImage: `url(${worldMapBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Dark overlay with glassmorphism effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
      
      {/* Content Container */}
      <div className="relative z-10 min-h-screen p-4">
        <div className="max-w-7xl mx-auto space-y-4 md:space-y-6">
          {/* Mobile-Optimized Player Header */}
          <div className="glass rounded-lg border border-primary/20 p-3 md:p-4 backdrop-blur-md animate-fade-in">
            <div className="flex flex-col space-y-3 md:flex-row md:items-center md:justify-between md:space-y-0">
              <div className="flex items-center gap-3 md:gap-4">
                <img 
                  src={getPlayerSprite(primaryStyle, gender)} 
                  alt="Player Character"
                  className="w-10 h-14 md:w-12 md:h-16 object-contain pixel-art"
                />
                <div>
                  <h1 className="text-lg md:text-xl font-bold text-white">{name}</h1>
                  <div className="flex items-center gap-2 md:gap-4 text-xs md:text-sm">
                    <span className="text-primary font-medium">{rank}</span>
                    <span className="text-accent">{primaryStyle}</span>
                    <span className="text-muted-foreground">Lv.{level}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 md:gap-3">
                <Button onClick={handleTraining} variant="neon" size="sm" className="h-10 md:h-8 px-3 md:px-4 min-w-[44px] flex-1 md:flex-none">
                  ⚡ Train
                </Button>
                <Button onClick={handleWisdom} variant="outline" size="sm" className="h-10 md:h-8 px-3 md:px-4 min-w-[44px] flex-1 md:flex-none border-primary/50 hover:bg-primary/20">
                  📚 Wisdom
                </Button>
                <Button onClick={handleRecordShop} variant="outline" size="sm" className="h-10 md:h-8 px-3 md:px-4 min-w-[44px] flex-1 md:flex-none border-accent/50 hover:bg-accent/20">
                  🎵 Records
                </Button>
              </div>
            </div>
          </div>

          {/* World Locations */}
          <div className="space-y-3 md:space-y-4">
            <div className="text-center px-2">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-1 md:mb-2">Global Street Map</h2>
              <p className="text-sm md:text-base text-muted-foreground">Challenge legendary OGs worldwide</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
              {unlockedLocations.map((location) => (
                <div
                  key={location.id}
                  className="group cursor-pointer animate-fade-in active:scale-95 transition-transform duration-150"
                  onClick={() => handleLocationSelect(location)}
                >
                  <Card className="h-[280px] md:h-[320px] overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20 active:shadow-primary/30">
                    {/* Location Header Image */}
                    <div 
                      className="relative h-24 md:h-28 bg-cover bg-center"
                      style={{
                        backgroundImage: `url(${getLocationBackground(location.id)})`,
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20" />
                      
                      {/* Status Badge */}
                      <div className="absolute top-2 right-2">
                        <Badge 
                          variant={location.completed ? "default" : "secondary"}
                          className={`text-xs font-semibold ${
                            location.completed 
                              ? 'bg-green-500/90 text-white border-green-400' 
                              : 'bg-background/90 text-foreground border-border'
                          }`}
                        >
                          {location.completed ? "✓" : `Lv.${location.difficulty}`}
                        </Badge>
                      </div>

                      {/* Location Title */}
                      <div className="absolute bottom-2 left-2 right-2">
                        <h3 className="text-base md:text-lg font-bold text-white truncate drop-shadow-lg">
                          {location.city}
                        </h3>
                        <p className="text-xs text-accent font-medium drop-shadow-lg">
                          {location.country}
                        </p>
                      </div>
                    </div>

                    {/* Card Content */}
                    <CardContent className="p-3 md:p-4 h-[200px] md:h-[192px] flex flex-col">
                      <div className="space-y-2 md:space-y-3 flex-1">
                        <div>
                          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">OG Boss</p>
                          <p className="text-sm font-medium text-foreground truncate">{location.ogBoss}</p>
                        </div>
                        
                        <div>
                          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1 md:mb-2">Styles</p>
                          <div className="flex flex-wrap gap-1">
                            {location.primaryStyles.slice(0, 2).map((style) => (
                              <Badge 
                                key={style} 
                                variant="outline" 
                                className="text-xs px-2 py-0.5 border-primary/30 text-primary bg-primary/5"
                              >
                                {style}
                              </Badge>
                            ))}
                            {location.primaryStyles.length > 2 && (
                              <Badge variant="outline" className="text-xs px-2 py-0.5 border-muted text-muted-foreground">
                                +{location.primaryStyles.length - 2}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="flex gap-2 w-full mt-3 md:mt-4">
                        <Button 
                          onClick={() => handleLocationSelect(location)}
                          variant={location.completed ? "outline" : "default"}
                          className="flex-1 h-10 md:h-9 text-sm transition-all duration-200 active:scale-95 min-w-[44px]"
                          size="sm"
                        >
                          {location.completed ? "⟲ Replay" : "⚔️ Challenge"}
                        </Button>
                        <Button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleExploreLocation(location);
                          }}
                          variant="secondary"
                          className="flex-1 h-10 md:h-9 text-sm transition-all duration-200 active:scale-95 min-w-[44px]"
                          size="sm"
                        >
                          🗺️ Explore
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}