import { useState } from 'react';

function CharCount() {
  const [input, setInput] = useState('');

  const words = input.trim() === '' ? 0 : input.trim().split(/\s+/).length;
  const sentences = input.trim() === '' ? 0 : input.split(/[.!?]+/).filter(Boolean).length;
  const paragraphs = input.trim() === '' ? 0 : input.split(/\n+/).filter((p) => p.trim()).length;
  const readingTime = Math.max(1, Math.ceil(words / 200));

  return (
    <div className="page">
      <h1>Character Counter</h1>
      <textarea
        placeholder="Start typing..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="text-input sc-textarea"
        rows={5}
      />
      <div className="cc-stats">
        <div className="cc-stat">
          <span className="cc-stat-value">{input.length}</span>
          <span className="cc-stat-label">Characters</span>
        </div>
        <div className="cc-stat">
          <span className="cc-stat-value">{input.replace(/\s/g, '').length}</span>
          <span className="cc-stat-label">No Spaces</span>
        </div>
        <div className="cc-stat">
          <span className="cc-stat-value">{words}</span>
          <span className="cc-stat-label">Words</span>
        </div>
        <div className="cc-stat">
          <span className="cc-stat-value">{sentences}</span>
          <span className="cc-stat-label">Sentences</span>
        </div>
        <div className="cc-stat">
          <span className="cc-stat-value">{paragraphs}</span>
          <span className="cc-stat-label">Paragraphs</span>
        </div>
        <div className="cc-stat">
          <span className="cc-stat-value">{readingTime} min</span>
          <span className="cc-stat-label">Read Time</span>
        </div>
      </div>
    </div>
  );
}

export default CharCount;
