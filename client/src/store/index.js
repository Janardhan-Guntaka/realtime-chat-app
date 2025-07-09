import { create } from "zustand";
import { createAuthSlice } from "./slices/auth-slice";
import { createChatSlice } from "./slices/chat-slice";

export const useAppStore = create()((...a)=> ({
    ...createAuthSlice(...a),
    ...createChatSlice(...a),
    // Add other slices here as needed
}))