import React, { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import ImageWordMatch from '../components/games/ImageWordMatch';
import './Games.css';

type GameType = 'image-word' | null;

export default function Games() {
  const [selectedGame, setSelectedGame] = useState<GameType>(null);

  const games = [
    {
      id: 'image-word',
      title: 'Asociación Imagen-Palabra',
      description: 'Relaciona las imágenes con sus palabras correspondientes',
      icon: '🖼️',
      count: '6 pares de palabras',
      active: true,
    },
    {
      id: 'memory',
      title: 'Juego de Memoria',
      description: 'Encuentra los pares correctos en este juego de memoria',
      icon: '🎮',
      count: 'Próximamente',
      active: false,
    },
    {
      id: 'complete',
      title: 'Completar Palabras',
      description: 'Completa las palabras faltantes para aprender',
      icon: '✏️',
      count: 'Próximamente',
      active: false,
    },
  ];

  if (!selectedGame) {
    return (
      <div className="games-wrapper">
        <div className="games-container">
          <div className="games-header">
            <h1 className="games-title">Selecciona un Juego</h1>
            <p className="games-subtitle">Elige el juego que quieres jugar y diviértete aprendiendo</p>
          </div>

          <div className="games-grid">
            {games.map((game) => (
              <button
                key={game.id}
                onClick={() => game.active && setSelectedGame(game.id as GameType)}
                className={`game-card ${game.active ? 'active' : 'disabled'}`}
                disabled={!game.active}
              >
                <div className="game-icon">{game.icon}</div>
                <h2 className="game-card-title">{game.title}</h2>
                <p className="game-card-description">{game.description}</p>
                <div className="game-badge">{game.count}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="games-wrapper">
      <div className="games-container">
        <button
          onClick={() => setSelectedGame(null)}
          className="games-back-button"
        >
          <ChevronLeft size={20} />
          Volver a Juegos
        </button>

        <div className="game-view">
          {selectedGame === 'image-word' && <ImageWordMatch />}
        </div>
      </div>
    </div>
  );
}