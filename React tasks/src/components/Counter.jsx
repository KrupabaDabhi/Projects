import { useState } from 'react';
import { useToast } from '../context/ToastContext';

function Counter() {
  const [count, setCount] = useState(0);
  const toast = useToast();

  const increment = () => {
    if (count < 10) setCount(count + 1);
    else toast.error('Maximum limit reached (10)');
  };

  const decrement = () => {
    if (count > 0) setCount(count - 1);
    else toast.error('Minimum limit reached (0)');
  };

  const reset = () => { setCount(0); toast.info('Counter reset'); };

  return (
    <div className="page">
      <h1>Counter Application</h1>
      <p className="counter-display">{count}</p>
      <div className="btn-group">
        <button className="btn btn-success" onClick={increment} disabled={count === 10}>+ Increment</button>
        <button className="btn btn-danger" onClick={decrement} disabled={count === 0}>- Decrement</button>
        <button className="btn btn-warning" onClick={reset} disabled={count === 0}>Reset</button>
      </div>
      {count === 10 && <p className="limit-msg">Maximum limit reached (10)</p>}
      {count === 0 && <p className="limit-msg">Minimum limit reached (0)</p>}
    </div>
  );
}

export default Counter;
