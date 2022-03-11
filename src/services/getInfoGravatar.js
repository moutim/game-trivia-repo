const getInfoGravatar = async (hash) => {
  try {
    const result = await fetch(`https://www.gravatar.com/avatar/${hash}`);
    const data = await result.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export default getInfoGravatar;
