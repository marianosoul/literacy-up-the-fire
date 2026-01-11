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

  const totalSlides = 9;

  // Lógica de dibujo para la tablilla de arcilla
  useEffect(() => {
    if (currentSlide === 2 && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.lineCap = 'round';
        ctx.lineWidth = 3;
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
      
      {/* Barra de Progreso */}
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
            
            {/* Historia Unificada */}
            {idx === 0 && (
              <>
                <h1 style={{ color: '#ffb800', fontSize: '2.5rem' }}>How Writing Began</h1>
                <p style={{ fontSize: '1.3rem', lineHeight: '1.6' }}>A very long time ago, before books, paper, or pencils, people still needed to remember things.</p>
                <p style={{ fontSize: '1.3rem' }}>They needed to track: <span style={{ color: '#ffb800', fontWeight: 900 }}>trades, food, stories, and promises.</span></p>
                <p>Talking was not always enough.</p>
              </>
            )}

            {idx === 1 && (
              <>
                <h2 style={{ color: '#ffb800' }}>The First Step: Pictures</h2>
                <p style={{ fontSize: '1.3rem' }}>Humans invented writing, and it started with something simple: <span style={{ fontWeight: 900 }}>Drawing.</span></p>
                <div style={{ display: 'flex', gap: '20px', margin: '20px 0' }}>
                  <div style={{ background: 'rgba(255,255,255,0.1)', padding: '15px', borderRadius: '15px' }}>🐑<br/>Sheep</div>
                  <div style={{ background: 'rgba(255,255,255,0.1)', padding: '15px', borderRadius: '15px' }}>🌾<br/>Food</div>
                  <div style={{ background: 'rgba(255,255,255,0.1)', padding: '15px', borderRadius: '15px' }}>🏠<br/>Home</div>
                </div>
                <p>These were called <span style={{ color: '#ffb800', fontWeight: 900 }}>Pictograms</span>. One drawing = One object.</p>
              </>
            )}

            {idx === 2 && (
              <>
                <h3>Try to be a Scribe!</h3>
                <p>Draw a pictogram for a "Tool" on this clay tablet:</p>
                <canvas 
                  ref={canvasRef} width={300} height={200}
                  onMouseDown={startDrawing} onMouseMove={draw} onMouseUp={stopDrawing} onMouseLeave={stopDrawing}
                  onTouchStart={startDrawing} onTouchMove={draw} onTouchEnd={stopDrawing}
                  style={{ background: '#fff9e6', borderRadius: '15px', cursor: 'crosshair', touchAction: 'none', border: '4px solid #d4af37' }}
                />
                <button onClick={() => canvasRef.current?.getContext('2d')?.clearRect(0,0,300,200)} style={{ marginTop: '10px', background: 'none', border: '1px solid #fff', color: '#fff', padding: '5px 15px', borderRadius: '10px', cursor: 'pointer' }}>Clear Tablet</button>
              </>
            )}

            {idx === 3 && (
              <>
                <h2 style={{ color: '#ffb800' }}>Ideograms</h2>
                <p style={{ fontSize: '1.3rem' }}>Ancient cultures like <span style={{ color: '#ffb800' }}>Mesopotamia and Egypt</span> took it further.</p>
                <p>They created <span style={{ fontWeight: 900 }}>Ideograms</span>: pictures that represented whole ideas, not just things.</p>
                <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>(Drawing a Sun ☀️ could mean "Light" or "Day")</p>
              </>
            )}

            {idx === 4 && (
              <>
                <h2 style={{ color: '#ffb800' }}>When Pictures Failed</h2>
                <p style={{ fontSize: '1.3rem' }}>Drawing was beautiful, but <span style={{ color: '#ffb800', fontWeight: 900 }}>useless</span> for speed.</p>
                <p>Imagine drawing a different picture for every word in your head. It was too slow and too difficult for complex trade.</p>
              </>
            )}

            {idx === 5 && (
              <>
                <h2 style={{ color: '#ffb800' }}>The Sound Revolution</h2>
                <p style={{ fontSize: '1.3rem' }}>The <span style={{ color: '#ffb800', fontWeight: 900 }}>Phoenicians</span> changed history. They created symbols that represented <span style={{ fontWeight: 900 }}>Sounds</span>, not objects.</p>
                <p>This "Phonetic system" made writing fast, easy, and available for everyone.</p>
              </>
            )}

            {/* Ejercicios Reafirmantes */}
            {idx === 6 && (
              <>
                <h2 style={{ color: '#ffb800' }}>Quick Check</h2>
                <p style={{ fontSize: '1.4rem' }}>What was the very first way humans "wrote" things down?</p>
                <div style={{ width: '100%', marginTop: '20px' }}>
                  {['By using pencils', 'By drawing Pictograms', 'By sending emails'].map((opt, i) => (
                    <div key={i} onClick={() => checkAnswer(i === 1, i)} style={{ padding: '15px', margin: '10px 0', borderRadius: '12px', border: `2px solid ${selectedOption === i ? '#ffb800' : 'rgba(255,255,255,0.1)'}`, background: 'rgba(255,255,255,0.05)', cursor: 'pointer' }}>{opt}</div>
                  ))}
                </div>
              </>
            )}

            {idx === 7 && (
              <>
                <h2 style={{ color: '#ffb800' }}>Why did Pictograms become "useless"?</h2>
                <div style={{ width: '100%', marginTop: '20px' }}>
                  {[
                    { t: 'They were too colorful', c: false },
                    { t: 'Drawing every word was too slow/complex', c: true },
                    { t: 'People forgot how to draw', c: false }
                  ].map((opt, i) => (
                    <div key={i} onClick={() => checkAnswer(opt.c, i)} style={{ padding: '15px', margin: '10px 0', borderRadius: '12px', border: `2px solid ${selectedOption === i ? '#ffb800' : 'rgba(255,255,255,0.1)'}`, background: 'rgba(255,255,255,0.05)', cursor: 'pointer' }}>{opt.t}</div>
                  ))}
                </div>
              </>
            )}

            {idx === 8 && (
              <>
                <h1 style={{ fontSize: '4rem' }}>🖋️</h1>
                <h2 style={{ color: '#ffb800' }}>Chapter Complete!</h2>
                <p>You now know that writing isn't just school—it's how humanity remembers life.</p>
                <button onClick={onBack} style={{ marginTop: '20px', background: '#ffb800', border: 'none', borderBottom: '4px solid #cc9300', padding: '15px 40px', borderRadius: '15px', fontSize: '1.2rem', fontWeight: 900, cursor: 'pointer', color: '#4a148c' }}>BACK TO DASHBOARD</button>
              </>
            )}

          </div>
        ))}
      </div>

      {/* Navegación Estándar (Slides 0-5) */}
      {currentSlide < 6 && (
        <div style={{ position: 'fixed', bottom: '40px', right: '40px' }}>
          <button onClick={moveNext} style={{ background: '#ffb800', border: 'none', borderBottom: '4px solid #cc9300', padding: '15px 40px', borderRadius: '15px', fontSize: '1.3rem', fontWeight: 900, cursor: 'pointer', color: '#4a148c' }}>CONTINUE ➜</button>
        </div>
      )}

      {/* Barra Duolingo para Ejercicios (Slides 6-7) */}
      <div style={{ 
        position: 'fixed', bottom: feedback ? 0 : '-150px', left: 0, right: 0, 
        height: '110px', background: feedback === 'correct' ? '#d7ffb8' : '#ffdfe0', 
        display: 'flex', alignItems: 'center', justifyContent: 'space-around', 
        transition: 'bottom 0.3s ease', zIndex: 200 
      }}>
        <h2 style={{ color: feedback === 'correct' ? '#58cc02' : '#ea2b2b', margin: 0 }}>
          {feedback === 'correct' ? '✨ Awesome!' : '❌ Not quite right!'}
        </h2>
        <button 
          onClick={() => { if(feedback === 'correct') moveNext(); else setFeedback(null); }}
          style={{ background: feedback === 'correct' ? '#58cc02' : '#ea2b2b', color: '#fff', border: 'none', padding: '15px 40px', borderRadius: '12px', fontWeight: 900, cursor: 'pointer' }}
        >
          {feedback === 'correct' ? 'CONTINUE' : 'TRY AGAIN'}
        </button>
      </div>

    </div>
  );
}

export default WritingChapter;