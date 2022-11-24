import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { getGames } from '../utils/data/gameData';
import { createEvent } from '../utils/data/eventData';

const initialState = {
  description: '',
  date: '',
  time: '',
  game_id: 0,
  organizer_id: 0,
};

const EventForm = ({ user, eventObj }) => {
  const [games, setGames] = useState([]);
  const [input, setInput] = useState(initialState);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.warn(input);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const event = {
      description: input.description,
      date: input.date,
      time: input.time,
      game: Number(input.game),
      organizer_id: Number(user.id),
    };
    createEvent(event).then(() => router.push('/events'));
  };

  useEffect(() => {
    if (eventObj.id) {
      setInput(eventObj);
    }
    getGames().then(setGames);
  }, [eventObj, router, user]);

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control name="description" value={input.description} onChange={handleChange} required />
          <Form.Label>Date</Form.Label>
          <Form.Control name="date" type="date" value={input.date} onChange={handleChange} required />
          <Form.Label>Time</Form.Label>
          <Form.Control name="time" type="time" value={input.time} onChange={handleChange} required />
          <Form.Label>Game</Form.Label>
          <Form.Select name="game" onChange={handleChange} required>
            <option value="">Select a Game Type</option>
            {games?.map((type) => (
              <option key={type.id} label={type.title} selected={type.id === eventObj.game?.id} />
            ))};
          </Form.Select>
        </Form.Group>
        <Button variant="primary" type="submit">Submit</Button>
      </Form>
    </>
  );
};

EventForm.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,
  eventObj: PropTypes.shape({
    id: PropTypes.number,
    description: PropTypes.string,
    date: PropTypes.string,
    time: PropTypes.string,
    game: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
    }).isRequired,
    organizer_id: PropTypes.number,
  }),
};

EventForm.defaultProps = {
  eventObj: initialState,
};

export default EventForm;
