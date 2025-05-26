import { useState } from 'react';
import axios from 'axios';
import type { Game } from '../types/game';
import GameCard from '../components/GameCard';
import './Home.css';

const API_KEY = '47c35aaec7d342da97f2a31884c577ef';
const BASE_URL = 'https://api.rawg.io/api';

const Search = () => {
  const [query, setQuery] = useState('');
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSearched(true);
    const res = await axios.get(`${BASE_URL}/games`, {
      params: {
        key: API_KEY,
        search: query,
        page_size: 20,
      },
    });
    setGames(res.data.results);
    setLoading(false);
  };

  return (
    <div className="home-container">
      <h2>Search Games</h2>
      <form onSubmit={handleSearch} style={{ marginBottom: 32, display: 'flex', justifyContent: 'center', gap: 12 }}>
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search by name..."
          style={{
            padding: '0.7rem 1.2rem',
            width: 320,
            borderRadius: 12,
            border: 'none',
            fontSize: '1.05rem',
            background: '#232946',
            color: '#fff',
            outline: 'none',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
          }}
        />
        <button
          type="submit"
          style={{
            padding: '0.7rem 1.5rem',
            borderRadius: 12,
            border: 'none',
            background: '#eebbc3',
            color: '#232946',
            fontWeight: 700,
            fontSize: '1.05rem',
            cursor: 'pointer',
            transition: 'background 0.18s',
          }}
        >Search</button>
      </form>
      {loading ? (
        <p style={{ color: '#eebbc3', fontWeight: 600 }}>Searching...</p>
      ) : (
        <div className="games-grid">
          {games.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      )}
      {searched && !loading && games.length === 0 && (
        <p style={{ color: '#eebbc3', fontWeight: 600, marginTop: 32 }}>No games found with that name.</p>
      )}
    </div>
  );
};

export default Search; 