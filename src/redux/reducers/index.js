import { combineReducers } from 'redux';
import reducerLogin from './reducerLogin';
import token from './reducerToken';

const rootReducer = combineReducers({ reducerLogin, token });

export default rootReducer;
