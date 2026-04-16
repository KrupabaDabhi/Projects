import { useState } from 'react';

function getBMICategory(bmi) {
  if (bmi < 18.5) return { label: 'Underweight', color: '#3b82f6' };
  if (bmi < 25)   return { label: 'Normal', color: '#22c55e' };
  if (bmi < 30)   return { label: 'Overweight', color: '#f59e0b' };
  return { label: 'Obese', color: '#ef4444' };
}

function BMICalc() {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState(null);

  const calculate = () => {
    const h = parseFloat(height) / 100;
    const w = parseFloat(weight);
    if (!h || !w || h <= 0 || w <= 0) return;
    setBmi(parseFloat((w / (h * h)).toFixed(1)));
  };

  const category = bmi ? getBMICategory(bmi) : null;
  const pct = bmi ? Math.min((bmi / 40) * 100, 100) : 0;

  return (
    <div className="page">
      <h1>BMI Calculator</h1>
      <div className="gst-box">
        <div className="form-row" style={{ marginBottom: '14px' }}>
          <label style={{ width: '120px' }}>Height (cm):</label>
          <input type="number" className="text-input calc-input" value={height} onChange={(e) => setHeight(e.target.value)} placeholder="e.g. 175" />
        </div>
        <div className="form-row" style={{ marginBottom: '20px' }}>
          <label style={{ width: '120px' }}>Weight (kg):</label>
          <input type="number" className="text-input calc-input" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="e.g. 70" />
        </div>
        <button className="btn btn-primary" onClick={calculate}>Calculate BMI</button>

        {bmi && (
          <div className="bmi-result">
            <p className="bmi-value" style={{ color: category.color }}>{bmi}</p>
            <p className="bmi-category" style={{ color: category.color }}>{category.label}</p>
            <div className="bmi-bar-track">
              <div className="bmi-bar-fill" style={{ width: `${pct}%`, background: category.color }} />
            </div>
            <div className="bmi-scale">
              <span style={{ color: '#3b82f6' }}>Underweight<br/>&lt;18.5</span>
              <span style={{ color: '#22c55e' }}>Normal<br/>18.5–24.9</span>
              <span style={{ color: '#f59e0b' }}>Overweight<br/>25–29.9</span>
              <span style={{ color: '#ef4444' }}>Obese<br/>≥30</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default BMICalc;
