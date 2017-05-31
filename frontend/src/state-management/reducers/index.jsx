import { combineReducers } from 'redux';
import sockets from './sockets';
import messageList from './messagelist';

export default combineReducers({
  sockets, messageList,
});
