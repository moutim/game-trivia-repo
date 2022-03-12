const getToken = async () => {
  const result = await fetch('https://opentdb.com/api_token.php?command=request');
  const data = await result.json();

  localStorage.setItem('token', data.token);

  return data;
};

export default getToken;
