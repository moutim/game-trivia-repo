const initialState = {
  classButton: '',
};

const reducerClicked = (state = initialState, action) => {
  switch (action.type) {
  case 'NEXT_QUESTION':
    return { ...state,
      classButton: action.payload,
    };

  default:
    return state;
  }
};

export default reducerClicked;
