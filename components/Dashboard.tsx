
import React, { useContext } from 'react';
import { AppContext } from '../App';
import Layout from './Layout';
import { useNavigate } from 'react-router-dom';
import { AgendaItem } from '../types';

const MOCK_AGENDA: AgendaItem[] = [
  { id: '1', time: '10:00', title: 'Aula de Computador', icon: 'computer', status: 'active' },
  { id: '2', time: '11:00', title: 'Pausa para Lanche', icon: 'restaurant', status: 'future' },
  { id: '3', time: '13:00', title: 'Programação', icon: 'code', status: 'future' },
];

const Dashboard: React.FC = () => {
  const context = useContext(AppContext);
  const navigate = useNavigate();
  if (!context || !context.user) return null;

  const { user } = context;

  const cardStyle = "group flex flex-col items-start gap-4 p-8 bg-white dark:bg-surface-dark rounded-2xl border-2 border-gray-200 dark:border-gray-800 hover:border-primary dark:hover:border-primary hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-all text-left shadow-sm min-h-[220px]";

  return (
    <Layout>
      <div className="flex flex-col gap-10">
        <section className="bg-white dark:bg-surface-dark p-8 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm flex items-center gap-6">
          <div className="size-20 md:size-24 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center text-yellow-600 dark:text-yellow-400">
            <span className="material-symbols-outlined text-[60px]">sunny</span>
          </div>
          <div className="flex flex-col gap-1">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">Bom dia, {user.displayName.split(' ')[0]}.</h2>
            <p className="text-xl text-text-sub dark:text-gray-400 font-medium">Bem-vindo à sua área de estudos.</p>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4 flex flex-col gap-6">
            <h3 className="text-2xl font-bold flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-[32px]">calendar_today</span>
              Minha Agenda
            </h3>
            <div className="bg-white dark:bg-surface-dark rounded-2xl border-2 border-gray-200 dark:border-gray-800 p-8 shadow-sm flex flex-col gap-2">
              {MOCK_AGENDA.map((item, index) => (
                <div key={item.id} className="flex gap-6">
                  <div className="flex flex-col items-center">
                    <div className={`size-14 rounded-full flex items-center justify-center border-4 border-white dark:border-gray-800 z-10 shadow-sm ${
                      item.status === 'active' ? 'bg-primary text-white scale-110' : 'bg-gray-100 dark:bg-gray-800 text-gray-400'
                    }`}>
                      <span className="material-symbols-outlined">{item.icon}</span>
                    </div>
                    {index < MOCK_AGENDA.length - 1 && (
                      <div className="w-1.5 bg-gray-200 dark:bg-gray-800 h-12 -mt-2"></div>
                    )}
                  </div>
                  <div className={`flex flex-col pt-1 ${item.status === 'active' ? 'opacity-100' : 'opacity-60'}`}>
                    {item.status === 'active' && (
                      <span className="text-primary text-sm font-bold uppercase tracking-wider mb-1">Agora</span>
                    )}
                    <p className="text-xl font-bold">{item.title}</p>
                    <p className="text-lg font-medium text-text-sub dark:text-gray-400">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-8 flex flex-col gap-6">
            <h3 className="text-2xl font-bold flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-[32px]">dashboard</span>
              O que vamos fazer?
            </h3>
            <nav className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <button onClick={() => navigate('/tracks')} className={cardStyle}>
                <div className="size-16 rounded-xl bg-blue-100 dark:bg-blue-900/40 text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[40px]">menu_book</span>
                </div>
                <div className="mt-auto">
                  <span className="block text-3xl font-black mb-1">Aprender</span>
                  <span className="block text-xl text-text-sub dark:text-gray-400 font-medium">Ir para minhas aulas</span>
                </div>
              </button>

              <button className={cardStyle}>
                <div className="size-16 rounded-xl bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[40px]">monitoring</span>
                </div>
                <div className="mt-auto">
                  <span className="block text-3xl font-black mb-1">Meu Progresso</span>
                  <span className="block text-xl text-text-sub dark:text-gray-400 font-medium">Ver minhas estrelas</span>
                </div>
              </button>

              <button className={cardStyle}>
                <div className="size-16 rounded-xl bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[40px]">construction</span>
                </div>
                <div className="mt-auto">
                  <span className="block text-3xl font-black mb-1">Projetos</span>
                  <span className="block text-xl text-text-sub dark:text-gray-400 font-medium">Meus trabalhos práticos</span>
                </div>
              </button>

              <button className={cardStyle}>
                <div className="size-16 rounded-xl bg-orange-100 dark:bg-orange-900/40 text-orange-600 dark:text-orange-400 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[40px]">person</span>
                </div>
                <div className="mt-auto">
                  <span className="block text-3xl font-black mb-1">Meu Perfil</span>
                  <span className="block text-xl text-text-sub dark:text-gray-400 font-medium">Minha conta</span>
                </div>
              </button>
            </nav>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
