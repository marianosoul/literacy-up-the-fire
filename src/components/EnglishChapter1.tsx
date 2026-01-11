import { useState, useRef, useEffect } from 'react';

interface EnglishChapter1Props {
  onBack: () => void;
}

function EnglishChapter1({ onBack }: EnglishChapter1Props) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [quizReady, setQuizReady] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const totalSlides = 8;

  useEffect(() => {
    if (currentSlide === 2 && canvasRef.current) {
      setupDrawing();
    }
  }, [currentSlide]);

  const setupDrawing = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    let isDrawing = false;
    const getPos = (e: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      return { x: clientX - rect.left, y: clientY - rect.top };
    };

    const start = (e: MouseEvent | TouchEvent) => {
      isDrawing = true;
      ctx.beginPath();
      const p = getPos(e);
      ctx.moveTo(p.x, p.y);
    };

    const draw = (e: MouseEvent | TouchEvent) => {
      if (!isDrawing) return;
      const p = getPos(e);
      ctx.lineTo(p.x, p.y);
      ctx.strokeStyle = '#8e44ad';
      ctx.lineWidth = 5;
      ctx.lineCap = 'round';
      ctx.stroke();
    };

    const stop = () => {
      isDrawing = false;
    };

    canvas.addEventListener('mousedown', start as any);
    canvas.addEventListener('mousemove', draw as any);
    canvas.addEventListener('mouseup', stop);
    canvas.addEventListener('touchstart', start as any);
    canvas.addEventListener('touchmove', draw as any);
    canvas.addEventListener('touchend', stop);
  };

  const clearTab = () => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, c.width, c.height);
  };

  const moveNext = () => {
    if (currentSlide < totalSlides - 1) {
      document.getElementById(`s${currentSlide}`)?.classList.remove('active');
      setCurrentSlide(currentSlide + 1);
      document.getElementById(`s${currentSlide + 1}`)?.classList.add('active');
      setShowFeedback(false);
      setQuizReady(false);
    }
  };

  const checkAnswer = (correct: boolean) => {
    document.querySelectorAll('.option-card').forEach(o => o.classList.remove('selected'));
    setIsCorrect(correct);
    setQuizReady(correct);
    setShowFeedback(true);
  };

  const handleFeedback = () => {
    const fbBar = document.getElementById('fbBar');
    fbBar?.classList.remove('show');
    if (quizReady) {
      moveNext();
    }
  };

  const progressPercent = ((currentSlide + 1) / totalSlides) * 100;

  return (
    <div style={{ margin: 0, padding: 0, height: '100%', fontFamily: "'Nunito', sans-serif", background: 'linear-gradient(160deg, #1a0633 0%, #4a148c 100%)', backgroundAttachment: 'fixed', color: '#ffffff', overflow: 'hidden' }}>
      <div style={{ position: 'fixed', top: '20px', left: '50%', transform: 'translateX(-50%)', width: '80%', maxWidth: '600px', height: '14px', background: 'rgba(255,255,255,0.2)', borderRadius: '20px', zIndex: 100 }}>
        <div style={{ width: `${progressPercent}%`, height: '100%', background: '#ffb800', borderRadius: '20px', transition: 'width 0.4s ease' }}></div>
      </div>

      <div style={{ position: 'relative', height: '100vh', width: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {[0, 1, 2, 3, 4, 5, 6, 7].map((slideNum) => (
          <div key={slideNum} id={`s${slideNum}`} className={slideNum === 0 ? 'active' : ''} style={{ position: 'absolute', width: '90%', maxWidth: '750px', opacity: slideNum === 0 ? 1 : 0, transform: slideNum === 0 ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.5s ease', pointerEvents: slideNum === 0 ? 'all' : 'none', textAlign: 'center' }}>
            {slideNum === 0 && (
              <>
                <h1 style={{ fontSize: '2.5rem', color: '#ffb800', marginBottom: '1rem' }}>Chapter 1: How Writing Began</h1>
                <p style={{ fontSize: '1.25rem', lineHeight: 1.6, marginBottom: '10px' }}>A very, very long time ago, before books, paper, and pencils, people still needed to remember things.</p>
                <p style={{ fontSize: '1.25rem', lineHeight: 1.6, marginBottom: '10px' }}>They needed to remember: <span style={{ color: '#ffb800', fontWeight: 900 }}>what they traded</span>, how much food they had, and the promises they made.</p>
                <p style={{ fontSize: '1.25rem', lineHeight: 1.6, marginBottom: '10px' }}>Talking was not always enough. Writing is not about school... <span style={{ color: '#ffb800', fontWeight: 900 }}>It is about life.</span></p>
              </>
            )}

            {slideNum === 1 && (
              <>
                <h1 style={{ fontSize: '2.5rem', color: '#ffb800', marginBottom: '1rem' }}>Drawing Reality</h1>
                <p style={{ fontSize: '1.25rem', lineHeight: 1.6, marginBottom: '10px' }}>At first, there were no letters or even an alphabet. People did something very simple: <span style={{ color: '#ffb800', fontWeight: 900 }}>they drew pictures.</span></p>
                <p style={{ fontSize: '1.25rem', lineHeight: 1.6, marginBottom: '10px' }}>One drawing meant one object. These were called <span style={{ color: '#ffb800', fontWeight: 900 }}>Pictograms</span>.</p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
                  <div style={{ background: 'rgba(255, 255, 255, 0.1)', padding: '15px', borderRadius: '20px', border: '2px solid rgba(255,255,255,0.1)', display: 'inline-block', margin: '10px' }}>
                    <span style={{ fontSize: '3.5rem', display: 'block' }}>🐑</span>
                    <p>Sheep</p>
                  </div>
                  <div style={{ background: 'rgba(255, 255, 255, 0.1)', padding: '15px', borderRadius: '20px', border: '2px solid rgba(255,255,255,0.1)', display: 'inline-block', margin: '10px' }}>
                    <span style={{ fontSize: '3.5rem', display: 'block' }}>🌾</span>
                    <p>Food</p>
                  </div>
                  <div style={{ background: 'rgba(255, 255, 255, 0.1)', padding: '15px', borderRadius: '20px', border: '2px solid rgba(255,255,255,0.1)', display: 'inline-block', margin: '10px' }}>
                    <span style={{ fontSize: '3.5rem', display: 'block' }}>🏠</span>
                    <p>Home</p>
                  </div>
                </div>
              </>
            )}

            {slideNum === 2 && (
              <>
                <h1 style={{ fontSize: '2.5rem', color: '#ffb800', marginBottom: '1rem' }}>Be an Ancient Scribe</h1>
                <p style={{ fontSize: '1.25rem', lineHeight: 1.6, marginBottom: '15px' }}>Imagine you need to record a trade of a tool. Draw a <span style={{ color: '#ffb800', fontWeight: 900 }}>Hammer 🔨</span> pictogram on this clay tablet:</p>
                <div style={{ position: 'relative', width: '100%', maxWidth: '400px', margin: '15px auto' }}>
                  <canvas ref={canvasRef} style={{ width: '100%', height: '200px', background: '#fff9e6', borderRadius: '15px', cursor: 'crosshair', touchAction: 'none', border: '4px solid #d4af37', display: 'block' }}></canvas>
                </div>
                <button onClick={clearTab} style={{ background: '#ffb800', border: 'none', borderBottom: '4px solid #cc9300', padding: '8px 15px', borderRadius: '15px', fontSize: '0.8rem', fontWeight: 900, color: '#2d0b5a', cursor: 'pointer' }}>
                  Clear Tablet
                </button>
              </>
            )}

            {slideNum === 3 && (
              <>
                <h1 style={{ fontSize: '2.5rem', color: '#ffb800', marginBottom: '1rem' }}>From Objects to Ideas</h1>
                <p style={{ fontSize: '1.25rem', lineHeight: 1.6, marginBottom: '10px' }}>As cultures in <span style={{ color: '#ffb800', fontWeight: 900 }}>Mesopotamia and Egypt</span> grew, they created <span style={{ color: '#ffb800', fontWeight: 900 }}>Ideograms</span>.</p>
                <p style={{ fontSize: '1.25rem', lineHeight: 1.6, marginBottom: '15px' }}>These represented complex ideas. A drawing of a "Sun" didn't just mean the star in the sky; it could mean <span style={{ color: '#ffb800', fontWeight: 900 }}>"Light"</span> or <span style={{ color: '#ffb800', fontWeight: 900 }}>"Day"</span>.</p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
                  <div style={{ background: 'rgba(255, 255, 255, 0.1)', padding: '15px', borderRadius: '20px', border: '2px solid rgba(255,255,255,0.1)', display: 'inline-block', margin: '10px' }}>
                    <span style={{ fontSize: '3.5rem', display: 'block' }}>☀️</span>
                    <p>Day/Light</p>
                  </div>
                  <div style={{ background: 'rgba(255, 255, 255, 0.1)', padding: '15px', borderRadius: '20px', border: '2px solid rgba(255,255,255,0.1)', display: 'inline-block', margin: '10px' }}>
                    <span style={{ fontSize: '3.5rem', display: 'block' }}>👁️</span>
                    <p>To See/Watch</p>
                  </div>
                </div>
              </>
            )}

            {slideNum === 4 && (
              <>
                <h1 style={{ fontSize: '2.5rem', color: '#ffb800', marginBottom: '1rem' }}>When Pictures Failed</h1>
                <p style={{ fontSize: '1.25rem', lineHeight: 1.6, marginBottom: '10px' }}>Imagine drawing a different picture for every single word. To say <span style={{ color: '#ffb800', fontWeight: 900 }}>"I saw three sheep today,"</span> you would have to draw every part!</p>
                <p style={{ fontSize: '1.25rem', lineHeight: 1.6, marginBottom: '10px' }}>Pictograms became <span style={{ color: '#ffb800', fontWeight: 900 }}>useless</span> for complex trade and stories. They were too slow. They took up too much space.</p>
              </>
            )}

            {slideNum === 5 && (
              <>
                <h1 style={{ fontSize: '2.5rem', color: '#ffb800', marginBottom: '1rem' }}>The Sound Revolution</h1>
                <p style={{ fontSize: '1.25rem', lineHeight: 1.6, marginBottom: '10px' }}>Later, the <span style={{ color: '#ffb800', fontWeight: 900 }}>Phoenician alphabet</span> appeared. Instead of drawing words, they drew <span style={{ color: '#ffb800', fontWeight: 900 }}>Sounds</span>.</p>
                <p style={{ fontSize: '1.25rem', lineHeight: 1.6, marginBottom: '10px' }}>This made writing and trade faster than ever before. This is how the modern world began to write.</p>
              </>
            )}

            {slideNum === 6 && (
              <>
                <h1 style={{ fontSize: '2.5rem', color: '#ffb800', marginBottom: '1rem' }}>Review</h1>
                <p style={{ fontSize: '1.25rem', lineHeight: 1.6, marginBottom: '10px' }}>What was the main reason humans moved away from Pictograms?</p>
                <div style={{ marginTop: '20px' }}>
                  <div className="option-card" onClick={(e) => { (e.currentTarget as HTMLDivElement).classList.add('selected'); checkAnswer(false); }} style={{ background: 'rgba(255, 255, 255, 0.1)', border: '2px solid rgba(255,255,255,0.1)', padding: '15px', borderRadius: '15px', cursor: 'pointer', margin: '8px 0', textAlign: 'left', transition: '0.2s', fontSize: '1.25rem' }}>
                    They forgot how to draw well.
                  </div>
                  <div className="option-card" onClick={(e) => { (e.currentTarget as HTMLDivElement).classList.add('selected'); checkAnswer(true); }} style={{ background: 'rgba(255, 255, 255, 0.1)', border: '2px solid rgba(255,255,255,0.1)', padding: '15px', borderRadius: '15px', cursor: 'pointer', margin: '8px 0', textAlign: 'left', transition: '0.2s', fontSize: '1.25rem' }}>
                    Drawing every object was too slow and couldn't represent complex ideas.
                  </div>
                  <div className="option-card" onClick={(e) => { (e.currentTarget as HTMLDivElement).classList.add('selected'); checkAnswer(false); }} style={{ background: 'rgba(255, 255, 255, 0.1)', border: '2px solid rgba(255,255,255,0.1)', padding: '15px', borderRadius: '15px', cursor: 'pointer', margin: '8px 0', textAlign: 'left', transition: '0.2s', fontSize: '1.25rem' }}>
                    They ran out of ink.
                  </div>
                </div>
              </>
            )}

            {slideNum === 7 && (
              <>
                <h1 style={{ fontSize: '4rem', color: '#ffb800', marginBottom: '1rem' }}>📜</h1>
                <h1 style={{ fontSize: '2.5rem', color: '#ffb800', marginBottom: '1rem' }}>History Unlocked!</h1>
                <p style={{ fontSize: '1.25rem', lineHeight: 1.6, marginBottom: '10px' }}>You now know how humanity learned to "freeze" their words onto a page.</p>
                <button onClick={onBack} style={{ background: '#ffb800', border: 'none', borderBottom: '4px solid #cc9300', padding: '12px 40px', borderRadius: '15px', fontSize: '1.2rem', fontWeight: 900, color: '#2d0b5a', cursor: 'pointer', marginTop: '20px' }}>
                  REPLAY STORY
                </button>
              </>
            )}
          </div>
        ))}
      </div>

      {currentSlide < 6 && (
        <div style={{ position: 'fixed', bottom: '0px', left: '0px', right: '0px', padding: '25px 40px', display: 'flex', justifyContent: 'flex-end' }} id="navLayer">
          <button onClick={moveNext} style={{ background: '#ffb800', border: 'none', borderBottom: '4px solid #cc9300', padding: '12px 40px', borderRadius: '15px', fontSize: '1.2rem', fontWeight: 900, color: '#2d0b5a', cursor: 'pointer' }} onMouseDown={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(2px)'; (e.currentTarget as HTMLButtonElement).style.borderBottomWidth = '2px'; }} onMouseUp={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLButtonElement).style.borderBottomWidth = '4px'; }}>
            CONTINUE ➜
          </button>
        </div>
      )}

      <div id="fbBar" style={{ position: 'fixed', bottom: showFeedback ? '0px' : '-120px', left: '0px', right: '0px', height: '110px', display: 'flex', alignItems: 'center', justifyContent: 'space-around', transition: 'bottom 0.3s cubic-bezier(0.18, 0.89, 0.32, 1.28)', zIndex: 200, background: isCorrect ? '#d7ffb8' : '#ffdfe0', color: isCorrect ? '#58cc02' : '#ea2b2b' }}>
        <h2 id="fbText" style={{ fontSize: '1.5rem', fontWeight: 900 }}>
          {isCorrect ? '✨ Excellent!' : '❌ Think about the effort of drawing...'}
        </h2>
        <button onClick={handleFeedback} style={{ background: '#ffb800', border: 'none', borderBottom: '4px solid #cc9300', padding: '12px 40px', borderRadius: '15px', fontSize: '1.2rem', fontWeight: 900, color: '#2d0b5a', cursor: 'pointer' }} onMouseDown={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(2px)'; (e.currentTarget as HTMLButtonElement).style.borderBottomWidth = '2px'; }} onMouseUp={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLButtonElement).style.borderBottomWidth = '4px'; }}>
          CONTINUE
        </button>
      </div>

      <style>{`
        .active {
          opacity: 1 !important;
          transform: translateY(0) !important;
          pointer-events: all !important;
        }
        .option-card.selected {
          border-color: #ffb800 !important;
          background: rgba(255,184,0,0.1) !important;
        }
      `}</style>
    </div>
  );
}

export default EnglishChapter1;
