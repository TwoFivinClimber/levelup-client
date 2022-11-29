import axios from 'axios';
import { clientCredentials } from '../client';

const dbUrl = clientCredentials.databaseURL;

const getEvents = (uid) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/events?uid=${uid}`)
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

const updateEvent = (eventObj, id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/events/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(eventObj),
  })
    .then((response) => resolve(response.data))
    .catch(reject);
});

const deleteEvent = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/events/${id}`, {
    method: 'DELETE',
  }).then(resolve).catch(reject);
});

const joinEvent = (id, user) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/events/${id}/signup`, user)
    .then(resolve)
    .catch(reject);
});

const leaveEvent = (id, user) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/events/${id}/leave`, { data: user })
    .then(resolve)
    .catch(reject);
});

// eslint-disable-next-line import/prefer-default-export
export {
  getEvents, createEvent, getEvent, updateEvent, deleteEvent, joinEvent, leaveEvent,
};
