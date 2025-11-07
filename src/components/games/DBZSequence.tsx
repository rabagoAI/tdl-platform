import React, { useState, useEffect } from 'react';
import { useUserStore } from '../../stores/userStore';
import { announceToScreenReader } from '../../utils/accessibility';
import { Check, RotateCcw } from 'lucide-react';
import './DBZSequence.css';

interface Transformation {
  id: string;
  character: string;
  form: string;
  image: string;
  order: number;
}

export default function DBZSequence() {
  const [sequences, setSequences] = useState<Transformation[][]>([]);
  const [currentSequenceIndex, setCurrentSequenceIndex] = useState(0);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState<boolean[]>([]);
  const [gameSaved, setGameSaved] = useState(false);
  const [showFeedback, setShowFeedback] = useState<'correct' | 'wrong' | null>(null);
  const { addGameProgress } = useUserStore();

  const gokuSequence: Transformation[] = [
    { id: 'goku-1', character: 'Goku', form: 'Normal', image: '/images/dbz/goku-normal.png', order: 1 },
    { id: 'goku-2', character: 'Goku', form: 'Super Saiyan', image: '/images/dbz/goku-ss1.png', order: 2 },
    { id: 'goku-3', character: 'Goku', form: 'Super Saiyan 2', image: '/images/dbz/goku-ss2.png', order: 3 },
    { id: 'goku-4', character: 'Goku', form: 'Ultra Instinto', image: '/images/dbz/goku-ui.png', order: 4 },
  ];

  const vegetaSequence: Transformation[] = [
    { id: 'vegeta-1', character: 'Vegeta', form: 'Normal', image: '/images/dbz/vegeta-normal.png', order: 1 },
    { id: 'vegeta-2', character: 'Vegeta', form: 'Super Saiyan', image: '/images/dbz/vegeta-ss1.png', order: 2 },
    { id: 'vegeta-3', character: 'Vegeta', form: 'Blue Evolution', image: '/images/dbz/vegeta-blue.png', order: 3 },
  ];

  const trunksSequence: Transformation[] = [
    { id: 'trunks-1', character: 'Trunks', form: 'Normal', image: '/images/dbz/trunks-normal.png.png', order: 1 },
    { id: 'trunks-2', character: 'Trunks', form: 'Super Saiyan', image: '/images/dbz/trunks-ss1.png.png', order: 2 },
    { id: 'trunks-3', character: 'Trunks', form: 'Super Saiyan Rage', image: '/images/dbz/trunks-rage.png.png', order: 3 },
  ];

  useEffect(() => {
    const allSequences = [gokuSequence, vegetaSequence, trunksSequence];
    setSequences(allSequences.map(seq => [...seq].sort(() => Math.random() - 0.5)));
    setCompleted(new Array(3).fill(false));
  }, []);

  const currentSequence = sequences[currentSequenceIndex] || [];
  const correctOrder = [...currentSequence].sort((a, b) => a.order - b.order);
  const isSequenceComplete = selectedItems.length === currentSequence.length;

  const handleSelectItem = (item: Transformation) => {
    if (selectedItems.some(id => id === item.id)) {
      setSelectedItems(selectedItems.filter(id => id !== item.id));
      return;
    }

    const newSelected = [...selectedItems, item.id];
    setSelectedItems(newSelected);
    announceToScreenReader(`Seleccionaste ${item.form}`);

    if (newSelected.length === currentSequence.length) {
      checkSequence(newSelected);
    }
  };

  const checkSequence = (selected: string[]) => {
    const correctSequence = correctOrder.map(item => item.id);
    const isCorrect = JSON.stringify(selected) === JSON.stringify(correctSequence);

    if (isCorrect) {
      setShowFeedback('correct');
      setScore(score + 20);
      const newCompleted = [...completed];
      newCompleted[currentSequenceIndex] = true;
      setCompleted(newCompleted);
      announceToScreenReader('¡Correcto! Excelente secuencia');

      setTimeout(() => {
        if (currentSequenceIndex < sequences.length - 1) {
          setCurrentSequenceIndex(currentSequenceIndex + 1);
          setSelectedItems([]);
          setShowFeedback(null);
        }
      }, 1500);
    } else {
      setShowFeedback('wrong');
      announceToScreenReader('Intenta de nuevo, el orden no es correcto');

      setTimeout(() => {
        setSelectedItems([]);
        setShowFeedback(null);
      }, 1500);
    }
  };

  const isGameComplete = completed.every(c => c);

  const handleSaveProgress = () => {
    addGameProgress('dbz-sequence', score, 'easy');
    setGameSaved(true);
    announceToScreenReader('Tu progreso ha sido guardado');
  };

  const handleRestart = () => {
    setCurrentSequenceIndex(0);
    setSelectedItems([]);
    setScore(0);
    setCompleted(new Array(3).fill(false));
    setGameSaved(false);
    setShowFeedback(null);
    const allSequences = [gokuSequence, vegetaSequence, trunksSequence];
    setSequences(allSequences.map(seq => [...seq].sort(() => Math.random() - 0.5)));
  };

  return (
    <div className="dbz-container">
      {!isGameComplete ? (
        <>
          <div className="dbz-header">
            <div className="dbz-title-section">
              <h2 className="dbz-title">Ordena las Transformaciones</h2>
              <p className="dbz-subtitle">Coloca las transformaciones en el orden correcto</p>
            </div>
            <div className="dbz-score-box">
              <div className="dbz-score">{score}</div>
              <div className="dbz-score-label">Puntos</div>
            </div>
          </div>

          <div className="dbz-progress-bar-container">
            <div
              className="dbz-progress-bar-fill"
              style={{ width: `${((currentSequenceIndex + 1) / sequences.length) * 100}%` }}
            />
          </div>
          <p className="dbz-progress-text">
            Personaje {currentSequenceIndex + 1} de {sequences.length}
          </p>

          <div className="dbz-game-area">
            <div className="dbz-character-name">
              {currentSequence.length > 0 && currentSequence[0].character}
            </div>

            <div className={`dbz-items-grid ${showFeedback}`}>
              {currentSequence.map((item) => {
                const isSelected = selectedItems.includes(item.id);
                const orderIndex = selectedItems.indexOf(item.id) + 1;

                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelectItem(item)}
                    disabled={isSequenceComplete && !isSelected}
                    className={`dbz-item-button ${isSelected ? 'selected' : ''}`}
                  >
                    <img 
                      src={item.image} 
                      alt={item.form}
                      className="dbz-item-image"
                    />
                    <div className="dbz-item-form">{item.form}</div>
                    {isSelected && (
                      <div className="dbz-item-order">{orderIndex}</div>
                    )}
                  </button>
                );
              })}
            </div>

            {showFeedback === 'correct' && (
              <div className="dbz-feedback dbz-correct">
                <Check size={40} />
                <p>¡Correcto!</p>
              </div>
            )}

            {showFeedback === 'wrong' && (
              <div className="dbz-feedback dbz-wrong">
                <p>Intenta de nuevo</p>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="dbz-completion">
          <div className="dbz-completion-icon">🎉</div>
          <h3 className="dbz-completion-title">¡Completaste el juego!</h3>
          <p className="dbz-completion-score">
            Puntuación final: <strong>{score} puntos</strong>
          </p>

          <div className="dbz-completion-buttons">
            {!gameSaved && (
              <button
                onClick={handleSaveProgress}
                className="dbz-btn dbz-btn-save"
              >
                <Check size={20} />
                Guardar Progreso
              </button>
            )}

            {gameSaved && (
              <div className="dbz-btn-saved">
                <Check size={20} />
                Progreso guardado
              </div>
            )}

            <button
              onClick={handleRestart}
              className="dbz-btn dbz-btn-restart"
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