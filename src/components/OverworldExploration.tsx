import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/useAppSelector';
import { clearCurrentMap } from '@/store/slices/overworldSlice';
import { setGamePhase } from '@/store/slices/gameSlice';
import { startBattle } from '@/store/slices/battleSlice';
import { openDialogue } from '@/store/slices/dialogueSlice';
import { locationOpponents } from '@/data/opponents';
import { getInteractionText } from '@/utils/interactionHelpers';
import { Button } from '@/components/ui/button';
import DialogueModal from '@/components/DialogueModal';

export default function OverworldExploration() {
  const dispatch = useAppDispatch();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const keysPressed = useRef<Set<string>>(new Set());
  
  // Local game state
  const [playerPos, setPlayerPos] = useState({ x: 200, y: 200 });
  const [cameraPos, setCameraPos] = useState({ x: 0, y: 0 });
  const [nearestInteractable, setNearestInteractable] = useState<any>(null);
  
  const { currentMap } = useAppSelector(state => state.overworld);
  const { currentLocation } = useAppSelector(state => state.world);

  // Initialize positions when map loads
  useEffect(() => {
    if (currentMap) {
      const spawn = currentMap.spawnPoint;
      setPlayerPos({ ...spawn });
      setCameraPos({ x: spawn.x - 400, y: spawn.y - 300 });
    }
  }, [currentMap]);

  const checkCollision = useCallback((x: number, y: number): boolean => {
    if (!currentMap) return true;
    
    const tileX = Math.floor(x / currentMap.tileSize);
    const tileY = Math.floor(y / currentMap.tileSize);
    
    if (tileX < 0 || tileX >= currentMap.width || tileY < 0 || tileY >= currentMap.height) {
      return true;
    }
    
    return currentMap.collisionMap[tileY][tileX] === 1;
  }, [currentMap]);

  const checkInteractables = useCallback((x: number, y: number) => {
    if (!currentMap) return;
    
    const playerCenter = { x: x + 16, y: y + 16 };
    let closest = null;
    let closestDistance = Infinity;
    
    currentMap.interactables.forEach(interactable => {
      const distance = Math.sqrt(
        Math.pow(playerCenter.x - interactable.position.x, 2) + 
        Math.pow(playerCenter.y - interactable.position.y, 2)
      );
      
      if (distance < 50 && distance < closestDistance) {
        closest = interactable;
        closestDistance = distance;
      }
    });
    
    setNearestInteractable(closest);
  }, [currentMap]);

  const handleInteraction = useCallback(() => {
    if (!nearestInteractable) return;
    
    if (nearestInteractable.type === 'battle_trigger') {
      const opponents = locationOpponents[currentLocation?.id || ''];
      if (opponents && Array.isArray(opponents) && opponents.length > 0) {
        dispatch(startBattle(opponents[0]));
        dispatch(setGamePhase('battle'));
      }
    } else if (nearestInteractable.type === 'npc') {
      dispatch(openDialogue({ 
        npcId: nearestInteractable.data.npcId 
      }));
    }
  }, [nearestInteractable, currentLocation, dispatch]);

  // Game loop
  const gameLoop = useCallback(() => {
    if (!currentMap) return;

    // Movement logic
    const moveSpeed = 200; // pixels per second
    const deltaTime = 16; // assuming 60fps
    const moveDistance = (moveSpeed * deltaTime) / 1000;
    
    let deltaX = 0;
    let deltaY = 0;
    
    if (keysPressed.current.has('a') || keysPressed.current.has('arrowleft')) deltaX -= moveDistance;
    if (keysPressed.current.has('d') || keysPressed.current.has('arrowright')) deltaX += moveDistance;
    if (keysPressed.current.has('w') || keysPressed.current.has('arrowup')) deltaY -= moveDistance;
    if (keysPressed.current.has('s') || keysPressed.current.has('arrowdown')) deltaY += moveDistance;
    
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
          // Update camera
          setCameraPos({
            x: newX - 400,
            y: newY - 300
          });
          
          // Check interactables
          checkInteractables(newX, newY);
          
          return { x: newX, y: newY };
        }
        return prev;
      });
    }

    // Render
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Clear canvas
        ctx.fillStyle = '#2a2a2a';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw grid
        ctx.strokeStyle = '#444';
        ctx.lineWidth = 1;
        
        const startX = Math.floor(cameraPos.x / currentMap.tileSize) * currentMap.tileSize;
        const startY = Math.floor(cameraPos.y / currentMap.tileSize) * currentMap.tileSize;
        const endX = startX + canvas.width + currentMap.tileSize;
        const endY = startY + canvas.height + currentMap.tileSize;
        
        for (let x = startX; x < endX; x += currentMap.tileSize) {
          for (let y = startY; y < endY; y += currentMap.tileSize) {
            const screenX = x - cameraPos.x;
            const screenY = y - cameraPos.y;
            
            if (screenX >= -currentMap.tileSize && screenX < canvas.width && 
                screenY >= -currentMap.tileSize && screenY < canvas.height) {
              
              const tileX = Math.floor(x / currentMap.tileSize);
              const tileY = Math.floor(y / currentMap.tileSize);
              
              if (tileX >= 0 && tileX < currentMap.width && 
                  tileY >= 0 && tileY < currentMap.height) {
                
                const isCollision = currentMap.collisionMap[tileY][tileX] === 1;
                
                if (isCollision) {
                  ctx.fillStyle = '#666';
                  ctx.fillRect(screenX, screenY, currentMap.tileSize, currentMap.tileSize);
                }
                
                ctx.strokeRect(screenX, screenY, currentMap.tileSize, currentMap.tileSize);
              }
            }
          }
        }
        
        // Draw interactables
        currentMap.interactables.forEach(interactable => {
          const screenX = interactable.position.x - cameraPos.x;
          const screenY = interactable.position.y - cameraPos.y;
          
          if (screenX >= -32 && screenX < canvas.width && 
              screenY >= -32 && screenY < canvas.height) {
            
            // Different colors for different types
            if (interactable.type === 'npc') {
              ctx.fillStyle = '#00ccff';
            } else {
              ctx.fillStyle = '#ffcc00';
            }
            
            ctx.fillRect(screenX - 16, screenY - 16, 32, 32);
            
            // Show interaction text if this is the nearest interactable
            if (nearestInteractable && nearestInteractable.id === interactable.id) {
              ctx.fillStyle = '#ffffff';
              ctx.font = '12px monospace';
              ctx.textAlign = 'center';
              const interactionText = getInteractionText(interactable.type);
              ctx.fillText(interactionText, screenX, screenY - 20);
            }
          }
        });
        
        // Draw player
        ctx.fillStyle = '#00ff00';
        const playerScreenX = playerPos.x - cameraPos.x;
        const playerScreenY = playerPos.y - cameraPos.y;
        ctx.fillRect(playerScreenX, playerScreenY, 32, 32);
      }
    }
    
    animationFrameRef.current = requestAnimationFrame(gameLoop);
  }, [currentMap, cameraPos, playerPos, checkCollision, checkInteractables]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      if (['w', 'a', 's', 'd', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright'].includes(key)) {
        event.preventDefault();
        keysPressed.current.add(key);
      } else if (key === ' ') {
        event.preventDefault();
        handleInteraction();
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
  }, [handleInteraction]);

  // Start game loop
  useEffect(() => {
    if (currentMap) {
      animationFrameRef.current = requestAnimationFrame(gameLoop);
    }
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [gameLoop, currentMap]);

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

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Game Canvas */}
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        className="absolute inset-0 m-auto border border-border"
        style={{ imageRendering: 'pixelated' }}
      />
      
      {/* UI Overlay */}
      <div className="absolute top-4 left-4 bg-background/90 p-4 rounded-lg border border-border">
        <h3 className="font-bold text-lg">{currentMap.name}</h3>
        <p className="text-sm text-muted-foreground">Use WASD or Arrow Keys to move</p>
        <p className="text-xs text-muted-foreground mt-2">
          Position: ({Math.floor(playerPos.x)}, {Math.floor(playerPos.y)})
        </p>
        <Button 
          onClick={handleBackToWorldMap}
          variant="outline"
          size="sm"
          className="mt-2"
        >
          Back to World Map
        </Button>
      </div>
      
      {/* Instructions */}
      <div className="absolute bottom-4 right-4 bg-background/90 p-4 rounded-lg border border-border">
        <h4 className="font-semibold mb-2">Controls:</h4>
        <div className="text-sm space-y-1">
          <p>WASD or Arrow Keys: Move</p>
          <p>Space: Interact</p>
          <p>Blue squares: NPCs</p>
          <p>Yellow squares: Battle</p>
          <p>Gray squares: Obstacles</p>
        </div>
      </div>
      
      {/* Dialogue Modal */}
      <DialogueModal />
    </div>
  );
}