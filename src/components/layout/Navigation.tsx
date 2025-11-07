import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Gamepad2, BookOpen, TrendingUp } from 'lucide-react';
import './Navigation.css';

export default function Navigation() {
  const location = useLocation();
  
  const navItems = [
    { path: '/', label: 'Inicio', icon: Home },
    { path: '/games', label: 'Juegos', icon: Gamepad2 },
    { path: '/stories', label: 'Cuentos', icon: BookOpen },
    { path: '/progress', label: 'Progreso', icon: TrendingUp },
  ];

  return (
    <nav className="nav-wrapper" role="navigation" aria-label="Navegación principal">
      <div className="nav-content">
        <ul className="nav-list">
          {navItems.map(({ path, label, icon: Icon }) => {
            const isActive = location.pathname === path;
            return (
              <li key={path} className="nav-item">
                <Link
                  to={path}
                  className={`nav-link ${isActive ? 'active' : ''}`}
                >
                  <Icon size={24} />
                  <span>{label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}