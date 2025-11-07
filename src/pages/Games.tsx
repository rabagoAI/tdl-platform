import React, { useState } from 'react';
import ImageWordMatch from '../components/games/ImageWordMatch';

type GameType = 'image-word' | null;

export default function Games() {
  const [selectedGame, setSelectedGame] = useState<GameType>(null);

  if (!selectedGame) {
    return (
      <div className="flex flex-col gap-8">
        <h1 className="text-4xl font-bold text-blue-600">Selecciona un Juego</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <button
            onClick={() => setSelectedGame('image-word')}
            className="bg-gradient-to-br from-purple-400 to-blue-500 p-6 rounded-lg text-white hover:shadow-lg transition"
          >
            <h2 className="text-2xl font-bold mb-2">Asociación Imagen-Palabra</h2>
            <p>Relaciona imágenes con palabras</p>
          </button>

          <div className="bg-gray-200 p-6 rounded-lg text-gray-600 opacity-50">
            <h2 className="text-2xl font-bold mb-2">Próximamente</h2>
            <p>Más juegos en desarrollo</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <button
        onClick={() => setSelectedGame(null)}
        className="text-blue-600 hover:text-blue-800 font-bold text-lg"
      >
        ← Volver a Juegos
      </button>

      {selectedGame === 'image-word' && <ImageWordMatch />}
    </div>
  );
}
