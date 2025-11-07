// Usuario y progreso
export interface User {
  id: string;
  name: string;
  createdAt: string;
}

export interface GameProgress {
  gameId: string;
  score: number;
  completedAt: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface UserProgress {
  userId: string;
  games: GameProgress[];
}

// Juegos
export interface GameItem {
  id: string;
  word: string;
  imageUrl: string;
  audioUrl?: string;
  category: string;
}

export interface Game {
  id: string;
  name: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: 'vocabulary' | 'memory' | 'articulation' | 'emotion';
}