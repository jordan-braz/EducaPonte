
import React, { useContext } from 'react';
import { AppContext } from '../App';
import { useNavigate } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
  showBack?: boolean;
  title?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, showBack, title = "Educa" }) => {
  const context = useContext(AppContext);
  const navigate = useNavigate();

  if (!context) return null;

  const { toggleHighContrast, increaseFontSize, decreaseFontSize, user, setUser } = context;

  const handleLogout = () => {
    setUser(null);
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark text-text-main dark:text-white font-display">
      <header className="sticky top-0 z-50 bg-white dark:bg-surface-dark border-b border-gray-200 dark:border-gray-800 px-4 md:px-10 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          {showBack && (
            <button 
              onClick={() => navigate(-1)}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-text-main dark:text-white"
              aria-label="Voltar"
            >
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
          )}
          <div className="flex items-center gap-3">
            <div className="size-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[32px]">school</span>
            </div>
            <h1 className="text-xl md:text-2xl font-black tracking-tight">{title}</h1>
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
            <button 
              onClick={decreaseFontSize}
              className="px-3 py-1 hover:bg-white dark:hover:bg-gray-700 rounded-md font-bold"
              aria-label="Diminuir texto"
            >
              A-
            </button>
            <button 
              onClick={increaseFontSize}
              className="px-3 py-1 hover:bg-white dark:hover:bg-gray-700 rounded-md font-bold border-l border-gray-200 dark:border-gray-700"
              aria-label="Aumentar texto"
            >
              A+
            </button>
          </div>
          
          <button 
            onClick={toggleHighContrast}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-text-main dark:text-white"
            aria-label="Alternar contraste"
          >
            <span className="material-symbols-outlined">contrast</span>
          </button>

          {user && (
            <div className="flex items-center gap-2 ml-2 md:ml-4 border-l border-gray-200 dark:border-gray-700 pl-4">
              <button 
                onClick={handleLogout}
                className="hidden md:flex items-center gap-2 px-4 py-2 text-red-500 font-bold hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg"
              >
                <span className="material-symbols-outlined">logout</span>
                Sair
              </button>
              <div 
                className="size-10 rounded-full bg-primary/20 flex items-center justify-center text-primary border-2 border-white dark:border-gray-800"
                title={user.displayName}
              >
                <span className="material-symbols-outlined">person</span>
              </div>
            </div>
          )}
        </div>
      </header>

      <main className="flex-1 w-full max-w-[1200px] mx-auto px-4 md:px-10 py-8">
        {children}
      </main>

      <footer className="w-full py-8 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-surface-dark text-center">
        <a 
          href="#" 
          className="inline-flex items-center gap-2 text-lg font-bold text-text-sub dark:text-gray-400 hover:text-primary transition-colors p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
        >
          <span className="material-symbols-outlined">help</span>
          Precisa de ajuda?
        </a>
      </footer>
    </div>
  );
};

export default Layout;
