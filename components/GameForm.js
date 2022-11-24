import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { createGame, getGameTypes, updateGame } from '../utils/data/gameData';

const initialState = {
  skill_level: 0,
  number_of_players: 0,
  title: '',
  maker: '',
  game_type: 0,
};

const GameForm = ({ user, gameObj }) => {
  const [gameTypes, setGameTypes] = useState([]);
  const [input, setInput] = useState({ initialState });
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
      number_of_players: Number(input.number_of_players),
      skill_level: Number(input.skill_level),
      game_type: Number(input.game_type),
      user_id: user.uid,
    };
    if (gameObj.id) {
      delete game.user_id;
      updateGame(game, gameObj.id).then(() => router.push('/games'));
    } else {
      createGame(game).then(() => router.push('/games'));
    }
  };

  useEffect(() => {
    if (gameObj.id) {
      setInput(gameObj);
    }
    getGameTypes().then(setGameTypes);
  }, [gameObj]);

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control name="title" value={input.title} onChange={handleChange} required />
          <Form.Label>Maker</Form.Label>
          <Form.Control name="maker" value={input.maker} onChange={handleChange} required />
          <Form.Label>Number Of Players</Form.Label>
          <Form.Control name="number_of_players" type="number" value={input.number_of_players} onChange={handleChange} required />
          <Form.Label>Skill Level</Form.Label>
          <Form.Control name="skill_level" type="number" value={input.skill_level} onChange={handleChange} required />
          <Form.Label>Game Type</Form.Label>
          <Form.Select name="game_type" type="number" onChange={handleChange} required>
            <option value="">Select a Game Type</option>
            {gameTypes?.map((type) => (
              <option key={type.id} selected={gameObj.game_type === type.id} value={type.id} label={type.label}>Select a Game Type</option>
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
  gameObj: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    maker: PropTypes.string,
    number_of_players: PropTypes.number,
    skill_level: PropTypes.number,
    game_type: PropTypes.shape({
      id: PropTypes.number,
      lebel: PropTypes.string,
    }),
  }),
};

GameForm.defaultProps = {
  gameObj: initialState,
};

export default GameForm;
