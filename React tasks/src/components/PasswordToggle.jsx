import { useState } from 'react';

function getStrength(pwd) {
  if (!pwd) return { label: '', color: '', width: 0 };
  let score = 0;
  if (pwd.length >= 8) score++;
  if (pwd.length >= 12) score++;
  if (/[A-Z]/.test(pwd)) score++;
  if (/[0-9]/.test(pwd)) score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;
  if (score <= 1) return { label: 'Weak', color: '#ef4444', width: 25 };
  if (score <= 2) return { label: 'Fair', color: '#f59e0b', width: 50 };
  if (score <= 3) return { label: 'Good', color: '#3b82f6', width: 75 };
  return { label: 'Strong', color: '#22c55e', width: 100 };
}

function PasswordToggle() {
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [copied, setCopied] = useState(false);
  const strength = getStrength(password);

  const copy = () => {
    if (!password) return;
    navigator.clipboard.writeText(password).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    <div className="page">
      <h1>Password Toggle</h1>
      <div className="pw-wrapper">
        <div className="pw-input-row">
          <input
            type={show ? 'text' : 'password'}
            placeholder="Enter password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="text-input pw-input"
          />
          <button className="btn btn-toggle pw-eye" onClick={() => setShow(!show)} title={show ? 'Hide' : 'Show'}>
            {show ? '🙈' : '👁'}
          </button>
          <button className="btn btn-primary pw-copy" onClick={copy} disabled={!password}>
            {copied ? '✓' : 'Copy'}
          </button>
        </div>
        {password && (
          <div className="pw-strength">
            <div className="pw-bar">
              <div className="pw-bar-fill" style={{ width: `${strength.width}%`, background: strength.color }} />
            </div>
            <span className="pw-strength-label" style={{ color: strength.color }}>{strength.label}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default PasswordToggle;
