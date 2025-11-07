import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../stores/userStore';
import type { User, UserProgress } from '../types';

export default function Login() {
  const [name, setName] = useState('');
  const navigate = useNavigate();
  const { setCurrentUser, setUserProgress } = useUserStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) return;

    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: name.trim(),
      createdAt: new Date().toISOString(),
    };

    const newProgress: UserProgress = {
      userId: newUser.id,
      games: [],
    };

    setCurrentUser(newUser);
    setUserProgress(newProgress);
    navigate('/');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-8">
      <h1 className="text-4xl font-bold text-blue-600">¿Cuál es tu nombre?</h1>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-sm">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Escribe tu nombre"
          className="px-4 py-3 border-2 border-blue-300 rounded-lg text-lg focus:outline-none focus:border-blue-600"
          autoFocus
          aria-label="Tu nombre"
        />
        
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg font-bold transition"
        >
          Continuar
        </button>
      </form>
    </div>
  );
}
