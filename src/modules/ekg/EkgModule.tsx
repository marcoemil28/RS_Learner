import { useState } from 'react';
import { StudyMode } from './StudyMode';
import { QuizMode } from './QuizMode';
import { ProgressView } from './ProgressView';

type Tab = 'study' | 'quiz' | 'progress';

export function EkgModule() {
  const [tab, setTab] = useState<Tab>('study');

  return (
    <div className="module ekg-module">
      <header className="module-header">
        <h1>EKG-Trainer</h1>
        <nav className="tab-bar">
          <button className={tab === 'study' ? 'active' : ''} onClick={() => setTab('study')}>
            Lernen
          </button>
          <button className={tab === 'quiz' ? 'active' : ''} onClick={() => setTab('quiz')}>
            Quiz
          </button>
          <button className={tab === 'progress' ? 'active' : ''} onClick={() => setTab('progress')}>
            Fortschritt
          </button>
        </nav>
      </header>

      {tab === 'study' && <StudyMode />}
      {tab === 'quiz' && <QuizMode />}
      {tab === 'progress' && <ProgressView />}
    </div>
  );
}
