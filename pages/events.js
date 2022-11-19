import React, { useEffect, useState } from 'react';
import EventCard from '../components/EventCard';
import { getEvents } from '../utils/data/eventData';

function Event() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getEvents().then(setEvents);
  }, []);
  return (
    <>
      <h1>Events</h1>
      {events.map((event) => (
        <EventCard obj={event} />
      ))}
    </>
  );
}

export default Event;
