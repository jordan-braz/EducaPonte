
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

export const getLessonTutorHelp = async (lessonTitle: string, currentStep: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `O aluno está na aula "${lessonTitle}", no passo: "${currentStep}". 
      Dê uma explicação simples, encorajadora e inclusiva para ajudar o aluno a entender o que fazer agora. 
      Use um tom amigável e frases curtas.`,
      config: {
        systemInstruction: "Você é um tutor de educação inclusiva, especializado em explicar conceitos complexos de forma simples para pessoas com diferentes necessidades de aprendizagem.",
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Tutor Error:", error);
    return "Estou aqui para ajudar! Tente seguir as instruções da tela e clique no botão para continuar.";
  }
};
