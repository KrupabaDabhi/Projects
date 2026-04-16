import { useState } from 'react';

function BasicCalc() {
  // Option 1
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [result1, setResult1] = useState('');

  const calculate1 = (op) => {
    const a = parseFloat(num1);
    const b = parseFloat(num2);
    if (isNaN(a) || isNaN(b)) { setResult1('Invalid input'); return; }
    if (op === 'DIV' && b === 0) { setResult1('Cannot divide by zero'); return; }
    const res = op === 'SUM' ? a + b : op === 'SUB' ? a - b : op === 'MUL' ? a * b : a / b;
    setResult1(res);
  };

  // Option 2
  const [no1, setNo1] = useState('');
  const [no2, setNo2] = useState('');
  const [operation, setOperation] = useState('+');
  const [answer, setAnswer] = useState(null);

  const calculate2 = () => {
    const a = parseFloat(no1);
    const b = parseFloat(no2);
    if (isNaN(a) || isNaN(b)) { setAnswer('Invalid input'); return; }
    if (operation === '/' && b === 0) { setAnswer('Cannot divide by zero'); return; }
    const res = operation === '+' ? a + b : operation === '-' ? a - b : operation === '*' ? a * b : a / b;
    setAnswer(res);
  };

  return (
    <div className="page">
      <h1>Basic Calculator</h1>

      {/* Option 1 */}
      <div className="calc-box">
        <h2>Option 1</h2>
        <div className="calc-row">
          <label>num1:</label>
          <input type="number" value={num1} onChange={(e) => setNum1(e.target.value)} className="text-input calc-input" />
        </div>
        <div className="calc-row">
          <label>num2:</label>
          <input type="number" value={num2} onChange={(e) => setNum2(e.target.value)} className="text-input calc-input" />
        </div>
        <div className="calc-row">
          <label>result:</label>
          <input type="text" value={result1} readOnly className="text-input calc-input" />
        </div>
        <div className="btn-group" style={{ marginTop: '12px' }}>
          {['SUM', 'SUB', 'MUL', 'DIV'].map((op) => (
            <button key={op} className="btn btn-primary" onClick={() => calculate1(op)}>{op}</button>
          ))}
        </div>
      </div>

      {/* Option 2 */}
      <div className="calc-box" style={{ marginTop: '32px' }}>
        <h2>Option 2</h2>
        <div className="calc-row2">
          <div>
            <label>NO1:</label>
            <input type="number" value={no1} onChange={(e) => setNo1(e.target.value)} className="text-input calc-input" />
          </div>
          <div>
            <label>NO2:</label>
            <input type="number" value={no2} onChange={(e) => setNo2(e.target.value)} className="text-input calc-input" />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <label>Operation:</label>
            <select value={operation} onChange={(e) => setOperation(e.target.value)} className="calc-select">
              <option value="+">+</option>
              <option value="-">-</option>
              <option value="*">*</option>
              <option value="/">/</option>
            </select>
            <button className="btn btn-primary" onClick={calculate2}>ClickMe</button>
          </div>
        </div>
        {answer !== null && (
          <p className="answer-text">Answer is {answer}</p>
        )}
      </div>
    </div>
  );
}

export default BasicCalc;
