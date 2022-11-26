import PropTypes from 'prop-types';
import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { BsFillPencilFill, BsFillTrashFill } from 'react-icons/bs';
import { useRouter } from 'next/router';
import { deleteGame } from '../utils/data/gameData';
import { useAuth } from '../utils/context/authContext';

const GameCard = ({
  id,
  title,
  maker,
  numberOfPlayers,
  skillLevel,
  onUpdate,
  gamerId,
}) => {
  const router = useRouter();
  const { user } = useAuth();

  const deleteThisGame = (gameId) => {
    if (window.confirm('Are you sure ?')) {
      deleteGame(gameId).then(() => onUpdate());
    }
  };

  return (
    <Card className="text-center">
      <Card.Header>{title}</Card.Header>
      <Card.Body>
        <Card.Title>By: {maker}</Card.Title>
        <Card.Text>{numberOfPlayers} players needed</Card.Text>
        {user.id === gamerId ? (
          <>
            <Button onClick={() => router.push(`/games/edit/${id}`)}><BsFillPencilFill /></Button><Button onClick={(() => deleteThisGame(id))}><BsFillTrashFill /></Button>
          </>
        ) : ''}
      </Card.Body>
      <Card.Footer className="text-muted">Skill Level: {skillLevel}</Card.Footer>
    </Card>
  );
};

GameCard.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  maker: PropTypes.string.isRequired,
  numberOfPlayers: PropTypes.number.isRequired,
  skillLevel: PropTypes.number.isRequired,
  gamerId: PropTypes.number.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default GameCard;
