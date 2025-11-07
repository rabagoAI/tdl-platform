import React, { useState, useEffect } from 'react';
import { useUserStore } from '../../stores/userStore';
import { announceToScreenReader } from '../../utils/accessibility';
import { Check } from 'lucide-react';

interface Pair {
  id: string;
  word: string;
  imageUrl: string;
}

export default function ImageWordMatch() {
  const [pairs, setPairs] = useState<Pair[]>([]);
  const [shuffledWords, setShuffledWords] = useState<Pair[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
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
    if (!selectedImage || matched.includes(wordId)) return;

    if (selectedImage === wordId) {
      setMatched([...matched, wordId]);
      setScore(score + 10);
      announceToScreenReader('¡Correcto! Excelente asociación');
      setSelectedImage(null);
      setWrongAttempt(false);
    } else {
      setWrongAttempt(true);
      announceToScreenReader('Intenta de nuevo, esa no es la palabra correcta');
      setTimeout(() => {
        setSelectedImage(null);
        setWrongAttempt(false);
      }, 1500);
    }
  };

  const isComplete = matched.length === pairs.length;

  const handleSaveProgress = () => {
    addGameProgress('image-word-match', score, 'easy');
    setGameSaved(true);
    announceToScreenReader('Tu progreso ha sido guardado');
  };

  const handleRestart = () => {
    setSelectedImage(null);
    setScore(0);
    setMatched([]);
    setGameSaved(false);
    setWrongAttempt(false);
    const shuffled = [...pairs].sort(() => Math.random() - 0.5);
    setShuffledWords(shuffled);
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="mb-8 flex justify-between items-center">
        <h2 className="text-4xl font-bold text-blue-600">Asociación Imagen-Palabra</h2>
        <div className="text-3xl font-bold text-green-600">Puntos: {score}</div>
      </div>

      {!isComplete ? (
        <div className="grid grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold text-gray-700 mb-4">Imágenes</h3>
            <div className="grid grid-cols-2 gap-4">
              {pairs.map((pair) => (
                <button
                  key={pair.id}
                  onClick={() => handleImageSelect(pair.id)}
                  disabled={matched.includes(pair.id)}
                  className={`p-6 rounded-2xl transition h-28 flex items-center justify-center text-6xl ${
                    matched.includes(pair.id)
                      ? 'bg-green-200 opacity-50 cursor-not-allowed'
                      : selectedImage === pair.id
                      ? 'bg-blue-400 scale-105 shadow-lg'
                      : 'bg-yellow-300 hover:bg-yellow-400 cursor-pointer shadow-md'
                  }`}
                  aria-label={`Imagen de ${pair.word}`}
                >
                  {pair.imageUrl}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-700 mb-4">Palabras</h3>
            <div className="grid grid-cols-1 gap-3">
              {shuffledWords.map((word) => (
                <button
                  key={word.id}
                  onClick={() => handleWordSelect(word.id)}
                  disabled={matched.includes(word.id)}
                  className={`p-4 rounded-lg text-lg font-bold transition text-left ${
                    matched.includes(word.id)
                      ? 'bg-green-300 text-white opacity-50 cursor-not-allowed'
                      : selectedImage === word.id
                      ? 'bg-blue-500 text-white scale-105 shadow-lg'
                      : wrongAttempt && selectedImage
                      ? 'bg-red-400 text-white'
                      : 'bg-purple-400 text-white hover:bg-purple-500 cursor-pointer shadow-md'
                  }`}
                  aria-label={`Palabra: ${word.word}`}
                >
                  {word.word}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-green-100 border-4 border-green-500 p-8 rounded-2xl text-center">
          <Check size={64} className="mx-auto text-green-600 mb-4" />
          <h3 className="text-3xl font-bold text-green-600">¡Completaste el juego!</h3>
          <p className="text-2xl mt-4">Puntuación final: {score}</p>

          <div className="flex gap-4 mt-8 justify-center">
            {!gameSaved && (
              <button
                onClick={handleSaveProgress}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-bold text-lg transition"
              >
                Guardar Progreso
              </button>
            )}

            {gameSaved && (
              <p className="text-green-600 font-bold">✓ Progreso guardado</p>
            )}

            <button
              onClick={handleRestart}
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-bold text-lg transition"
            >
              Jugar de Nuevo
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
