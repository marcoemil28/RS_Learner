import { useEffect, useMemo, useState } from 'react';
import { RHYTHMS } from './rhythms';
import { generateTrace } from './waveform';
import { EkgTrace } from './EkgTrace';
import { getProgress, pickWeighted, recordAttempt, resetProgress } from './progress';
import type { Rhythm } from './types';

const QUIZ_RHYTHMS = RHYTHMS.filter((r) => r.quizEligible);

function pickOptions(correct: Rhythm, count = 4): Rhythm[] {
  const pool = QUIZ_RHYTHMS.filter((r) => r.id !== correct.id);
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  const options = [correct, ...shuffled.slice(0, count - 1)];
  return options.sort(() => Math.random() - 0.5);
}

export function QuizMode() {
  const [progress, setProgress] = useState(getProgress());
  const [current, setCurrent] = useState<Rhythm>(() => pickWeighted(QUIZ_RHYTHMS, getProgress()));
  const [options, setOptions] = useState<Rhythm[]>(() => pickOptions(current));
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [sessionScore, setSessionScore] = useState({ correct: 0, total: 0 });

  const trace = useMemo(() => generateTrace(current.gen), [current]);

  useEffect(() => {
    setOptions(pickOptions(current));
    setSelectedId(null);
  }, [current]);

  function handleAnswer(optionId: string) {
    if (selectedId) return;
    setSelectedId(optionId);
    const wasCorrect = optionId === current.id;
    setSessionScore((s) => ({ correct: s.correct + (wasCorrect ? 1 : 0), total: s.total + 1 }));
    setProgress(recordAttempt(current.id, wasCorrect));
  }

  function nextQuestion() {
    setCurrent(pickWeighted(QUIZ_RHYTHMS, progress));
  }

  function handleReset() {
    if (confirm('Fortschritt für den EKG-Quiz wirklich zurücksetzen?')) {
      setProgress(resetProgress());
    }
  }

  const stat = progress[current.id];
  const accuracy = stat && stat.attempts > 0 ? Math.round((stat.correct / stat.attempts) * 100) : null;

  return (
    <div className="quiz-mode">
      <div className="quiz-header">
        <div className="quiz-score">
          Session: {sessionScore.correct}/{sessionScore.total} richtig
        </div>
        <button className="secondary" onClick={handleReset}>
          Fortschritt zurücksetzen
        </button>
      </div>

      <EkgTrace trace={trace} />

      <p className="quiz-question">Welcher Rhythmus ist das?</p>

      <div className="quiz-options">
        {options.map((opt) => {
          const isSelected = selectedId === opt.id;
          const isCorrectOpt = opt.id === current.id;
          let cls = 'quiz-option';
          if (selectedId) {
            if (isCorrectOpt) cls += ' correct';
            else if (isSelected) cls += ' incorrect';
          }
          return (
            <button key={opt.id} className={cls} onClick={() => handleAnswer(opt.id)} disabled={!!selectedId}>
              {opt.nameDe}
            </button>
          );
        })}
      </div>

      {selectedId && (
        <div className="quiz-feedback">
          <h4>{current.nameDe}</h4>
          <ul>
            {current.keyFeatures.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
          <p className="clinical-note">{current.clinicalNote}</p>
          {accuracy !== null && (
            <p className="stat-line">
              Deine Trefferquote bei diesem Rhythmus: {accuracy}% ({stat!.correct}/{stat!.attempts})
            </p>
          )}
          <button className="primary" onClick={nextQuestion}>
            Nächste Frage
          </button>
        </div>
      )}
    </div>
  );
}
