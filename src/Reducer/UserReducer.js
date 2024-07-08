import {
  GET_ALL_CHATS,
  GET_ALL_MSG,
  CHATDATA,
  } from "../Action/ActionType";

  
  const initialState = {
    allChats: [],
    allMessages: [],
    openChatData:null
  };
  const UserReducers = (state = initialState, action) => {
    switch (action.type) {
      case GET_ALL_CHATS:
        return {
          ...state,
          allChats: action.payload,
        };
      case GET_ALL_MSG:
        return {
          ...state,
          allMessages: action.payload,
        };
      case CHATDATA:
        return {
          ...state,
          openChatData: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default UserReducers;