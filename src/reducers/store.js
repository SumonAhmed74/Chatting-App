import { configureStore } from "@reduxjs/toolkit";
import activeChatSlice from "./activeChatSlice";

export default configureStore({
    reducer: {
        activeChat: activeChatSlice,
    },
})