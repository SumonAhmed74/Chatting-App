import { createSlice } from "@reduxjs/toolkit";

export const activeChatSlice = createSlice({
    name: "activeChat",
    initialState:{
        value:"M.R Sumon",
    },

    reducers:{
        activeName:(state,action)=>{
            state.value = action.payload
        },
    }

})

export const {activeName} = activeChatSlice.actions;
export default activeChatSlice.reducer;