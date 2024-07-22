import { configureStore } from "@reduxjs/toolkit";
import receiverReducer from "./features/user/receiverSlice";
import messageListReducer from "./features/message/messageSlice";

const store = configureStore({
  reducer: {
    receiver: receiverReducer,
    messageList : messageListReducer
  },
});

export default store;
