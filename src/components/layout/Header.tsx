import React from 'react';
import { useUserStore } from '../../stores/userStore';
import { LogOut, Sparkles } from 'lucide-react';
import './Header.css';

export default function Header() {
  const { currentUser, clearUser } = useUserStore();

  return (
    <header className="header-wrapper">
      <div className="header-content">
        <div className="header-logo-wrapper">
          <div className="header-logo-icon">
            <Sparkles size={24} color="white" />
          </div>
          <div className="header-logo-text">
            <h1 className="header-logo-title">TDL Platform</h1>
            <p className="header-logo-subtitle">Aprende y crece</p>
          </div>
        </div>

        {currentUser && (
          <div className="header-user-wrapper">
            <div className="header-user-info">
              <span className="header-user-name">{currentUser.name}</span>
              <span className="header-user-label">Bienvenido</span>
            </div>

            <button
              onClick={clearUser}
              className="header-logout-btn"
              aria-label="Cerrar sesión"
            >
              <LogOut size={20} />
              <span>Salir</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
}