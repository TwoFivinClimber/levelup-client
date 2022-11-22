import { Button } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import EventCard from '../../components/EventCard';
import { getEvents } from '../../utils/data/eventData';

function Event() {
  const router = useRouter();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getEvents().then(setEvents);
  }, []);
  return (
    <>
      <Button onClick={() => { router.push('/events/new'); }}>Register New Event</Button>
      <article className="games" />
      <h1>Events</h1>
      {events.map((event) => (
        <EventCard key={event.id} obj={event} />
      ))}
    </>
  );
}

export default Event;
