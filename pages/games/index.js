import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import GameCard from '../../components/GameCard';
import { getGames } from '../../utils/data/gameData';

function Home() {
  const router = useRouter();
  const [games, setGames] = useState([]);

  useEffect(() => {
    getGames().then((data) => setGames(data));
  }, []);

  return (
    <>
      <Button onClick={() => { router.push('/games/new'); }}>Register New Game</Button>
      <article className="games">
        <h1>Games</h1>
        {games.map((game) => (
          <section key={`game--${game.id}`} className="game">
            <GameCard id={game.id} title={game.title} maker={game.maker} numberOfPlayers={game.number_of_players} skillLevel={game.skill_level} />
          </section>
        ))}
      </article>
    </>
  );
}

export default Home;
