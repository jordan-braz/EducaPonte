
import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from './Layout';
import { getLessonTutorHelp } from '../geminiService';
import { AppContext } from '../App';

const LessonPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const context = useContext(AppContext);
  const [step, setStep] = useState(0);
  const [tutorMessage, setTutorMessage] = useState<string | null>(null);
  const [loadingTutor, setLoadingTutor] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const steps = [
    {
      title: "Aula 1: O Computador",
      content: "Vamos aprender a usar o mouse. Ele ajuda você a controlar o que acontece na tela.",
      type: "explanation",
      icon: "mouse"
    },
    {
      title: "Sua Vez!",
      content: "Tente clicar no quadrado azul abaixo usando o botão esquerdo do mouse.",
      type: "practice",
      icon: "ads_click"
    }
  ];

  const currentStep = steps[step];

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
      setIsCorrect(null);
    } else {
      navigate('/tracks');
    }
  };

  const askTutor = async () => {
    setLoadingTutor(true);
    const help = await getLessonTutorHelp(currentStep.title, currentStep.content);
    setTutorMessage(help);
    setLoadingTutor(false);
  };

  const handleCorrectClick = () => {
    setIsCorrect(true);
  };

  return (
    <Layout showBack title={currentStep.title}>
      <div className="max-w-[800px] mx-auto flex flex-col gap-10">
        {/* Progress indicator */}
        <div className="w-full flex flex-col gap-2">
          <div className="flex justify-between items-center text-sm font-bold text-text-sub">
            <span>Passo {step + 1} de {steps.length}</span>
            <span>{Math.round(((step + 1) / steps.length) * 100)}%</span>
          </div>
          <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-500" 
              style={{ width: `${((step + 1) / steps.length) * 100}%` }}
            ></div>
          </div>
        </div>

        <section className="bg-white dark:bg-surface-dark rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
          <div className="p-8 md:p-12 flex flex-col gap-8">
            <div className="flex items-center gap-6">
              <div className="size-20 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[48px]">{currentStep.icon}</span>
              </div>
              <p className="text-2xl md:text-3xl font-bold leading-relaxed">
                {currentStep.content}
              </p>
            </div>

            {currentStep.type === 'practice' && (
              <div className="bg-gray-50 dark:bg-gray-900 border-4 border-dashed border-gray-200 dark:border-gray-800 rounded-2xl p-12 flex flex-col items-center justify-center gap-10 min-h-[400px]">
                <p className="text-xl font-medium text-text-sub dark:text-gray-400">
                  Clique no botão para concluir este passo:
                </p>
                <button 
                  onClick={handleCorrectClick}
                  className={`size-48 rounded-2xl shadow-xl transition-all flex items-center justify-center transform active:scale-95 ${
                    isCorrect ? 'bg-secondary text-white' : 'bg-primary text-white hover:bg-primary-hover'
                  }`}
                  aria-label="Botão Interativo"
                >
                  <span className="material-symbols-outlined text-[80px]">
                    {isCorrect ? 'check_circle' : 'touch_app'}
                  </span>
                </button>
                {isCorrect && (
                  <p className="text-secondary text-2xl font-black animate-bounce">Muito bem! Você conseguiu!</p>
                )}
              </div>
            )}
          </div>
        </section>

        {/* AI Tutor Assistant */}
        <div className="flex flex-col gap-4">
          <button 
            onClick={askTutor}
            disabled={loadingTutor}
            className="self-center flex items-center gap-3 px-8 py-4 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 rounded-xl font-black text-lg hover:bg-yellow-200 dark:hover:bg-yellow-900/50 transition-colors"
          >
            <span className="material-symbols-outlined">psychology</span>
            {loadingTutor ? 'Pensando...' : 'Pedir ajuda ao Tutor IA'}
          </button>

          {tutorMessage && (
            <div className="bg-white dark:bg-surface-dark border-l-8 border-yellow-400 p-8 rounded-r-2xl shadow-sm animate-fade-in">
              <div className="flex gap-4 items-start">
                <div className="size-12 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600 flex-shrink-0">
                  <span className="material-symbols-outlined">smart_toy</span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-sm font-bold text-yellow-600 uppercase tracking-widest">Tutor IA diz:</span>
                  <p className="text-xl leading-relaxed font-medium">{tutorMessage}</p>
                </div>
              </div>
              <button 
                onClick={() => setTutorMessage(null)}
                className="mt-4 text-sm font-bold text-gray-400 hover:text-text-main"
              >
                Fechar ajuda
              </button>
            </div>
          )}
        </div>

        {/* Navigation Controls */}
        <div className="sticky bottom-8 flex justify-between gap-6 bg-white/80 dark:bg-surface-dark/80 backdrop-blur-md p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xl">
          <button 
            onClick={() => step > 0 && setStep(step - 1)}
            disabled={step === 0}
            className={`px-8 h-16 rounded-xl font-black text-xl flex items-center gap-3 transition-colors ${
              step === 0 ? 'bg-gray-100 text-gray-300' : 'bg-gray-200 hover:bg-gray-300 text-text-main'
            }`}
          >
            <span className="material-symbols-outlined">replay</span>
            Voltar
          </button>
          
          <button 
            onClick={handleNext}
            className="flex-1 max-w-[400px] h-16 bg-primary hover:bg-primary-hover text-white font-black text-2xl rounded-xl shadow-lg shadow-blue-500/30 flex items-center justify-center gap-4 transition-all"
          >
            {step === steps.length - 1 ? 'Concluir Aula' : 'Próximo Passo'}
            <span className="material-symbols-outlined text-[32px]">arrow_forward</span>
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default LessonPage;
