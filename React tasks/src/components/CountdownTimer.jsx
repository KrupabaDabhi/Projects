import { useState, useEffect, useRef } from 'react';

function CountdownTimer() {
  const [max, setMax] = useState(10);
  const [count, setCount] = useState(0);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setCount((prev) => {
          if (prev >= max) {
            clearInterval(intervalRef.current);
            setRunning(false);
            return max;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [running, max]);

  const handleStart = () => { if (count < max) setRunning(true); };
  const handlePause = () => setRunning(false);
  const handleStop = () => { setRunning(false); setCount(0); };
  const handleMaxChange = (e) => {
    const val = Math.max(1, parseInt(e.target.value) || 1);
    setMax(val);
    setCount(0);
    setRunning(false);
  };

  const pct = max > 0 ? (count / max) * 100 : 0;

  return (
    <div className="page">
      <h1>Countdown Timer</h1>
      <div className="form-row" style={{ justifyContent: 'center', marginBottom: '16px' }}>
        <label style={{ fontWeight: 'bold', color: '#555' }}>Max Value:</label>
        <input
          type="number"
          min="1"
          max="9999"
          value={max}
          onChange={handleMaxChange}
          disabled={running}
          className="text-input"
          style={{ width: '80px', marginBottom: 0 }}
        />
      </div>
      <p className="counter-display">{count} <span style={{ fontSize: '28px', color: '#aaa' }}>/ {max}</span></p>
      <div className="timer-bar">
        <div className="timer-fill" style={{ width: `${pct}%`, transition: 'width 0.9s linear' }} />
      </div>
      {count === max && <p className="limit-msg">Timer finished!</p>}
      <div className="btn-group" style={{ marginTop: '24px' }}>
        <button className="btn btn-success" onClick={handleStart} disabled={running || count === max}>Start</button>
        <button className="btn btn-warning" onClick={handlePause} disabled={!running}>Pause</button>
        <button className="btn btn-danger" onClick={handleStop} disabled={count === 0 && !running}>Stop</button>
      </div>
    </div>
  );
}

export default CountdownTimer;
