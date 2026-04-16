import { useState, useEffect } from 'react';
import { useToast } from '../context/ToastContext';

const CITIES = ['---Select City---', 'Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Mumbai', 'Delhi'];
const HOBBIES = ['Reading', 'Dancing', 'Singing'];
const emptyForm = { name: '', mobile: '', gender: '', hobbies: [], city: '' };

function UserForm() {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [records, setRecords] = useState(() => JSON.parse(localStorage.getItem('userRecords') || '[]'));
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState('');
  const toast = useToast();

  useEffect(() => { localStorage.setItem('userRecords', JSON.stringify(records)); }, [records]);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required.';
    if (!/^\d{10}$/.test(form.mobile)) e.mobile = 'Enter a valid 10-digit mobile number.';
    if (!form.gender) e.gender = 'Please select a gender.';
    if (form.hobbies.length === 0) e.hobbies = 'Select at least one hobby.';
    if (!form.city || form.city === '---Select City---') e.city = 'Please select a city.';
    return e;
  };

  const handleHobby = (hobby) => setForm((f) => ({
    ...f, hobbies: f.hobbies.includes(hobby) ? f.hobbies.filter((h) => h !== hobby) : [...f.hobbies, hobby],
  }));

  const handleSubmit = () => {
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) { toast.error('Please fix the errors'); return; }
    if (editId !== null) {
      setRecords(records.map((r) => r.id === editId ? { ...form, id: editId } : r));
      setEditId(null); toast.success('Record updated');
    } else {
      setRecords([...records, { ...form, id: Date.now() }]);
      toast.success('Record added');
    }
    setForm(emptyForm); setErrors({});
  };

  const handleEdit = (record) => {
    setForm({ name: record.name, mobile: record.mobile, gender: record.gender, hobbies: record.hobbies, city: record.city });
    setEditId(record.id); setErrors({});
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id) => { setRecords(records.filter((r) => r.id !== id)); toast.error('Record deleted'); };
  const handleCancel = () => { setForm(emptyForm); setEditId(null); setErrors({}); };

  const filtered = records.filter((r) =>
    r.name.toLowerCase().includes(search.toLowerCase()) ||
    r.city.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="page">
      <h1>{editId ? 'Edit Record' : 'User Registration Form'}</h1>
      <div className="form-box">
        <div className="form-row"><label>Enter Name:</label>
          <input type="text" className="text-input form-input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Full name" />
        </div>
        {errors.name && <p className="form-error">{errors.name}</p>}
        <div className="form-row"><label>Enter Mobile No:</label>
          <input type="text" className="text-input form-input" value={form.mobile} onChange={(e) => setForm({ ...form, mobile: e.target.value })} placeholder="10-digit number" maxLength={10} />
        </div>
        {errors.mobile && <p className="form-error">{errors.mobile}</p>}
        <div className="form-row"><label>Gender:</label>
          <div className="radio-group">{['Male', 'Female'].map((g) => (
            <label key={g} className="radio-label"><input type="radio" name="gender" value={g} checked={form.gender === g} onChange={(e) => setForm({ ...form, gender: e.target.value })} /> {g}</label>
          ))}</div>
        </div>
        {errors.gender && <p className="form-error">{errors.gender}</p>}
        <div className="form-row"><label>Hobby:</label>
          <div className="radio-group">{HOBBIES.map((h) => (
            <label key={h} className="radio-label"><input type="checkbox" checked={form.hobbies.includes(h)} onChange={() => handleHobby(h)} /> {h}</label>
          ))}</div>
        </div>
        {errors.hobbies && <p className="form-error">{errors.hobbies}</p>}
        <div className="form-row"><label>City:</label>
          <select className="calc-select" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })}>
            {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        {errors.city && <p className="form-error">{errors.city}</p>}
        <div className="btn-group" style={{ marginTop: '20px' }}>
          <button className="btn btn-primary" onClick={handleSubmit}>{editId ? 'Update Data' : 'Submit Data'}</button>
          {editId && <button className="btn btn-danger" onClick={handleCancel}>Cancel</button>}
        </div>
      </div>

      {records.length > 0 && (
        <div className="table-wrapper">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <h2 style={{ margin: 0 }}>Submitted Records ({filtered.length})</h2>
            <input type="text" placeholder="Search by name or city..." value={search}
              onChange={(e) => setSearch(e.target.value)} className="text-input" style={{ width: '240px', marginBottom: 0 }} />
          </div>
          <table className="data-table">
            <thead><tr><th>#</th><th>Name</th><th>Mobile</th><th>Gender</th><th>Hobbies</th><th>City</th><th>Actions</th></tr></thead>
            <tbody>
              {filtered.map((r, i) => (
                <tr key={r.id}>
                  <td>{i + 1}</td><td>{r.name}</td><td>{r.mobile}</td><td>{r.gender}</td>
                  <td>{r.hobbies.join(', ')}</td><td>{r.city}</td>
                  <td>
                    <button className="btn btn-warning" style={{ marginRight: '6px' }} onClick={() => handleEdit(r)}>Edit</button>
                    <button className="btn btn-danger" onClick={() => handleDelete(r.id)}>Delete</button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && <tr><td colSpan="7" style={{ textAlign: 'center', color: '#aaa' }}>No matching records</td></tr>}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default UserForm;
