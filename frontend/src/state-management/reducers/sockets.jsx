import * as actionTypes from '../actions/actionTypes';

const initialState = {
  loaded: true,
  connected: false,
  message: 'init',
  socket: null,
};

export default function sockets(state = initialState, action) {
  switch (action.type) {

    case actionTypes.CONNECTING:
      return { ...state,
        loaded: true,
        connected: false,
        message: 'Connecting...',
      };

    case actionTypes.CONNECTED:
      return { ...state,
        loaded: true,
        connected: true,
        message: 'Connected.',
        socket: action.payload.socket,
      };

    case actionTypes.MESSAGE_SENDING:
      return { ...state,
        message: 'Message sending...',
      };

    case actionTypes.MESSAGE_SENT:
      return { ...state,
        message: 'Message sent.',
      };

    case actionTypes.DISCONNECT:
      return { ...state,
        loaded: true,
        connected: false,
        message: 'Disconnected.',
        socket: null,
      };

    default:
      return state;
  }
}
