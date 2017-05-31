import io from 'socket.io-client';

import * as actionTypes from '../actionTypes';


const applySocketCallbacks = (socket, dispatch) => {
  socket.on('connected', (msg) => {
    localStorage.uid = msg.uid;
    localStorage.nickname = msg.nickname;

    dispatch({
      type: actionTypes.CONNECTED,
      payload: {
        socket,
        usersList: msg.usersList || [],
        messages: msg.messages,
      },
    });
  });

  socket.on('messageReceived', (msg) => {
    dispatch({
      type: actionTypes.MESSAGE_RECEIVED,
      payload: msg,
    });
  });

  socket.on('messageSent', () => {
    dispatch({
      type: actionTypes.MESSAGE_SENT,
    });
  });

  socket.on('userConnected', (msg) => {
    dispatch({
      type: actionTypes.USER_CONNECTED,
      payload: msg,
    });
  });

  socket.on('userDisconnected', (msg) => {
    dispatch({
      type: actionTypes.USER_DISCONNECTED,
      payload: msg,
    });
  });
};

export const socketsConnect = () => (dispatch) => {
  const socket = io('http://localhost:3000');

  const signInData = {
    uid: localStorage.uid || null,
    nickname: localStorage.nickname || null,
  };

  socket.emit('signIn', signInData);

  dispatch({
    type: actionTypes.CONNECTING,
  });

  applySocketCallbacks(socket, dispatch);
};

export const socketsSend = (msg) => (dispatch, getState) => {
  getState().sockets.socket.emit('message', encodeURI(msg));
  dispatch({
    type: actionTypes.MESSAGE_SENDING,
  });
};

export const socketsDisconnect = () => (dispatch, getState) => {
  getState().sockets.socket.disconnect();
  dispatch({
    type: actionTypes.DISCONNECT,
  });
};

export const showNicknameForm = () => ({
  type: actionTypes.SHOW_NICKNAME_FORM,
});

export const hideNicknameForm = () => ({
  type: actionTypes.HIDE_NICKNAME_FORM,
});

export const toggleUsersList = () => ({
  type: actionTypes.TOGGLE_USERS_LIST,
});
