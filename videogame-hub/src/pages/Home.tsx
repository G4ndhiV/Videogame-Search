import { useEffect, useRef, useState, useCallback } from 'react';
import { getGames } from '../services/gameService';
import type { Game } from '../types/game';
import GameCard from '../components/GameCard';
import './Home.css';

const Home = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const loader = useRef<HTMLDivElement | null>(null);

  const fetchGames = useCallback(async () => {
    setLoading(true);
    const newGames = await getGames(page);
    setGames(prev => [...prev, ...newGames]);
    setHasMore(newGames.length > 0);
    setLoading(false);
  }, [page]);

  useEffect(() => {
    fetchGames();
    // eslint-disable-next-line
  }, [page]);

  useEffect(() => {
    if (!hasMore || loading) return;
    const observer = new window.IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          setPage(prev => prev + 1);
        }
      },
      { threshold: 1 }
    );
    if (loader.current) observer.observe(loader.current);
    return () => {
      if (loader.current) observer.unobserve(loader.current);
    };
  }, [hasMore, loading]);

  return (
    <div className="home-container">
      <h2>Popular Games</h2>
      <div className="games-grid">
        {games.map((game) => (
          <GameCard key={game.id + '-' + game.released} game={game} />
        ))}
      </div>
      <div ref={loader} style={{ height: 40 }} />
      {loading && <p style={{ color: '#eebbc3', fontWeight: 600, marginTop: 24 }}>Loading...</p>}
      {!hasMore && !loading && <p style={{ color: '#eebbc3', fontWeight: 600, marginTop: 24 }}>No more games.</p>}
    </div>
  );
};

export default Home; 