import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/useAppSelector';
import { useIsMobile } from '@/hooks/use-mobile';
import { clearCurrentMap } from '@/store/slices/overworldSlice';
import { setGamePhase } from '@/store/slices/gameSlice';
import { startBattle } from '@/store/slices/battleSlice';
import { locationOpponents } from '@/data/opponents';
import { getPlayerSprite } from '@/utils/playerSprites';

// Import new character sprite sheets
import playerWalkSprite from '@/assets/character/player_walk.png';
import playerOutlineSprite from '@/assets/character/player-outline.png';
import { Button } from '@/components/ui/button';
import { renderPixelArtTile } from '@/utils/pixelArtTiles';
import { drawEnhancedInteractable, drawEnhancedAmbientParticles } from '@/utils/cityInteractables';
import { getInteractionText } from '@/utils/interactionHelpers';
import DialogueModal from '@/components/DialogueModal';
import { openDialogue } from '@/store/slices/dialogueSlice';

// Import location backgrounds
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
import laOverworldBg from '@/assets/overworld/los-angeles/background.png';

const LOCATION_BACKGROUNDS: Record<string, string> = {
  'germany-berlin': berlinBg,
  'egypt-cairo': cairoBg,
  'south-africa-capetown': capeTownBg,
  'uk-london': londonBg,
  'usa-la': laOverworldBg,
  'mexi-mexicocity': mexicoCityBg,
  'russia-moscow': moscowBg,
  'india-mumbai': mumbaiBg,
  'france-paris': parisBg,
  'brazil-rio': rioBg,
  'italy-rome': romeBg,
  'korea-seoul': seoulBg,
  'australia-sydney': sydneyBg,
  'japan-tokyo': tokyoBg,
  'canada-toronto': torontoBg,
};

interface LoadedImages {
  background?: HTMLImageElement;
  playerSprite?: HTMLImageElement;
  playerWalkSheet?: HTMLImageElement;
  playerOutlineSheet?: HTMLImageElement;
}

export default function AnimeOverworldExploration() {
  const dispatch = useAppDispatch();
  const isMobile = useIsMobile();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const keysPressed = useRef<Set<string>>(new Set());
  const loadedImages = useRef<LoadedImages>({});
  
  // Mobile and responsive state
  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 600 });
  const [touchControls, setTouchControls] = useState({
    up: false,
    down: false,
    left: false,
    right: false,
    interact: false
  });
  
  // Local game state
  const [playerPos, setPlayerPos] = useState({ x: 200, y: 200 });
  const [cameraPos, setCameraPos] = useState({ x: 0, y: 0 });
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [playerDirection, setPlayerDirection] = useState<'down' | 'up' | 'left' | 'right'>('down');
  const [nearbyInteractables, setNearbyInteractables] = useState<any[]>([]);
  
  // Animation state for sprite sheets
  const [isWalking, setIsWalking] = useState(false);
  const [animationFrame, setAnimationFrame] = useState(0);
  const animationSpeedRef = useRef(0);
  
  const { currentMap } = useAppSelector(state => state.overworld);
  const { currentLocation } = useAppSelector(state => state.world);
  const player = useAppSelector(state => state.player);

  // Responsive canvas sizing
  useEffect(() => {
    const updateCanvasSize = () => {
      if (isMobile) {
        const width = Math.min(window.innerWidth - 16, 400);
        const height = Math.min(window.innerHeight - 200, 600);
        setCanvasSize({ width, height });
      } else {
        setCanvasSize({ width: 800, height: 600 });
      }
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);
    return () => window.removeEventListener('resize', updateCanvasSize);
  }, [isMobile]);

  // Load images when map changes
  useEffect(() => {
    if (!currentMap || !currentLocation) return;

    const loadImages = async () => {
      const promises: Promise<void>[] = [];
      
      // Load background image
      const backgroundUrl = LOCATION_BACKGROUNDS[currentLocation.id];
      if (backgroundUrl) {
        const bgPromise = new Promise<void>((resolve) => {
          const img = new Image();
          img.onload = () => {
            loadedImages.current.background = img;
            resolve();
          };
          img.src = backgroundUrl;
        });
        promises.push(bgPromise);
      }

      // Load player sprite sheets
      const walkSheetPromise = new Promise<void>((resolve) => {
        const img = new Image();
        img.onload = () => {
          loadedImages.current.playerWalkSheet = img;
          resolve();
        };
        img.src = playerWalkSprite;
      });
      promises.push(walkSheetPromise);

      const outlineSheetPromise = new Promise<void>((resolve) => {
        const img = new Image();
        img.onload = () => {
          loadedImages.current.playerOutlineSheet = img;
          resolve();
        };
        img.src = playerOutlineSprite;
      });
      promises.push(outlineSheetPromise);

      await Promise.all(promises);
      setImagesLoaded(true);
    };

    loadImages();
  }, [currentMap, currentLocation, player.primaryStyle, player.gender]);

  // Initialize positions when map loads
  useEffect(() => {
    if (currentMap) {
      const spawn = currentMap.spawnPoint;
      setPlayerPos({ ...spawn });
      setCameraPos({ 
        x: spawn.x - canvasSize.width / 2, 
        y: spawn.y - canvasSize.height / 2 
      });
    }
  }, [currentMap, canvasSize]);

  const checkCollision = useCallback((x: number, y: number): boolean => {
    if (!currentMap) return true;
    
    const tileX = Math.floor(x / currentMap.tileSize);
    const tileY = Math.floor(y / currentMap.tileSize);
    
    if (tileX < 0 || tileX >= currentMap.width || tileY < 0 || tileY >= currentMap.height) {
      return true;
    }
    
    return currentMap.collisionMap[tileY][tileX] === 1;
  }, [currentMap]);

  const checkNearbyInteractables = useCallback((x: number, y: number) => {
    if (!currentMap) return;
    
    const playerCenter = { x: x + 16, y: y + 16 };
    const nearby: any[] = [];
    
    currentMap.interactables.forEach(interactable => {
      const distance = Math.sqrt(
        Math.pow(playerCenter.x - interactable.position.x, 2) + 
        Math.pow(playerCenter.y - interactable.position.y, 2)
      );
      
      if (distance < 48) {
        nearby.push(interactable);
      }
    });
    
    setNearbyInteractables(nearby);
  }, [currentMap]);

  const handleSpacebarInteraction = useCallback(() => {
    if (nearbyInteractables.length === 0) {
      console.log('No nearby interactables');
      return;
    }
    
    // Interact with the closest interactable
    const closest = nearbyInteractables[0];
    console.log('Interacting with:', closest);
    
    if (closest.type === 'battle_trigger') {
      const opponent = locationOpponents[currentLocation?.id || ''];
      console.log('Found opponent:', opponent);
      
      if (opponent) {
        dispatch(startBattle({
          opponent,
          playerStamina: player.stats.stamina,
          playerStats: player.stats
        }));
        dispatch(setGamePhase('battle'));
        console.log('Battle started!');
      } else {
        console.log('No opponent found for location:', currentLocation?.id);
      }
    } else if (closest.type === 'npc') {
      console.log('NPC interaction - opening dialogue');
      console.log('Current location:', currentLocation?.id);
      console.log('Closest NPC data:', closest.data);
      const npcId = closest.data?.npcId;
      console.log('NPC ID found:', npcId);
      if (npcId) {
        console.log('Dispatching openDialogue with npcId:', npcId);
        dispatch(openDialogue({ npcId }));
      } else {
        console.log('ERROR: No npcId found in closest.data');
      }
    } else if (closest.type === 'training_center') {
      console.log('Entering training center...');
      dispatch(setGamePhase('training'));
    } else if (closest.type === 'wisdom_center') {
      console.log('Entering wisdom center...');
      dispatch(setGamePhase('krump_wisdom'));
    } else if (closest.type === 'dance_studio') {
      console.log('Entering dance studio...');
      dispatch(setGamePhase('training'));
    } else if (closest.type === 'record_shop') {
      console.log('Entering record shop...');
      dispatch(setGamePhase('record_shop'));
    }
  }, [nearbyInteractables, currentLocation, dispatch, player.stats]);

  // Game loop with anime-style rendering
  const gameLoop = useCallback(() => {
    if (!currentMap || !imagesLoaded) return;

    // Movement logic (keyboard + touch)
    const moveSpeed = 200;
    const deltaTime = 16;
    const moveDistance = (moveSpeed * deltaTime) / 1000;
    
    let deltaX = 0;
    let deltaY = 0;
    
    // Track movement and update animation
    let currentlyMoving = false;
    
    // Keyboard controls
    if (keysPressed.current.has('a') || keysPressed.current.has('arrowleft') || touchControls.left) {
      deltaX -= moveDistance;
      setPlayerDirection('left');
      currentlyMoving = true;
    }
    if (keysPressed.current.has('d') || keysPressed.current.has('arrowright') || touchControls.right) {
      deltaX += moveDistance;
      setPlayerDirection('right');
      currentlyMoving = true;
    }
    if (keysPressed.current.has('w') || keysPressed.current.has('arrowup') || touchControls.up) {
      deltaY -= moveDistance;
      setPlayerDirection('up');
      currentlyMoving = true;
    }
    if (keysPressed.current.has('s') || keysPressed.current.has('arrowdown') || touchControls.down) {
      deltaY += moveDistance;
      setPlayerDirection('down');
      currentlyMoving = true;
    }
    
    // Update walking state and animation
    if (currentlyMoving !== isWalking) {
      setIsWalking(currentlyMoving);
    }
    
    // Update animation frame
    if (currentlyMoving) {
      animationSpeedRef.current += 0.15; // Animation speed
      if (animationSpeedRef.current >= 1) {
        setAnimationFrame(prev => (prev + 1) % 8); // 8 frames per direction
        animationSpeedRef.current = 0;
      }
    } else {
      setAnimationFrame(0); // Reset to idle frame when not moving
    }
    
    // Handle touch interact
    if (touchControls.interact) {
      handleSpacebarInteraction();
      setTouchControls(prev => ({ ...prev, interact: false }));
    }
    
    // Normalize diagonal movement
    if (deltaX !== 0 && deltaY !== 0) {
      const normalizer = Math.sqrt(2) / 2;
      deltaX *= normalizer;
      deltaY *= normalizer;
    }
    
    if (deltaX !== 0 || deltaY !== 0) {
      setPlayerPos(prev => {
        const newX = prev.x + deltaX;
        const newY = prev.y + deltaY;
        
        if (!checkCollision(newX, newY)) {
          setCameraPos({
            x: newX - canvasSize.width / 2,
            y: newY - canvasSize.height / 2
          });
          
          checkNearbyInteractables(newX, newY);
          
          return { x: newX, y: newY };
        }
        return prev;
      });
    }

    // Render anime-style map
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Clear canvas
        ctx.fillStyle = '#1a1a2e';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Apply atmosphere ambient color
        if (currentMap.atmosphere) {
          ctx.fillStyle = currentMap.atmosphere.ambientColor + '20'; // Add transparency
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        // Draw tile-based pixel art map
        if (currentMap.tileSet?.ground) {
          const startTileX = Math.floor(cameraPos.x / currentMap.tileSize);
          const startTileY = Math.floor(cameraPos.y / currentMap.tileSize);
          const endTileX = Math.min(startTileX + Math.ceil(canvas.width / currentMap.tileSize) + 1, currentMap.width);
          const endTileY = Math.min(startTileY + Math.ceil(canvas.height / currentMap.tileSize) + 1, currentMap.height);

          // Render visible tiles only for performance
          for (let y = Math.max(0, startTileY); y < endTileY; y++) {
            for (let x = Math.max(0, startTileX); x < endTileX; x++) {
              if (currentMap.tileSet.ground[y] && currentMap.tileSet.ground[y][x] !== undefined) {
                const tileId = currentMap.tileSet.ground[y][x];
                const screenX = x * currentMap.tileSize - cameraPos.x;
                const screenY = y * currentMap.tileSize - cameraPos.y;
                
                renderPixelArtTile(ctx, tileId, screenX, screenY, currentMap.tileSize);
              }
            }
          }
        }

        // Draw district boundaries for debugging (optional, can be toggled)
        if (false && currentMap.districts) {
          ctx.globalAlpha = 0.2;
          currentMap.districts.forEach((district, index) => {
            ctx.fillStyle = `hsl(${index * 60}, 70%, 50%)`;
            ctx.fillRect(
              district.bounds.x * currentMap.tileSize - cameraPos.x,
              district.bounds.y * currentMap.tileSize - cameraPos.y,
              district.bounds.width * currentMap.tileSize,
              district.bounds.height * currentMap.tileSize
            );
          });
          ctx.globalAlpha = 1.0;
        }
        
        // Draw enhanced interactables with city-specific styling
        currentMap.interactables.forEach(interactable => {
          const screenX = interactable.position.x - cameraPos.x;
          const screenY = interactable.position.y - cameraPos.y;
          const size = interactable.size || { x: 32, y: 32 };
          
          // Only draw if visible on screen
          if (screenX > -size.x && screenX < canvas.width + size.x && 
              screenY > -size.y && screenY < canvas.height + size.y) {
            
            // Draw enhanced interactable based on type
            drawEnhancedInteractable(ctx, interactable, screenX, screenY, size);
            
            // Draw interaction indicator if player is nearby
            if (nearbyInteractables.includes(interactable)) {
              ctx.fillStyle = '#FFD700';
              ctx.shadowColor = '#FFD700';
              ctx.shadowBlur = 10;
              ctx.font = isMobile ? '14px Arial' : '18px Arial';
              ctx.textAlign = 'center';
              ctx.fillText(isMobile ? '!' : 'SPACE', screenX + size.x/2, screenY - 10);
              ctx.shadowBlur = 0;
              
              // Add interaction prompt
              if (!isMobile) {
                ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
                ctx.fillRect(screenX - 30, screenY - 35, 60, 20);
                ctx.fillStyle = '#ffffff';
                ctx.font = '12px monospace';
                ctx.fillText(getInteractionText(interactable.type), screenX, screenY - 21);
              }
            }
          }
        });
        
        // Draw player sprite with enhanced shadow and effects
        const playerScreenX = playerPos.x - cameraPos.x;
        const playerScreenY = playerPos.y - cameraPos.y;
        
        // Draw player shadow
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.beginPath();
        ctx.ellipse(playerScreenX + 16, playerScreenY + 32, 12, 6, 0, 0, 2 * Math.PI);
        ctx.fill();
        
        // Draw animated player sprite from sprite sheet
        if (loadedImages.current.playerWalkSheet && loadedImages.current.playerOutlineSheet) {
          const walkSheet = loadedImages.current.playerWalkSheet;
          const outlineSheet = loadedImages.current.playerOutlineSheet;
          
          // Calculate sprite sheet coordinates with exact frame dimensions
          const frameSize = 40; // Each frame is 40x40 pixels
          const directionYCoords = { down: 0, up: 40, left: 80, right: 120 };
          
          // Limit animation frames to prevent overflow - sprite sheet has 8 frames per row
          const maxFrames = 8;
          const currentFrame = isWalking ? (animationFrame % maxFrames) : 0;
          
          const sourceX = currentFrame * frameSize;
          const sourceY = directionYCoords[playerDirection];
          
          // Draw outline/shadow first (behind main sprite)
          ctx.drawImage(
            outlineSheet,
            sourceX, sourceY, frameSize, frameSize,
            playerScreenX - 2, playerScreenY - 2, frameSize + 4, frameSize + 4
          );
          
          // Draw main walking sprite
          ctx.drawImage(
            walkSheet,
            sourceX, sourceY, frameSize, frameSize,
            playerScreenX, playerScreenY, frameSize, frameSize
          );
        } else {
          // Fallback pixel art player
          ctx.fillStyle = '#32CD32';
          ctx.fillRect(playerScreenX + 8, playerScreenY + 8, 16, 24);
          
          // Add simple face
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(playerScreenX + 10, playerScreenY + 12, 2, 2);
          ctx.fillRect(playerScreenX + 20, playerScreenY + 12, 2, 2);
          ctx.fillRect(playerScreenX + 14, playerScreenY + 18, 4, 2);
        }

        // Add enhanced ambient particles and weather effects
        drawEnhancedAmbientParticles(ctx, canvas.width, canvas.height, currentMap.atmosphere);
      }
    }
    
    animationFrameRef.current = requestAnimationFrame(gameLoop);
  }, [currentMap, cameraPos, playerPos, checkCollision, checkNearbyInteractables, imagesLoaded, nearbyInteractables, touchControls, handleSpacebarInteraction, canvasSize]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      if (['w', 'a', 's', 'd', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright'].includes(key)) {
        event.preventDefault();
        keysPressed.current.add(key);
      }
      if (key === ' ' || key === 'space') {
        event.preventDefault();
        handleSpacebarInteraction();
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      keysPressed.current.delete(key);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleSpacebarInteraction]);

  // Start game loop
  useEffect(() => {
    if (currentMap && imagesLoaded) {
      animationFrameRef.current = requestAnimationFrame(gameLoop);
    }
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [gameLoop, currentMap, imagesLoaded]);

  const handleBackToWorldMap = () => {
    dispatch(clearCurrentMap());
    dispatch(setGamePhase('world_map'));
  };

  if (!currentMap) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Loading Map...</h2>
          <Button onClick={handleBackToWorldMap}>Back to World Map</Button>
        </div>
      </div>
    );
  }

  if (!imagesLoaded) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Loading Anime World...</h2>
          <div className="animate-pulse">
            <div className="w-16 h-16 bg-primary/20 rounded-full mx-auto mb-4"></div>
            <p className="text-muted-foreground">Preparing your adventure...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Game Canvas */}
      <canvas
        ref={canvasRef}
        width={canvasSize.width}
        height={canvasSize.height}
        className={`${isMobile ? 'mx-auto my-2' : 'absolute inset-0 m-auto'} border-2 border-primary/30 rounded-lg shadow-2xl shadow-primary/20`}
        style={{ imageRendering: 'auto' }}
      />
      
      {/* UI Overlay with mobile-responsive anime styling */}
      <div className={`absolute ${isMobile ? 'top-2 left-2 right-2' : 'top-4 left-4'} bg-background/95 backdrop-blur-sm p-3 rounded-xl border border-primary/30 shadow-lg`}>
        <h3 className={`font-bold ${isMobile ? 'text-base' : 'text-lg'} text-primary`}>{currentMap.name}</h3>
        <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>
          {isMobile ? 'Use virtual controls below' : 'Use WASD or Arrow Keys to move'}
        </p>
        {nearbyInteractables.length > 0 && (
          <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-yellow-400 font-semibold animate-pulse`}>
            {isMobile ? 'Tap Interact button' : 'Press SPACE to interact'}
          </p>
        )}
        {!isMobile && (
          <>
            <p className="text-xs text-muted-foreground mt-2">
              Position: ({Math.floor(playerPos.x)}, {Math.floor(playerPos.y)})
            </p>
            <p className="text-xs text-muted-foreground">
              Direction: {playerDirection}
            </p>
          </>
        )}
        <Button 
          onClick={handleBackToWorldMap}
          variant="outline"
          size={isMobile ? "sm" : "sm"}
          className="mt-2 border-primary/50 hover:bg-primary/10"
        >
          Back to World Map
        </Button>
      </div>
      
      {/* Mobile Touch Controls */}
      {isMobile && (
        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
          {/* D-Pad */}
          <div className="relative w-32 h-32">
            {/* Up */}
            <Button
              onTouchStart={() => setTouchControls(prev => ({ ...prev, up: true }))}
              onTouchEnd={() => setTouchControls(prev => ({ ...prev, up: false }))}
              onMouseDown={() => setTouchControls(prev => ({ ...prev, up: true }))}
              onMouseUp={() => setTouchControls(prev => ({ ...prev, up: false }))}
              onMouseLeave={() => setTouchControls(prev => ({ ...prev, up: false }))}
              className="absolute top-0 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-primary/80 hover:bg-primary text-white rounded-lg border-2 border-primary-foreground/20"
              size="sm"
            >
              ↑
            </Button>
            
            {/* Left */}
            <Button
              onTouchStart={() => setTouchControls(prev => ({ ...prev, left: true }))}
              onTouchEnd={() => setTouchControls(prev => ({ ...prev, left: false }))}
              onMouseDown={() => setTouchControls(prev => ({ ...prev, left: true }))}
              onMouseUp={() => setTouchControls(prev => ({ ...prev, left: false }))}
              onMouseLeave={() => setTouchControls(prev => ({ ...prev, left: false }))}
              className="absolute top-1/2 left-0 transform -translate-y-1/2 w-10 h-10 bg-primary/80 hover:bg-primary text-white rounded-lg border-2 border-primary-foreground/20"
              size="sm"
            >
              ←
            </Button>
            
            {/* Right */}
            <Button
              onTouchStart={() => setTouchControls(prev => ({ ...prev, right: true }))}
              onTouchEnd={() => setTouchControls(prev => ({ ...prev, right: false }))}
              onMouseDown={() => setTouchControls(prev => ({ ...prev, right: true }))}
              onMouseUp={() => setTouchControls(prev => ({ ...prev, right: false }))}
              onMouseLeave={() => setTouchControls(prev => ({ ...prev, right: false }))}
              className="absolute top-1/2 right-0 transform -translate-y-1/2 w-10 h-10 bg-primary/80 hover:bg-primary text-white rounded-lg border-2 border-primary-foreground/20"
              size="sm"
            >
              →
            </Button>
            
            {/* Down */}
            <Button
              onTouchStart={() => setTouchControls(prev => ({ ...prev, down: true }))}
              onTouchEnd={() => setTouchControls(prev => ({ ...prev, down: false }))}
              onMouseDown={() => setTouchControls(prev => ({ ...prev, down: true }))}
              onMouseUp={() => setTouchControls(prev => ({ ...prev, down: false }))}
              onMouseLeave={() => setTouchControls(prev => ({ ...prev, down: false }))}
              className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-primary/80 hover:bg-primary text-white rounded-lg border-2 border-primary-foreground/20"
              size="sm"
            >
              ↓
            </Button>
          </div>
          
          {/* Interact Button */}
          <Button
            onTouchStart={() => setTouchControls(prev => ({ ...prev, interact: true }))}
            onMouseDown={() => setTouchControls(prev => ({ ...prev, interact: true }))}
            className={`w-16 h-16 rounded-full font-bold text-lg ${
              nearbyInteractables.length > 0 
                ? 'bg-yellow-500 hover:bg-yellow-400 text-black animate-pulse' 
                : 'bg-secondary/80 hover:bg-secondary text-secondary-foreground'
            } border-2 border-background/20`}
            size="sm"
          >
            {nearbyInteractables.length > 0 ? '!' : '●'}
          </Button>
        </div>
      )}

      {/* Desktop Instructions */}
      {!isMobile && (
        <div className="absolute bottom-4 right-4 bg-background/95 backdrop-blur-sm p-4 rounded-xl border border-primary/30 shadow-lg">
          <h4 className="font-semibold mb-2 text-primary">Krump Quest Controls:</h4>
          <div className="text-sm space-y-1">
            <p>🎮 WASD/Arrows: Move your krumper</p>
            <p>⌨️ SPACE: Interact with nearby objects</p>
            <p>🔥 Red Orbs: Battle bosses</p>
            <p>💬 Blue Squares: Talk to NPCs</p>
            <p>🏢 Gray Areas: Buildings/Obstacles</p>
          </div>
          <div className="mt-2 text-xs text-muted-foreground">
            Player: {player.name} ({player.primaryStyle} style)
          </div>
        </div>
      )}
      
      {/* Ambient particles overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary/30 rounded-full animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-secondary/40 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-3/4 w-1.5 h-1.5 bg-accent/30 rounded-full animate-pulse delay-500"></div>
      </div>

      {/* Dialogue Modal */}
      <DialogueModal />
    </div>
  );
}