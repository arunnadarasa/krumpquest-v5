import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface DialogueState {
  isOpen: boolean;
  currentNPC: string | null;
  currentConversationId: string | null;
  conversationHistory: string[];
  npcMet: string[];
}

const initialState: DialogueState = {
  isOpen: false,
  currentNPC: null,
  currentConversationId: null,
  conversationHistory: [],
  npcMet: []
};

const dialogueSlice = createSlice({
  name: 'dialogue',
  initialState,
  reducers: {
    openDialogue: (state, action: PayloadAction<{ npcId: string; conversationId?: string }>) => {
      state.isOpen = true;
      state.currentNPC = action.payload.npcId;
      state.currentConversationId = action.payload.conversationId || null;
      
      // Track that we've met this NPC
      if (!state.npcMet.includes(action.payload.npcId)) {
        state.npcMet.push(action.payload.npcId);
      }
    },
    
    closeDialogue: (state) => {
      state.isOpen = false;
      state.currentNPC = null;
      state.currentConversationId = null;
    },
    
    setConversation: (state, action: PayloadAction<string>) => {
      state.currentConversationId = action.payload;
    },
    
    addToHistory: (state, action: PayloadAction<string>) => {
      state.conversationHistory.push(action.payload);
    },
    
    clearHistory: (state) => {
      state.conversationHistory = [];
    }
  }
});

export const {
  openDialogue,
  closeDialogue,
  setConversation,
  addToHistory,
  clearHistory
} = dialogueSlice.actions;

export default dialogueSlice.reducer;