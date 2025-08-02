import React from 'react';

interface StaminaBarProps {
  current: number;
  max: number;
  isPlayer: boolean;
}

export const StaminaBar: React.FC<StaminaBarProps> = ({ current, max, isPlayer }) => {
  const percentage = (current / max) * 100;
  const isLow = percentage < 25;
  
  return (
    <div className={`relative w-full ${isPlayer ? 'text-left' : 'text-right'}`}>
      {/* Clean CSS Frame */}
      <div 
        className="relative h-6 bg-gradient-to-r from-secondary/20 to-secondary/10 border border-secondary/30 rounded-sm shadow-lg backdrop-blur-sm"
      >
        {/* Stamina Fill */}
        <div 
          className={`absolute top-1 left-1 right-1 bottom-1 transition-all duration-300 ${
            isLow 
              ? 'bg-gradient-to-r from-yellow-600 to-yellow-400 animate-pulse' 
              : 'bg-gradient-to-r from-blue-600 to-blue-400'
          }`}
          style={{ 
            width: `${percentage}%`,
            clipPath: 'polygon(0 0, calc(100% - 3px) 0, 100% 3px, 100% 100%, 3px 100%, 0 calc(100% - 3px))'
          }}
        />
        
        {/* Stamina Text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-bold text-white text-glow">
            {current}/{max}
          </span>
        </div>
      </div>
      
      {/* Label */}
      <div className="text-xs font-bold text-secondary mt-1">
        STAMINA
      </div>
    </div>
  );
};