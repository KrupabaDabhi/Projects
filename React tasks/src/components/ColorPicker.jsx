import { useState } from 'react';
import { useToast } from '../context/ToastContext';

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
}

function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;
  if (max === min) { h = s = 0; }
  else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

function ColorPicker() {
  const [color, setColor] = useState('#aa3bff');
  const toast = useToast();

  const { r, g, b } = hexToRgb(color);
  const { h, s, l } = rgbToHsl(r, g, b);

  const copy = (text) => {
    navigator.clipboard.writeText(text);
    toast.success(`Copied: ${text}`);
  };

  const formats = [
    { label: 'HEX', value: color.toUpperCase() },
    { label: 'RGB', value: `rgb(${r}, ${g}, ${b})` },
    { label: 'HSL', value: `hsl(${h}, ${s}%, ${l}%)` },
  ];

  return (
    <div className="page">
      <h1>Color Picker</h1>
      <div className="color-picker-box">
        <div className="color-preview" style={{ background: color }} />
        <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="color-input" />
        <div className="color-formats">
          {formats.map(({ label, value }) => (
            <div key={label} className="color-format-row">
              <span className="color-format-label">{label}</span>
              <code className="color-format-value">{value}</code>
              <button className="btn btn-primary" style={{ padding: '4px 12px', fontSize: '13px' }} onClick={() => copy(value)}>Copy</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ColorPicker;
