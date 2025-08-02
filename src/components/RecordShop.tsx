import React, { useState, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/useAppSelector';
import { setGamePhase } from '@/store/slices/gameSlice';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Music, Play, MapPin, Search, Disc3 } from 'lucide-react';
import { krumpProducers, getAllCountries, getProducersByCountry } from '@/data/krumpProducers';

export default function RecordShop() {
  const dispatch = useAppDispatch();
  const { previousPhase } = useAppSelector(state => state.game);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('All');

  const countries = ['All', ...getAllCountries()];

  const filteredProducers = useMemo(() => {
    let filtered = krumpProducers;
    
    if (selectedCountry !== 'All') {
      filtered = getProducersByCountry(selectedCountry);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(producer =>
        producer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        producer.style.toLowerCase().includes(searchTerm.toLowerCase()) ||
        producer.region?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered;
  }, [selectedCountry, searchTerm]);

  const handleBack = () => {
    if (previousPhase === 'overworld_exploration') {
      dispatch(setGamePhase('overworld_exploration'));
    } else {
      dispatch(setGamePhase('world_map'));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-black text-white relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-purple-500 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 rounded-full bg-indigo-500 blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-pink-500 blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Spinning Vinyl Records */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Disc3 className="absolute top-20 right-1/4 h-24 w-24 text-purple-400/30 animate-spin" style={{ animationDuration: '20s' }} />
        <Disc3 className="absolute bottom-32 left-1/4 h-16 w-16 text-pink-400/30 animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }} />
        <Disc3 className="absolute top-1/3 left-10 h-12 w-12 text-indigo-400/30 animate-spin" style={{ animationDuration: '25s' }} />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBack}
            className="text-white hover:bg-white/10 transition-all duration-300"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {previousPhase === 'overworld_exploration' ? 'Back to Streets' : 'Back to World Map'}
          </Button>
        </div>

        {/* Shop Title */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Music className="h-8 w-8 text-purple-400 animate-pulse" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">
              KRUMP RECORDS
            </h1>
            <Music className="h-8 w-8 text-purple-400 animate-pulse" />
          </div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-6">
            Discover the legendary producers who shaped the global Krump sound. Each beat tells a story from the streets of the world.
          </p>

          {/* Search Bar */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search producers, styles, or cities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-black/40 border-purple-500/30 text-white placeholder:text-gray-400 focus:border-purple-400/60"
            />
          </div>
        </div>

        {/* Country Filter Tabs */}
        <Tabs value={selectedCountry} onValueChange={setSelectedCountry} className="mb-8">
          <TabsList className="grid w-full grid-cols-5 lg:grid-cols-10 bg-black/40 border border-purple-500/30">
            {countries.map((country) => (
              <TabsTrigger
                key={country}
                value={country}
                className="data-[state=active]:bg-purple-600/50 data-[state=active]:text-white text-gray-300 text-xs lg:text-sm"
              >
                {country === 'All' ? '🌍 All' : 
                 country === 'France' ? '🇫🇷 France' :
                 country === 'Germany' ? '🇩🇪 Germany' :
                 country === 'USA' ? '🇺🇸 USA' :
                 country === 'Ukraine' ? '🇺🇦 Ukraine' :
                 country === 'South Africa' ? '🇿🇦 SA' :
                 country === 'Chile' ? '🇨🇱 Chile' :
                 country === 'UK' ? '🇬🇧 UK' :
                 country === 'Russia' ? '🇷🇺 Russia' :
                 country === 'Italy' ? '🇮🇹 Italy' : country}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Results Count */}
        <div className="text-center mb-6">
          <p className="text-gray-400 text-sm">
            Showing {filteredProducers.length} producer{filteredProducers.length !== 1 ? 's' : ''}
            {selectedCountry !== 'All' && ` from ${selectedCountry}`}
            {searchTerm && ` matching "${searchTerm}"`}
          </p>
        </div>

        {/* Producers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducers.map((producer) => (
            <Card 
              key={producer.id} 
              className="bg-black/40 border-purple-500/30 hover:border-purple-400/60 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 group"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg">{producer.countryFlag}</span>
                      <CardTitle className="text-white text-lg font-bold group-hover:text-purple-300 transition-colors">
                        {producer.name}
                      </CardTitle>
                    </div>
                    <CardDescription className="text-purple-300 font-medium">
                      {producer.style}
                    </CardDescription>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-purple-400 hover:text-white hover:bg-purple-500/20 p-2 group-hover:scale-110 transition-all duration-300"
                  >
                    <Play className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-3">
                <p className="text-gray-300 text-sm leading-relaxed">
                  {producer.description}
                </p>
                
                <div className="flex items-center gap-2">
                  <MapPin className="h-3 w-3 text-gray-400" />
                  <span className="text-xs text-gray-400">{producer.region}, {producer.country}</span>
                </div>
                
                {producer.notableTracks && (
                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-purple-300 uppercase tracking-wide">
                      Notable Tracks:
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {producer.notableTracks.map((track) => (
                        <Badge
                          key={track}
                          variant="secondary"
                          className="bg-purple-900/50 text-purple-200 text-xs hover:bg-purple-800/50 cursor-pointer transition-all duration-200 hover:scale-105"
                        >
                          {track}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredProducers.length === 0 && (
          <div className="text-center py-16">
            <Disc3 className="h-24 w-24 text-gray-600 mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">No producers found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-16 py-8 border-t border-purple-500/20">
          <p className="text-gray-400 text-sm italic">
            "The beat is the heartbeat of Krump. These producers gave us rhythm to express our pain, our joy, our truth."
          </p>
          <p className="text-gray-500 text-xs mt-2">
            — Global Krump Community
          </p>
        </div>
      </div>
    </div>
  );
}