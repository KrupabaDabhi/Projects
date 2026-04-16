import { useState } from 'react';

function GSTCalculator() {
  const [amount, setAmount] = useState('');
  const [gstRate, setGstRate] = useState('18');
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    const base = parseFloat(amount);
    if (isNaN(base) || base <= 0) {
      setResult(null);
      return;
    }
    const rate = parseFloat(gstRate);
    const gstAmount = (base * rate) / 100;
    const total = base + gstAmount;
    setResult({ base, gstAmount, total, rate });
  };

  return (
    <div className="page">
      <h1>GST Calculator</h1>
      <div className="gst-box">
        <div className="calc-row" style={{ marginBottom: '14px' }}>
          <label style={{ width: '180px' }}>Enter Amount (in INR):</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="text-input calc-input"
            placeholder="e.g. 10000"
          />
        </div>
        <div className="calc-row" style={{ marginBottom: '20px' }}>
          <label style={{ width: '180px' }}>Select GST Rate:</label>
          <select
            value={gstRate}
            onChange={(e) => setGstRate(e.target.value)}
            className="calc-select"
          >
            <option value="5">5%</option>
            <option value="12">12%</option>
            <option value="18">18%</option>
            <option value="28">28%</option>
          </select>
        </div>
        <button className="btn btn-primary" onClick={handleCalculate}>
          Calculate GST
        </button>

        {result && (
          <div className="gst-result">
            <p>Amount: <strong>₹ {result.base.toFixed(2)}</strong></p>
            <p>GST ({result.rate}%): <strong>₹ {result.gstAmount.toFixed(2)}</strong></p>
            <hr />
            <p className="gst-total">Total: <strong>₹ {result.total.toFixed(2)}</strong></p>
          </div>
        )}
      </div>
    </div>
  );
}

export default GSTCalculator;
