import React from 'react';
import { useUserStore } from '../stores/userStore';
import { Zap, Trophy, BarChart3 } from 'lucide-react';
import './Progress.css';

export default function Progress() {
  const { userProgress } = useUserStore();

  if (!userProgress || userProgress.games.length === 0) {
    return (
      <div className="progress-wrapper">
        <div className="progress-container">
          <div className="progress-empty">
            <div className="progress-empty-icon">🎮</div>
            <h1 className="progress-empty-title">Aún no has jugado</h1>
            <p className="progress-empty-text">
              ¡Juega algunos juegos para ver tu progreso!
            </p>
          </div>
        </div>
      </div>
    );
  }

  const totalScore = userProgress.games.reduce((sum, game) => sum + game.score, 0);
  const totalGames = userProgress.games.length;
  const averageScore = Math.round(totalScore / totalGames);

  return (
    <div className="progress-wrapper">
      <div className="progress-container">
        <h1 className="progress-title">Tu Progreso</h1>

        <div className="progress-stats-grid">
          <div className="progress-stat-card">
            <div className="progress-stat-icon">
              <Zap size={32} />
            </div>
            <div className="progress-stat-content">
              <p className="progress-stat-label">Juegos Completados</p>
              <p className="progress-stat-value">{totalGames}</p>
            </div>
          </div>

          <div className="progress-stat-card">
            <div className="progress-stat-icon">
              <Trophy size={32} />
            </div>
            <div className="progress-stat-content">
              <p className="progress-stat-label">Puntos Totales</p>
              <p className="progress-stat-value">{totalScore}</p>
            </div>
          </div>

          <div className="progress-stat-card">
            <div className="progress-stat-icon">
              <BarChart3 size={32} />
            </div>
            <div className="progress-stat-content">
              <p className="progress-stat-label">Promedio por Juego</p>
              <p className="progress-stat-value">{averageScore}</p>
            </div>
          </div>
        </div>

        <div className="progress-history">
          <h2 className="progress-history-title">Historial de Juegos</h2>
          <div className="progress-history-list">
            {userProgress.games.map((game, index) => (
              <div key={index} className="progress-history-item">
                <div className="progress-game-info">
                  <p className="progress-game-name">{game.gameId}</p>
                  <p className="progress-game-difficulty">
                    Dificultad: {game.difficulty}
                  </p>
                </div>
                <div className="progress-game-score">
                  <p className="progress-game-points">{game.score} pts</p>
                  <p className="progress-game-date">
                    {new Date(game.completedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}