import { ADD_USER } from '../actions/actionsType';

const innitialLogin = {
  email: '',
  name: '',
};

const reducerLogin = (state = innitialLogin, action) => {
  switch (action.type) {
  case ADD_USER:
    return {
      ...state,
      email: action.payload.email,
      name: action.payload.name,
    };

  default:
    return state;
  }
};

export default reducerLogin;
