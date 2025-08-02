import { useEffect, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/useAppSelector';
import { addMovementToQueue, removeMovementFromQueue, clearMovementQueue } from '@/store/slices/overworldSlice';

export const useOverworldControls = () => {
  const dispatch = useAppDispatch();
  const { movementQueue, isMoving } = useAppSelector(state => state.overworld);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    const key = event.key.toLowerCase();
    const validKeys = ['w', 'a', 's', 'd', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright'];
    
    if (!validKeys.includes(key)) return;
    
    event.preventDefault();
    
    let direction = '';
    switch (key) {
      case 'w':
      case 'arrowup':
        direction = 'up';
        break;
      case 's':
      case 'arrowdown':
        direction = 'down';
        break;
      case 'a':
      case 'arrowleft':
        direction = 'left';
        break;
      case 'd':
      case 'arrowright':
        direction = 'right';
        break;
    }
    
    if (direction && !movementQueue.includes(direction)) {
      dispatch(addMovementToQueue(direction));
    }
  }, [dispatch, movementQueue]);

  const handleKeyUp = useCallback((event: KeyboardEvent) => {
    const key = event.key.toLowerCase();
    const validKeys = ['w', 'a', 's', 'd', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright'];
    
    if (!validKeys.includes(key)) return;
    
    event.preventDefault();
    
    let direction = '';
    switch (key) {
      case 'w':
      case 'arrowup':
        direction = 'up';
        break;
      case 's':
      case 'arrowdown':
        direction = 'down';
        break;
      case 'a':
      case 'arrowleft':
        direction = 'left';
        break;
      case 'd':
      case 'arrowright':
        direction = 'right';
        break;
    }
    
    if (direction) {
      dispatch(removeMovementFromQueue(direction));
    }
  }, [dispatch]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      dispatch(clearMovementQueue());
    };
  }, [handleKeyDown, handleKeyUp, dispatch]);

  return { movementQueue };
};