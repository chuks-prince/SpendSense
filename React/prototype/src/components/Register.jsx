import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
/* eslint-disable */

export const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (res.ok) {
        setSuccess('Account created successfully! Redirecting...');
        localStorage.setItem('user', JSON.stringify({ email: formData.email, name: formData.name }));
        setTimeout(() => navigate('/dashboard'), 1500);
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
        <h2 className="text-3xl font-bold font-serif text-themeInk mb-2 text-center">Create an Account</h2>
        <p className="text-themeInkSoft text-sm text-center mb-6">Start managing your system today.</p>
        
        {error && <div className="bg-rose-50 border border-rose-200 text-themeNegative p-3 rounded-lg text-sm mb-4">{error}</div>}
        {success && <div className="bg-emerald-50 border border-emerald-200 text-themePositive p-3 rounded-lg text-sm mb-4">{success}</div>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="text-xs font-semibold text-themeInkSoft uppercase flex flex-col gap-1">
            Full Name
            <input type="text" required placeholder="John Doe" className="bg-themeBg border border-themeLine rounded-lg py-2.5 px-3 text-themeInk font-sans outline-none focus:border-themeAccent" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
          </label>
          <label className="text-xs font-semibold text-themeInkSoft uppercase flex flex-col gap-1">
            Email Address
            <input type="email" required placeholder="name@example.com" className="bg-themeBg border border-themeLine rounded-lg py-2.5 px-3 text-themeInk font-sans outline-none focus:border-themeAccent" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
          </label>
          <label className="text-xs font-semibold text-themeInkSoft uppercase flex flex-col gap-1">
            Password
            <input type="password" required placeholder="••••••••" className="bg-themeBg border border-themeLine rounded-lg py-2.5 px-3 text-themeInk font-sans outline-none focus:border-themeAccent" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />
          </label>
          <button type="submit" className="bg-[#FF6B4A] text-white py-3 rounded-xl font-bold mt-2 shadow-md hover:bg-[#E85A3A] text-sm font-mediumopacity-90 transition">Sign Up</button>
        </form>
        <p className="text-sm text-themeInkSoft text-center mt-6">Already have an account? <Link to="/login" className="text-themeAccent font-semibold underline">Log in</Link></p>
      </div>
    </div>
  );
};
