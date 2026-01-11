import { useState, useEffect } from 'react';

interface MathChapter1Props {
  onBack: () => void;
}

interface Sheep {
  id: number;
  x: number;
  y: number;
}

function MathChapter1({ onBack }: MathChapter1Props) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [game1Count, setGame1Count] = useState(0);
  const [countedSheep, setCountedSheep] = useState<Set<number>>(new Set());
  const [game1Sheep, setGame1Sheep] = useState<Sheep[]>([]);
  const [game2Count, setGame2Count] = useState(0);
  const [game2Sheep, setGame2Sheep] = useState<Sheep[]>([]);

  const totalSlides = 8;

  useEffect(() => {
    if (currentSlide === 2) initGame1();
    if (currentSlide === 4) initGame2();
  }, [currentSlide]);

  useEffect(() => {
    if (currentSlide !== 4) return;

    const interval = setInterval(() => {
      setGame2Sheep(prev =>
        prev.map(s => ({
          ...s,
          x: Math.max(5, Math.min(85, s.x + (Math.random() - 0.5) * 8)),
          y: Math.max(5, Math.min(80, s.y + (Math.random() - 0.5) * 8)),
        }))
      );
    }, 100);

    return () => clearInterval(interval);
  }, [currentSlide]);

  const initGame1 = () => {
    const sheep = Array.from({ length: 5 }, (_, i) => ({
      id: i,
      x: Math.random() * 70 + 15,
      y: Math.random() * 50 + 25,
    }));
    setGame1Sheep(sheep);
    setGame1Count(0);
    setCountedSheep(new Set());
  };

  const initGame2 = () => {
    const sheep = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 80 + 10,
      y: Math.random() * 70 + 10,
    }));
    setGame2Sheep(sheep);
    setGame2Count(0);
  };

  const countSheep1 = (id: number) => {
    if (countedSheep.has(id)) return;
    setCountedSheep(prev => new Set(prev).add(id));
    setGame1Count(c => c + 1);
  };

  const removeSheep2 = (id: number) => {
    setGame2Sheep(prev => prev.filter(s => s.id !== id));
    setGame2Count(c => c + 1);
  };

  const moveNext = () => {
    if (currentSlide < totalSlides - 1) {
      setCurrentSlide(s => s + 1);
    }
  };

  return (
    <div style={{
      height: '100%',
      fontFamily: "'Nunito', sans-serif",
      background: 'linear-gradient(135deg, #1a0633 0%, #4a148c 100%)',
      color: '#fff',
      overflow: 'hidden'
    }}>
      <div style={{
        position: 'relative',
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
      }}>
        {[0,1,2,3,4,5,6,7].map(slideNum => (
          <div
            key={slideNum}
            style={{
              position: 'absolute',
              width: '80%',
              maxWidth: '800px',
              opacity: currentSlide === slideNum ? 1 : 0,
              transform: currentSlide === slideNum
                ? 'translateY(0)'
                : 'translateY(20px)',
              pointerEvents: currentSlide === slideNum ? 'all' : 'none',
              transition: 'all 0.5s ease',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >

            {/* SLIDE CONTENT (sin cambios) */}
            {slideNum === 0 && (
              <>
                <h1 style={{ fontSize: '3rem', color: '#ffb800' }}>The Magic of Counting</h1>
                <p>Long, long time ago, humans needed to count.</p>
              </>
            )}

            {slideNum === 1 && <p>One mark for one thing. Units.</p>}

            {slideNum === 2 && (
              <>
                <h3>Tap the sheep!</h3>
                <p>Count: {game1Count}</p>
                {game1Sheep.map(s => (
                  <span key={s.id} onClick={() => countSheep1(s.id)}>🐑</span>
                ))}
              </>
            )}

            {slideNum === 3 && <p>The Ishango Bone 🦴</p>}

            {slideNum === 4 && (
              <>
                <p>Chaos challenge</p>
                <p>{game2Count} / 30</p>
                {game2Sheep.map(s => (
                  <span key={s.id} onClick={() => removeSheep2(s.id)}>🐑</span>
                ))}
              </>
            )}

            {slideNum === 7 && (
              <button onClick={onBack}>BACK</button>
            )}

          </div>
        ))}
      </div>

      {currentSlide < totalSlides - 1 && (
        <button
          onClick={moveNext}
          style={{
            position: 'fixed',
            bottom: 40,
            right: 40,
            padding: '15px 30px',
            fontWeight: 900
          }}
        >
          NEXT ➜
        </button>
      )}
    </div>
  );
}

export default MathChapter1;
