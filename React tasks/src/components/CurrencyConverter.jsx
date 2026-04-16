import { useState, useEffect } from 'react';

const BASE_URL = 'https://api.frankfurter.app';

function CurrencyConverter() {
  const [currencies, setCurrencies] = useState([]);
  const [amount, setAmount] = useState('1');
  const [from, setFrom] = useState('USD');
  const [to, setTo] = useState('INR');
  const [result, setResult] = useState(null);
  const [rate, setRate] = useState(null);
  const [allRates, setAllRates] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${BASE_URL}/currencies`).then((r) => r.json())
      .then((d) => setCurrencies(Object.keys(d)))
      .catch(() => setError('Failed to load currencies'));
  }, []);

  const convert = async () => {
    if (!amount || isNaN(amount) || Number(amount) <= 0) return;
    if (from === to) { setResult(Number(amount)); setRate(1); setAllRates(null); return; }
    setLoading(true); setError(null);
    try {
      const res = await fetch(`${BASE_URL}/latest?amount=${amount}&from=${from}`);
      const data = await res.json();
      setResult(data.rates[to]);
      setRate(data.rates[to] / Number(amount));
      setAllRates(data.rates);
    } catch { setError('Conversion failed.'); }
    finally { setLoading(false); }
  };

  const swap = () => { setFrom(to); setTo(from); setResult(null); setRate(null); setAllRates(null); };

  return (
    <div className="page">
      <h1>Currency Converter</h1>
      <p style={{ color: '#888', marginBottom: '24px' }}>Powered by frankfurter.app — live rates, no API key</p>
      <div className="currency-box">
        <div className="form-row" style={{ marginBottom: '16px' }}>
          <label style={{ width: '80px', fontWeight: 'bold', color: '#444' }}>Amount:</label>
          <input type="number" min="0" value={amount} onChange={(e) => setAmount(e.target.value)}
            className="text-input calc-input" />
        </div>
        <div className="currency-selectors">
          <div className="currency-select-group">
            <label>From</label>
            <select className="calc-select currency-select" value={from} onChange={(e) => setFrom(e.target.value)}>
              {currencies.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <button className="btn btn-swap" onClick={swap} title="Swap">⇄</button>
          <div className="currency-select-group">
            <label>To</label>
            <select className="calc-select currency-select" value={to} onChange={(e) => setTo(e.target.value)}>
              {currencies.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>
        <button className="btn btn-primary" onClick={convert} disabled={loading || !currencies.length} style={{ marginTop: '20px', width: '100%' }}>
          {loading ? 'Converting...' : 'Convert'}
        </button>
        {error && <p className="form-error" style={{ marginLeft: 0, marginTop: '10px' }}>{error}</p>}
        {result !== null && (
          <div className="currency-result">
            <p className="currency-equation">{Number(amount).toLocaleString()} <strong>{from}</strong> =</p>
            <p className="currency-converted">{result.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 })}<strong> {to}</strong></p>
            {rate !== null && <p className="currency-rate">1 {from} = {rate.toFixed(4)} {to}</p>}
          </div>
        )}
      </div>

      {allRates && (
        <div className="all-rates-box">
          <h2>All Rates for 1 {from}</h2>
          <div className="rates-grid">
            {Object.entries(allRates).map(([cur, val]) => (
              <div key={cur} className={`rate-row ${cur === to ? 'rate-highlighted' : ''}`}>
                <span className="rate-currency">{cur}</span>
                <span className="rate-value">{(val / Number(amount)).toFixed(4)}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default CurrencyConverter;
