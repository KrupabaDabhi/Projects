import { useToast } from '../context/ToastContext';
import useLocalStorage from '../hooks/useLocalStorage';

function TodoLocalStorage() {
  const [todos, setTodos] = useLocalStorage('todos-ls', []);
  const [input, setInput] = useLocalStorage('todo-input', '');
  const [filter, setFilter] = useLocalStorage('todo-filter', 'All');
  const [editId, setEditId] = useLocalStorage('todo-editId', null);
  const [editText, setEditText] = useLocalStorage('todo-editText', '');
  const toast = useToast();

  const addTodo = () => {
    if (!input.trim()) return;
    setTodos([...todos, { id: Date.now(), text: input.trim(), done: false }]);
    setInput('');
    toast.success('Task added');
  };

  const deleteTodo = (id) => { setTodos(todos.filter((t) => t.id !== id)); toast.error('Task deleted'); };
  const toggleDone = (id) => setTodos(todos.map((t) => t.id === id ? { ...t, done: !t.done } : t));
  const startEdit = (todo) => { setEditId(todo.id); setEditText(todo.text); };
  const saveEdit = (id) => {
    if (!editText.trim()) return;
    setTodos(todos.map((t) => t.id === id ? { ...t, text: editText.trim() } : t));
    setEditId(null); setEditText('');
    toast.success('Task updated');
  };

  const filtered = todos.filter((t) => filter === 'All' ? true : filter === 'Active' ? !t.done : t.done);

  return (
    <div className="page">
      <h1>TODO List <span className="todo-badge todo-badge-ls">LocalStorage</span></h1>
      <p className="todo-persist-note">Tasks persist after page refresh.</p>
      <div className="todo-input-row">
        <input type="text" placeholder="Enter a task..." value={input}
          onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && addTodo()}
          className="text-input" style={{ marginBottom: 0 }} />
        <button className="btn btn-primary" onClick={addTodo}>Add TODO</button>
      </div>
      <div className="todo-filters">
        {['All', 'Active', 'Completed'].map((f) => (
          <button key={f} className={`news-tab ${filter === f ? 'news-tab-active' : ''}`} onClick={() => setFilter(f)}>{f}</button>
        ))}
        <span className="todo-count">{todos.filter(t => !t.done).length} remaining</span>
      </div>
      <ul className="todo-list">
        {filtered.map((todo) => (
          <li key={todo.id} className="todo-item">
            {editId === todo.id ? (
              <>
                <input className="text-input todo-edit-input" value={editText}
                  onChange={(e) => setEditText(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && saveEdit(todo.id)} />
                <button className="btn btn-success" onClick={() => saveEdit(todo.id)}>Save</button>
                <button className="btn btn-danger" onClick={() => setEditId(null)}>Cancel</button>
              </>
            ) : (
              <>
                <input type="checkbox" checked={todo.done} onChange={() => toggleDone(todo.id)} className="todo-checkbox" />
                <span className={`todo-text ${todo.done ? 'todo-done' : ''}`}>{todo.text}</span>
                <button className="btn btn-warning" onClick={() => startEdit(todo)}>Edit</button>
                <button className="btn btn-danger" onClick={() => deleteTodo(todo.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
      {filtered.length === 0 && <p className="todo-empty">{filter === 'All' ? 'No tasks yet!' : `No ${filter.toLowerCase()} tasks.`}</p>}
    </div>
  );
}

export default TodoLocalStorage;
