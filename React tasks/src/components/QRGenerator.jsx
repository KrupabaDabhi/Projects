import { useState, useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { useToast } from '../context/ToastContext';

function QRGenerator() {
  const [text, setText] = useState('https://example.com');
  const [size, setSize] = useState(200);
  const canvasRef = useRef(null);
  const toast = useToast();

  const download = () => {
    const canvas = document.querySelector('#qr-canvas canvas');
    if (!canvas) return;
    const url = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url; a.download = 'qrcode.png'; a.click();
    toast.success('QR Code downloaded!');
  };

  return (
    <div className="page">
      <h1>QR Code Generator</h1>
      <div className="gst-box" style={{ minWidth: '360px' }}>
        <div className="form-row" style={{ marginBottom: '14px' }}>
          <label style={{ width: '80px' }}>Text/URL:</label>
          <input type="text" className="text-input" style={{ flex: 1, marginBottom: 0 }}
            value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter text or URL..." />
        </div>
        <div className="form-row" style={{ marginBottom: '20px' }}>
          <label style={{ width: '80px' }}>Size: {size}px</label>
          <input type="range" min="100" max="400" value={size} onChange={(e) => setSize(Number(e.target.value))} style={{ flex: 1 }} />
        </div>

        {text && (
          <div id="qr-canvas" style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
            <QRCodeCanvas value={text} size={size} level="H" includeMargin />
          </div>
        )}

        <button className="btn btn-primary" onClick={download} style={{ width: '100%' }} disabled={!text}>
          ⬇ Download PNG
        </button>
      </div>
    </div>
  );
}

export default QRGenerator;
