import getToken from '../../services/tokenAPI';
import {
  GET_TOKEN_SUCCESS,
} from './actionsType';

const getTokenSuccess = (token) => ({
  type: GET_TOKEN_SUCCESS,
  payload: token,
});

const fetchToken = () => async (dispatch) => {
  const getTokenAPI = await getToken();
  dispatch(getTokenSuccess(getTokenAPI));
};

export default fetchToken;
