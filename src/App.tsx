import { useState } from 'react';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import EnglishChapter1 from './components/EnglishChapter1';
import MathChapter1 from './components/MathChapter1';

type View = 'landing' | 'dashboard' | 'english-chapter-1' | 'math-chapter-1';

function App() {
  const [currentView, setCurrentView] = useState<View>('landing');
  const [selectedSubject, setSelectedSubject] = useState<'english' | 'math' | null>(null);

  const handleGetStarted = () => {
    setCurrentView('dashboard');
  };

  const handleSubjectSelect = (subject: 'english' | 'math') => {
    setSelectedSubject(subject);
    setCurrentView('dashboard');
  };

  const handleBackToHome = () => {
    setCurrentView('landing');
    setSelectedSubject(null);
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
  };

  const handleLessonSelect = (lessonId: number, subject: 'english' | 'math') => {
    if (lessonId === 1 && subject === 'english') {
      setCurrentView('english-chapter-1');
    } else if (lessonId === 1 && subject === 'math') {
      setCurrentView('math-chapter-1');
    }
  };

  return (
    <>
      {currentView === 'landing' && (
        <LandingPage onGetStarted={handleGetStarted} onSubjectSelect={handleSubjectSelect} />
      )}
      {currentView === 'dashboard' && (
        <Dashboard
          subject={selectedSubject}
          onBackToHome={handleBackToHome}
          onLessonSelect={handleLessonSelect}
        />
      )}
      {currentView === 'english-chapter-1' && (
        <EnglishChapter1 onBack={handleBackToDashboard} />
      )}
      {currentView === 'math-chapter-1' && (
        <MathChapter1 onBack={handleBackToDashboard} />
      )}
    </>
  );
}

export default App;
