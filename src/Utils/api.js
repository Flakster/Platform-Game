import 'regenerator-runtime';

const baseUrl = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/';

const apiKey = 'u4iAT4NCsx8NBCk4E1HV';
const url = `${baseUrl}games/${apiKey}/scores/`;


const getKey = async() => {
  const apiParam = {
    name: 'Planetary Traveller'
  };
  try {
    const response = await fetch(
      `${baseUrl}games/`,
      {
        method: 'POST',        
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Request-Method': 'POST',
        },
        body: JSON.stringify(apiParam),
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    return error
  }
}

const setScore = async (playerName, score) => {
  const apiParam = {
    user: playerName,
    score: score,
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Request-Method': 'POST',
      },
      body: JSON.stringify(apiParam),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

const getScore = async () => {
  const response = await fetch(`${baseUrl}games/${apiKey}/scores/`, {
    mode: 'cors',
  });
  if (!response.ok) {
    throw new Error('An error occurred.');
  } else {
    const result = await response.json();
    return result;
  }
};

const api = {
  getKey,
  setScore,
  getScore,
};

export default api;