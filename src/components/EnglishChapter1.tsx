import { useState, useEffect, useRef } from 'react';

interface WritingChapterProps {
  onBack: () => void;
}

function WritingChapter({ onBack }: WritingChapterProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  // We have 10 slides: 6 Story slides + 3 Quiz slides + 1 Finale
  const totalSlides = 10;

  useEffect(() => {
    if (currentSlide === 2 && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.lineCap = 'round';
        ctx.lineWidth = 4;
        ctx.strokeStyle = '#4a148c';
      }
    }
    setSelectedOption(null);
    setFeedback(null);
  }, [currentSlide]);

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDrawing(true);
    draw(e);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    canvasRef.current?.getContext('2d')?.beginPath();
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const x = ('touches' in e ? e.touches[0].clientX : e.clientX) - rect.left;
    const y = ('touches' in e ? e.touches[0].clientY : e.clientY) - rect.top;
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const checkAnswer = (isCorrect: boolean, index: number) => {
    setSelectedOption(index);
    setFeedback(isCorrect ? 'correct' : 'wrong');
  };

  const moveNext = () => {
    if (currentSlide < totalSlides - 1) {
      setCurrentSlide(prev => prev + 1);
    }
  };

  return (
    <div style={{ margin: 0, padding: 0, height: '100vh', fontFamily: "'Nunito', sans-serif", background: 'linear-gradient(160deg, #1a0633 0%, #4a148c 100%)', color: '#ffffff', overflow: 'hidden' }}>
      
      {/* Dynamic Progress Bar */}
      <div style={{ position: 'fixed', top: 20, left: '50%', transform: 'translateX(-50%)', width: '70%', height: '12px', background: 'rgba(255,255,255,0.2)', borderRadius: '10px', zIndex: 10 }}>
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
            
            {/* --- STORY SECTION --- */}
            {idx === 0 && (
              <>
                <h1 style={{ color: '#ffb800', fontSize: '2.8rem' }}>Chapter 1: How Writing Began</h1>
                <p style={{ fontSize: '1.4rem' }}>A very, very long time ago, before books, paper, and pencils, people still needed to remember things.</p>
                <p>They needed to track trades, food, and <span style={{ color: '#ffb800', fontWeight: 900 }}>promises made.</span></p>
              </>
            )}

            {idx === 1 && (
              <>
                <h2 style={{ color: '#ffb800' }}>The Pictogram</h2>
                <p style={{ fontSize: '1.3rem' }}>At first, humans did something very simple: <span style={{ fontWeight: 900 }}>they drew pictures.</span></p>
                <div style={{ display: 'flex', gap: '20px', margin: '20px 0' }}>
                  <div style={{ background: 'rgba(255,255,255,0.1)', padding: '15px', borderRadius: '15px' }}>🐑<br/>Sheep</div>
                  <div style={{ background: 'rgba(255,255,255,0.1)', padding: '15px', borderRadius: '15px' }}>🌾<br/>Food</div>
                  <div style={{ background: 'rgba(255,255,255,0.1)', padding: '15px', borderRadius: '15px' }}>🏠<br/>Home</div>
                </div>
                <p>One drawing meant one object. Writing was about life.</p>
              </>
            )}

            {idx === 2 && (
              <>
                <h3>Activity: Ancient Scribe</h3>
                <p>Try to draw a simple "Food" (🌾) pictogram on this clay tablet:</p>
                <canvas 
                  ref={canvasRef} width={300} height={200}
                  onMouseDown={startDrawing} onMouseMove={draw} onMouseUp={stopDrawing} onMouseLeave={stopDrawing}
                  onTouchStart={startDrawing} onTouchMove={draw} onTouchEnd={stopDrawing}
                  style={{ background: '#fff9e6', borderRadius: '15px', cursor: 'crosshair', touchAction: 'none', border: '4px solid #d4af37' }}
                />
                <button onClick={() => canvasRef.current?.getContext('2d')?.clearRect(0,0,300,200)} style={{ marginTop: '10px', background: 'none', border: '1px solid #fff', color: '#fff', padding: '5px 15px', borderRadius: '10px' }}>Reset Tablet</button>
              </>
            )}

            {idx === 3 && (
              <>
                <h2 style={{ color: '#ffb800' }}>Ideograms</h2>
                <p style={{ fontSize: '1.3rem' }}>Ancient cultures in <span style={{ color: '#ffb800' }}>Mesopotamia and Egypt</span> improved this.</p>
                <p>They created <span style={{ fontWeight: 900 }}>Ideograms</span>: pictures that represent abstract ideas like "Day" or "Light".</p>
              </>
            )}

            {idx === 4 && (
              <>
                <h2 style={{ color: '#ffb800' }}>The Problem...</h2>
                <p style={{ fontSize: '1.3rem' }}>Imagine drawing a different picture for every single word! It was <span style={{ color: '#ffb800', fontWeight: 900 }}>too slow.</span></p>
                <p>As trade grew, pictograms became useless. People needed a faster way to speak on paper.</p>
              </>
            )}

            {idx === 5 && (
              <>
                <h2 style={{ color: '#ffb800' }}>Phonetic Systems</h2>
                <p style={{ fontSize: '1.3rem' }}>The <span style={{ color: '#ffb800', fontWeight: 900 }}>Phoenicians</span> changed everything.</p>
                <p>They invented symbols that represent <span style={{ fontWeight: 900 }}>Sounds</span> instead of words. This is how the first alphabets were born!</p>
              </>
            )}

            {/* --- DUOLINGO STYLE CHALLENGES --- */}
            {idx === 6 && (
              <>
                <h2 style={{ color: '#ffb800' }}>Challenge 1</h2>
                <p style={{ fontSize: '1.4rem' }}>What is a "Pictogram"?</p>
                <div style={{ width: '100%', marginTop: '20px' }}>
                  {[
                    { t: 'A symbol that represents a sound', c: false },
                    { t: 'A drawing that represents one object', c: true },
                    { t: 'A type of ancient phone', c: false }
                  ].map((opt, i) => (
                    <div key={i} onClick={() => checkAnswer(opt.c, i)} style={{ padding: '15px', margin: '10px 0', borderRadius: '12px', border: `3px solid ${selectedOption === i ? '#ffb800' : 'rgba(255,255,255,0.1)'}`, background: 'rgba(255,255,255,0.05)', cursor: 'pointer', textAlign: 'left' }}>{opt.t}</div>
                  ))}
                </div>
              </>
            )}

            {idx === 7 && (
              <>
                <h2 style={{ color: '#ffb800' }}>Challenge 2</h2>
                <p style={{ fontSize: '1.4rem' }}>Why did humans stop using only Pictograms?</p>
                <div style={{ width: '100%', marginTop: '20px' }}>
                  {[
                    { t: 'They ran out of ink', c: false },
                    { t: 'They were too slow for complex ideas', c: true },
                    { t: 'They wanted to draw better pictures', c: false }
                  ].map((opt, i) => (
                    <div key={i} onClick={() => checkAnswer(opt.c, i)} style={{ padding: '15px', margin: '10px 0', borderRadius: '12px', border: `3px solid ${selectedOption === i ? '#ffb800' : 'rgba(255,255,255,0.1)'}`, background: 'rgba(255,255,255,0.05)', cursor: 'pointer', textAlign: 'left' }}>{opt.t}</div>
                  ))}
                </div>
              </>
            )}

            {idx === 8 && (
              <>
                <h2 style={{ color: '#ffb800' }}>Challenge 3</h2>
                <p style={{ fontSize: '1.4rem' }}>Which group invented symbols for <span style={{ color: '#ffb800' }}>Sounds</span>?</p>
                <div style={{ width: '100%', marginTop: '20px' }}>
                  {[
                    { t: 'The Phoenicians', c: true },
                    { t: 'The Astronauts', c: false },
                    { t: 'Modern Bloggers', c: false }
                  ].map((opt, i) => (
                    <div key={i} onClick={() => checkAnswer(opt.c, i)} style={{ padding: '15px', margin: '10px 0', borderRadius: '12px', border: `3px solid ${selectedOption === i ? '#ffb800' : 'rgba(255,255,255,0.1)'}`, background: 'rgba(255,255,255,0.05)', cursor: 'pointer', textAlign: 'left' }}>{opt.t}</div>
                  ))}
                </div>
              </>
            )}

            {idx === 9 && (
              <>
                <h1 style={{ fontSize: '4rem' }}>📜</h1>
                <h2 style={{ color: '#ffb800' }}>Historian Status: Achieved!</h2>
                <p>You have mastered the history of how writing began.</p>
                <button onClick={onBack} style={{ marginTop: '20px', background: '#ffb800', border: 'none', borderBottom: '4px solid #cc9300', padding: '15px 40px', borderRadius: '15px', fontSize: '1.2rem', fontWeight: 900, cursor: 'pointer', color: '#4a148c' }}>BACK TO DASHBOARD</button>
              </>
            )}

          </div>
        ))}
      </div>

      {/* Basic Navigation for Story Slides */}
      {currentSlide < 6 && (
        <div style={{ position: 'fixed', bottom: '40px', right: '40px' }}>
          <button onClick={moveNext} style={{ background: '#ffb800', border: 'none', borderBottom: '4px solid #cc9300', padding: '15px 40px', borderRadius: '15px', fontSize: '1.3rem', fontWeight: 900, cursor: 'pointer', color: '#4a148c' }}>CONTINUE ➜</button>
        </div>
      )}

      {/* DUOLINGO FEEDBACK BAR (For slides 6, 7, 8) */}
      <div style={{ 
        position: 'fixed', bottom: feedback ? 0 : '-150px', left: 0, right: 0, 
        height: '120px', background: feedback === 'correct' ? '#d7ffb8' : '#ffdfe0', 
        display: 'flex', alignItems: 'center', justifyContent: 'space-around', 
        transition: 'bottom 0.3s cubic-bezier(0.18, 0.89, 0.32, 1.28)', zIndex: 200, borderTop: '2px solid rgba(0,0,0,0.1)' 
      }}>
        <h2 style={{ color: feedback === 'correct' ? '#58cc02' : '#ea2b2b', margin: 0 }}>
          {feedback === 'correct' ? '✨ You nailed it!' : '❌ Keep trying!'}
        </h2>
        <button 
          onClick={() => { if(feedback === 'correct') moveNext(); else setFeedback(null); }}
          style={{ background: feedback === 'correct' ? '#58cc02' : '#ea2b2b', color: '#fff', border: 'none', padding: '15px 45px', borderRadius: '15px', fontWeight: 900, cursor: 'pointer', fontSize: '1.2rem' }}
        >
          {feedback === 'correct' ? 'CONTINUE' : 'GOT IT'}
        </button>
      </div>

    </div>
  );
}

export default WritingChapter;