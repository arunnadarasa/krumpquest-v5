import { useEffect, useRef, useState } from 'react';
import { useAppSelector } from '@/hooks/useAppSelector';

type AudioTrack = 'main-menu' | 'training' | 'equipment' | 'wisdom' | 'record-shop' | 'usa-la' | 'japan-tokyo' | 'korea-seoul' | 'france-paris' | 'germany-berlin' | 'australia-sydney' | 'brazil-rio' | 'canada-toronto' | 'egypt-cairo' | 'india-mumbai' | 'italy-rome' | 'mexi-mexicocity' | 'russia-moscow' | 'south-africa-capetown' | 'uk-london';

// Import audio files properly for Vite
const AUDIO_TRACKS: Record<AudioTrack, string> = {
  'main-menu': new URL('../assets/audio/background/main-menu.mp3', import.meta.url).href,
  'training': new URL('../assets/audio/background/training.mp3', import.meta.url).href,
  'equipment': new URL('../assets/audio/background/equipment.mp3', import.meta.url).href,
  'wisdom': new URL('../assets/audio/background/wisdom.mp3', import.meta.url).href,
  'record-shop': new URL('../assets/audio/background/record-shop.mp3', import.meta.url).href,
  'usa-la': new URL('../assets/audio/countries/usa-la.mp3', import.meta.url).href,
  'japan-tokyo': new URL('../assets/audio/countries/japan-tokyo.mp3', import.meta.url).href,
  'korea-seoul': new URL('../assets/audio/countries/korea-seoul.mp3', import.meta.url).href,
  'france-paris': new URL('../assets/audio/countries/france-paris.mp3', import.meta.url).href,
  'germany-berlin': new URL('../assets/audio/countries/germany-berlin.mp3', import.meta.url).href,
  'australia-sydney': new URL('../assets/audio/countries/australia-sydney.mp3', import.meta.url).href,
  'brazil-rio': new URL('../assets/audio/countries/brazil-rio.mp3', import.meta.url).href,
  'canada-toronto': new URL('../assets/audio/countries/canada-toronto.mp3', import.meta.url).href,
  'egypt-cairo': new URL('../assets/audio/countries/egypt-cairo.mp3', import.meta.url).href,
  'india-mumbai': new URL('../assets/audio/countries/india-mumbai.mp3', import.meta.url).href,
  'italy-rome': new URL('../assets/audio/countries/italy-rome.mp3', import.meta.url).href,
  'mexi-mexicocity': new URL('../assets/audio/countries/mexi-mexicocity.mp3', import.meta.url).href,
  'russia-moscow': new URL('../assets/audio/countries/russia-moscow.mp3', import.meta.url).href,
  'south-africa-capetown': new URL('../assets/audio/countries/south-africa-capetown.mp3', import.meta.url).href,
  'uk-london': new URL('../assets/audio/countries/uk-london.mp3', import.meta.url).href,
};

export const useAudioManager = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentTrack, setCurrentTrack] = useState<AudioTrack | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { soundEnabled, musicVolume } = useAppSelector(state => state.game);
  const { currentPhase } = useAppSelector(state => state.game);
  const { currentLocation } = useAppSelector(state => state.world);

  // Enable audio on first user interaction
  const enableAudio = async () => {
    if (!audioEnabled) {
      setAudioEnabled(true);
      setError(null);
      console.log('Audio enabled by user interaction');
    }
  };

  const loadTrack = async (track: AudioTrack) => {
    if (currentTrack === track || !soundEnabled || !audioEnabled) return;

    setIsLoading(true);
    setError(null);
    
    try {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }

      console.log(`Loading audio track: ${track}`);
      const audio = new Audio(AUDIO_TRACKS[track]);
      audio.volume = musicVolume;
      audio.loop = true;
      
      // Add error handling for audio loading
      audio.onerror = () => {
        const errorMsg = `Failed to load audio file: ${track}`;
        console.error(errorMsg);
        setError(errorMsg);
      };
      
      audioRef.current = audio;
      setCurrentTrack(track);
      
      await audio.play();
      console.log(`Successfully playing: ${track}`);
    } catch (error) {
      const errorMsg = `Could not play audio track: ${track}`;
      console.warn(errorMsg, error);
      setError(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const stopCurrentTrack = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setCurrentTrack(null);
  };

  const fadeOutAndStop = (duration: number = 1000) => {
    if (!audioRef.current) return;

    const audio = audioRef.current;
    const originalVolume = audio.volume;
    const fadeStep = originalVolume / (duration / 50);

    const fadeInterval = setInterval(() => {
      if (audio.volume > fadeStep) {
        audio.volume -= fadeStep;
      } else {
        audio.volume = 0;
        audio.pause();
        audio.currentTime = 0;
        clearInterval(fadeInterval);
        setCurrentTrack(null);
      }
    }, 50);
  };

  // Update volume when settings change
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = soundEnabled ? musicVolume : 0;
    }
  }, [soundEnabled, musicVolume]);

  // Handle phase changes
  useEffect(() => {
    if (!soundEnabled) {
      stopCurrentTrack();
      return;
    }

    let targetTrack: AudioTrack | null = null;

    switch (currentPhase) {
      case 'menu':
        targetTrack = 'main-menu';
        break;
      case 'training':
        targetTrack = 'training';
        break;
      case 'equipment':
        targetTrack = 'equipment';
        break;
      case 'krump_wisdom':
        targetTrack = 'wisdom';
        break;
      case 'record_shop':
        targetTrack = 'record-shop';
        break;
      case 'battle':
        if (currentLocation) {
          const locationMap: Record<string, AudioTrack> = {
            'usa-la': 'usa-la',
            'japan-tokyo': 'japan-tokyo',
            'korea-seoul': 'korea-seoul',
            'france-paris': 'france-paris',
            'germany-berlin': 'germany-berlin',
            'australia-sydney': 'australia-sydney',
            'brazil-rio': 'brazil-rio',
            'canada-toronto': 'canada-toronto',
            'egypt-cairo': 'egypt-cairo',
            'india-mumbai': 'india-mumbai',
            'italy-rome': 'italy-rome',
            'mexi-mexicocity': 'mexi-mexicocity',
            'russia-moscow': 'russia-moscow',
            'south-africa-capetown': 'south-africa-capetown',
            'uk-london': 'uk-london',
          };
          targetTrack = locationMap[currentLocation.id] || 'main-menu';
        }
        break;
      case 'world_map':
      case 'character_creation':
        targetTrack = 'main-menu';
        break;
    }

    if (targetTrack && targetTrack !== currentTrack) {
      if (currentTrack) {
        fadeOutAndStop(500);
        setTimeout(() => loadTrack(targetTrack!), 600);
      } else {
        loadTrack(targetTrack);
      }
    }
  }, [currentPhase, currentLocation, soundEnabled]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  return {
    currentTrack,
    isLoading,
    audioEnabled,
    error,
    enableAudio,
    loadTrack,
    stopCurrentTrack,
    fadeOutAndStop,
  };
};