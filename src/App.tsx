import { useState } from 'react';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';

function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'dashboard'>('landing');
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

  return (
    <>
      {currentView === 'landing' ? (
        <LandingPage onGetStarted={handleGetStarted} onSubjectSelect={handleSubjectSelect} />
      ) : (
        <Dashboard subject={selectedSubject} onBackToHome={handleBackToHome} />
      )}
    </>
  );
}

export default App;
