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
  
  // Estados para Ejercicios Duolingo
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

  const totalSlides = 11; // 7 de historia/juego + 3 de ejercicios + 1 final

  useEffect(() => {
    if (currentSlide === 2) initGame1();
    if (currentSlide === 4) initGame2();
    setSelectedOption(null);
    setFeedback(null);
  }, [currentSlide]);

  // Movimiento de ovejas en el reto del caos
  useEffect(() => {
    if (currentSlide === 4) {
      const interval = setInterval(() => {
        setGame2Sheep(prev =>
          prev.map(sheep => ({
            ...sheep,
            x: Math.max(5, Math.min(85, sheep.x + (Math.random() - 0.5) * 6)),
            y: Math.max(5, Math.min(80, sheep.y + (Math.random() - 0.5) * 6))
          }))
        );
      }, 100);
      return () => clearInterval(interval);
    }
  }, [currentSlide]);

  const initGame1 = () => {
    const newSheep = Array.from({ length: 5 }, (_, i) => ({
      id: i, x: Math.random() * 70 + 15, y: Math.random() * 50 + 25
    }));
    setGame1Sheep(newSheep);
    setGame1Count(0);
    setCountedSheep(new Set());
  };

  const initGame2 = () => {
    const newSheep = Array.from({ length: 20 }, (_, i) => ({
      id: i, x: Math.random() * 80 + 10, y: Math.random() * 70 + 10
    }));
    setGame2Sheep(newSheep);
    setGame2Count(0);
  };

  const checkExercise = (isCorrect: boolean, index: number) => {
    setSelectedOption(index);
    setFeedback(isCorrect ? 'correct' : 'wrong');
  };

  const moveNext = () => {
    if (currentSlide < totalSlides - 1) setCurrentSlide(prev => prev + 1);
  };

  return (
    <div style={{ margin: 0, padding: 0, height: '100vh', fontFamily: "'Nunito', sans-serif", background: 'linear-gradient(135deg, #1a0633 0%, #4a148c 100%)', color: '#ffffff', overflow: 'hidden' }}>
      
      {/* Barra de Progreso */}
      <div style={{ position: 'fixed', top: 20, left: '50%', transform: 'translateX(-50%)', width: '75%', height: '12px', background: 'rgba(255,255,255,0.2)', borderRadius: '10px', zIndex: 10 }}>
        <div style={{ width: `${((currentSlide + 1) / totalSlides) * 100}%`, height: '100%', background: '#ffb800', borderRadius: '10px', transition: 'width 0.4s ease' }}></div>
      </div>

      <div style={{ position: 'relative', height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
        {[...Array(totalSlides)].map((_, idx) => (
          <div key={idx} style={{ 
            position: 'absolute', width: '85%', maxWidth: '750px',
            opacity: currentSlide === idx ? 1 : 0, 
            transform: currentSlide === idx ? 'translateY(0)' : 'translateY(30px)', 
            transition: 'all 0.5s ease', 
            pointerEvents: currentSlide === idx ? 'all' : 'none',
            visibility: currentSlide === idx ? 'visible' : 'hidden',
            display: 'flex', flexDirection: 'column', alignItems: 'center'
          }}>
            
            {/* --- SECCIÓN HISTORIA --- */}
            {idx === 0 && (
              <>
                <h1 style={{ color: '#ffb800', fontSize: '3rem' }}>The Magic of Counting</h1>
                <p style={{ fontSize: '1.4rem' }}>Long ago, before schools existed, humans already needed to count.</p>
                <p>It wasn't for homework... <span style={{ color: '#ffb800', fontWeight: 900 }}>It was to survive.</span></p>
              </>
            )}

            {idx === 1 && (
              <>
                <p style={{ fontSize: '1.4rem' }}>We started by making marks: one line for one thing.</p>
                <div style={{ fontSize: '3rem', color: '#ffb800', margin: '20px 0', letterSpacing: '8px' }}>I II III IIII</div>
                <p>We call these <span style={{ color: '#ffb800', fontWeight: 900 }}>Units</span>.</p>
              </>
            )}

            {idx === 2 && (
              <>
                <h3>Activity: Tap to Count</h3>
                <div style={{ fontSize: '1.5rem', background: '#8e44ad', padding: '10px 30px', borderRadius: '50px', marginBottom: '15px' }}>Count: {game1Count}</div>
                <div style={{ width: '100%', height: '300px', background: 'rgba(0,0,0,0.2)', borderRadius: '20px', position: 'relative', overflow: 'hidden', border: '2px dashed #ffb800' }}>
                  {game1Sheep.map(s => (
                    <div key={s.id} onClick={() => { if(!countedSheep.has(s.id)) { setCountedSheep(new Set(countedSheep.add(s.id))); setGame1Count(c => c+1); } }} style={{ position: 'absolute', fontSize: '40px', left: `${s.x}%`, top: `${s.y}%`, cursor: 'pointer', opacity: countedSheep.has(s.id) ? 0.3 : 1 }}>🐑</div>
                  ))}
                </div>
              </>
            )}

            {idx === 3 && (
              <>
                <h1 style={{ color: '#ffb800' }}>The Ishango Bone</h1>
                <div style={{ fontSize: '5rem' }}>🦴</div>
                <p>This 20,000-year-old bone proves that counting is part of who we are.</p>
              </>
            )}

            {idx === 4 && (
              <>
                <h3>The Chaos Challenge!</h3>
                <p>Counting moving things is hard! Try to catch these 20 sheep.</p>
                <div style={{ fontSize: '1.5rem', background: '#a67c00', padding: '10px 30px', borderRadius: '50px', marginBottom: '15px' }}>Caught: {game2Count} / 20</div>
                <div style={{ width: '100%', height: '300px', background: 'rgba(0,0,0,0.2)', borderRadius: '20px', position: 'relative', overflow: 'hidden', border: '2px dashed #ffb800' }}>
                  {game2Sheep.map(s => (
                    <div key={s.id} onClick={() => { setGame2Sheep(game2Sheep.filter(sh => sh.id !== s.id)); setGame2Count(c => c+1); }} style={{ position: 'absolute', fontSize: '30px', left: `${s.x}%`, top: `${s.y}%`, cursor: 'pointer', transition: 'all 0.1s linear' }}>🐑</div>
                  ))}
                </div>
              </>
            )}

            {idx === 5 && (
              <>
                <h1>Place Value</h1>
                <p>Grouping numbers changed everything. Look at <span style={{ color: '#ffb800', fontWeight: 900 }}>345</span>:</p>
                <div style={{ display: 'flex', gap: '15px', marginTop: '20px' }}>
                  {[{v:'3',l:'Hundreds'},{v:'4',l:'Tens'},{v:'5',l:'Units'}].map((item, i) => (
                    <div key={i} style={{ background: 'rgba(255,255,255,0.1)', padding: '20px', borderRadius: '15px', border: '2px solid #8e44ad' }}>
                      <h2 style={{ color: '#ffb800', margin: 0 }}>{item.v}</h2><p style={{ margin: 0 }}>{item.l}</p>
                    </div>
                  ))}
                </div>
              </>
            )}

            {idx === 6 && (
              <>
                <h1>Small Magic</h1>
                <p>What about things smaller than one? Like half a pizza?</p>
                <h2 style={{ fontSize: '4rem', color: '#ffb800' }}>2.5</h2>
                <p>Decimals let us count the <span style={{ color: '#ffb800' }}>unseen details</span> of the universe.</p>
              </>
            )}

            {/* --- SECCIÓN EJERCICIOS DUOLINGO --- */}
            {idx === 7 && (
              <>
                <h2 style={{ color: '#ffb800' }}>Challenge Time!</h2>
                <p style={{ fontSize: '1.4rem' }}>In the number <span style={{ color: '#ffb800', fontWeight: 900 }}>482</span>, which digit is in the <span style={{ borderBottom: '2px solid' }}>Tens</span> place?</p>
                <div style={{ width: '100%', marginTop: '20px' }}>
                  {['4', '8', '2'].map((opt, i) => (
                    <div key={i} onClick={() => checkAnswer(opt === '8', i)} style={{ padding: '18px', margin: '10px 0', borderRadius: '15px', border: `3px solid ${selectedOption === i ? '#ffb800' : 'rgba(255,255,255,0.1)'}`, background: 'rgba(255,255,255,0.05)', cursor: 'pointer', fontSize: '1.3rem', transition: '0.2s' }}>{opt}</div>
                  ))}
                </div>
              </>
            )}

            {idx === 8 && (
              <>
                <h2 style={{ color: '#ffb800' }}>Challenge 2</h2>
                <p style={{ fontSize: '1.4rem' }}>What is the value of the 5 in <span style={{ color: '#ffb800', fontWeight: 900 }}>5.2</span>?</p>
                <div style={{ width: '100%', marginTop: '20px' }}>
                  {['5 Tenths', '5 Units', '5 Hundreds'].map((opt, i) => (
                    <div key={i} onClick={() => checkAnswer(opt === '5 Units', i)} style={{ padding: '18px', margin: '10px 0', borderRadius: '15px', border: `3px solid ${selectedOption === i ? '#ffb800' : 'rgba(255,255,255,0.1)'}`, background: 'rgba(255,255,255,0.05)', cursor: 'pointer', fontSize: '1.3rem' }}>{opt}</div>
                  ))}
                </div>
              </>
            )}

            {idx === 9 && (
              <>
                <h2 style={{ color: '#ffb800' }}>Last One!</h2>
                <p style={{ fontSize: '1.4rem' }}>Grouping <span style={{ color: '#ffb800' }}>10 Units</span> creates one...</p>
                <div style={{ width: '100%', marginTop: '20px' }}>
                  {['Ten', 'Hundred', 'Decimal'].map((opt, i) => (
                    <div key={i} onClick={() => checkAnswer(opt === 'Ten', i)} style={{ padding: '18px', margin: '10px 0', borderRadius: '15px', border: `3px solid ${selectedOption === i ? '#ffb800' : 'rgba(255,255,255,0.1)'}`, background: 'rgba(255,255,255,0.05)', cursor: 'pointer', fontSize: '1.3rem' }}>{opt}</div>
                  ))}
                </div>
              </>
            )}

            {idx === 10 && (
              <>
                <h1 style={{ fontSize: '4rem' }}>🏆</h1>
                <h1 style={{ color: '#ffb800' }}>Mastered!</h1>
                <p>You understand the story of numbers.</p>
                <button onClick={onBack} style={{ marginTop: '20px', background: '#ffb800', border: 'none', borderBottom: '4px solid #cc9300', padding: '15px 40px', borderRadius: '15px', fontSize: '1.5rem', fontWeight: 900, cursor: 'pointer', color: '#4a148c' }}>BACK TO DASHBOARD</button>
              </>
            )}

          </div>
        ))}
      </div>

      {/* Botón NEXT (Solo para historia) */}
      {currentSlide < 7 && (
        <div style={{ position: 'fixed', bottom: '40px', right: '40px' }}>
          <button onClick={moveNext} style={{ background: '#ffb800', border: 'none', borderBottom: '4px solid #cc9300', padding: '15px 40px', borderRadius: '15px', fontSize: '1.4rem', fontWeight: 900, cursor: 'pointer', color: '#4a148c' }}>CONTINUE ➜</button>
        </div>
      )}

      {/* BARRA DUOLINGO (Feedback) */}
      <div style={{ 
        position: 'fixed', bottom: feedback ? 0 : '-150px', left: 0, right: 0, 
        height: '130px', background: feedback === 'correct' ? '#d7ffb8' : '#ffdfe0', 
        display: 'flex', alignItems: 'center', justifyContent: 'space-around', 
        transition: 'bottom 0.3s cubic-bezier(0.18, 0.89, 0.32, 1.28)', zIndex: 200, borderTop: '2px solid rgba(0,0,0,0.1)' 
      }}>
        <h2 style={{ color: feedback === 'correct' ? '#58cc02' : '#ea2b2b', margin: 0 }}>
          {feedback === 'correct' ? '✨ Brilliantly done!' : '❌ Not quite, try again!'}
        </h2>
        <button 
          onClick={() => { if(feedback === 'correct') moveNext(); else setFeedback(null); }}
          style={{ background: feedback === 'correct' ? '#58cc02' : '#ea2b2b', color: '#fff', border: 'none', padding: '18px 50px', borderRadius: '15px', fontWeight: 900, cursor: 'pointer', fontSize: '1.2rem' }}
        >
          {feedback === 'correct' ? 'CONTINUE' : 'GOT IT'}
        </button>
      </div>

    </div>
  );
}

export default MathChapter1;