import axios from 'axios';
import { clientCredentials } from '../client';

const dbUrl = clientCredentials.databaseURL;

const getEvents = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/events`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});
const getEvent = (eventId) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/events/${eventId}`)
    .then((response) => resolve(response.data))
    .catch(reject);
});

const createEvent = (event) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/events`, event)
    .then((response) => resolve(response.data))
    .catch(reject);
});

// eslint-disable-next-line import/prefer-default-export
export { getEvents, createEvent, getEvent };
