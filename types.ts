
export interface UserProfile {
  uid: string;
  displayName: string;
  email: string;
  photoURL?: string;
  progress: number; // 0-100 overall
  currentTrackId?: string;
}

export interface Track {
  id: string;
  title: string;
  description: string;
  icon: string;
  level: 'Iniciante' | 'Intermediário' | 'Avançado' | 'Especialização';
  lessons: Lesson[];
  color: string;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  content: LessonContent[];
  duration: string;
  goal: string;
}

export interface LessonContent {
  type: 'explanation' | 'visual' | 'practice';
  text?: string;
  imageUrl?: string;
  instruction?: string;
  actionLabel?: string;
  correctAnswer?: string;
}

export interface AgendaItem {
  id: string;
  time: string;
  title: string;
  icon: string;
  status: 'done' | 'active' | 'future';
}
