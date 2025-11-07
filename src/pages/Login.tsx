import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../stores/userStore';
import type { User, UserProgress } from '../types';
import { Users } from 'lucide-react';
import './Login.css';

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
    <div className="login-wrapper">
      <div className="login-container">
        <div className="login-icon-wrapper">
          <Users size={48} />
        </div>

        <div className="login-title-section">
          <h1 className="login-title">¿Cuál es tu nombre?</h1>
          <p className="login-subtitle">Vamos a empezar tu aventura</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="login-input-group">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Escribe tu nombre"
              className="login-input"
              autoFocus
              aria-label="Tu nombre"
            />
          </div>

          <button
            type="submit"
            className="login-submit-btn"
            disabled={!name.trim()}
          >
            Continuar
          </button>
        </form>
      </div>
    </div>
  );
}