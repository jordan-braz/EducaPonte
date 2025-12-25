
import React, { useState, useEffect, createContext, useContext } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import LearningTracks from './components/LearningTracks';
import LessonPage from './components/LessonPage';
import { UserProfile } from './types';

// Simple Context for Global State
interface AppContextType {
  user: UserProfile | null;
  setUser: (user: UserProfile | null) => void;
  isHighContrast: boolean;
  toggleHighContrast: () => void;
  fontSize: number;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

const App: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [fontSize, setFontSize] = useState(18);

  // Initialize theme from local storage if available
  useEffect(() => {
    const savedContrast = localStorage.getItem('highContrast') === 'true';
    setIsHighContrast(savedContrast);
    if (savedContrast) document.documentElement.classList.add('dark');
    
    const savedFontSize = parseInt(localStorage.getItem('fontSize') || '18');
    setFontSize(savedFontSize);
  }, []);

  const toggleHighContrast = () => {
    setIsHighContrast(prev => {
      const newVal = !prev;
      localStorage.setItem('highContrast', String(newVal));
      if (newVal) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return newVal;
    });
  };

  const increaseFontSize = () => {
    setFontSize(prev => {
      const newVal = Math.min(prev + 2, 32);
      localStorage.setItem('fontSize', String(newVal));
      return newVal;
    });
  };

  const decreaseFontSize = () => {
    setFontSize(prev => {
      const newVal = Math.max(prev - 2, 14);
      localStorage.setItem('fontSize', String(newVal));
      return newVal;
    });
  };

  return (
    <AppContext.Provider value={{ 
      user, setUser, 
      isHighContrast, toggleHighContrast,
      fontSize, increaseFontSize, decreaseFontSize 
    }}>
      <div style={{ fontSize: `${fontSize}px` }} className="min-h-screen">
        <Router>
          <Routes>
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
            <Route path="/" element={user ? <Dashboard /> : <Navigate to="/login" />} />
            <Route path="/tracks" element={user ? <LearningTracks /> : <Navigate to="/login" />} />
            <Route path="/lesson/:id" element={user ? <LessonPage /> : <Navigate to="/login" />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Router>
      </div>
    </AppContext.Provider>
  );
};

export default App;
