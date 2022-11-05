import { configureStore } from "@reduxjs/toolkit";
import activeChatSlice from "./activeChatSlice";
import notificationSlice from "./notificationSlice";

export default configureStore({
    reducer: {
        activeChat: activeChatSlice,
        notification: notificationSlice,
    },
})