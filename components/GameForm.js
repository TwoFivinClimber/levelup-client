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
      const gameEdit = {
        skill_level: gameObj.skill_level,
        number_of_players: gameObj.number_of_players,
        title: gameObj.title,
        maker: gameObj.maker,
        game_type: gameObj.game_type.id,
      };
      setInput(gameEdit);
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
          <Form.Select name="game_type" value={input.game_type} onChange={handleChange} required>
            <option value="">Select a Game Type</option>
            {gameTypes?.map((type) => (
              <option key={type.id} value={type.id} label={type.label} />
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
    uid: PropTypes.string,
  }).isRequired,
  gameObj: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    maker: PropTypes.string,
    number_of_players: PropTypes.number,
    skill_level: PropTypes.number,
    game_type: PropTypes.shape({
      id: PropTypes.number.isRequired,
      label: PropTypes.string.isRequired,
    }),
  }),
};

GameForm.defaultProps = {
  gameObj: initialState,
};

export default GameForm;
