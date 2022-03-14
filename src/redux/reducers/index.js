import { combineReducers } from 'redux';
import reducerLogin from './reducerLogin';
import token from './reducerToken';
import player from './reducerPlayer';

const rootReducer = combineReducers({ reducerLogin, token, player });

export default rootReducer;
