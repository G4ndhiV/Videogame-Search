import axios from 'axios';
import type { Game } from '../types/game';

const API_KEY = '47c35aaec7d342da97f2a31884c577ef';
const BASE_URL = 'https://api.rawg.io/api';

export const getGames = async (page: number = 1): Promise<Game[]> => {
  const res = await axios.get(`${BASE_URL}/games`, {
    params: {
      key: API_KEY,
      page_size: 20,
      page,
    },
  });
  return res.data.results;
}; 