import React from 'react';
import { useAudioManager } from '@/hooks/useAudioManager';
import { Button } from '@/components/ui/button';
import { Volume2 } from 'lucide-react';

interface AudioProviderProps {
  children: React.ReactNode;
}

export const AudioProvider: React.FC<AudioProviderProps> = ({ children }) => {
  const { audioEnabled, enableAudio, error } = useAudioManager();

  return (
    <>
      {!audioEnabled && (
        <div className="fixed top-4 right-4 z-50">
          <Button
            onClick={enableAudio}
            variant="secondary"
            size="sm"
            className="flex items-center gap-2"
          >
            <Volume2 className="h-4 w-4" />
            Enable Audio
          </Button>
        </div>
      )}
      
      {error && (
        <div className="fixed bottom-4 right-4 z-50 bg-destructive/10 text-destructive text-xs p-2 rounded border border-destructive/20">
          Audio: {error}
        </div>
      )}
      
      {children}
    </>
  );
};