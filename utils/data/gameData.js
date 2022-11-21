import { clientCredentials } from '../client';

const dbUrl = clientCredentials.databaseURL;

const getGames = () => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/games`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const createGame = (game) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/games`, game)
    .then(resolve)
    .catch(reject);
});

const getGameTypes = () => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/gametypes`, {})
    .then(resolve)
    .catch(reject);
});

export { getGames, createGame, getGameTypes };
