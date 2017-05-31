import * as actionTypes from '../actions/actionTypes';

const initialState = {
  messages: [],
  hidden: false,
};

export default function messageList(state = initialState, action) {
  switch (action.type) {

    case actionTypes.CONNECTED:
      return { ...state, messages: action.payload.messages };

    case actionTypes.MESSAGE_RECEIVED:
      return { ...state,
        messages: state.messages.concat({
          name: action.payload.name,
          text: action.payload.text,
          time: action.payload.time,
        }),
      };

    default:
      return state;
  }
}
