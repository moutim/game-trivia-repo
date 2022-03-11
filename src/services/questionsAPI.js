const fetchQuestionsAPI = async (token) => {
  const result = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
  const data = await result.json();

  return data;
};

export default fetchQuestionsAPI;
