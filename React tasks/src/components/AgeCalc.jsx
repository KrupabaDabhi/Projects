import { useState } from 'react';

function AgeCalc() {
  const [dob, setDob] = useState('');
  const [result, setResult] = useState(null);

  const calculate = () => {
    if (!dob) return;
    const birth = new Date(dob);
    const now = new Date();
    if (birth > now) { setResult(null); return; }

    let years = now.getFullYear() - birth.getFullYear();
    let months = now.getMonth() - birth.getMonth();
    let days = now.getDate() - birth.getDate();

    if (days < 0) { months--; days += new Date(now.getFullYear(), now.getMonth(), 0).getDate(); }
    if (months < 0) { years--; months += 12; }

    const nextBirthday = new Date(now.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBirthday <= now) nextBirthday.setFullYear(now.getFullYear() + 1);
    const daysUntil = Math.ceil((nextBirthday - now) / (1000 * 60 * 60 * 24));

    const totalDays = Math.floor((now - birth) / (1000 * 60 * 60 * 24));

    setResult({ years, months, days, daysUntil, totalDays });
  };

  return (
    <div className="page">
      <h1>Age Calculator</h1>
      <div className="gst-box">
        <div className="form-row" style={{ marginBottom: '20px' }}>
          <label style={{ width: '140px' }}>Date of Birth:</label>
          <input type="date" className="text-input calc-input" value={dob}
            onChange={(e) => setDob(e.target.value)} max={new Date().toISOString().split('T')[0]} />
        </div>
        <button className="btn btn-primary" onClick={calculate}>Calculate Age</button>

        {result && (
          <div className="gst-result" style={{ marginTop: '20px' }}>
            <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#aa3bff', margin: '0 0 8px' }}>
              {result.years} <span style={{ fontSize: '16px' }}>yrs</span>{' '}
              {result.months} <span style={{ fontSize: '16px' }}>mo</span>{' '}
              {result.days} <span style={{ fontSize: '16px' }}>days</span>
            </p>
            <hr />
            <p>Total days lived: <strong>{result.totalDays.toLocaleString()}</strong></p>
            <p>Next birthday in: <strong>{result.daysUntil} days</strong> {result.daysUntil === 0 ? '🎂 Today!' : '🎉'}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default AgeCalc;
