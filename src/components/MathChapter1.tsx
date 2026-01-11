import { useState, useEffect } from 'react';

interface MathChapterProps {
  onBack: () => void;
}

interface Sheep {
  id: number;
  x: number;
  y: number;
}

function MathChapter({ onBack }: MathChapterProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [game1Count, setGame1Count] = useState(0);
  const [countedSheep, setCountedSheep] = useState<Set<number>>(new Set());
  const [game1Sheep, setGame1Sheep] = useState<Sheep[]>([]);
  const [game2Count, setGame2Count] = useState(0);
  const [game2Sheep, setGame2Sheep] = useState<Sheep[]>([]);
  
  // Feedback estilo Duolingo
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

  const totalSlides = 14; 

  useEffect(() => {
    if (currentSlide === 2) initGame1();
    if (currentSlide === 4) initGame2();
    setSelectedOption(null);
    setFeedback(null);
  }, [currentSlide]);

  // Movimiento de ovejas en el "Reto del Caos"
  useEffect(() => {
    if (currentSlide === 4 && game2Sheep.length > 0) {
      const interval = setInterval(() => {
        setGame2Sheep(prev =>
          prev.map(s => ({
            ...s,
            x: Math.max(5, Math.min(85, s.x + (Math.random() - 0.5) * 10)),
            y: Math.max(5, Math.min(80, s.y + (Math.random() - 0.5) * 10))
          }))
        );
      }, 100);
      return () => clearInterval(interval);
    }
  }, [currentSlide, game2Sheep.length]);

  const initGame1 = () => {
    setGame1Sheep(Array.from({ length: 5 }, (_, i) => ({ id: i, x: 20 + i * 12, y: 40 })));
    setGame1Count(0);
    setCountedSheep(new Set());
  };

  const initGame2 = () => {
    setGame2Sheep(Array.from({ length: 30 }, (_, i) => ({ 
      id: i, x: Math.random() * 80 + 5, y: Math.random() * 70 + 5 
    })));
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
      
      {/* Progress Bar */}
      <div style={{ position: 'fixed', top: 20, left: '50%', transform: 'translateX(-50%)', width: '70%', height: '10px', background: 'rgba(255,255,255,0.2)', borderRadius: '10px', zIndex: 10 }}>
        <div style={{ width: `${((currentSlide + 1) / totalSlides) * 100}%`, height: '100%', background: '#ffb800', borderRadius: '10px', transition: 'width 0.4s' }}></div>
      </div>

      <div style={{ position: 'relative', height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
        {[...Array(totalSlides)].map((_, idx) => (
          <div key={idx} style={{ 
            position: 'absolute', width: '85%', maxWidth: '800px',
            opacity: currentSlide === idx ? 1 : 0, 
            transform: currentSlide === idx ? 'translateY(0)' : 'translateY(25px)', 
            transition: 'all 0.5s ease', 
            pointerEvents: currentSlide === idx ? 'all' : 'none',
            visibility: currentSlide === idx ? 'visible' : 'hidden',
            display: 'flex', flexDirection: 'column', alignItems: 'center'
          }}>
            
            {/* Slide 0: Intro */}
            {idx === 0 && (
              <>
                <h1 style={{ color: '#ffb800', fontSize: '2.5rem' }}>The Magic of Counting</h1>
                <p style={{ fontSize: '1.4rem' }}>Long, long time ago, before schools, before books, and before numbers, we—humans—already had the need to count.</p>
                <p>Counting was not about homework. <span style={{ color: '#ffb800', fontWeight: 900 }}>It was about life.</span></p>
              </>
            )}

            {/* Slide 1: Marks */}
            {idx === 1 && (
              <>
                <p style={{ fontSize: '1.3rem' }}>At the very beginning, there were no numbers. So people made marks.</p>
                <p>One mark for one thing. They counted units.</p>
                <div style={{ fontSize: '3rem', color: '#ffb800', letterSpacing: '10px', margin: '20px 0' }}>I II III IIII</div>
              </>
            )}

            {/* Slide 2: Game 1 */}
            {idx === 2 && (
              <>
                <h3 style={{ color: '#ffb800' }}>Try it: Tap the sheep to mark them</h3>
                <div style={{ fontSize: '1.5rem', background: '#8e44ad', padding: '10px 30px', borderRadius: '50px', marginBottom: '15px' }}>Count: {game1Count}</div>
                <div style={{ width: '100%', height: '300px', background: 'rgba(0,0,0,0.2)', borderRadius: '20px', position: 'relative', overflow: 'hidden', border: '2px dashed #ffb800' }}>
                  {game1Sheep.map(s => (
                    <div key={s.id} onClick={() => { if(!countedSheep.has(s.id)) { setCountedSheep(new Set(countedSheep.add(s.id))); setGame1Count(c => c+1); } }} style={{ position: 'absolute', fontSize: '50px', left: `${s.x}%`, top: `${s.y}%`, cursor: 'pointer', opacity: countedSheep.has(s.id) ? 0.3 : 1 }}>🐑</div>
                  ))}
                </div>
              </>
            )}

            {/* Slide 3: Ishango Bone */}
            {idx === 3 && (
              <>
                <h2 style={{ color: '#ffb800' }}>The Ishango Bone</h2>
                <p>Discovered near the Nile River, this bone is more than <span style={{ fontWeight: 900 }}>20,000 years old</span>.</p>
                
                <p>It shows humans using math to understand their world since the very beginning.</p>
              </>
            )}

            {/* Slide 4: Game 2 Chaos */}
            {idx === 4 && (
              <>
                <h3 style={{ color: '#ffb800' }}>The Chaos Challenge!</h3>
                <p>As herds grew, counting one by one became slow and confusing. Try catching these!</p>
                <div style={{ fontSize: '1.5rem', background: '#a67c00', padding: '10px 30px', borderRadius: '50px', marginBottom: '15px' }}>Caught: {game2Count} / 30</div>
                <div style={{ width: '100%', height: '300px', background: 'rgba(0,0,0,0.2)', borderRadius: '20px', position: 'relative', overflow: 'hidden', border: '2px dashed #ffb800' }}>
                  {game2Sheep.map(s => (
                    <div key={s.id} onClick={() => { setGame2Sheep(game2Sheep.filter(sh => sh.id !== s.id)); setGame2Count(c => c+1); }} style={{ position: 'absolute', fontSize: '30px', left: `${s.x}%`, top: `${s.y}%`, cursor: 'pointer', transition: 'all 0.1s linear' }}>🐑</div>
                  ))}
                </div>
              </>
            )}

            {/* Slide 5: Symbols Evolution */}
            {idx === 5 && (
              <>
                <p>Marks were no longer enough. Civilizations created symbols.</p>
                <p>Today we use just ten symbols to count beyond imagination:</p>
                <div style={{ fontSize: '2.5rem', color: '#ffb800', fontWeight: 900, margin: '20px 0' }}>0 1 2 3 4 5 6 7 8 9</div>
              </>
            )}

            {/* Slide 6: Place Value */}
            {idx === 6 && (
              <>
                <h2 style={{ color: '#ffb800' }}>Numbers are Stories</h2>
                <p>Look at <span style={{ fontSize: '2rem', color: '#ffb800', fontWeight: 900 }}>345</span>. It's not just 3, 4, 5.</p>
                <div style={{ display: 'flex', gap: '15px', marginTop: '20px' }}>
                  {[{v:'3',l:'hundreds'},{v:'4',l:'tens'},{v:'5',l:'units'}].map((item, i) => (
                    <div key={i} style={{ background: 'rgba(255,255,255,0.1)', padding: '20px', borderRadius: '15px', border: '2px solid #8e44ad', flex: 1 }}>
                      <h2 style={{ color: '#ffb800', margin: 0 }}>{item.v}</h2><p>{item.l}</p>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Slide 7: Grouping */}
            {idx === 7 && (
              <>
                <h2 style={{ color: '#ffb800' }}>The Power of Grouping</h2>
                <p>10 Units = 1 Ten</p>
                <p>10 Tens = 1 Hundred</p>
                <p>This system allows us to count cities, stars, and history without getting lost.</p>
              </>
            )}

            {/* Slide 8: Decimals */}
            {idx === 8 && (
              <>
                <h2 style={{ color: '#ffb800' }}>Counting smaller than one</h2>
                <p>Sometimes we need to count parts: half a pizza or a small amount of liquid.</p>
                <h1 style={{ fontSize: '4rem', color: '#ffb800' }}>2.5</h1>
                
                <p>2 units and 5 <span style={{ fontWeight: 900 }}>tenths</span>.</p>
              </>
            )}

            {/* Slide 9: Conclusion Narrative */}
            {idx === 9 && (
              <>
                <p>From carved lines on bones to digits on a screen, counting has always been part of who we are.</p>
                <p style={{ fontSize: '1.8rem', color: '#ffb800', fontWeight: 900 }}>Numbers are stories. And this was the first one.</p>
              </>
            )}

            {/* --- EXERCISES SECTION --- */}
            {idx === 10 && (
              <>
                <h2 style={{ color: '#ffb800' }}>Knowledge Check!</h2>
                <p>In the number <span style={{ color: '#ffb800', fontWeight: 900 }}>729</span>, what does the <span style={{ borderBottom: '2px solid' }}>7</span> represent?</p>
                <div style={{ width: '100%', marginTop: '20px' }}>
                  {['7 units', '7 tens', '7 hundreds'].map((opt, i) => (
                    <div key={i} onClick={() => checkExercise(opt === '7 hundreds', i)} style={{ padding: '15px', margin: '10px 0', borderRadius: '15px', border: `3px solid ${selectedOption === i ? '#ffb800' : 'rgba(255,255,255,0.2)'}`, background: 'rgba(255,255,255,0.05)', cursor: 'pointer' }}>{opt}</div>
                  ))}
                </div>
              </>
            )}

            {idx === 11 && (
              <>
                <h2 style={{ color: '#ffb800' }}>Decimal Challenge</h2>
                <p>What is the value of the 3 in <span style={{ color: '#ffb800', fontWeight: 900 }}>0.3</span>?</p>
                <div style={{ width: '100%', marginTop: '20px' }}>
                  {['3 units', '3 tenths', '3 hundredths'].map((opt, i) => (
                    <div key={i} onClick={() => checkExercise(opt === '3 tenths', i)} style={{ padding: '15px', margin: '10px 0', borderRadius: '15px', border: `3px solid ${selectedOption === i ? '#ffb800' : 'rgba(255,255,255,0.2)'}`, background: 'rgba(255,255,255,0.05)', cursor: 'pointer' }}>{opt}</div>
                  ))}
                </div>
              </>
            )}

            {idx === 12 && (
              <>
                <h2 style={{ color: '#ffb800' }}>History Check</h2>
                <p>What was the primary reason humans invented counting systems?</p>
                <div style={{ width: '100%', marginTop: '20px' }}>
                  {['To make homework', 'To solve real-life problems (animals, food, time)', 'To draw on bones for fun'].map((opt, i) => (
                    <div key={i} onClick={() => checkExercise(i === 1, i)} style={{ padding: '15px', margin: '10px 0', borderRadius: '15px', border: `3px solid ${selectedOption === i ? '#ffb800' : 'rgba(255,255,255,0.2)'}`, background: 'rgba(255,255,255,0.05)', cursor: 'pointer' }}>{opt}</div>
                  ))}
                </div>
              </>
            )}

            {idx === 13 && (
              <>
                <h1 style={{ fontSize: '4rem' }}>⭐</h1>
                <h2 style={{ color: '#ffb800' }}>Chapter Mastered!</h2>
                <p>You've completed the first story of mathematics.</p>
                <button onClick={onBack} style={{ background: '#ffb800', border: 'none', borderBottom: '4px solid #cc9300', padding: '15px 40px', borderRadius: '15px', fontSize: '1.2rem', fontWeight: 900, cursor: 'pointer', color: '#4a148c', marginTop: '20px' }}>FINISH</button>
              </>
            )}

          </div>
        ))}
      </div>

      {/* Navigation Button (Solo para historia) */}
      {currentSlide < 10 && (
        <div style={{ position: 'fixed', bottom: '40px', right: '40px' }}>
          <button onClick={moveNext} style={{ background: '#ffb800', border: 'none', borderBottom: '4px solid #cc9300', padding: '15px 40px', borderRadius: '15px', fontSize: '1.4rem', fontWeight: 900, cursor: 'pointer', color: '#4a148c' }}>CONTINUE ➜</button>
        </div>
      )}

      {/* Duolingo Feedback Bar */}
      <div style={{ 
        position: 'fixed', bottom: feedback ? 0 : '-150px', left: 0, right: 0, 
        height: '130px', background: feedback === 'correct' ? '#d7ffb8' : '#ffdfe0', 
        display: 'flex', alignItems: 'center', justifyContent: 'space-around', 
        transition: 'bottom 0.3s cubic-bezier(0.18, 0.89, 0.32, 1.28)', zIndex: 200, borderTop: '2px solid rgba(0,0,0,0.1)' 
      }}>
        <h2 style={{ color: feedback === 'correct' ? '#58cc02' : '#ea2b2b', margin: 0 }}>
          {feedback === 'correct' ? '✨ Excellent!' : '❌ Let\'s try again!'}
        </h2>
        <button 
          onClick={() => { if(feedback === 'correct') moveNext(); else setFeedback(null); }}
          style={{ background: feedback === 'correct' ? '#58cc02' : '#ea2b2b', color: '#fff', border: 'none', padding: '18px 45px', borderRadius: '15px', fontWeight: 900, cursor: 'pointer', fontSize: '1.2rem' }}
        >
          {feedback === 'correct' ? 'CONTINUE' : 'GOT IT'}
        </button>
      </div>

    </div>
  );
}

export default MathChapter;