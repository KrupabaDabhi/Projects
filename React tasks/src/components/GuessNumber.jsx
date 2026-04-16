import { useState, useRef } from 'react';
import { useToast } from '../context/ToastContext';

const DIFFICULTIES = {
  Easy:   { min: 1, max: 50 },
  Medium: { min: 1, max: 100 },
  Hard:   { min: 1, max: 500 },
};

function GuessNumber() {
  const [difficulty, setDifficulty] = useState('Medium');
  const { min, max } = DIFFICULTIES[difficulty];
  const secret = useRef(Math.floor(Math.random() * (max - min + 1)) + min);
  const [guess, setGuess] = useState('');
  const [result, setResult] = useState(null);
  const [attempts, setAttempts] = useState(0);
  const toast = useToast();

  const handleDifficulty = (d) => {
    setDifficulty(d);
    const { min: mn, max: mx } = DIFFICULTIES[d];
    secret.current = Math.floor(Math.random() * (mx - mn + 1)) + mn;
    setGuess(''); setResult(null); setAttempts(0);
    toast.info(`Difficulty set to ${d} (${DIFFICULTIES[d].min}–${DIFFICULTIES[d].max})`);
  };

  const handleGuess = () => {
    if (guess === '') return;
    const num = Number(guess);
    setAttempts((a) => a + 1);
    if (num === secret.current) {
      setResult({ type: 'success', msg: `Correct! The number was ${secret.current}. Got it in ${attempts + 1} attempt(s)!` });
      toast.success('You guessed it!');
    } else if (num < secret.current) {
      setResult({ type: 'failure', msg: 'Too low! Try a higher number.' });
    } else {
      setResult({ type: 'failure', msg: 'Too high! Try a lower number.' });
    }
  };

  const handleReset = () => {
    secret.current = Math.floor(Math.random() * (max - min + 1)) + min;
    setGuess(''); setResult(null); setAttempts(0);
  };

  return (
    <div className="page">
      <h1>Guess the Number</h1>
      <div className="btn-group" style={{ marginBottom: '16px' }}>
        {Object.keys(DIFFICULTIES).map((d) => (
          <button key={d} className={`btn ${difficulty === d ? 'btn-primary' : 'btn-outline'}`} onClick={() => handleDifficulty(d)}>{d}</button>
        ))}
      </div>
      <p style={{ color: '#888', marginBottom: '20px' }}>
        Guess a number between <strong>{min}</strong> and <strong>{max}</strong>
      </p>
      <div className="btn-group" style={{ justifyContent: 'center', marginBottom: '16px' }}>
        <input
          type="number"
          placeholder="Your guess..."
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleGuess()}
          className="text-input"
          style={{ marginBottom: 0, width: '200px' }}
          disabled={result?.type === 'success'}
        />
        <button className="btn btn-success" onClick={handleGuess} disabled={result?.type === 'success' || guess === ''}>Guess</button>
      </div>
      {result && (
        <div className={`result-box ${result.type === 'success' ? 'result-success' : 'result-failure'}`}>
          <p>{result.type === 'success' ? '🎉 Success!' : '❌ Failure!'}</p>
          <p>{result.msg}</p>
        </div>
      )}
      {attempts > 0 && <p style={{ marginTop: '12px', color: '#888' }}>Attempts: <strong>{attempts}</strong></p>}
      <button className="btn btn-warning" onClick={handleReset} style={{ marginTop: '20px' }}>New Game</button>
    </div>
  );
}

export default GuessNumber;
