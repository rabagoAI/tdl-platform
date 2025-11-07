import React, { useState, useEffect } from 'react';
import { useUserStore } from '../../stores/userStore';
import { announceToScreenReader } from '../../utils/accessibility';
import { Check, RotateCcw } from 'lucide-react';
import './ImageWordMatch.css';

interface Pair {
  id: string;
  word: string;
  imageUrl: string;
}

export default function ImageWordMatch() {
  const [pairs, setPairs] = useState<Pair[]>([]);
  const [shuffledWords, setShuffledWords] = useState<Pair[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [matched, setMatched] = useState<string[]>([]);
  const [gameSaved, setGameSaved] = useState(false);
  const [wrongAttempt, setWrongAttempt] = useState(false);
  const { addGameProgress } = useUserStore();

  const gameData: Pair[] = [
    { id: '1', word: 'Gato', imageUrl: '🐱' },
    { id: '2', word: 'Perro', imageUrl: '🐶' },
    { id: '3', word: 'Manzana', imageUrl: '🍎' },
    { id: '4', word: 'Plátano', imageUrl: '🍌' },
    { id: '5', word: 'Casa', imageUrl: '🏠' },
    { id: '6', word: 'Árbol', imageUrl: '🌳' },
  ];

  useEffect(() => {
    setPairs(gameData);
    const shuffled = [...gameData].sort(() => Math.random() - 0.5);
    setShuffledWords(shuffled);
  }, []);

  const handleImageSelect = (imageId: string) => {
    if (matched.includes(imageId)) return;
    setSelectedImage(imageId);
    announceToScreenReader(`Seleccionaste la imagen ${pairs.find(p => p.id === imageId)?.word}`);
  };

  const handleWordSelect = (wordId: string) => {
    if (matched.includes(wordId)) return;

    if (!selectedImage) {
      setSelectedWord(wordId);
      announceToScreenReader(`Seleccionaste la palabra ${shuffledWords.find(w => w.id === wordId)?.word}`);
      return;
    }

    if (selectedImage === wordId) {
      setMatched([...matched, wordId]);
      setScore(score + 10);
      announceToScreenReader('¡Correcto! Excelente asociación');
      setSelectedImage(null);
      setSelectedWord(null);
      setWrongAttempt(false);
    } else {
      setWrongAttempt(true);
      announceToScreenReader('Intenta de nuevo, esa no es la palabra correcta');
      setTimeout(() => {
        setSelectedImage(null);
        setSelectedWord(null);
        setWrongAttempt(false);
      }, 1500);
    }
  };

  const isComplete = matched.length === pairs.length;
  const progress = (matched.length / pairs.length) * 100;

  const handleSaveProgress = () => {
    addGameProgress('image-word-match', score, 'easy');
    setGameSaved(true);
    announceToScreenReader('Tu progreso ha sido guardado');
  };

  const handleRestart = () => {
    setSelectedImage(null);
    setSelectedWord(null);
    setScore(0);
    setMatched([]);
    setGameSaved(false);
    setWrongAttempt(false);
    const shuffled = [...pairs].sort(() => Math.random() - 0.5);
    setShuffledWords(shuffled);
  };

  return (
    <div className="game-container">
      <div className="game-header">
        <div className="game-title-section">
          <div className="game-title-content">
            <h2>Asociación Imagen-Palabra</h2>
            <p>Relaciona cada imagen con su palabra correspondiente</p>
          </div>
          <div className="game-score-box">
            <div className="game-score">{score}</div>
            <div className="game-score-label">Puntos</div>
          </div>
        </div>

        <div className="progress-bar-container">
          <div
            className="progress-bar-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="progress-text">
          {matched.length} de {pairs.length} pares completados
        </div>
      </div>

      {!isComplete ? (
        <div className="game-grid">
          <div className="game-column">
            <h3 className="game-column-title">Imágenes</h3>
            <div className="images-grid">
              {pairs.map((pair) => (
                <button
                  key={pair.id}
                  onClick={() => handleImageSelect(pair.id)}
                  disabled={matched.includes(pair.id)}
                  className={`image-button ${
                    matched.includes(pair.id) ? 'matched' : ''
                  } ${selectedImage === pair.id ? 'selected' : ''}`}
                  aria-label={`Imagen de ${pair.word}`}
                >
                  {pair.imageUrl}
                  {matched.includes(pair.id) && (
                    <div className="check-icon">
                      <Check size={40} color="#16a34a" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="game-column">
            <h3 className="game-column-title">Palabras</h3>
            <div className="words-grid">
              {shuffledWords.map((word) => (
                <button
                  key={word.id}
                  onClick={() => handleWordSelect(word.id)}
                  disabled={matched.includes(word.id)}
                  className={`word-button ${
                    matched.includes(word.id) ? 'matched' : ''
                  } ${selectedWord === word.id ? 'selected' : ''} ${
                    wrongAttempt && selectedImage ? 'wrong' : ''
                  }`}
                  aria-label={`Palabra: ${word.word}`}
                >
                  {word.word}
                  {matched.includes(word.id) && (
                    <div className="check-icon">
                      <Check size={20} color="#fff" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="completion-screen">
          <div className="completion-icon">✓</div>
          <h3 className="completion-title">¡Completaste el juego!</h3>
          <div className="completion-score">
            Puntuación final: <strong>{score} puntos</strong>
          </div>

          <div className="completion-buttons">
            {!gameSaved && (
              <button
                onClick={handleSaveProgress}
                className="btn btn-save"
              >
                <Check size={20} />
                Guardar Progreso
              </button>
            )}

            {gameSaved && (
              <div className="btn btn-saved">
                <Check size={20} />
                Progreso guardado
              </div>
            )}

            <button
              onClick={handleRestart}
              className="btn btn-restart"
            >
              <RotateCcw size={20} />
              Jugar de Nuevo
            </button>
          </div>
        </div>
      )}
    </div>
  );
}