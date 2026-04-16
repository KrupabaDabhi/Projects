import { useState, useEffect } from 'react';

function DigitalClock() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const pad = (n) => String(n).padStart(2, '0');

  const hours = pad(now.getHours());
  const minutes = pad(now.getMinutes());
  const seconds = pad(now.getSeconds());

  const dateStr = now.toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="page">
      <h1>Digital Clock</h1>
      <div className="clock-box">
        <div className="clock-time">
          {hours}<span className="colon">:</span>{minutes}<span className="colon">:</span>{seconds}
        </div>
        <div className="clock-date">{dateStr}</div>
      </div>
    </div>
  );
}

export default DigitalClock;
