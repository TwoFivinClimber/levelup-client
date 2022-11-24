import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import EventForm from '../../../components/EventForm';
import { getEvent } from '../../../utils/data/eventData';
import { useAuth } from '../../../utils/context/authContext';

function EditEvent() {
  const [event, setEvent] = useState({});
  const { user } = useAuth();
  const router = useRouter();
  const { eventId } = router.query;

  useEffect(() => {
    getEvent(eventId).then(setEvent);
  }, [router, user, eventId]);
  return (
    <EventForm eventObj={event} user={user} />
  );
}

export default EditEvent;
