import { create } from 'zustand';
import type { User, UserProgress } from '../types';

interface UserState {
  currentUser: User | null;
  userProgress: UserProgress | null;
  setCurrentUser: (user: User) => void;
  setUserProgress: (progress: UserProgress) => void;
  addGameProgress: (gameId: string, score: number, difficulty: 'easy' | 'medium' | 'hard') => void;
  loadUserFromStorage: () => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>((set, get) => ({
  currentUser: null,
  userProgress: null,

  setCurrentUser: (user) => {
    set({ currentUser: user });
    localStorage.setItem('currentUser', JSON.stringify(user));
  },

  setUserProgress: (progress) => {
    set({ userProgress: progress });
    localStorage.setItem('userProgress', JSON.stringify(progress));
  },

  addGameProgress: (gameId, score, difficulty) => {
    const state = get();
    if (!state.userProgress) return;

    const updatedProgress = {
      ...state.userProgress,
      games: [
        ...state.userProgress.games,
        {
          gameId,
          score,
          completedAt: new Date().toISOString(),
          difficulty,
        },
      ],
    };

    set({ userProgress: updatedProgress });
    localStorage.setItem('userProgress', JSON.stringify(updatedProgress));
  },

  loadUserFromStorage: () => {
    const user = localStorage.getItem('currentUser');
    const progress = localStorage.getItem('userProgress');

    if (user) set({ currentUser: JSON.parse(user) });
    if (progress) set({ userProgress: JSON.parse(progress) });
  },

  clearUser: () => {
    set({ currentUser: null, userProgress: null });
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userProgress');
  },
}));