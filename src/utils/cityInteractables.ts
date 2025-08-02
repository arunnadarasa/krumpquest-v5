// Enhanced interactable rendering for city-focused overworld
export const drawEnhancedInteractable = (
  ctx: CanvasRenderingContext2D,
  interactable: any,
  screenX: number,
  screenY: number,
  size: { x: number; y: number }
) => {
  const { type } = interactable;
  
  // Set base styling
  ctx.shadowBlur = 5;
  
  switch (type) {
    case 'dance_studio':
      // Draw dance studio with neon-like appearance
      ctx.fillStyle = '#FF69B4';
      ctx.shadowColor = '#FF1493';
      ctx.fillRect(screenX, screenY, size.x, size.y);
      
      // Add windows
      ctx.fillStyle = '#FFFF88';
      ctx.fillRect(screenX + 8, screenY + 8, size.x - 16, 16);
      
      // Add entrance
      ctx.fillStyle = '#8B4513';
      ctx.fillRect(screenX + size.x/2 - 8, screenY + size.y - 16, 16, 16);
      break;
      
    case 'cypher':
      // Draw cypher circle with pulsing effect
      const time = Date.now() * 0.003;
      const pulse = 1 + Math.sin(time) * 0.1;
      
      ctx.strokeStyle = '#FFD700';
      ctx.shadowColor = '#FFD700';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(
        screenX + size.x/2, 
        screenY + size.y/2, 
        (size.x/3) * pulse, 
        0, 
        2 * Math.PI
      );
      ctx.stroke();
      
      // Add dancers silhouettes
      for (let i = 0; i < 4; i++) {
        const angle = (i / 4) * Math.PI * 2 + time;
        const x = screenX + size.x/2 + Math.cos(angle) * (size.x/4);
        const y = screenY + size.y/2 + Math.sin(angle) * (size.y/4);
        
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.fillRect(x - 3, y - 6, 6, 12);
      }
      break;
      
    case 'record_shop':
      // Draw record shop
      ctx.fillStyle = '#9932CC';
      ctx.shadowColor = '#8A2BE2';
      ctx.fillRect(screenX, screenY, size.x, size.y);
      
      // Add vinyl record symbol
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(screenX + size.x/2, screenY + size.y/2, size.x/4, 0, 2 * Math.PI);
      ctx.stroke();
      
      ctx.fillStyle = '#000000';
      ctx.beginPath();
      ctx.arc(screenX + size.x/2, screenY + size.y/2, 4, 0, 2 * Math.PI);
      ctx.fill();
      break;
      
    case 'club':
      // Draw club with animated neon
      const neonPulse = 0.5 + Math.sin(Date.now() * 0.005) * 0.5;
      
      ctx.fillStyle = '#FF1493';
      ctx.shadowColor = `rgba(255, 20, 147, ${neonPulse})`;
      ctx.fillRect(screenX, screenY, size.x, size.y);
      
      // Add entrance with bouncer
      ctx.fillStyle = '#000000';
      ctx.fillRect(screenX + size.x/2 - 12, screenY + size.y - 20, 24, 20);
      
      // Add neon strips
      ctx.strokeStyle = '#00FFFF';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(screenX, screenY + 8);
      ctx.lineTo(screenX + size.x, screenY + 8);
      ctx.stroke();
      break;
      
    case 'training_spot':
      // Draw training area
      ctx.fillStyle = '#32CD32';
      ctx.shadowColor = '#228B22';
      ctx.fillRect(screenX, screenY, size.x, size.y);
      
      // Add equipment silhouettes
      ctx.fillStyle = '#2F4F4F';
      for (let i = 0; i < 3; i++) {
        const x = screenX + 16 + i * 20;
        const y = screenY + 16;
        ctx.fillRect(x, y, 12, 24);
      }
      break;
      
    case 'battle_trigger':
      // Draw battle zone with dramatic effect
      const battlePulse = 0.7 + Math.sin(Date.now() * 0.008) * 0.3;
      
      ctx.fillStyle = `rgba(255, 0, 0, ${battlePulse})`;
      ctx.shadowColor = '#FF0000';
      ctx.shadowBlur = 15;
      ctx.fillRect(screenX, screenY, size.x, size.y);
      
      // Add warning stripes
      ctx.fillStyle = '#FFFF00';
      for (let i = 0; i < size.x; i += 16) {
        ctx.fillRect(screenX + i, screenY, 8, size.y);
      }
      break;
      
    case 'npc':
      // Draw NPC as blue square with animations
      const npcPulse = 0.8 + Math.sin(Date.now() * 0.004) * 0.2;
      
      ctx.fillStyle = `rgba(0, 100, 255, ${npcPulse})`;
      ctx.shadowColor = '#0064FF';
      ctx.shadowBlur = 8;
      ctx.fillRect(screenX, screenY, size.x, size.y);
      
      // Add character details
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(screenX + 8, screenY + 6, 4, 4); // Eyes
      ctx.fillRect(screenX + 20, screenY + 6, 4, 4);
      ctx.fillRect(screenX + 12, screenY + 20, 8, 4); // Mouth
      
      // Add speech bubble indicator
      const bubbleTime = Date.now() * 0.003;
      const bubbleY = screenY - 8 + Math.sin(bubbleTime) * 2;
      
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.arc(screenX + size.x + 8, bubbleY, 6, 0, 2 * Math.PI);
      ctx.fill();
      
      ctx.fillStyle = '#0064FF';
      ctx.font = '10px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('...', screenX + size.x + 8, bubbleY + 3);
      break;
      
    case 'training_center':
      // Draw training center as green building
      ctx.fillStyle = '#00AA00';
      ctx.shadowColor = '#00FF00';
      ctx.fillRect(screenX, screenY, size.x, size.y);
      
      // Add gym equipment silhouettes
      ctx.fillStyle = '#004400';
      ctx.fillRect(screenX + 16, screenY + 16, 12, 20); // Equipment 1
      ctx.fillRect(screenX + 32, screenY + 20, 16, 16); // Equipment 2
      ctx.fillRect(screenX + 52, screenY + 12, 8, 24);  // Equipment 3
      
      // Add entrance
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(screenX + size.x/2 - 8, screenY + size.y - 12, 16, 12);
      break;
      
    case 'wisdom_center':
      // Draw wisdom center as blue-purple temple/library
      const wisdomGradient = ctx.createLinearGradient(screenX, screenY, screenX + size.x, screenY + size.y);
      wisdomGradient.addColorStop(0, '#4B0082');
      wisdomGradient.addColorStop(1, '#0000FF');
      
      ctx.fillStyle = wisdomGradient;
      ctx.shadowColor = '#4B0082';
      ctx.fillRect(screenX, screenY, size.x, size.y);
      
      // Add pillars
      ctx.fillStyle = '#FFFFFF';
      for (let i = 0; i < 3; i++) {
        const pillarX = screenX + 16 + i * 24;
        ctx.fillRect(pillarX, screenY + 8, 8, size.y - 16);
      }
      
      // Add book symbol
      ctx.fillStyle = '#FFD700';
      ctx.fillRect(screenX + size.x/2 - 8, screenY + size.y/2 - 4, 16, 8);
      ctx.fillRect(screenX + size.x/2 - 6, screenY + size.y/2 - 6, 12, 12);
      break;
      
    default:
      // Default interactable
      ctx.fillStyle = '#4169E1';
      ctx.shadowColor = '#4169E1';
      ctx.fillRect(screenX, screenY, size.x, size.y);
      break;
  }
  
  // Reset shadow
  ctx.shadowBlur = 0;
};

export const drawEnhancedAmbientParticles = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  atmosphere?: any
) => {
  const time = Date.now() * 0.001;
  const particleCount = 20;
  
  for (let i = 0; i < particleCount; i++) {
    const x = (Math.sin(time * 0.5 + i) * 0.5 + 0.5) * width;
    const y = (Math.sin(time * 0.3 + i * 0.5) * 0.5 + 0.5) * height;
    const size = 1 + Math.sin(time + i) * 0.5;
    
    // Set particle color based on atmosphere
    let particleColor = '#FFFFFF';
    if (atmosphere) {
      switch (atmosphere.timeOfDay) {
        case 'morning':
          particleColor = '#FFE4B5';
          break;
        case 'day':
          particleColor = '#F0F8FF';
          break;
        case 'evening':
          particleColor = '#D4AF37';
          break;
        case 'night':
          particleColor = '#4B0082';
          break;
      }
    }
    
    ctx.fillStyle = particleColor + '40'; // Add transparency
    ctx.beginPath();
    ctx.arc(x, y, size, 0, 2 * Math.PI);
    ctx.fill();
  }
  
  // Add weather effects
  if (atmosphere?.weather === 'rain') {
    drawRainEffect(ctx, width, height, time);
  } else if (atmosphere?.weather === 'fog') {
    drawFogEffect(ctx, width, height, time);
  }
};

const drawRainEffect = (ctx: CanvasRenderingContext2D, width: number, height: number, time: number) => {
  ctx.strokeStyle = 'rgba(173, 216, 230, 0.6)';
  ctx.lineWidth = 1;
  
  for (let i = 0; i < 50; i++) {
    const x = (i * 37 + time * 200) % width;
    const y = (i * 23 + time * 300) % height;
    
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x - 2, y + 10);
    ctx.stroke();
  }
};

const drawFogEffect = (ctx: CanvasRenderingContext2D, width: number, height: number, time: number) => {
  const gradient = ctx.createRadialGradient(width/2, height/2, 0, width/2, height/2, width/2);
  gradient.addColorStop(0, 'rgba(128, 128, 128, 0.1)');
  gradient.addColorStop(1, 'rgba(128, 128, 128, 0.3)');
  
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
};