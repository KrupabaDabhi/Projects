import { useState, useEffect } from 'react';

const BUTTONS = [
  ['7', '8', '9', '+'],
  ['4', '5', '6', '-'],
  ['1', '2', '3', '*'],
  ['.', '0', '=', '/'],
  ['C'],
];

const VALID_KEYS = ['0','1','2','3','4','5','6','7','8','9','+','-','*','/','.',  'Enter','Backspace','Escape','='];

function Calculator() {
  const [display, setDisplay] = useState('');
  const [expression, setExpression] = useState('');

  const handleBtn = (val) => {
    if (val === 'C') { setDisplay(''); setExpression(''); return; }
    if (val === '=') {
      try {
        const result = Function('"use strict"; return (' + expression + ')')();
        const formatted = parseFloat(result.toFixed(10)).toString();
        setDisplay(formatted); setExpression(formatted);
      } catch { setDisplay('Error'); setExpression(''); }
      return;
    }
    const newExpr = expression + val;
    setExpression(newExpr); setDisplay(newExpr);
  };

  useEffect(() => {
    const onKey = (e) => {
      if (!VALID_KEYS.includes(e.key)) return;
      e.preventDefault();
      if (e.key === 'Enter' || e.key === '=') handleBtn('=');
      else if (e.key === 'Backspace') { setExpression((ex) => ex.slice(0, -1)); setDisplay((d) => d.slice(0, -1)); }
      else if (e.key === 'Escape') { setDisplay(''); setExpression(''); }
      else handleBtn(e.key);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [expression]);

  return (
    <div className="page">
      <h1>Simple Calculator</h1>
      <p style={{ color: '#888', marginBottom: '8px', fontSize: '14px' }}>Supports keyboard input</p>
      <div className="calc-ui">
        <input type="text" className="calc-display" value={display} readOnly placeholder="0" />
        <div className="calc-keys">
          {BUTTONS.map((row, i) => (
            <div key={i} className="calc-key-row">
              {row.map((btn) => (
                <button
                  key={btn}
                  className={`calc-key ${btn === 'C' ? 'key-clear' : ['+','-','*','/'].includes(btn) ? 'key-op' : btn === '=' ? 'key-eq' : ''}`}
                  onClick={() => handleBtn(btn)}
                  style={btn === 'C' ? { gridColumn: 'span 4' } : {}}
                >
                  {btn}
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Calculator;
