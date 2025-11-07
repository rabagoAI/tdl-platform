import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Gamepad2, BookOpen, TrendingUp } from 'lucide-react';

export default function Navigation() {
  const navItems = [
    { path: '/', label: 'Inicio', icon: Home },
    { path: '/games', label: 'Juegos', icon: Gamepad2 },
    { path: '/stories', label: 'Cuentos', icon: BookOpen },
    { path: '/progress', label: 'Progreso', icon: TrendingUp },
  ];

  return (
    <nav className="bg-white shadow-md" role="navigation" aria-label="Navegación principal">
      <div className="container mx-auto px-4">
        <ul className="flex justify-center gap-8 py-4">
          {navItems.map(({ path, label, icon: Icon }) => (
            <li key={path}>
              <Link
                to={path}
                className="flex items-center gap-2 text-gray-700 hover:text-blue-600 font-semibold transition"
              >
                <Icon size={24} />
                <span>{label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
