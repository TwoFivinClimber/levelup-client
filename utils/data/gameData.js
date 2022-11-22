import { clientCredentials } from '../client';

const dbUrl = clientCredentials.databaseURL;

const getGames = () => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/games`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const createGame = (game) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/games`, {
    method: 'POST',
    body: JSON.stringify(game),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((response) => resolve(response.data))
    .catch(reject);
});

const getGameTypes = () => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/gametypes`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

export { getGames, createGame, getGameTypes };
