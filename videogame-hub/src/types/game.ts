export interface Game {
  id: number;
  name: string;
  background_image: string;
  rating: number;
  released: string;
  genres: { id: number; name: string }[];
} 