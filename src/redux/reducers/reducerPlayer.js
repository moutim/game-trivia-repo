import {
  SEND_SCORE,
  SEND_ASSERTIONS,
  ADD_USER,
  SEND_PICTURE_GRAVATAR,
} from '../actions/actionsType';

const initialState = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
  pictureGravatar: '',
};

const player = (state = initialState, action) => {
  switch (action.type) {
  case ADD_USER:
    return {
      ...state,
      name: action.payload.name,
      gravatarEmail: action.payload.email,
    };
  case SEND_PICTURE_GRAVATAR:
    return {
      ...state,
      pictureGravatar: action.payload,
    };
  case SEND_SCORE:
    return {
      ...state,
      score: state.score + action.payload,
    };
  case SEND_ASSERTIONS:
    return {
      ...state,
      assertions: state.assertions + 1,
    };
  default:
    return state;
  }
};

export default player;
