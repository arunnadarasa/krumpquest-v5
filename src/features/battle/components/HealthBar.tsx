import React from 'react';

interface HealthBarProps {
  current: number;
  max: number;
  isPlayer: boolean;
}

export const HealthBar: React.FC<HealthBarProps> = ({ current, max, isPlayer }) => {
  const percentage = (current / max) * 100;
  
  return (
    <div className={`relative w-full ${isPlayer ? 'text-left' : 'text-right'}`}>
      {/* Clean CSS Frame */}
      <div 
        className="relative h-8 bg-gradient-to-r from-background/20 to-background/10 border border-primary/30 rounded-sm shadow-lg backdrop-blur-sm"
      >
        {/* Health Fill */}
        <div 
          className="absolute top-1 left-1 right-1 bottom-1 bg-gradient-to-r from-red-600 to-red-400 transition-all duration-300"
          style={{ 
            width: `${percentage}%`,
            clipPath: 'polygon(0 0, calc(100% - 4px) 0, 100% 4px, 100% 100%, 4px 100%, 0 calc(100% - 4px))'
          }}
        />
        
        {/* Health Text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-bold text-white text-glow">
            {current}/{max}
          </span>
        </div>
      </div>
      
      {/* Character Label */}
      <div className="text-xs font-bold text-primary mt-1">
        {isPlayer ? 'PLAYER' : 'OPPONENT'}
      </div>
    </div>
  );
};