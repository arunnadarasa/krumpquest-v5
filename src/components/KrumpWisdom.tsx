import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/useAppSelector';
import { setGamePhase } from '@/store/slices/gameSlice';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ArrowLeft, BookOpen, Lightbulb, Users, Target, Globe, Heart, ChevronLeft, ChevronRight, RotateCcw, CheckCircle } from 'lucide-react';

interface WisdomTopic {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  unlockLevel: number;
  content: string[];
  estimatedReadTime: number;
}

interface ReadingProgress {
  [topicId: string]: {
    completedQuotes: number[];
    isCompleted: boolean;
  };
}

const wisdomTopics: WisdomTopic[] = [
  {
    id: 'origins',
    title: 'Origins & History',
    icon: <BookOpen className="w-6 h-6" />,
    description: 'How Krump began with Tight Eyez and Big Mijo',
    unlockLevel: 1,
    estimatedReadTime: 3,
    content: [
      "KRUMP stands for 'Kingdom Radically Uplifted Mighty Praise'",
      "Krump is a freestyle dance form popularized 2001 in the streets of South Central, Los Angeles (USA), characterized by free, expressive, exaggerated, and highly energetic movement.",
      "The youths who originated krumping, 'Tight Eyez' and 'Big Mijo', saw the dance as a way for them to escape gang life and to release anger, aggression and frustration in a positive, non-violent way.",
      "This was an opposition to street violence, which was prevalent due to violent gangster activities.",
      "Before Krump, it was called 'Rugged Nigga Dance' and was referred as such for 4 years by Tight Eyez and Big Mijo before anybody else started doing it.",
      "At the end of 4 years through sessions and experimentation, Tight Eyez and Big Mijo 'moves' became a dance."
    ]
  },
  {
    id: 'philosophy',
    title: 'Philosophy & Spirituality',
    icon: <Heart className="w-6 h-6" />,
    description: 'The spiritual foundation and deeper meaning',
    unlockLevel: 3,
    estimatedReadTime: 4,
    content: [
      "Krump is like an energy with words around it which can only be expressed through your body not with your voice, your body turns into the words.",
      "The energy which you use to say words, that's 'Krump' - arms swings, jabs, arm placements, stomps, posture, chest pop, focus points, grooving, bouncing = all of these are to express the energy.",
      "Random jabs is NOT krump, what's making you execute the moves is Krump. Krump is in the inside making you move.",
      "The basics are not there to express, Krump is the inside and feelings of extreme hype.",
      "Eyez was raised by his grandmother who brought him to church which started at 6am – Preaching helped his Krump, the more he went to church, the stronger his Krump got.",
      "When you get 'live', you feel a pull up, that's what make you 'live' - an upper pull, he feels uplifted = it's the strongest dance ever."
    ]
  },
  {
    id: 'techniques',
    title: 'Techniques & Elements',
    icon: <Target className="w-6 h-6" />,
    description: 'The fundamental moves and their meanings',
    unlockLevel: 2,
    estimatedReadTime: 4,
    content: [
      "Figure out the reason of your jab, why do you want to jab, don't throw them if they don't mean anything – you hit the wall and you arm bounce back = now you have a reason.",
      "For arm swing, the energy comes out and comes in, you swing it out of control and control it back in – it used to be done to make you feel crazy vibe.",
      "Arm placements are shape, if you look at your footage and look the same that's because you lack shape, you lack angle – your shapes are controlled by your elbows by turning them.",
      "The chest pop is the first move that Tight Eyez did, Big Mijo brought the breathing chest pop into Krump – 'you breath and then you cough' which is a concept.",
      "Stomping is not just to make noise, it was to create a beat inside of a music – they used to stomp and clap as they didn't have Krump music then.",
      "Your krump balance is your center, its not recommended to stand up straight, you have to find a balance center."
    ]
  },
  {
    id: 'battle_culture',
    title: 'Battle Culture & Hype',
    icon: <Users className="w-6 h-6" />,
    description: 'The importance of community and support',
    unlockLevel: 4,
    estimatedReadTime: 3,
    content: [
      "Hype is what separate us from every other movement, if you can in a circle and what you do is not accepted, you are being drained so you are killing Krump by holding your hype.",
      "Without hype, Krump doesn't exist – that's why Eyez used to get off on people who didn't hype.",
      "Everybody owes people hype, they are giving you what they have – everybody takes their turn, that's why we all session.",
      "Eyez judge in 7 criteria – Kill Off, Material, Combo, Travelling, Musicality, Get Off and Basics.",
      "Character is what changed Krump forever, Eyez used to wear a cap so that the opponent couldn't see his face to dominate him as he was young back then.",
      "When you do a move with a character plus a meaning, that's when you have a story – if you don't have a character, you miss a major thing in Krump."
    ]
  },
  {
    id: 'evolution',
    title: 'Movement Evolution',
    icon: <Lightbulb className="w-6 h-6" />,
    description: 'Old Style vs New Style development',
    unlockLevel: 5,
    estimatedReadTime: 3,
    content: [
      "The 'Old Style' of Krump refers to the era of Krump (2001-2008) in which fast paced movements was the key factor in winning battles.",
      "In 2008, following the disbandment of Krump Kings, Tight Eyez went on to create 'Street Kingdom' (SK) which created the era of 'New Style' of Krump where intro and storyline was the key factor in winning battles.",
      "This is what made Krump a big buzz in the Hip Hop scene since it was more structured and harder to beat in an 'All-styles' battle.",
      "Buck is lower zone (pelvis, chest and shoulders at the same time), small movements, you can groove, it has more depth.",
      "Krump is middle zone, before you can go into buck zone, take off something from your shoulders – use small stories.",
      "Live is upper zone with big moves using your hands."
    ]
  },
  {
    id: 'global_impact',
    title: 'Global Impact',
    icon: <Globe className="w-6 h-6" />,
    description: 'How Krump spread worldwide',
    unlockLevel: 6,
    estimatedReadTime: 4,
    content: [
      "With the cinema documentary 'RIZE' (2005) by the Hollywood Director 'David LaChapelle,' Krump has spread all around the world.",
      "European Buck Session (EBS) is the biggest Krump event in the world located in Germany. Dancers from all continents, nationalities, and economic environments come together.",
      "By travelling around the world, Tight Eyez created different groups in different countries to represent his style of Krump like: HSK (Holland Street Kingdom), SKA (Street Kingdom Australia), KSK (Korea Street Kingdom), RSK (Russia Street Kingdom), SKJ (Street Kingdom Japan), SKSA (Street Kingdom South Africa).",
      "Today, Krumping has worldwide influence in the dance culture, but Krumping still has difficulty gaining acceptance by our society as an art form.",
      "Primarily, because people do not understand this dance form and its spirit.",
      "This is when he decided to do 7 DVDs in a row, he wasn't doing it for his local community but for the oversea community to help them grow."
    ]
  }
];

export default function KrumpWisdom() {
  const dispatch = useAppDispatch();
  const player = useAppSelector(state => state.player);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [currentContentIndex, setCurrentContentIndex] = useState(0);
  const [readingProgress, setReadingProgress] = useState<ReadingProgress>({});

  // Load reading progress from localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem('krump-wisdom-progress');
    if (savedProgress) {
      setReadingProgress(JSON.parse(savedProgress));
    }
  }, []);

  // Save reading progress to localStorage
  useEffect(() => {
    localStorage.setItem('krump-wisdom-progress', JSON.stringify(readingProgress));
  }, [readingProgress]);

  // Mark current quote as read
  useEffect(() => {
    if (selectedTopic) {
      const topicProgress = readingProgress[selectedTopic] || { completedQuotes: [], isCompleted: false };
      if (!topicProgress.completedQuotes.includes(currentContentIndex)) {
        const newProgress = {
          ...readingProgress,
          [selectedTopic]: {
            ...topicProgress,
            completedQuotes: [...topicProgress.completedQuotes, currentContentIndex]
          }
        };
        
        const selectedTopicData = wisdomTopics.find(t => t.id === selectedTopic);
        if (selectedTopicData && newProgress[selectedTopic].completedQuotes.length === selectedTopicData.content.length) {
          newProgress[selectedTopic].isCompleted = true;
        }
        
        setReadingProgress(newProgress);
      }
    }
  }, [selectedTopic, currentContentIndex, readingProgress]);

  const handleBack = () => {
    if (selectedTopic) {
      setSelectedTopic(null);
      setCurrentContentIndex(0);
    } else {
      dispatch(setGamePhase('world_map'));
    }
  };

  const selectedTopicData = wisdomTopics.find(topic => topic.id === selectedTopic);

  const nextContent = () => {
    if (selectedTopicData && currentContentIndex < selectedTopicData.content.length - 1) {
      setCurrentContentIndex(currentContentIndex + 1);
    }
  };

  const prevContent = () => {
    if (currentContentIndex > 0) {
      setCurrentContentIndex(currentContentIndex - 1);
    }
  };

  const jumpToQuote = (index: number) => {
    setCurrentContentIndex(index);
  };

  const resetProgress = () => {
    setReadingProgress({});
    localStorage.removeItem('krump-wisdom-progress');
  };

  const getTopicProgress = (topicId: string) => {
    const progress = readingProgress[topicId];
    const topic = wisdomTopics.find(t => t.id === topicId);
    if (!progress || !topic) return 0;
    return (progress.completedQuotes.length / topic.content.length) * 100;
  };

  const getTotalProgress = () => {
    const unlockedTopics = wisdomTopics.filter(topic => player.level >= topic.unlockLevel);
    if (unlockedTopics.length === 0) return 0;
    
    const totalQuotes = unlockedTopics.reduce((sum, topic) => sum + topic.content.length, 0);
    const readQuotes = unlockedTopics.reduce((sum, topic) => {
      const progress = readingProgress[topic.id];
      return sum + (progress ? progress.completedQuotes.length : 0);
    }, 0);
    
    return (readQuotes / totalQuotes) * 100;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/80 to-primary/20">
      <div className="absolute inset-0 bg-[url('/src/assets/training-center-bg.jpg')] bg-cover bg-center opacity-20" />
      
      <div className="relative z-10 container mx-auto px-2 sm:px-4 py-4 sm:py-8">
        {/* Mobile-optimized header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-8 gap-4">
          <div className="flex items-center gap-2 sm:gap-4">
            <Button variant="outline" size="sm" onClick={handleBack}>
              <ArrowLeft className="w-4 h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Back</span>
            </Button>
            <div>
              <h1 className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-primary to-primary-foreground bg-clip-text text-transparent">
                Wisdom of Tight Eyez
              </h1>
              <p className="text-muted-foreground mt-1 sm:mt-2 text-sm sm:text-base">Learn from the creator of Krump</p>
            </div>
          </div>
          
          {!selectedTopic && (
            <div className="w-full sm:w-auto sm:text-right">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-2">
                <Badge variant="outline" className="text-sm w-fit">
                  Level {player.level}
                </Badge>
                <Button variant="ghost" size="sm" onClick={resetProgress} className="w-fit">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset Progress
                </Button>
              </div>
              <div className="w-full sm:w-48">
                <div className="flex justify-between text-sm mb-1">
                  <span>Overall Progress</span>
                  <span>{Math.round(getTotalProgress())}%</span>
                </div>
                <Progress value={getTotalProgress()} className="h-2" />
              </div>
            </div>
          )}
        </div>

        {!selectedTopic ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {wisdomTopics.map((topic) => {
              const isUnlocked = player.level >= topic.unlockLevel;
              const progress = getTopicProgress(topic.id);
              const isCompleted = readingProgress[topic.id]?.isCompleted;
              
              return (
                <Card 
                  key={topic.id} 
                  className={`cursor-pointer transition-all duration-300 hover:scale-105 relative min-h-[200px] sm:min-h-[240px] ${
                    isUnlocked 
                      ? 'bg-card/80 backdrop-blur-sm border-primary/20 hover:border-primary/40' 
                      : 'bg-muted/40 border-muted opacity-60'
                  } ${isCompleted ? 'ring-2 ring-green-500/50' : ''}`}
                  onClick={() => isUnlocked && setSelectedTopic(topic.id)}
                >
                  {isCompleted && (
                    <div className="absolute -top-2 -right-2 bg-green-500 rounded-full p-1">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                  )}
                  
                  {/* Mobile-optimized horizontal layout for smaller cards */}
                  <div className="sm:hidden flex items-center p-4 h-full">
                    <div className={`p-3 rounded-full mr-4 flex-shrink-0 ${
                      isUnlocked ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'
                    }`}>
                      {topic.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-base mb-1 line-clamp-1">{topic.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                        {topic.description}
                      </p>
                      {isUnlocked ? (
                        <div className="space-y-2">
                          <div className="flex justify-between items-center text-xs text-muted-foreground">
                            <span>{topic.content.length} insights</span>
                            <span>{topic.estimatedReadTime}m</span>
                          </div>
                          {progress > 0 && (
                            <div>
                              <div className="flex justify-between text-xs mb-1">
                                <span>Progress</span>
                                <span>{Math.round(progress)}%</span>
                              </div>
                              <Progress value={progress} className="h-2" />
                            </div>
                          )}
                        </div>
                      ) : (
                        <Badge variant="secondary" className="text-xs w-fit">
                          Level {topic.unlockLevel}
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Desktop layout */}
                  <div className="hidden sm:block">
                    <CardHeader className="text-center pb-2">
                      <div className={`mx-auto mb-4 p-3 rounded-full ${
                        isUnlocked ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'
                      }`}>
                        {topic.icon}
                      </div>
                      <CardTitle className="text-lg">{topic.title}</CardTitle>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground text-center">
                        {topic.description}
                      </p>
                      
                      {isUnlocked ? (
                        <div className="space-y-3">
                          <div className="flex justify-between items-center text-xs text-muted-foreground">
                            <span>{topic.content.length} insights</span>
                            <span>{topic.estimatedReadTime} min read</span>
                          </div>
                          
                          {progress > 0 && (
                            <div>
                              <div className="flex justify-between text-xs mb-1">
                                <span>Progress</span>
                                <span>{Math.round(progress)}%</span>
                              </div>
                              <Progress value={progress} className="h-1.5" />
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="text-center">
                          <Badge variant="secondary" className="text-xs">
                            Unlock at Level {topic.unlockLevel}
                          </Badge>
                        </div>
                      )}
                    </CardContent>
                  </div>
                </Card>
              );
            })}
          </div>
        ) : (
          <div className="max-w-6xl mx-auto">
            {/* Topic Header - Mobile Optimized */}
            <Card className="mb-4 sm:mb-6 bg-card/90 backdrop-blur-sm">
              <CardHeader className="pb-3 sm:pb-4 p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="p-2 sm:p-3 bg-primary/20 rounded-full text-primary flex-shrink-0">
                      {selectedTopicData?.icon}
                    </div>
                    <div className="min-w-0">
                      <CardTitle className="text-lg sm:text-2xl line-clamp-1">{selectedTopicData?.title}</CardTitle>
                      <p className="text-muted-foreground mt-1 text-sm sm:text-base line-clamp-2">{selectedTopicData?.description}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-4 sm:gap-2">
                    <Badge variant="outline" className="text-xs">
                      {selectedTopicData?.estimatedReadTime} min read
                    </Badge>
                    <div className="w-24 sm:w-32">
                      <div className="flex justify-between text-xs mb-1">
                        <span>Progress</span>
                        <span>{Math.round(getTopicProgress(selectedTopic!))}%</span>
                      </div>
                      <Progress value={getTopicProgress(selectedTopic!)} className="h-1.5" />
                    </div>
                  </div>
                </div>
              </CardHeader>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-6">
              {/* Quote Navigation Sidebar - Hidden on Mobile */}
              <Card className="hidden lg:block lg:col-span-1 bg-card/90 backdrop-blur-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Insights</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <ScrollArea className="h-[400px]">
                    <div className="space-y-2 p-4 pt-0">
                      {selectedTopicData?.content.map((content, index) => {
                        const isRead = readingProgress[selectedTopic!]?.completedQuotes.includes(index);
                        const isCurrent = index === currentContentIndex;
                        
                        return (
                          <button
                            key={index}
                            onClick={() => jumpToQuote(index)}
                            className={`w-full text-left p-3 rounded-lg text-sm transition-all ${
                              isCurrent 
                                ? 'bg-primary text-primary-foreground' 
                                : 'hover:bg-muted/50'
                            }`}
                          >
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium">Insight {index + 1}</span>
                              {isRead && <CheckCircle className="w-3 h-3 text-green-500" />}
                            </div>
                            <p className="truncate text-xs opacity-70">
                              {content.substring(0, 50)}...
                            </p>
                          </button>
                        );
                      })}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>

              {/* Main Content - Full Width on Mobile */}
              <Card className="col-span-1 lg:col-span-3 bg-card/90 backdrop-blur-sm">
                <CardContent className="p-3 sm:p-6 lg:p-8">
                  <div className="min-h-[400px] sm:min-h-[500px] flex flex-col justify-between">
                    {/* Quote Content */}
                    <div className="mb-6 sm:mb-8">
                      <div className="bg-gradient-to-r from-primary/10 to-primary/5 border-l-4 border-primary p-4 sm:p-6 lg:p-8 rounded-r-lg">
                        <blockquote className="text-lg sm:text-xl lg:text-2xl leading-relaxed font-medium">
                          "{selectedTopicData?.content[currentContentIndex]}"
                        </blockquote>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-4 sm:mt-6 gap-2 sm:gap-4">
                        <cite className="text-base sm:text-lg text-muted-foreground not-italic">
                          — Tight Eyez, Creator of Krump
                        </cite>
                        <Badge variant="outline" className="text-xs w-fit">
                          Insight {currentContentIndex + 1} of {selectedTopicData?.content.length}
                        </Badge>
                      </div>
                    </div>

                    {/* Navigation Controls */}
                    <div className="space-y-4 sm:space-y-6">
                      {/* Progress Dots - Larger on Mobile */}
                      <div className="flex justify-center gap-2 sm:gap-3 flex-wrap">
                        {selectedTopicData?.content.map((_, index) => {
                          const isRead = readingProgress[selectedTopic!]?.completedQuotes.includes(index);
                          const isCurrent = index === currentContentIndex;
                          
                          return (
                            <button
                              key={index}
                              onClick={() => jumpToQuote(index)}
                              className={`w-4 h-4 sm:w-3 sm:h-3 rounded-full transition-all touch-manipulation ${
                                isCurrent 
                                  ? 'bg-primary scale-125' 
                                  : isRead 
                                    ? 'bg-green-500' 
                                    : 'bg-muted hover:bg-muted-foreground/50'
                              }`}
                            />
                          );
                        })}
                      </div>

                      {/* Navigation Buttons - Bottom positioned on mobile */}
                      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-2 pt-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={prevContent}
                          disabled={currentContentIndex === 0}
                          className="gap-2 w-full sm:w-auto h-11 sm:h-9"
                        >
                          <ChevronLeft className="w-4 h-4" />
                          Previous
                        </Button>
                        
                        <Button 
                          variant="default"
                          size="sm"
                          onClick={() => setSelectedTopic(null)}
                          className="gap-2 w-full sm:w-auto order-3 sm:order-2 h-11 sm:h-9"
                        >
                          <BookOpen className="w-4 h-4" />
                          Back to Topics
                        </Button>

                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={nextContent}
                          disabled={currentContentIndex === (selectedTopicData?.content.length || 0) - 1}
                          className="gap-2 w-full sm:w-auto order-2 sm:order-3 h-11 sm:h-9"
                        >
                          Next
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}