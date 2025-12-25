
import React, { useState, useContext } from 'react';
import { AppContext } from '../App';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const context = useContext(AppContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!context) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app with Firebase, you'd use signInWithEmailAndPassword
    // For this demonstration, we simulate successful login
    context.setUser({
      uid: '123',
      displayName: 'Alex Educando',
      email: email || 'alex@educa.com',
      progress: 15
    });
    navigate('/');
  };

  const handleGoogleLogin = () => {
    // Simulated Google Login
    context.setUser({
      uid: 'google-123',
      displayName: 'João Silva',
      email: 'joao@google.com',
      progress: 0
    });
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background-light dark:bg-background-dark p-6">
      <div className="w-full max-w-[520px] bg-white dark:bg-surface-dark rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 p-10 md:p-14">
        <div className="flex flex-col items-center text-center mb-10">
          <div className="size-20 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6">
            <span className="material-symbols-outlined text-[50px]">school</span>
          </div>
          <h1 className="text-4xl font-black tracking-tight mb-2">Bem-vindo de volta</h1>
          <p className="text-xl text-text-sub dark:text-gray-400 font-medium">Acesse sua conta para continuar aprendendo</p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <label className="text-lg font-black" htmlFor="email">Seu e-mail</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">mail</span>
              <input 
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nome@exemplo.com"
                className="w-full h-16 rounded-xl border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 pl-14 pr-6 text-xl focus:border-primary transition-all focus:ring-4 focus:ring-primary/10"
              />
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-end">
              <label className="text-lg font-black" htmlFor="password">Sua senha</label>
              <a href="#" className="text-primary font-bold hover:underline">Esqueceu?</a>
            </div>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">lock</span>
              <input 
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite sua senha"
                className="w-full h-16 rounded-xl border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 pl-14 pr-14 text-xl focus:border-primary transition-all focus:ring-4 focus:ring-primary/10"
              />
              <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary">
                <span className="material-symbols-outlined">visibility</span>
              </button>
            </div>
          </div>

          <button 
            type="submit"
            className="w-full h-16 bg-primary hover:bg-primary-hover text-white font-black text-2xl rounded-xl shadow-lg shadow-blue-500/20 active:translate-y-0.5 transition-all mt-4"
          >
            Entrar
          </button>

          <div className="flex items-center gap-4 my-2">
            <div className="h-px bg-gray-200 dark:bg-gray-800 flex-1"></div>
            <span className="text-gray-400 font-bold">ou</span>
            <div className="h-px bg-gray-200 dark:bg-gray-800 flex-1"></div>
          </div>

          <button 
            type="button"
            onClick={handleGoogleLogin}
            className="w-full h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 font-black text-xl rounded-xl flex items-center justify-center gap-4 transition-all"
          >
            <svg className="w-8 h-8" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Entrar com Google
          </button>
        </form>

        <div className="mt-12 text-center">
          <p className="text-lg text-text-sub dark:text-gray-400 font-medium">
            Não tem uma conta? <a href="#" className="text-primary font-black hover:underline">Cadastre-se aqui</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
