import React, { useState, useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/useAppSelector';
import { closeDialogue, setConversation } from '@/store/slices/dialogueSlice';
import { npcDialogues, NPCDialogue } from '@/data/npcDialogues';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

export default function DialogueModal() {
  const dispatch = useAppDispatch();
  const { isOpen, currentNPC, currentConversationId } = useAppSelector(state => state.dialogue);
  const { currentLocation } = useAppSelector(state => state.world);
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showResponses, setShowResponses] = useState(false);

  // Memoized current NPC data to prevent infinite re-renders
  const currentNPCData = useMemo((): NPCDialogue | null => {
    if (!currentLocation || !currentNPC || !currentLocation.id) return null;
    const locationNPCs = npcDialogues[currentLocation.id] || [];
    return locationNPCs.find(npc => npc.id === currentNPC) || null;
  }, [currentLocation?.id, currentNPC]);

  // Memoized current conversation to prevent infinite re-renders
  const currentConversation = useMemo(() => {
    if (!currentNPCData || !currentConversationId || !currentNPCData.dialogues) return null;
    return currentNPCData.dialogues.conversations.find(conv => conv.id === currentConversationId);
  }, [currentNPCData, currentConversationId]);

  // Typewriter effect
  useEffect(() => {
    if (!currentConversation) return;

    setDisplayText('');
    setIsTyping(true);
    setShowResponses(false);

    const text = currentConversation.text;
    let index = 0;

    const typeInterval = setInterval(() => {
      if (index < text.length) {
        setDisplayText(text.slice(0, index + 1));
        index++;
      } else {
        setIsTyping(false);
        setShowResponses(true);
        clearInterval(typeInterval);
      }
    }, 30); // Typing speed

    return () => clearInterval(typeInterval);
  }, [currentConversation]);

  // Initialize with first conversation or initial dialogue
  useEffect(() => {
    if (isOpen && currentLocation?.id && currentNPC && !currentConversationId) {
      // Show initial dialogue first time meeting this NPC
      const locationNPCs = npcDialogues[currentLocation.id] || [];
      const npc = locationNPCs.find(npc => npc.id === currentNPC);
      if (npc?.dialogues?.conversations?.[0]) {
        dispatch(setConversation(npc.dialogues.conversations[0].id));
      }
    }
  }, [isOpen, currentLocation?.id, currentNPC, currentConversationId, dispatch]);

  const handleResponseClick = (response: any) => {
    if (response.nextId) {
      dispatch(setConversation(response.nextId));
    } else {
      dispatch(closeDialogue());
    }
  };

  const handleClose = () => {
    dispatch(closeDialogue());
  };

  if (!isOpen || !currentNPCData) {
    return null;
  }

  
  
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4" style={{ zIndex: 9999 }}>
      <div className="bg-gradient-to-b from-slate-900 to-slate-800 border border-slate-700 rounded-lg shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-700">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">
                {currentNPCData.name.charAt(0)}
              </span>
            </div>
            <div>
              <h3 className="text-white font-bold text-lg">{currentNPCData.name}</h3>
              <p className="text-slate-400 text-sm">Local Krump Expert</p>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={handleClose}
            className="text-slate-400 hover:text-white"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Dialogue Content */}
        <div className="p-6 space-y-6">
          {/* Initial greeting (shown first time) */}
          {currentConversation && currentNPCData && currentNPCData.dialogues && currentNPCData.dialogues.conversations[0] && 
           currentConversation.id === currentNPCData.dialogues.conversations[0].id && (
            <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-600">
              <div className="text-slate-300 space-y-2">
                {currentNPCData.dialogues.initial.map((line, index) => (
                  <p key={index} className="italic">{line}</p>
                ))}
              </div>
            </div>
          )}

          {/* Current conversation text */}
          {currentConversation ? (
            <div className="bg-slate-800/30 p-4 rounded-lg border border-slate-600">
              <p className="text-white text-lg leading-relaxed">
                {displayText}
                {isTyping && <span className="animate-pulse">|</span>}
              </p>
            </div>
          ) : (
            <div className="bg-slate-800/30 p-4 rounded-lg border border-slate-600">
              <p className="text-white text-lg leading-relaxed">
                Loading conversation...
              </p>
            </div>
          )}

          {/* Response options */}
          {showResponses && currentConversation && currentConversation.responses && (
            <div className="space-y-3">
              <p className="text-slate-400 text-sm font-medium">Your response:</p>
              <div className="space-y-2">
                {currentConversation.responses.map((response, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full justify-start text-left h-auto p-4 border-slate-600 hover:border-primary hover:bg-primary/10"
                    onClick={() => handleResponseClick(response)}
                  >
                    <span className="text-white">{response.text}</span>
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* End conversation button if no responses */}
          {showResponses && currentConversation && !currentConversation.responses && (
            <div className="text-center">
              <Button onClick={handleClose} className="bg-primary hover:bg-primary/80">
                End Conversation
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}