import { useState } from 'react';
import { Link } from 'react-router-dom';
/* eslint-disable */

export const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [msg, setMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg('');
    try {
      const res = await fetch('https://spendsense-4elh.onrender.com/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      setMsg(data.message || data.error);
    } catch (err) {
      setMsg('Can cannot connect to the server interface gateway.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-100 p-6 font-sans">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full border border-stone-200">
        <h2 className="text-2xl font-bold font-serif text-stone-900 mb-4 text-center">Create Account</h2>
        {msg && <p className="mb-4 text-sm text-center font-bold text-orange-600">{msg}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input type="text" placeholder="Name" required className="border p-3 rounded-xl bg-stone-50" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
          <input type="email" placeholder="Email" required className="border p-3 rounded-xl bg-stone-50" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
          <input type="password" placeholder="Password" required className="border p-3 rounded-xl bg-stone-50" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />
          <button type="submit" className="bg-[#FF6B4A] text-white py-3 rounded-xl font-bold hover:opacity-90 transition">Sign Up</button>
        </form>
        <p className="text-sm text-themeInkSoft text-center mt-6">Already have an account? <Link to="/login" className="text-themeAccent font-semibold underline">Log in</Link></p>
      </div>
    </div>
  );
};
