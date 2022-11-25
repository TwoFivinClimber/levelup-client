import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React from 'react';
import { BsFillPencilFill, BsFillTrashFill } from 'react-icons/bs';
import { Card, Button } from 'react-bootstrap';
import { deleteEvent } from '../utils/data/eventData';

const EventCard = ({ obj, onUpdate }) => {
  const router = useRouter();

  const deleteThisEvent = (eventId) => {
    if (window.confirm('Are you sure?')) {
      deleteEvent(eventId).then(() => onUpdate());
    }
  };

  return (
    <Card className="text-center">
      <Card.Title>{obj.description}</Card.Title>
      <Card.Body>
        <Card.Text>Game: {obj.game.title}</Card.Text>
        <Card.Text>{obj.date} {obj.time.toLocaleString()}</Card.Text>
        <Card.Text>By: Gamer No.{obj.organizer.id}</Card.Text>
        <Button onClick={() => router.push(`/events/edit/${obj.id}`)}><BsFillPencilFill /></Button>
        <Button onClick={() => deleteThisEvent(obj.id)}><BsFillTrashFill /></Button>
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
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default EventCard;
