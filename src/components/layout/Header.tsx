import React from 'react';
import { useUserStore } from '../../stores/userStore';
import { LogOut } from 'lucide-react';

export default function Header() {
  const { currentUser, clearUser } = useUserStore();

  return (
    <header className="bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-3xl font-bold">TDL Platform</h1>
        
        <div className="flex items-center gap-4">
          {currentUser && (
            <>
              <span className="text-lg">Hola, {currentUser.name}</span>
              <button
                onClick={clearUser}
                className="flex items-center gap-2 bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition"
                aria-label="Cerrar sesión"
              >
                <LogOut size={20} />
                Salir
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
