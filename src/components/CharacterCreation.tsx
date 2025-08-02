import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useAppDispatch } from '@/hooks/useAppSelector';
import { createCharacter } from '@/store/slices/playerSlice';
import { setGamePhase } from '@/store/slices/gameSlice';
import { KrumpStyle, Gender } from '@/types/game';
import { getPlayerSprite } from '@/utils/playerSprites';

const krumpStyles: { style: KrumpStyle; description: string; focus: string }[] = [
  { style: 'RAW', description: 'Pure power through basic moves', focus: 'High strength, moderate defense' },
  { style: 'GOOFY', description: 'Crowd control and energy manipulation', focus: 'High charisma, moderate speed' },
  { style: 'RUGGED', description: 'Essence over flash, spiritual connection', focus: 'Balanced stats, high focus' },
  { style: 'BEASTY', description: 'Animalistic aggression and primal power', focus: 'Extremely high attack, low defense' },
  { style: 'GRIMEY', description: 'Psychological warfare and dirty tactics', focus: 'High critical hit chance' },
  { style: 'FLASHY', description: 'Rapid footwork and precision strikes', focus: 'Maximum speed and agility' },
  { style: 'COCKY', description: 'Confidence-based power amplification', focus: 'High charisma and attack power' },
  { style: 'JERKY', description: 'Unconventional rhythm and creative expression', focus: 'High creativity, unpredictable damage' },
  { style: 'BULLY', description: 'Intimidation and overwhelming pressure', focus: 'High attack and intimidation' },
  { style: 'TRICKS', description: 'Complex move combinations and versatility', focus: 'High technique and combo potential' },
  { style: 'FAST', description: 'Speed and rapid-fire attacks', focus: 'Maximum speed and stamina' },
  { style: 'TECHNICAL', description: 'Balanced perfection and audience appeal', focus: 'Well-rounded stats' },
  { style: 'GULLY', description: 'Unshakeable confidence and leadership', focus: 'High courage, all-around solid' }
];

export default function CharacterCreation() {
  const [name, setName] = useState('');
  const [selectedGender, setSelectedGender] = useState<Gender>('male');
  const [selectedStyle, setSelectedStyle] = useState<KrumpStyle>('RAW');
  const dispatch = useAppDispatch();

  const handleCreateCharacter = () => {
    if (name.trim()) {
      dispatch(createCharacter({ 
        name: name.trim(), 
        gender: selectedGender,
        primaryStyle: selectedStyle 
      }));
      dispatch(setGamePhase('world_map'));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted p-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-primary">Create Your Street Prophet</h1>
          <p className="text-lg text-muted-foreground">
            Begin your journey from Micro to Twin rank
          </p>
        </div>

        <Card className="border-accent">
          <CardHeader>
            <CardTitle>Character Details</CardTitle>
            <CardDescription>Choose your name and primary Krump style</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">Street Name</label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your street name..."
                className="border-accent"
              />
            </div>

            <div className="space-y-3">
              <Label className="text-sm font-medium">Gender</Label>
              <RadioGroup
                value={selectedGender}
                onValueChange={(value: Gender) => setSelectedGender(value)}
                className="flex space-x-6"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="male" id="male" />
                  <Label htmlFor="male" className="cursor-pointer">Male</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="female" id="female" />
                  <Label htmlFor="female" className="cursor-pointer">Female</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Choose Your Primary Style</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {krumpStyles.map((style) => (
                   <Card 
                    key={style.style}
                    className={`cursor-pointer transition-all hover:border-accent ${
                      selectedStyle === style.style ? 'border-primary bg-primary/5' : 'border-muted'
                    }`}
                    onClick={() => setSelectedStyle(style.style)}
                  >
                    <CardContent className="p-4 space-y-2">
                      <div className="flex items-center space-x-3">
                        <img 
                          src={getPlayerSprite(style.style, selectedGender)} 
                          alt={`${style.style} style ${selectedGender} character`}
                          className="w-16 h-24 md:w-20 md:h-30 object-contain pixel-art"
                        />
                        <div className="flex-1">
                          <h4 className="font-bold text-accent">{style.style}</h4>
                          <p className="text-sm text-muted-foreground">{style.description}</p>
                          <p className="text-xs text-primary font-medium">{style.focus}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="flex justify-center pt-6">
              <Button
                onClick={handleCreateCharacter}
                disabled={!name.trim()}
                className="px-8 py-3 text-lg"
                variant="hero"
              >
                Enter the Streets
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}