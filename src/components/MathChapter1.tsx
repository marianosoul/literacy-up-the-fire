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
  
  // Duolingo States
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

  const totalSlides = 14; 

  // Reset feedback and selections whenever we move slides
  useEffect(() => {
    setSelectedOption(null);
    setFeedback(null);
    
    if (currentSlide === 2) initGame1();
    if (currentSlide === 4) initGame2();
  }, [currentSlide]);

  // Movement for Chaos Challenge
  useEffect(() => {
    if (currentSlide === 4 && game2Sheep.length > 0) {
      const interval = setInterval(() => {
        setGame2Sheep(prev =>
          prev.map(s => ({
            ...s,
            x: Math.max(5, Math.min(85, s.x + (Math.random() - 0.5) * 8)),
            y: Math.max(5, Math.min(80, s.y + (Math.random() - 0.5) * 8))
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

  const handleOptionClick = (isCorrect: boolean, index: number) => {
    // Prevent changing answer once feedback is shown
    if (feedback) return;
    
    setSelectedOption(index);
    setFeedback(isCorrect ? 'correct' : 'wrong');
  };

  const moveNext = () => {
    if (currentSlide < totalSlides - 1) {
      setCurrentSlide(prev => prev + 1);
    }
  };

  return (
    <div style={{ margin: 0, padding: 0, height: '100vh', fontFamily: "'Nunito', sans-serif", background: 'linear-gradient(135deg, #1a0633 0%, #4a148c 100%)', color: '#ffffff', overflow: 'hidden' }}>
      
      {/* Progress Bar */}
      <div style={{ position: 'fixed', top: 20, left: '50%', transform: 'translateX(-50%)', width: '70%', height: '12px', background: 'rgba(255,255,255,0.2)', borderRadius: '10px', zIndex: 10 }}>
        <div style={{ width: `${((currentSlide + 1) / totalSlides) * 100}%`, height: '100%', background: '#ffb800', borderRadius: '10px', transition: 'width 0.4s ease' }}></div>
      </div>

      <div style={{ position: 'relative', height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
        {[...Array(totalSlides)].map((_, idx) => (
          <div key={idx} style={{ 
            position: 'absolute', width: '85%', maxWidth: '800px',
            opacity: currentSlide === idx ? 1 : 0, 
            transform: currentSlide === idx ? 'translateY(0)' : 'translateY(30px)', 
            transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)', 
            pointerEvents: currentSlide === idx ? 'all' : 'none',
            visibility: currentSlide === idx ? 'visible' : 'hidden',
            display: 'flex', flexDirection: 'column', alignItems: 'center'
          }}>
            
            {/* Story Content */}
            {idx === 0 && (
              <>
                <h1 style={{ color: '#ffb800', fontSize: '2.8rem' }}>The Magic of Counting</h1>
                <p style={{ fontSize: '1.4rem', lineHeight: 1.5 }}>Long, long time ago, before schools, before books, and before numbers, we—humans—already had the need to count.</p>
                <p style={{ fontSize: '1.2rem' }}>Counting was not about homework. <span style={{ color: '#ffb800', fontWeight: 900 }}>It was about life.</span></p>
              </>
            )}

            {idx === 1 && (
              <>
                <p style={{ fontSize: '1.4rem' }}>At the very beginning, there were no numbers. So people did something very simple: they made marks.</p>
                <div style={{ fontSize: '4rem', color: '#ffb800', letterSpacing: '15px', margin: '30px 0', textShadow: '0 0 20px rgba(255,184,0,0.5)' }}>I II III IIII</div>
                <p>One mark for one thing. They counted units.</p>
              </>
            )}

            {idx === 2 && (
              <>
                <h3 style={{ color: '#ffb800' }}>Activity: The First Marks</h3>
                <p>Tap the sheep to count them as they appear</p>
                <div style={{ fontSize: '1.8rem', background: '#8e44ad', padding: '10px 40px', borderRadius: '50px', marginBottom: '20px' }}>Count: {game1Count}</div>
                <div style={{ width: '100%', height: '300px', background: 'rgba(0,0,0,0.2)', borderRadius: '25px', position: 'relative', overflow: 'hidden', border: '3px dashed #ffb800' }}>
                  {game1Sheep.map(s => (
                    <div key={s.id} onClick={() => { if(!countedSheep.has(s.id)) { setCountedSheep(new Set(countedSheep.add(s.id))); setGame1Count(c => c+1); } }} style={{ position: 'absolute', fontSize: '50px', left: `${s.x}%`, top: `${s.y}%`, cursor: 'pointer', transition: 'transform 0.2s', opacity: countedSheep.has(s.id) ? 0.2 : 1, transform: countedSheep.has(s.id) ? 'scale(0.8)' : 'scale(1)' }}>🐑</div>
                  ))}
                </div>
              </>
            )}

            {idx === 3 && (
              <>
                <h2 style={{ color: '#ffb800' }}>The Ishango Bone</h2>
                <div style={{ fontSize: '5rem', margin: '20px' }}>🦴</div>
                <p style={{ fontSize: '1.2rem' }}>Discovered near the Nile River, this bone is more than <span style={{ fontWeight: 900 }}>20,000 years old</span>.</p>
                <p>The carefully carved lines show that humans have always used math to understand their world.</p>
              </>
            )}

            {idx === 4 && (
              <>
                <h3 style={{ color: '#ffb800' }}>The Chaos Challenge!</h3>
                <p>When there are too many marks, it gets confusing. Try to count these moving sheep!</p>
                <div style={{ fontSize: '1.8rem', background: '#a67c00', padding: '10px 40px', borderRadius: '50px', marginBottom: '20px' }}>Caught: {game2Count} / 30</div>
                <div style={{ width: '100%', height: '350px', background: 'rgba(0,0,0,0.2)', borderRadius: '25px', position: 'relative', overflow: 'hidden', border: '3px dashed #ffb800' }}>
                  {game2Sheep.map(s => (
                    <div key={s.id} onClick={() => { setGame2Sheep(prev => prev.filter(sh => sh.id !== s.id)); setGame2Count(c => c+1); }} style={{ position: 'absolute', fontSize: '35px', left: `${s.x}%`, top: `${s.y}%`, cursor: 'pointer', userSelect: 'none' }}>🐑</div>
                  ))}
                </div>
              </>
            )}

            {idx === 5 && (
              <>
                <h2 style={{ color: '#ffb800' }}>Evolution</h2>
                <p>Marks were no longer enough. We needed symbols.</p>
                <div style={{ fontSize: '3rem', color: '#ffb800', fontWeight: 900, margin: '30px 0', background: 'rgba(0,0,0,0.3)', padding: '20px', borderRadius: '20px' }}>0 1 2 3 4 5 6 7 8 9</div>
                <p>With just these ten symbols, we can count beyond imagination.</p>
              </>
            )}

            {idx === 6 && (
              <>
                <h2 style={{ color: '#ffb800' }}>Place Value</h2>
                <p>In <span style={{ color: '#ffb800', fontWeight: 900, fontSize: '1.5rem' }}>345</span>, the position changes everything:</p>
                <div style={{ display: 'flex', gap: '15px', marginTop: '30px', width: '100%' }}>
                  {[{v:'3',l:'Hundreds',c:'#e74c3c'},{v:'4',l:'Tens',c:'#f1c40f'},{v:'5',l:'Units',c:'#2ecc71'}].map((item, i) => (
                    <div key={i} style={{ background: 'rgba(255,255,255,0.1)', padding: '25px', borderRadius: '20px', borderBottom: `5px solid ${item.c}`, flex: 1 }}>
                      <h1 style={{ color: item.c, margin: 0 }}>{item.v}</h1><p style={{ margin: '5px 0 0 0' }}>{item.l}</p>
                    </div>
                  ))}
                </div>
              </>
            )}

            {idx === 7 && (
              <>
                <h2 style={{ color: '#ffb800' }}>Grouping</h2>
                <div style={{ textAlign: 'left', display: 'inline-block', fontSize: '1.3rem' }}>
                  <p>📦 10 Units = <span style={{ color: '#ffb800' }}>1 Ten</span></p>
                  <p>📦 10 Tens = <span style={{ color: '#ffb800' }}>1 Hundred</span></p>
                </div>
                <p style={{ marginTop: '20px' }}>Grouping makes counting faster and clearer.</p>
              </>
            )}

            {idx === 8 && (
              <>
                <h2 style={{ color: '#ffb800' }}>Smaller than One</h2>
                <p>Decimal points let us count parts of a whole.</p>
                <div style={{ fontSize: '5rem', fontWeight: 900, color: '#ffb800' }}>2.5</div>
                <p>That means 2 Units and 5 <span style={{ color: '#ffb800', fontWeight: 900 }}>Tenths</span>.</p>
              </>
            )}

            {idx === 9 && (
              <>
                <h1 style={{ color: '#ffb800' }}>Numbers are Stories</h1>
                <p style={{ fontSize: '1.4rem' }}>They were created to solve real problems.</p>
                <p>From carved lines on bones to digits on a screen, counting has always been part of who we are.</p>
              </>
            )}

            {/* --- QUESTIONS SECTION --- */}
            {idx === 10 && (
              <>
                <h2 style={{ color: '#ffb800' }}>Challenge 1</h2>
                <p style={{ fontSize: '1.5rem' }}>What did humans use to count <span style={{ fontWeight: 900 }}>before</span> symbols like "5" or "10" were invented?</p>
                <div style={{ width: '100%', marginTop: '30px' }}>
                  {[
                    { text: "Calculators", correct: false },
                    { text: "Carved marks (one mark for one thing)", correct: true },
                    { text: "They didn't count at all", correct: false }
                  ].map((opt, i) => (
                    <button 
                      key={i} 
                      onClick={() => handleOptionClick(opt.correct, i)}
                      style={{ 
                        width: '100%', padding: '20px', margin: '10px 0', borderRadius: '15px', cursor: 'pointer', fontSize: '1.2rem', color: '#fff', transition: '0.2s',
                        background: selectedOption === i ? 'rgba(255, 184, 0, 0.2)' : 'rgba(255,255,255,0.05)',
                        border: `3px solid ${selectedOption === i ? '#ffb800' : 'rgba(255,255,255,0.1)'}`,
                        outline: 'none'
                      }}
                    >
                      {opt.text}
                    </button>
                  ))}
                </div>
              </>
            )}

            {idx === 11 && (
              <>
                <h2 style={{ color: '#ffb800' }}>Challenge 2</h2>
                <p style={{ fontSize: '1.5rem' }}>In the number <span style={{ color: '#ffb800' }}>345</span>, what does the digit <span style={{ fontWeight: 900 }}>4</span> represent?</p>
                <div style={{ width: '100%', marginTop: '30px' }}>
                  {[
                    { text: "4 Units", correct: false },
                    { text: "4 Tens (40)", correct: true },
                    { text: "4 Hundreds (400)", correct: false }
                  ].map((opt, i) => (
                    <button 
                      key={i} 
                      onClick={() => handleOptionClick(opt.correct, i)}
                      style={{ 
                        width: '100%', padding: '20px', margin: '10px 0', borderRadius: '15px', cursor: 'pointer', fontSize: '1.2rem', color: '#fff', transition: '0.2s',
                        background: selectedOption === i ? 'rgba(255, 184, 0, 0.2)' : 'rgba(255,255,255,0.05)',
                        border: `3px solid ${selectedOption === i ? '#ffb800' : 'rgba(255,255,255,0.1)'}`,
                        outline: 'none'
                      }}
                    >
                      {opt.text}
                    </button>
                  ))}
                </div>
              </>
            )}

            {idx === 12 && (
              <>
                <h2 style={{ color: '#ffb800' }}>Challenge 3</h2>
                <p style={{ fontSize: '1.5rem' }}>Which number represents <span style={{ color: '#ffb800' }}>2 units and 5 tenths</span>?</p>
                <div style={{ width: '100%', marginTop: '30px' }}>
                  {[
                    { text: "25", correct: false },
                    { text: "2.5", correct: true },
                    { text: "0.25", correct: false }
                  ].map((opt, i) => (
                    <button 
                      key={i} 
                      onClick={() => handleOptionClick(opt.correct, i)}
                      style={{ 
                        width: '100%', padding: '20px', margin: '10px 0', borderRadius: '15px', cursor: 'pointer', fontSize: '1.2rem', color: '#fff', transition: '0.2s',
                        background: selectedOption === i ? 'rgba(255, 184, 0, 0.2)' : 'rgba(255,255,255,0.05)',
                        border: `3px solid ${selectedOption === i ? '#ffb800' : 'rgba(255,255,255,0.1)'}`,
                        outline: 'none'
                      }}
                    >
                      {opt.text}
                    </button>
                  ))}
                </div>
              </>
            )}

            {idx === 13 && (
              <>
                <h1 style={{ fontSize: '5rem', marginBottom: '10px' }}>🏆</h1>
                <h1 style={{ color: '#ffb800' }}>Course Complete!</h1>
                <p style={{ fontSize: '1.3rem' }}>You've learned that numbers are more than symbols—they are tools to understand our universe.</p>
                <button onClick={onBack} style={{ marginTop: '30px', background: '#ffb800', border: 'none', borderBottom: '5px solid #cc9300', padding: '20px 60px', borderRadius: '20px', fontSize: '1.5rem', fontWeight: 900, cursor: 'pointer', color: '#4a148c' }}>RETURN HOME</button>
              </>
            )}

          </div>
        ))}
      </div>

      {/* Story Navigation (Only visible before questions start) */}
      {currentSlide < 10 && (
        <div style={{ position: 'fixed', bottom: '40px', right: '40px' }}>
          <button onClick={moveNext} style={{ background: '#ffb800', border: 'none', borderBottom: '5px solid #cc9300', padding: '18px 50px', borderRadius: '18px', fontSize: '1.4rem', fontWeight: 900, cursor: 'pointer', color: '#4a148c' }}>CONTINUE ➜</button>
        </div>
      )}

      {/* DUOLINGO FEEDBACK BAR (For Questions) */}
      <div style={{ 
        position: 'fixed', bottom: feedback ? 0 : '-160px', left: 0, right: 0, 
        height: '140px', background: feedback === 'correct' ? '#d7ffb8' : '#ffdfe0', 
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '50px',
        transition: 'bottom 0.4s cubic-bezier(0.18, 0.89, 0.32, 1.28)', zIndex: 200, borderTop: '2px solid rgba(0,0,0,0.1)' 
      }}>
        <div style={{ textAlign: 'left' }}>
          <h2 style={{ color: feedback === 'correct' ? '#58cc02' : '#ea2b2b', margin: 0, fontSize: '2rem' }}>
            {feedback === 'correct' ? '✨ Excellent!' : '❌ Incorrect'}
          </h2>
          <p style={{ color: feedback === 'correct' ? '#58cc02' : '#ea2b2b', margin: 0 }}>
            {feedback === 'correct' ? 'You are getting the hang of this!' : 'Look closely at the story details.'}
          </p>
        </div>
        <button 
          onClick={() => { if(feedback === 'correct') moveNext(); else setFeedback(null); setSelectedOption(null); }}
          style={{ background: feedback === 'correct' ? '#58cc02' : '#ea2b2b', color: '#fff', border: 'none', padding: '20px 60px', borderRadius: '20px', fontWeight: 900, cursor: 'pointer', fontSize: '1.3rem', boxShadow: '0 5px 0 rgba(0,0,0,0.2)' }}
        >
          {feedback === 'correct' ? 'CONTINUE' : 'TRY AGAIN'}
        </button>
      </div>

    </div>
  );
}

export default MathChapter;