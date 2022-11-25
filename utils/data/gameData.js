import axios from 'axios';
import { clientCredentials } from '../client';

const dbUrl = clientCredentials.databaseURL;

const getGames = () => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/games`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getGame = (gameId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/games/${gameId}`)
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

const updateGame = (gameObj, id) => new Promise((resolve, reject) => {
  axios.put(`${dbUrl}/games/${id}`, gameObj)
    .then((response) => resolve(response.data))
    .catch(reject);
});

const deleteGame = (id) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/games/${id}`)
    .then(resolve)
    .catch(reject);
});

export {
  getGames, getGame, createGame, getGameTypes, updateGame, deleteGame,
};
