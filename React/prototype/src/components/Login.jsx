import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
/* eslint-disable */

export const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/dashboard');
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Could not connect to the server.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-themeBg p-6">
      <div className="bg-themePanel border border-themeLine p-8 rounded-2xl shadow-xl max-w-md w-full">
        <h2 className="text-3xl font-bold font-serif text-themeInk mb-2 text-center">Welcome Back</h2>
        <p className="text-themeInkSoft text-sm text-center mb-6">Log in to view your money at a glance.</p>

        {error && <div className="bg-rose-50 border border-rose-200 text-themeNegative p-3 rounded-lg text-sm mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="text-xs font-semibold text-themeInkSoft uppercase flex flex-col gap-1">
            Email Address
            <input type="email" required placeholder="name@example.com" className="bg-themeBg border border-themeLine rounded-lg py-2.5 px-3 text-themeInk font-sans outline-none focus:border-themeAccent" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
          </label>
          <label className="text-xs font-semibold text-themeInkSoft uppercase flex flex-col gap-1">
            Password
            <input type="password" required placeholder="••••••••" className="bg-themeBg border border-themeLine rounded-lg py-2.5 px-3 text-themeInk font-sans outline-none focus:border-themeAccent" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />
          </label>
          <button type="submit" className=" bg-[#FF6B4A] text-white py-3 rounded-xl font-bold mt-2 shadow-md hover:bg-[#E85A3A] text-sm font-medium opacity-90 transition">Log In</button>
        </form>
        <p className="text-sm text-themeInkSoft text-center mt-6">Don't have an account? <Link to="/register" className="text-themeAccent font-semibold underline">Sign up</Link></p>
      </div>
    </div>
  );
};
