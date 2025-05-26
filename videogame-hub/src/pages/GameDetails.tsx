import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './GameDetails.css';

interface GameDetails {
  id: number;
  name: string;
  description: string;
  background_image: string;
  background_image_additional: string;
  rating: number;
  released: string;
  platforms: { platform: { name: string } }[];
  developers: { name: string }[];
  publishers: { name: string }[];
  genres: { name: string }[];
  website: string;
  metacritic: number;
}

const GameDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [game, setGame] = useState<GameDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        const res = await axios.get(`https://api.rawg.io/api/games/${id}`, {
          params: {
            key: '47c35aaec7d342da97f2a31884c577ef'
          }
        });
        setGame(res.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching game details:', error);
        setLoading(false);
      }
    };

    fetchGameDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="game-details-container">
        <p className="loading">Loading game details...</p>
      </div>
    );
  }

  if (!game) {
    return (
      <div className="game-details-container">
        <p className="error">Game not found</p>
        <button onClick={() => navigate('/')} className="back-button">
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="game-details-container">
      <div className="game-header">
        <button onClick={() => navigate('/')} className="back-button">
          ← Back
        </button>
        <h1>{game.name}</h1>
      </div>

      <div className="game-content">
        <div className="game-images">
          <img 
            src={game.background_image} 
            alt={game.name} 
            className="main-image"
          />
          {game.background_image_additional && (
            <img 
              src={game.background_image_additional} 
              alt={`${game.name} additional`} 
              className="additional-image"
            />
          )}
        </div>

        <div className="game-info">
          <div className="info-section">
            <h2>Description</h2>
            <div dangerouslySetInnerHTML={{ __html: game.description }} />
          </div>

          <div className="info-grid">
            <div className="info-item">
              <h3>Release Date</h3>
              <p>{game.released}</p>
            </div>

            <div className="info-item">
              <h3>Rating</h3>
              <p>{game.rating}/5</p>
            </div>

            {game.metacritic && (
              <div className="info-item">
                <h3>Metacritic</h3>
                <p className={`metacritic-score ${game.metacritic >= 75 ? 'high' : game.metacritic >= 50 ? 'medium' : 'low'}`}>
                  {game.metacritic}
                </p>
              </div>
            )}
          </div>

          <div className="info-section">
            <h3>Platforms</h3>
            <div className="tags">
              {game.platforms.map((p, index) => (
                <span key={index} className="tag">{p.platform.name}</span>
              ))}
            </div>
          </div>

          <div className="info-section">
            <h3>Genres</h3>
            <div className="tags">
              {game.genres.map((genre, index) => (
                <span key={index} className="tag">{genre.name}</span>
              ))}
            </div>
          </div>

          {game.developers.length > 0 && (
            <div className="info-section">
              <h3>Developers</h3>
              <div className="tags">
                {game.developers.map((dev, index) => (
                  <span key={index} className="tag">{dev.name}</span>
                ))}
              </div>
            </div>
          )}

          {game.publishers.length > 0 && (
            <div className="info-section">
              <h3>Publishers</h3>
              <div className="tags">
                {game.publishers.map((pub, index) => (
                  <span key={index} className="tag">{pub.name}</span>
                ))}
              </div>
            </div>
          )}

          {game.website && (
            <div className="info-section">
              <h3>Official Website</h3>
              <a href={game.website} target="_blank" rel="noopener noreferrer" className="website-link">
                Visit website
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GameDetails; 