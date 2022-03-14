import getToken from './tokenAPI';

const requestQuestions = async (token) => {
  const result = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
  const data = await result.json();

  return data;
};

const fetchQuestionsAPI = async (token) => {
  const data = await requestQuestions(token);

  const expirateCodeToken = 3;

  if (data.response_code === expirateCodeToken) {
    await getToken();
    const newToken = localStorage.getItem('token');
    const questions = requestQuestions(newToken);
    return questions;
  } return data;
};

export default fetchQuestionsAPI;
