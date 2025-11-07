// Anunciar mensajes a lectores de pantalla
export const announceToScreenReader = (message: string) => {
  const announcement = document.createElement('div');
  announcement.setAttribute('role', 'status');
  announcement.setAttribute('aria-live', 'polite');
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'sr-only';
  announcement.textContent = message;
  
  document.body.appendChild(announcement);
  
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
};

// Función para reproducir sonido (accesible)
export const playAccessibleAudio = (audioUrl: string) => {
  const audio = new Audio(audioUrl);
  audio.play().catch(err => console.error('Error playing audio:', err));
};

// Manejar navegación por teclado
export const handleKeyboardNavigation = (e: React.KeyboardEvent, callback: () => void) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    callback();
  }
};