
import React from 'react';
import Layout from './Layout';
import { useNavigate } from 'react-router-dom';
import { Track } from '../types';

const MOCK_TRACKS: Track[] = [
  {
    id: '1',
    title: 'Alfabetização Digital',
    description: 'Aprenda a usar o mouse, o teclado e a navegar na internet com segurança.',
    icon: 'computer',
    level: 'Iniciante',
    lessons: [],
    color: 'bg-blue-100 dark:bg-blue-900/40 text-blue-600'
  },
  {
    id: '2',
    title: 'Ensino Fundamental',
    description: 'Aulas de Português, Matemática e Ciências para reforçar sua base.',
    icon: 'menu_book',
    level: 'Intermediário',
    lessons: [],
    color: 'bg-green-100 dark:bg-green-900/40 text-green-600'
  },
  {
    id: '3',
    title: 'Ensino Médio',
    description: 'Prepare-se para o mercado de trabalho com conteúdos focados.',
    icon: 'school',
    level: 'Avançado',
    lessons: [],
    color: 'bg-purple-100 dark:bg-purple-900/40 text-purple-600'
  },
  {
    id: '4',
    title: 'Programação',
    description: 'Aprenda a criar seus próprios jogos e aplicativos.',
    icon: 'terminal',
    level: 'Especialização',
    lessons: [],
    color: 'bg-orange-100 dark:bg-orange-900/40 text-orange-600'
  }
];

const LearningTracks: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Layout showBack title="Trilhas de Conhecimento">
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-4">
          <h2 className="text-4xl font-black tracking-tight">Escolha seu caminho</h2>
          <p className="text-xl text-text-sub dark:text-gray-400 font-medium max-w-2xl">
            Siga a ordem sugerida ou escolha o que você mais tem interesse em aprender hoje.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {MOCK_TRACKS.map(track => (
            <div 
              key={track.id} 
              className="flex flex-col rounded-2xl bg-white dark:bg-surface-dark border-2 border-gray-200 dark:border-gray-800 p-8 shadow-sm hover:shadow-md transition-all group"
            >
              <div className="flex items-start justify-between mb-8">
                <div className={`size-16 rounded-xl flex items-center justify-center ${track.color}`}>
                  <span className="material-symbols-outlined text-[40px]">{track.icon}</span>
                </div>
                <span className="px-4 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800 text-sm font-bold">
                  {track.level}
                </span>
              </div>
              
              <div className="flex-1 flex flex-col gap-3">
                <h3 className="text-2xl font-bold">{track.title}</h3>
                <p className="text-lg text-text-sub dark:text-gray-400 font-medium leading-relaxed">
                  {track.description}
                </p>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-100 dark:border-gray-800">
                <button 
                  onClick={() => navigate(`/lesson/${track.id}`)}
                  className="w-full flex items-center justify-center gap-2 h-16 rounded-xl bg-primary hover:bg-primary-hover text-white font-black text-xl shadow-lg shadow-blue-500/20 active:translate-y-0.5 transition-all"
                >
                  Continuar Trilha
                  <span className="material-symbols-outlined">arrow_forward</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default LearningTracks;
