import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    messageList: undefined
}

const messageSlice = createSlice({
    name: "messageList",
    initialState,
    reducers: {
        setMessageList: (state, action) =>{
            state.messageList = action.payload
        }
    }
})

export const {setMessageList} = messageSlice.actions
export default messageSlice.reducer