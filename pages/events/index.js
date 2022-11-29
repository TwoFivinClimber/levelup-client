/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import EventCard from '../../components/EventCard';
import { getEvents } from '../../utils/data/eventData';
import { useAuth } from '../../utils/context/authContext';

function Event() {
  const router = useRouter();
  const [events, setEvents] = useState([]);
  const { user } = useAuth();

  const getTheContent = () => {
    getEvents(user.uid).then(setEvents);
  };

  useEffect(() => {
    getTheContent();
  }, [user, router]);
  return (
    <>
      <Button onClick={() => { router.push('/events/new'); }}>Register New Event</Button>
      <article className="games" />
      <h1>Events</h1>
      {events.map((event) => (
        <EventCard key={event.id} obj={event} onUpdate={getTheContent} />
      ))}
    </>
  );
}

export default Event;
