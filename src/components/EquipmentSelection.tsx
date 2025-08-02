import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/useAppSelector';
import { equipItem, unequipItem } from '@/store/slices/playerSlice';
import { setGamePhase } from '@/store/slices/gameSlice';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { equipmentData, getEquipmentByType } from '@/data/equipment';
import { Equipment, EquipmentType, PlayerStats } from '@/types/game';
import { ShirtIcon, HardHat, Footprints, Users, BarChart3, ChevronDown, ChevronUp } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const equipmentSlots: { type: EquipmentType; label: string; icon: React.ComponentType<any> }[] = [
  { type: 'shoes', label: 'Footwear', icon: Footprints },
  { type: 'hat', label: 'Headwear', icon: HardHat },
  { type: 'jacket', label: 'Upper Body', icon: ShirtIcon },
  { type: 'pants', label: 'Lower Body', icon: Users },
];

export default function EquipmentSelection() {
  const dispatch = useAppDispatch();
  const player = useAppSelector(state => state.player);
  const equippedItems = player.equippedItems;
  const [hoveredItem, setHoveredItem] = useState<Equipment | null>(null);
  const [activeTab, setActiveTab] = useState<EquipmentType>('shoes');
  const [isStatsOpen, setIsStatsOpen] = useState(false);
  const isMobile = useIsMobile();

  const handleEquipItem = (equipment: Equipment) => {
    dispatch(equipItem(equipment));
  };

  const handleUnequipItem = (type: EquipmentType) => {
    dispatch(unequipItem(type));
  };

  const handleReadyForBattle = () => {
    dispatch(setGamePhase('battle'));
  };

  const calculateTotalBoosts = (): PlayerStats => {
    const totalBoosts: PlayerStats = {
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
            totalBoosts[stat as keyof PlayerStats] += boost;
          }
        });
      }
    });

    return totalBoosts;
  };

  const totalBoosts = calculateTotalBoosts();
  
  // Calculate preview stats when hovering over an item
  const getPreviewStats = () => {
    if (!hoveredItem) return totalBoosts;
    
    const previewBoosts = { ...totalBoosts };
    const currentItem = equippedItems[hoveredItem.type];
    
    // Remove current item bonuses if any
    if (currentItem) {
      Object.entries(currentItem.statBoosts).forEach(([stat, boost]) => {
        if (typeof boost === 'number' && stat in previewBoosts) {
          previewBoosts[stat as keyof PlayerStats] -= boost;
        }
      });
    }
    
    // Add hovered item bonuses
    Object.entries(hoveredItem.statBoosts).forEach(([stat, boost]) => {
      if (typeof boost === 'number' && stat in previewBoosts) {
        previewBoosts[stat as keyof PlayerStats] += boost;
      }
    });
    
    return previewBoosts;
  };

  const previewBoosts = getPreviewStats();
  const finalStats = Object.fromEntries(
    Object.entries(player.stats).map(([stat, value]) => [
      stat,
      value + previewBoosts[stat as keyof PlayerStats]
    ])
  );

  return (
    <div className="min-h-screen bg-background relative">
      {/* Header */}
      <div className="border-b border-border/40 bg-card/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <h1 className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Equipment Selection
          </h1>
          <p className="text-muted-foreground mt-2 text-sm sm:text-lg">
            Customize your gear to enhance your battle performance
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-4 sm:p-6 pb-20 sm:pb-6">
        <div className={`${isMobile ? 'space-y-6' : 'grid lg:grid-cols-2 gap-8'}`}>
          {/* Equipment Selection */}
          <div className="space-y-6">
            {isMobile ? (
              // Mobile: Dropdown selection
              <div className="space-y-4">
                <Select value={activeTab} onValueChange={(value) => setActiveTab(value as EquipmentType)}>
                  <SelectTrigger className="h-12 text-base">
                    <SelectValue>
                      {(() => {
                        const slot = equipmentSlots.find(s => s.type === activeTab);
                        const IconComponent = slot?.icon;
                        const equippedItem = equippedItems[activeTab];
                        return (
                          <div className="flex items-center gap-3">
                            {IconComponent && <IconComponent className="w-5 h-5" />}
                            <span>{slot?.label}</span>
                            {equippedItem && (
                              <div className="w-2 h-2 bg-primary rounded-full"></div>
                            )}
                          </div>
                        );
                      })()}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {equipmentSlots.map((slot) => {
                      const IconComponent = slot.icon;
                      const equippedItem = equippedItems[slot.type];
                      return (
                        <SelectItem key={slot.type} value={slot.type}>
                          <div className="flex items-center gap-3">
                            <IconComponent className="w-4 h-4" />
                            <span>{slot.label}</span>
                            {equippedItem && (
                              <div className="w-2 h-2 bg-primary rounded-full"></div>
                            )}
                          </div>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>
            ) : (
              // Desktop: Tab navigation
              <Tabs defaultValue="shoes" value={activeTab} onValueChange={(value) => setActiveTab(value as EquipmentType)} className="w-full">
                <TabsList className="grid w-full grid-cols-4 mb-6 h-12">
                  {equipmentSlots.map((slot) => {
                    const IconComponent = slot.icon;
                    const equippedItem = equippedItems[slot.type];
                    return (
                      <TabsTrigger 
                        key={slot.type} 
                        value={slot.type}
                        className="flex items-center gap-2 text-sm relative"
                      >
                        <IconComponent className="w-4 h-4" />
                        <span className="hidden sm:inline">{slot.label}</span>
                        {equippedItem && (
                          <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full"></div>
                        )}
                      </TabsTrigger>
                    );
                  })}
                </TabsList>

                {equipmentSlots.map((slot) => {
                  const equippedItem = equippedItems[slot.type];
                  const availableItems = getEquipmentByType(slot.type);
                  const IconComponent = slot.icon;
                  
                  return (
                    <TabsContent key={slot.type} value={slot.type} className="mt-0">
                      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                        <CardHeader className="pb-4">
                          <CardTitle className="flex items-center gap-3 text-xl">
                            <IconComponent className="w-6 h-6 text-primary" />
                            {slot.label}
                          </CardTitle>
                          <CardDescription>
                            Choose your {slot.label.toLowerCase()} to enhance your combat performance
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                          {/* Currently Equipped */}
                          <div className="space-y-3">
                            <p className="text-sm text-muted-foreground font-medium">Currently Equipped:</p>
                            {equippedItem ? (
                              <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                                <div className="flex justify-between items-start mb-3">
                                  <div>
                                    <h4 className="font-semibold text-base">{equippedItem.name}</h4>
                                    <p className="text-sm text-muted-foreground">{equippedItem.brand}</p>
                                  </div>
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    onClick={() => handleUnequipItem(slot.type)}
                                    className="h-8 px-3 text-sm text-destructive hover:bg-destructive/10"
                                  >
                                    Remove
                                  </Button>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                  {Object.entries(equippedItem.statBoosts).map(([stat, boost]) => (
                                    <Badge key={stat} variant="secondary" className="text-sm px-2 py-1">
                                      {stat.charAt(0).toUpperCase() + stat.slice(1)}: +{boost}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            ) : (
                              <div className="p-4 rounded-lg border border-dashed border-muted-foreground/30 text-center">
                                <p className="text-sm text-muted-foreground">No item equipped</p>
                              </div>
                            )}
                          </div>

                          {/* Available Items */}
                          <div className="space-y-3">
                            <p className="text-sm text-muted-foreground font-medium">Available Items:</p>
                            <div className="grid grid-cols-1 gap-3">
                              {availableItems.map((item) => {
                                const isEquipped = equippedItem?.id === item.id;
                                return (
                                  <div
                                    key={item.id}
                                    className={`p-4 rounded-lg border cursor-pointer transition-all ${
                                      isEquipped 
                                        ? 'border-primary bg-primary/5' 
                                        : 'border-border hover:border-primary/50 hover:bg-accent/5 hover:shadow-md'
                                    }`}
                                    onClick={() => !isEquipped && handleEquipItem(item)}
                                    onMouseEnter={() => setHoveredItem(item)}
                                    onMouseLeave={() => setHoveredItem(null)}
                                  >
                                    <div className="flex justify-between items-start mb-3">
                                      <div className="flex-1">
                                        <h4 className="font-medium text-base mb-1">{item.name}</h4>
                                        <p className="text-sm text-muted-foreground">{item.brand}</p>
                                      </div>
                                      {isEquipped && (
                                        <Badge variant="default" className="text-sm">Equipped</Badge>
                                      )}
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                      {Object.entries(item.statBoosts).map(([stat, boost]) => (
                                        <Badge key={stat} variant="outline" className="text-sm px-2 py-1">
                                          {stat.charAt(0).toUpperCase() + stat.slice(1)}: +{boost}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  );
                })}
              </Tabs>
            )}
            
            {/* Equipment Content for Active Category - Mobile Only */}
            {isMobile && (() => {
              const slot = equipmentSlots.find(s => s.type === activeTab);
              if (!slot) return null;
              
              const equippedItem = equippedItems[slot.type];
              const availableItems = getEquipmentByType(slot.type);
              const IconComponent = slot.icon;
              
              return (
                <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                  <CardHeader className={`${isMobile ? 'pb-3' : 'pb-4'}`}>
                    <CardTitle className={`flex items-center gap-3 ${isMobile ? 'text-lg' : 'text-xl'}`}>
                      <IconComponent className={`${isMobile ? 'w-5 h-5' : 'w-6 h-6'} text-primary`} />
                      {slot.label}
                    </CardTitle>
                    <CardDescription className={isMobile ? 'text-sm' : ''}>
                      Choose your {slot.label.toLowerCase()} to enhance your combat performance
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Currently Equipped */}
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground font-medium">Currently Equipped:</p>
                      {equippedItem ? (
                        <div className={`${isMobile ? 'p-3' : 'p-4'} rounded-lg bg-primary/10 border border-primary/20`}>
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex-1">
                              <h4 className={`font-semibold ${isMobile ? 'text-sm' : 'text-base'}`}>{equippedItem.name}</h4>
                              <p className="text-xs text-muted-foreground">{equippedItem.brand}</p>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleUnequipItem(slot.type)}
                              className={`${isMobile ? 'h-8 px-2 text-xs' : 'h-8 px-3 text-sm'} text-destructive hover:bg-destructive/10`}
                            >
                              Remove
                            </Button>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {Object.entries(equippedItem.statBoosts).map(([stat, boost]) => (
                              <Badge key={stat} variant="secondary" className={`${isMobile ? 'text-xs px-1.5 py-0.5' : 'text-sm px-2 py-1'}`}>
                                {stat.charAt(0).toUpperCase() + stat.slice(1)}: +{boost}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className={`${isMobile ? 'p-3' : 'p-4'} rounded-lg border border-dashed border-muted-foreground/30 text-center`}>
                          <p className="text-sm text-muted-foreground">No item equipped</p>
                        </div>
                      )}
                    </div>

                    {/* Available Items */}
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground font-medium">Available Items:</p>
                      <div className="grid grid-cols-1 gap-3">
                        {availableItems.map((item) => {
                          const isEquipped = equippedItem?.id === item.id;
                          return (
                            <div
                              key={item.id}
                              className={`${isMobile ? 'p-3 min-h-[60px]' : 'p-4'} rounded-lg border cursor-pointer transition-all ${
                                isEquipped 
                                  ? 'border-primary bg-primary/5' 
                                  : 'border-border hover:border-primary/50 hover:bg-accent/5 hover:shadow-md active:scale-95'
                              }`}
                              onClick={() => !isEquipped && handleEquipItem(item)}
                              onMouseEnter={() => !isMobile && setHoveredItem(item)}
                              onMouseLeave={() => !isMobile && setHoveredItem(null)}
                              onTouchStart={() => isMobile && setHoveredItem(item)}
                            >
                              <div className="flex justify-between items-start mb-2">
                                <div className="flex-1">
                                  <h4 className={`font-medium ${isMobile ? 'text-sm' : 'text-base'} mb-1`}>{item.name}</h4>
                                  <p className="text-xs text-muted-foreground">{item.brand}</p>
                                </div>
                                {isEquipped && (
                                  <Badge variant="default" className={isMobile ? 'text-xs' : 'text-sm'}>Equipped</Badge>
                                )}
                              </div>
                              <div className="flex flex-wrap gap-1">
                                {Object.entries(item.statBoosts).map(([stat, boost]) => (
                                  <Badge key={stat} variant="outline" className={`${isMobile ? 'text-xs px-1.5 py-0.5' : 'text-sm px-2 py-1'}`}>
                                    {stat.charAt(0).toUpperCase() + stat.slice(1)}: +{boost}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })()}
          </div>

          {/* Stats Panel */}
          {isMobile ? (
            // Mobile: Collapsible stats panel
            <Collapsible open={isStatsOpen} onOpenChange={setIsStatsOpen}>
              <CollapsibleTrigger asChild>
                <Button variant="outline" className="w-full h-12 justify-between text-base">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Combat Stats
                  </div>
                  {isStatsOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-4 mt-4">
                <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Combat Stats</CardTitle>
                    {hoveredItem && (
                      <CardDescription className="text-sm text-accent">
                        Preview: {hoveredItem.name}
                      </CardDescription>
                    )}
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {Object.entries(player.stats).map(([stat, baseValue]) => {
                      const currentBoost = totalBoosts[stat as keyof PlayerStats];
                      const previewBoost = previewBoosts[stat as keyof PlayerStats];
                      const finalValue = baseValue + previewBoost;
                      const isChanged = hoveredItem && currentBoost !== previewBoost;
                      
                      return (
                        <div key={stat} className="space-y-1">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium capitalize">{stat}</span>
                            <div className="flex items-center gap-1 text-sm">
                              <span className="text-muted-foreground">{baseValue}</span>
                              {previewBoost > 0 && (
                                <span className={`font-medium ${isChanged ? 'text-accent' : 'text-green-500'}`}>
                                  +{previewBoost}
                                </span>
                              )}
                              <span className={`font-bold ${isChanged ? 'text-accent' : ''}`}>
                                = {finalValue}
                              </span>
                            </div>
                          </div>
                          <div className="w-full bg-muted/30 rounded-full h-1.5 overflow-hidden">
                            <div 
                              className={`h-full rounded-full transition-all duration-300 ${
                                isChanged ? 'bg-accent' : 'bg-primary'
                              }`}
                              style={{ width: `${Math.min(finalValue * 2, 100)}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>
              </CollapsibleContent>
            </Collapsible>
          ) : (
            // Desktop: Fixed stats panel
            <div className="space-y-6">
              <Card className="border-border/50 bg-card/50 backdrop-blur-sm sticky top-6">
                <CardHeader>
                  <CardTitle className="text-xl">Combat Stats</CardTitle>
                  {hoveredItem && (
                    <CardDescription className="text-sm text-accent">
                      Preview: {hoveredItem.name}
                    </CardDescription>
                  )}
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(player.stats).map(([stat, baseValue]) => {
                    const currentBoost = totalBoosts[stat as keyof PlayerStats];
                    const previewBoost = previewBoosts[stat as keyof PlayerStats];
                    const finalValue = baseValue + previewBoost;
                    const isChanged = hoveredItem && currentBoost !== previewBoost;
                    
                    return (
                      <div key={stat} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium capitalize">{stat}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">{baseValue}</span>
                            {previewBoost > 0 && (
                              <span className={`text-sm font-medium ${isChanged ? 'text-accent' : 'text-green-500'}`}>
                                +{previewBoost}
                              </span>
                            )}
                            <span className={`font-bold ${isChanged ? 'text-accent' : ''}`}>
                              = {finalValue}
                            </span>
                          </div>
                        </div>
                        <div className="w-full bg-muted/30 rounded-full h-2 overflow-hidden">
                          <div 
                            className={`h-full rounded-full transition-all duration-300 ${
                              isChanged ? 'bg-accent' : 'bg-primary'
                            }`}
                            style={{ width: `${Math.min(finalValue * 2, 100)}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>

              {/* Equipment Summary */}
              <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Equipment Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {equipmentSlots.map((slot) => {
                    const equippedItem = equippedItems[slot.type];
                    const IconComponent = slot.icon;
                    
                    return (
                      <div key={slot.type} className="flex items-center gap-3 p-2 rounded-lg border border-border/30">
                        <IconComponent className="w-4 h-4 text-muted-foreground" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">
                            {equippedItem ? equippedItem.name : 'Empty'}
                          </p>
                          {equippedItem && (
                            <p className="text-xs text-muted-foreground truncate">
                              {equippedItem.brand}
                            </p>
                          )}
                        </div>
                        {equippedItem && (
                          <div className="flex gap-1">
                            {Object.entries(equippedItem.statBoosts).slice(0, 2).map(([stat, boost]) => (
                              <Badge key={stat} variant="secondary" className="text-xs px-1">
                                +{boost}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            </div>
          )}
        </div>
        
        {/* Mobile Sticky Bottom Action Bar */}
        {isMobile && (
          <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur-sm border-t border-border/40 z-50">
            <Button 
              onClick={handleReadyForBattle}
              className="w-full h-12 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground font-semibold text-base"
            >
              Ready for Battle
            </Button>
          </div>
        )}
        
        {/* Desktop Action Button */}
        {!isMobile && (
          <div className="mt-8">
            <Button 
              onClick={handleReadyForBattle}
              className="w-full h-12 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground font-semibold"
            >
              Ready for Battle
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}