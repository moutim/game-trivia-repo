import { combineReducers } from 'redux';
import reducerLogin from './reducerLogin';
import token from './reducerToken';
import reducerClicked from './reducerQuestions';

const rootReducer = combineReducers({ reducerLogin, token, reducerClicked });

export default rootReducer;
