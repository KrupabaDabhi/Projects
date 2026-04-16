import { useState } from 'react';

const toTitleCase = (s) => s.replace(/\w\S*/g, (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());
const toCamelCase = (s) => s.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (_, c) => c.toUpperCase());
const toSnakeCase = (s) => s.trim().toLowerCase().replace(/\s+/g, '_');
const reverseStr = (s) => s.split('').reverse().join('');
const countWords = (s) => s.trim() === '' ? 0 : s.trim().split(/\s+/).length;

function StringConverter() {
  const [input, setInput] = useState('');
  const [copied, setCopied] = useState('');

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(label);
      setTimeout(() => setCopied(''), 1500);
    });
  };

  const conversions = [
    { label: 'Uppercase',   value: input.toUpperCase() },
    { label: 'Lowercase',   value: input.toLowerCase() },
    { label: 'Title Case',  value: toTitleCase(input) },
    { label: 'camelCase',   value: toCamelCase(input) },
    { label: 'snake_case',  value: toSnakeCase(input) },
    { label: 'Reversed',    value: reverseStr(input) },
  ];

  return (
    <div className="page">
      <h1>String Converter</h1>
      <textarea
        placeholder="Enter a string..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="text-input sc-textarea"
        rows={3}
      />
      <p className="sc-meta">{input.length} chars · {countWords(input)} words</p>
      <div className="sc-grid">
        {conversions.map(({ label, value }) => (
          <div key={label} className="sc-row">
            <span className="sc-label">{label}</span>
            <span className="sc-value">{value || <em className="sc-empty">—</em>}</span>
            <button
              className="btn btn-primary sc-copy"
              onClick={() => copyToClipboard(value, label)}
              disabled={!value}
            >
              {copied === label ? '✓' : 'Copy'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StringConverter;
