import React from 'react';
import { useUserStore } from '../stores/userStore';
import { BarChart3, Trophy, Zap } from 'lucide-react';

export default function Progress() {
  const { userProgress } = useUserStore();

  if (!userProgress || userProgress.games.length === 0) {
    return (
      <div className="text-center py-12">
        <h1 className="text-4xl font-bold text-gray-600 mb-4">Aún no has jugado</h1>
        <p className="text-lg text-gray-500">¡Juega algunos juegos para ver tu progreso!</p>
      </div>
    );
  }

  const totalScore = userProgress.games.reduce((sum, game) => sum + game.score, 0);
  const totalGames = userProgress.games.length;
  const averageScore = Math.round(totalScore / totalGames);

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-4xl font-bold text-blue-600">Tu Progreso</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-100 p-6 rounded-lg">
          <div className="flex items-center gap-4">
            <Zap size={40} className="text-blue-600" />
            <div>
              <p className="text-gray-600">Juegos Completados</p>
              <p className="text-3xl font-bold text-blue-600">{totalGames}</p>
            </div>
          </div>
        </div>

        <div className="bg-green-100 p-6 rounded-lg">
          <div className="flex items-center gap-4">
            <Trophy size={40} className="text-green-600" />
            <div>
              <p className="text-gray-600">Puntos Totales</p>
              <p className="text-3xl font-bold text-green-600">{totalScore}</p>
            </div>
          </div>
        </div>

        <div className="bg-purple-100 p-6 rounded-lg">
          <div className="flex items-center gap-4">
            <BarChart3 size={40} className="text-purple-600" />
            <div>
              <p className="text-gray-600">Promedio</p>
              <p className="text-3xl font-bold text-purple-600">{averageScore}</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-blue-600 mb-4">Historial de Juegos</h2>
        <div className="space-y-3">
          {userProgress.games.map((game, index) => (
            <div key={index} className="bg-white border-2 border-gray-200 p-4 rounded-lg flex justify-between items-center">
              <div>
                <p className="font-bold text-lg">{game.gameId}</p>
                <p className="text-sm text-gray-500">Dificultad: {game.difficulty}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-green-600">{game.score} pts</p>
                <p className="text-xs text-gray-500">{new Date(game.completedAt).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
