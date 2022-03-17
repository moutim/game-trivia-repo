import {
  ADD_USER,
  SEND_SCORE,
  SEND_ASSERTIONS,
  SEND_PICTURE_GRAVATAR,
  CLEAR_SCORE } from './actionsType';

export const addPlayer = (payload) => ({ type: ADD_USER, payload });

export const addScore = (payload) => ({ type: SEND_SCORE, payload });

export const addAssertions = () => ({ type: SEND_ASSERTIONS });

export const addGravatarPicture = (payload) => ({ type: SEND_PICTURE_GRAVATAR, payload });

export const clearScore = (payload) => ({ type: CLEAR_SCORE, payload });
