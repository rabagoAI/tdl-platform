import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../stores/userStore';
import { Gamepad2, BookOpen, BarChart3 } from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();
  const { currentUser } = useUserStore();

  if (!currentUser) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-8">
        <h1 className="text-5xl font-bold text-blue-600">Bienvenido a TDL Platform</h1>
        <p className="text-xl text-gray-600">Plataforma educativa para niños con TDL</p>
        <button
          onClick={() => navigate('/login')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-bold transition"
        >
          Empezar
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div
        onClick={() => navigate('/games')}
        className="bg-gradient-to-br from-green-400 to-blue-500 p-8 rounded-lg cursor-pointer hover:shadow-lg transition text-white"
      >
        <Gamepad2 size={48} className="mb-4" />
        <h2 className="text-2xl font-bold mb-2">Juegos</h2>
        <p>Aprende jugando con ejercicios divertidos</p>
      </div>

      <div
        onClick={() => navigate('/stories')}
        className="bg-gradient-to-br from-purple-400 to-pink-500 p-8 rounded-lg cursor-pointer hover:shadow-lg transition text-white"
      >
        <BookOpen size={48} className="mb-4" />
        <h2 className="text-2xl font-bold mb-2">Cuentos</h2>
        <p>Lee historias interactivas con audio</p>
      </div>

      <div
        onClick={() => navigate('/progress')}
        className="bg-gradient-to-br from-yellow-400 to-orange-500 p-8 rounded-lg cursor-pointer hover:shadow-lg transition text-white"
      >
        <BarChart3 size={48} className="mb-4" />
        <h2 className="text-2xl font-bold mb-2">Progreso</h2>
        <p>Visualiza tu avance y logros</p>
      </div>
    </div>
  );
}
