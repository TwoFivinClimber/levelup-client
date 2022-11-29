import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React from 'react';
import {
  BsFillPencilFill,
  BsFillTrashFill,
  BsArrowLeftSquare,
  BsArrowRightSquare,
} from 'react-icons/bs';
import { Card, Button } from 'react-bootstrap';
import { deleteEvent, joinEvent, leaveEvent } from '../utils/data/eventData';
import { useAuth } from '../utils/context/authContext';

const EventCard = ({ obj, onUpdate }) => {
  const router = useRouter();
  const { user } = useAuth();
  const userLogged = { uid: user.uid };

  const deleteThisEvent = (eventId) => {
    if (window.confirm('Are you sure?')) {
      deleteEvent(eventId).then(() => onUpdate());
    }
  };

  const joinThisEvent = () => {
    joinEvent(obj.id, userLogged).then(() => onUpdate());
  };

  const leaveThisEvent = () => {
    leaveEvent(obj.id, userLogged).then(() => onUpdate());
  };

  return (
    <Card className="text-center">
      <div className="join-event-div">
        <Card.Title>{obj.description}</Card.Title>
        {obj.joined
          ? <i><BsArrowRightSquare onClick={() => leaveThisEvent()} className="leave-event-button" /> Leave Event</i>
          : <i><BsArrowLeftSquare onClick={() => joinThisEvent()} className="join-event-button" /> Join Event</i> }
      </div>
      <Card.Body>
        <Card.Text>Game: {obj.game.title}</Card.Text>
        <Card.Text>{obj.date} {obj.time.toLocaleString()}</Card.Text>
        <Card.Text>By: Gamer No.{obj.organizer.id}</Card.Text>
        {obj.organizer.id === user.id ? (
          <><Button onClick={() => router.push(`/events/edit/${obj.id}`)}><BsFillPencilFill /></Button><Button onClick={() => deleteThisEvent(obj.id)}><BsFillTrashFill /></Button></>
        ) : ''}
      </Card.Body>
      <Card.Footer className="text-muted">Skill Level: {obj.game.skill_level}</Card.Footer>
    </Card>
  );
};

EventCard.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
    game: PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      maker: PropTypes.string,
      gamer: PropTypes.number,
      number_of_player: PropTypes.number,
      skill_level: PropTypes.number,
    }).isRequired,
    description: PropTypes.string,
    date: PropTypes.string,
    time: PropTypes.string,
    organizer: PropTypes.shape({
      id: PropTypes.number,
      uid: PropTypes.string,
      bio: PropTypes.string,
    }),
    joined: PropTypes.bool,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default EventCard;
