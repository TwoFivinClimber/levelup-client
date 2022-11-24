import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import GameForm from '../../../components/GameForm';
import { useAuth } from '../../../utils/context/authContext';
import { getGame } from '../../../utils/data/gameData';

function EditGame() {
  const [game, setGame] = useState({});
  const { user } = useAuth();
  const router = useRouter();
  const { gameId } = router.query;

  useEffect(() => {
    getGame(gameId).then(setGame);
  }, [user, router, gameId]);

  return (
    <GameForm user={user} gameObj={game} />
  );
}

export default EditGame;
