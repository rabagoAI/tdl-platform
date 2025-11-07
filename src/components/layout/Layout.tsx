import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Navigation from './Navigation';

export default function Layout() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50">
      <Header />
      <Navigation />
      <main className="container mx-auto px-4 py-8" role="main">
        <Outlet />
      </main>
    </div>
  );
}
