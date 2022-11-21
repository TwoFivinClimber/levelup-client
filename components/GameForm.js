import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { createGame, getGameTypes } from '../utils/data/gameData';

const GameForm = ({ user }) => {
  const [gameTypes, setGameTypes] = useState([]);
  const [input, setInput] = useState({
    skillLevel: 0,
    numberOfPlayers: 0,
    title: '',
    maker: '',
    gameTypeId: 0,
  });
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const game = {
      maker: input.maker,
      title: input.title,
      number_of_players: Number(input.numberOfPlayers),
      skill_level: Number(input.skillLevel),
      game_type: Number(input.gameTypeId),
      user_id: user.uid,
    };
    createGame(game).then(() => router.push('/games'));
  };

  useEffect(() => {
    getGameTypes().then(setGameTypes);
  }, []);

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control name="title" value={input.title} onChange={handleChange} required />
          <Form.Label>Maker</Form.Label>
          <Form.Control name="maker" value={input.title} onChange={handleChange} required />
          <Form.Label>Number Of Players</Form.Label>
          <Form.Control name="number_of_players" value={input.title} onChange={handleChange} required />
          <Form.Label>Skill Level</Form.Label>
          <Form.Control name="skill_level" value={input.title} onChange={handleChange} required />
          <Form.Label>Game Type</Form.Label>
          <Form.Select name="game_type">
            <option value="">Select a Game Type</option>
            {gameTypes.map((type) => (
              <option value={type.id} label={type.label}>Select a Game Type</option>
            ))};
          </Form.Select>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

GameForm.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
  }).isRequired,
};

export default GameForm;
