import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../stores/userStore';
import { Gamepad2, BookOpen, BarChart3 } from 'lucide-react';
import './Home.css';

export default function Home() {
  const navigate = useNavigate();
  const { currentUser } = useUserStore();

  if (!currentUser) {
    return (
      <div className="home-welcome">
        <h1 className="home-welcome-title">Bienvenido a TDL Platform</h1>
        <p className="home-welcome-subtitle">
          Plataforma educativa especializada para niños con Trastorno del Desarrollo del Lenguaje
        </p>
        <button
          onClick={() => navigate('/login')}
          className="home-welcome-button"
        >
          Empezar Ahora
        </button>
      </div>
    );
  }

  const cards = [
    {
      title: 'Juegos',
      description: 'Aprende jugando con ejercicios divertidos e interactivos',
      icon: <Gamepad2 size={48} />,
      path: '/games',
    },
    {
      title: 'Cuentos',
      description: 'Lee historias interactivas con audio y animaciones',
      icon: <BookOpen size={48} />,
      path: '/stories',
    },
    {
      title: 'Progreso',
      description: 'Visualiza tu avance, logros y estadísticas',
      icon: <BarChart3 size={48} />,
      path: '/progress',
    },
  ];

  return (
    <div className="home-wrapper">
      <div className="home-container">
        <h1 className="home-greeting">¡Hola {currentUser.name}! 👋</h1>

        <div className="home-grid">
          {cards.map((card) => (
            <button
              key={card.path}
              onClick={() => navigate(card.path)}
              className="home-card"
            >
              <div className="home-card-icon">{card.icon}</div>
              <h2 className="home-card-title">{card.title}</h2>
              <p className="home-card-description">{card.description}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}