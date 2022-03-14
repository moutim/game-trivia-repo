import {
  GET_TOKEN_SUCCESS,
} from '../actions/actionsType';

const token = (state = '', action) => {
  switch (action.type) {
  case GET_TOKEN_SUCCESS:
    return action.payload.token;
  default:
    return state;
  }
};

export default token;
