import {
  // REQUEST_TOKEN,
  GET_TOKEN_SUCCESS,
  // GET_TOKEN_ERROR,
} from '../actions/actionsType';

const initialState = '';

const token = (state = initialState, action) => {
  switch (action.type) {
  // case REQUEST_TOKEN:
  //   return { ...state, isLoading: true };
  case GET_TOKEN_SUCCESS:
    return action.payload.token;
  // case GET_TOKEN_ERROR:
  //   return { ...state, isLoading: false, error: action.payload.error.message };
  default:
    return state;
  }
};

export default token;
