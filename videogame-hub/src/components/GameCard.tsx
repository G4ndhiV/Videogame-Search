import { useNavigate } from 'react-router-dom';
import type { Game } from '../types/game';
import './GameCard.css';

interface Props {
  game: Game;
}

const GameCard = ({ game }: Props) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/game/${game.id}`);
  };

  return (
    <div className="game-card" onClick={handleClick}>
      <img src={game.background_image} alt={game.name} className="game-card-img" />
      <div className="game-card-body">
        <h3>{game.name}</h3>
        <p>Lanzamiento: {game.released}</p>
        <p>Rating: {game.rating}</p>
        <div className="game-card-genres">
          {game.genres.map((g) => (
            <span key={g.id}>{g.name}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameCard; 