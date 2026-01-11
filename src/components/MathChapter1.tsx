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
    if (currentSlide === 2) {
      initGame1();
    } else if (currentSlide === 4) {
      initGame2();
    }
  }, [currentSlide]);

  useEffect(() => {
    if (currentSlide === 4) {
      const interval = setInterval(() => {
        setGame2Sheep(prev =>
          prev.map(sheep => ({
            ...sheep,
            x: Math.max(5, Math.min(85, sheep.x + (Math.random() - 0.5) * 8)),
            y: Math.max(5, Math.min(80, sheep.y + (Math.random() - 0.5) * 8))
          }))
        );
      }, 100);
      return () => clearInterval(interval);
    }
  }, [currentSlide]);

  const initGame1 = () => {
    const newSheep: Sheep[] = [];
    for (let i = 0; i < 5; i++) {
      newSheep.push({
        id: i,
        x: Math.random() * 70 + 15,
        y: Math.random() * 50 + 25
      });
    }
    setGame1Sheep(newSheep);
    setGame1Count(0);
    setCountedSheep(new Set());
  };

  const initGame2 = () => {
    const newSheep: Sheep[] = [];
    for (let i = 0; i < 30; i++) {
      newSheep.push({
        id: i,
        x: Math.random() * 80 + 10,
        y: Math.random() * 70 + 10
      });
    }
    setGame2Sheep(newSheep);
    setGame2Count(0);
  };

  const countSheep1 = (id: number) => {
    if (!countedSheep.has(id)) {
      const newSet = new Set(countedSheep);
      newSet.add(id);
      setCountedSheep(newSet);
      setGame1Count(game1Count + 1);
    }
  };

  const removeSheep2 = (id: number) => {
    setGame2Sheep(game2Sheep.filter(s => s.id !== id));
    setGame2Count(game2Count + 1);
  };

  const moveNext = () => {
    if (currentSlide < totalSlides - 1) {
      document.getElementById(`s${currentSlide}`)?.classList.remove('active');
      setCurrentSlide(currentSlide + 1);
      document.getElementById(`s${currentSlide + 1}`)?.classList.add('active');
    }
  };

  const progressPercent = ((currentSlide + 1) / totalSlides) * 100;

  return (
    <div style={{ margin: 0, padding: 0, height: '100%', fontFamily: "'Nunito', sans-serif", background: 'linear-gradient(135deg, #1a0633 0%, #4a148c 100%)', color: '#ffffff', overflow: 'hidden' }}>
      <div style={{ position: 'relative', height: '100vh', width: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
        {[0, 1, 2, 3, 4, 5, 6, 7].map((slideNum) => (
          <div key={slideNum} id={`s${slideNum}`} className={slideNum === 0 ? 'active' : ''} style={{ position: 'absolute', width: '80%', maxWidth: '800px', opacity: slideNum === 0 ? 1 : 0, transform: slideNum === 0 ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.5s ease', pointerEvents: slideNum === 0 ? 'all' : 'none', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {slideNum === 0 && (
              <>
                <h1 style={{ fontSize: '3rem', color: '#ffb800', marginBottom: '20px', textShadow: '0 4px 10px rgba(0,0,0,0.3)' }}>The Magic of Counting</h1>
                <p style={{ fontSize: '1.4rem', lineHeight: 1.6, color: '#e0e0e0' }}>Long, long time ago, before schools and books, humans already had the need to count.</p>
                <p style={{ fontSize: '1.4rem', lineHeight: 1.6, color: '#e0e0e0' }}>It wasn't about homework. <span style={{ color: '#ffb800', fontWeight: 900 }}>It was about life.</span></p>
              </>
            )}

            {slideNum === 1 && (
              <>
                <p style={{ fontSize: '1.4rem', lineHeight: 1.6, color: '#e0e0e0', marginBottom: '20px' }}>We needed to know: how many animals we had, how much food was stored, and how many days had passed.</p>
                <div style={{ fontFamily: 'monospace', fontSize: '2.5rem', letterSpacing: '5px', color: '#ffb800', marginBottom: '20px' }}>I II III IIII</div>
                <p style={{ fontSize: '1.4rem', lineHeight: 1.6, color: '#e0e0e0' }}>One mark for one thing. We counted <span style={{ color: '#ffb800', fontWeight: 900 }}>Units</span>.</p>
              </>
            )}

            {slideNum === 2 && (
              <>
                <h3 style={{ fontSize: '1.5rem', color: '#ffb800', marginBottom: '15px' }}>Activity: Tap the sheep to count them!</h3>
                <div style={{ fontSize: '2rem', fontWeight: 900, background: '#8e44ad', padding: '10px 30px', borderRadius: '50px', marginBottom: '15px' }}>
                  Count: <span id="count1">{game1Count}</span>
                </div>
                <div style={{ width: '100%', height: '300px', background: 'rgba(0,0,0,0.2)', borderRadius: '20px', margin: '20px 0', position: 'relative', overflow: 'hidden', border: '2px dashed #ffb800' }}>
                  {game1Sheep.map(sheep => (
                    <div
                      key={sheep.id}
                      onClick={() => countSheep1(sheep.id)}
                      style={{
                        position: 'absolute',
                        fontSize: '40px',
                        cursor: 'pointer',
                        userSelect: 'none',
                        transition: 'transform 0.2s',
                        opacity: countedSheep.has(sheep.id) ? 0.3 : 1,
                        pointerEvents: countedSheep.has(sheep.id) ? 'none' : 'auto',
                        left: `${sheep.x}%`,
                        top: `${sheep.y}%`,
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.2)')}
                      onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                    >
                      🐑
                    </div>
                  ))}
                </div>
                <p style={{ fontSize: '1.4rem', lineHeight: 1.6, color: '#e0e0e0' }}>Notice how easy it is when there are only a few?</p>
              </>
            )}

            {slideNum === 3 && (
              <>
                <h1 style={{ fontSize: '3rem', color: '#ffb800', marginBottom: '20px' }}>The Ishango Bone</h1>
                <div style={{ fontSize: '5rem', marginBottom: '20px' }}>🦴</div>
                <p style={{ fontSize: '1.4rem', lineHeight: 1.6, color: '#e0e0e0', marginBottom: '15px' }}>Discovered near the Nile River, this bone is <span style={{ color: '#ffb800', fontWeight: 900 }}>20,000 years old</span>.</p>
                <p style={{ fontSize: '1.4rem', lineHeight: 1.6, color: '#e0e0e0' }}>It shows humans tracing marks to understand their world.</p>
              </>
            )}

            {slideNum === 4 && (
              <>
                <h3 style={{ fontSize: '1.5rem', color: '#ffb800', marginBottom: '15px' }}>The Chaos Challenge!</h3>
                <p style={{ fontSize: '1.4rem', lineHeight: 1.6, color: '#e0e0e0', marginBottom: '15px' }}>Without numbers, counting a large herd was confusing. Try to count these!</p>
                <div style={{ fontSize: '2rem', fontWeight: 900, background: '#a67c00', padding: '10px 30px', borderRadius: '50px', marginBottom: '15px' }}>
                  Found: <span id="count2">{game2Count}</span> / 30
                </div>
                <div style={{ width: '100%', height: '300px', background: 'rgba(0,0,0,0.2)', borderRadius: '20px', margin: '20px 0', position: 'relative', overflow: 'hidden', border: '2px dashed #ffb800' }}>
                  {game2Sheep.map(sheep => (
                    <div
                      key={sheep.id}
                      onClick={() => removeSheep2(sheep.id)}
                      style={{
                        position: 'absolute',
                        fontSize: '30px',
                        cursor: 'pointer',
                        userSelect: 'none',
                        transition: 'left 0.1s, top 0.1s',
                        left: `${sheep.x}%`,
                        top: `${sheep.y}%`,
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.2)')}
                      onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                    >
                      🐑
                    </div>
                  ))}
                </div>
              </>
            )}

            {slideNum === 5 && (
              <>
                <h1 style={{ fontSize: '3rem', color: '#ffb800', marginBottom: '20px' }}>Numbers are Stories</h1>
                <p style={{ fontSize: '1.4rem', lineHeight: 1.6, color: '#e0e0e0', marginBottom: '20px' }}>Look at <span style={{ color: '#ffb800', fontWeight: 900, fontSize: '3rem' }}>345</span></p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginTop: '20px', marginBottom: '20px', width: '100%' }}>
                  <div style={{ background: 'rgba(255, 255, 255, 0.1)', padding: '20px', borderRadius: '15px', border: '2px solid #8e44ad' }}>
                    <h3 style={{ fontSize: '2.5rem', color: '#ffb800', marginBottom: '10px' }}>3</h3>
                    <p>Hundreds</p>
                  </div>
                  <div style={{ background: 'rgba(255, 255, 255, 0.1)', padding: '20px', borderRadius: '15px', border: '2px solid #8e44ad' }}>
                    <h3 style={{ fontSize: '2.5rem', color: '#ffb800', marginBottom: '10px' }}>4</h3>
                    <p>Tens</p>
                  </div>
                  <div style={{ background: 'rgba(255, 255, 255, 0.1)', padding: '20px', borderRadius: '15px', border: '2px solid #8e44ad' }}>
                    <h3 style={{ fontSize: '2.5rem', color: '#ffb800', marginBottom: '10px' }}>5</h3>
                    <p>Units</p>
                  </div>
                </div>
                <p style={{ fontSize: '1.4rem', lineHeight: 1.6, color: '#e0e0e0' }}>The place of a digit changes its power!</p>
              </>
            )}

            {slideNum === 6 && (
              <>
                <h1 style={{ fontSize: '3rem', color: '#ffb800', marginBottom: '20px' }}>Small Magic</h1>
                <p style={{ fontSize: '1.4rem', lineHeight: 1.6, color: '#e0e0e0', marginBottom: '15px' }}>What about things smaller than one? Like half a pizza?</p>
                <h2 style={{ fontSize: '3rem', color: '#ffb800', marginBottom: '15px' }}>2.5</h2>
                <p style={{ fontSize: '1.4rem', lineHeight: 1.6, color: '#e0e0e0', marginBottom: '15px' }}>2 Units and 5 <span style={{ color: '#ffb800', fontWeight: 900 }}>Tenths</span>.</p>
                <p style={{ fontSize: '1.4rem', lineHeight: 1.6, color: '#e0e0e0' }}>Decimals let us count the very small things in the universe.</p>
              </>
            )}

            {slideNum === 7 && (
              <>
                <h1 style={{ fontSize: '3rem', color: '#ffb800', marginBottom: '20px' }}>Numbers are Stories</h1>
                <p style={{ fontSize: '1.4rem', lineHeight: 1.6, color: '#e0e0e0', marginBottom: '15px' }}>From carved lines on bones to digits on your screen...</p>
                <p style={{ color: '#ffb800', fontWeight: 900, fontSize: '1.8rem', marginBottom: '20px' }}>Counting is part of who we are.</p>
                <button onClick={onBack} style={{ background: '#ffb800', border: 'none', borderBottom: '4px solid #cc9300', padding: '15px 40px', borderRadius: '15px', fontSize: '1.5rem', fontWeight: 900, cursor: 'pointer', color: '#4a148c' }} onMouseDown={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(4px)'; }} onMouseUp={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)'; }}>
                  BACK TO DASHBOARD
                </button>
              </>
            )}
          </div>
        ))}
      </div>

      {currentSlide < 7 && (
        <div style={{ position: 'fixed', bottom: '40px', right: '40px', zIndex: 100 }}>
          <button onClick={moveNext} id="nextBtn" style={{ background: '#ffb800', border: 'none', borderBottom: '4px solid #cc9300', padding: '15px 40px', borderRadius: '15px', fontSize: '1.5rem', fontWeight: 900, cursor: 'pointer', color: '#4a148c', display: 'flex', alignItems: 'center', gap: '10px', transition: 'transform 0.1s, background 0.3s' }} onMouseDown={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(4px)'; }} onMouseUp={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)'; }}>
            NEXT ➜
          </button>
        </div>
      )}

      <style>{`
        .active {
          opacity: 1 !important;
          transform: translateY(0) !important;
          pointer-events: all !important;
        }
      `}</style>
    </div>
  );
}

export default MathChapter1;
