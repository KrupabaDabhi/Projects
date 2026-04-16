import { useState } from 'react';

const QUESTIONS = [
  { q: 'What hook is used to manage state in React?', options: ['useEffect', 'useState', 'useRef', 'useContext'], answer: 1 },
  { q: 'What does JSX stand for?', options: ['JavaScript XML', 'Java Syntax Extension', 'JavaScript Extension', 'None'], answer: 0 },
  { q: 'Which method is used to render a React app to the DOM?', options: ['React.render()', 'ReactDOM.render()', 'ReactDOM.create()', 'render()'], answer: 1 },
  { q: 'What is the correct way to pass data to a child component?', options: ['state', 'props', 'context', 'refs'], answer: 1 },
  { q: 'Which hook runs after every render by default?', options: ['useState', 'useRef', 'useEffect', 'useMemo'], answer: 2 },
  { q: 'What does the "key" prop help React do?', options: ['Style elements', 'Identify list items uniquely', 'Pass data', 'Handle events'], answer: 1 },
  { q: 'Which of these is NOT a valid React hook?', options: ['useCallback', 'useFetch', 'useReducer', 'useContext'], answer: 1 },
  { q: 'What is the virtual DOM?', options: ['A real DOM copy', 'A lightweight JS copy of the DOM', 'A browser API', 'A CSS preprocessor'], answer: 1 },
  { q: 'How do you prevent a useEffect from running on every render?', options: ['Use setTimeout', 'Add a dependency array', 'Use useRef instead', 'Add return statement'], answer: 1 },
  { q: 'What does React.Fragment do?', options: ['Creates a new component', 'Groups children without extra DOM node', 'Renders nothing', 'Creates a portal'], answer: 1 },
];

function QuizApp() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [answers, setAnswers] = useState([]);

  const q = QUESTIONS[current];

  const handleSelect = (i) => { if (selected !== null) return; setSelected(i); };

  const handleNext = () => {
    if (selected === null) return;
    const correct = selected === q.answer;
    setAnswers([...answers, { q: q.q, selected, correct, answer: q.answer }]);
    if (correct) setScore(score + 1);
    if (current + 1 >= QUESTIONS.length) { setFinished(true); }
    else { setCurrent(current + 1); setSelected(null); }
  };

  const restart = () => { setCurrent(0); setSelected(null); setScore(0); setFinished(false); setAnswers([]); };

  const pct = Math.round((score / QUESTIONS.length) * 100);

  if (finished) return (
    <div className="page">
      <h1>Quiz Complete!</h1>
      <div className="quiz-result">
        <p className="quiz-score" style={{ color: pct >= 70 ? '#22c55e' : '#ef4444' }}>{score} / {QUESTIONS.length}</p>
        <p className="quiz-pct">{pct}% — {pct >= 80 ? '🏆 Excellent!' : pct >= 60 ? '👍 Good job!' : '📚 Keep practicing!'}</p>
        <div className="quiz-answers">
          {answers.map((a, i) => (
            <div key={i} className={`quiz-answer-row ${a.correct ? 'ans-correct' : 'ans-wrong'}`}>
              <p><strong>Q{i+1}:</strong> {a.q}</p>
              <p>Your answer: <strong>{QUESTIONS[i].options[a.selected]}</strong> {a.correct ? '✅' : `❌ (${QUESTIONS[i].options[a.answer]})`}</p>
            </div>
          ))}
        </div>
        <button className="btn btn-primary" onClick={restart} style={{ marginTop: '20px' }}>Restart Quiz</button>
      </div>
    </div>
  );

  return (
    <div className="page">
      <h1>React Quiz</h1>
      <div className="quiz-box">
        <div className="quiz-progress">
          <div className="quiz-progress-fill" style={{ width: `${((current) / QUESTIONS.length) * 100}%` }} />
        </div>
        <p className="quiz-counter">Question {current + 1} of {QUESTIONS.length}</p>
        <h2 className="quiz-question">{q.q}</h2>
        <div className="quiz-options">
          {q.options.map((opt, i) => {
            let cls = 'quiz-option';
            if (selected !== null) {
              if (i === q.answer) cls += ' opt-correct';
              else if (i === selected) cls += ' opt-wrong';
            } else if (selected === i) cls += ' opt-selected';
            return <button key={i} className={cls} onClick={() => handleSelect(i)}>{opt}</button>;
          })}
        </div>
        <button className="btn btn-primary" onClick={handleNext} disabled={selected === null} style={{ marginTop: '20px', width: '100%' }}>
          {current + 1 === QUESTIONS.length ? 'Finish' : 'Next →'}
        </button>
      </div>
    </div>
  );
}

export default QuizApp;
