import getToken from '../../services/tokenAPI';
import {
  REQUEST_TOKEN,
  GET_TOKEN_ERROR,
  GET_TOKEN_SUCCESS,
} from './actionsType';

const requestToken = () => ({
  type: REQUEST_TOKEN,
});

const getTokenSuccess = (token) => ({
  type: GET_TOKEN_SUCCESS,
  payload: token,
});

const getTokenError = (error) => ({
  type: GET_TOKEN_ERROR,
  payload: error,
});

const fetchToken = () => async (dispatch) => {
  dispatch(requestToken());

  try {
    const getTokenAPI = await getToken();
    dispatch(getTokenSuccess(getTokenAPI));
  } catch (error) {
    dispatch(getTokenError(error));
  }
};

export default fetchToken;
