import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
/* eslint-disable */

export const Dashboard = () => {
  const navigate = useNavigate();
  const modalRef = useRef(null);

  const [transactions, setTransactions] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('prototype-expenses-v1') || '[]');
    } catch (err) {
      return [];
    }
  });

  const [formData, setFormData] = useState({
    type: 'expense',
    amount: '',
    description: '',
    category: 'Food',
    date: new Date().toISOString().slice(0, 10)
  });

  useEffect(() => {
    localStorage.setItem('prototype-expenses-v1', JSON.stringify(transactions));
  }, [transactions]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  const now = new Date();
  const monthLabel = now.toLocaleDateString('en-NG', { month: 'long', year: 'numeric' }).toUpperCase();
  
  const monthItems = transactions.filter(t => {
    const d = new Date(t.date + 'T12:00:00');
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  });

  const income = monthItems.filter(t => t.type === 'income').reduce((a, t) => a + t.amount, 0);
  const spent = monthItems.filter(t => t.type === 'expense').reduce((a, t) => a + t.amount, 0);
  const balance = transactions.reduce((a, t) => a + (t.type === 'income' ? t.amount : -t.amount), 0);

  const money = amount => new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 2 }).format(amount);
  const colors = ['#a8d85d', '#f1b86a', '#77c9bc', '#9d91d8', '#e58d81', '#8db8e5'];
  const icons = { Food: '⌁', Transport: '↗', Shopping: '♧', Bills: '▤', Health: '✚', Entertainment: '★', Salary: '✦', Other: '○' };

  const groups = {};
  monthItems.filter(t => t.type === 'expense').forEach(t => { groups[t.category] = (groups[t.category] || 0) + t.amount; });
  const sortedCategories = Object.entries(groups).sort((a, b) => b[1] - a[1]);

  let pos = 0;
  const conicGradientStyle = sortedCategories.length
    ? `conic-gradient(${sortedCategories.map(([_, v], i) => {
        const end = pos + (v / spent) * 100;
        const segment = `${colors[i % colors.length]} ${pos}% ${end}%`;
        pos = end;
        return segment;
      }).join(',')})`
    : 'conic-gradient(#e7e4dc 0 100%)';

  const handleSubmit = (e) => {
    e.preventDefault();
    const entry = {
      id: Date.now(),
      type: formData.type,
      amount: Number(formData.amount),
      description: formData.description.trim(),
      category: formData.category,
      date: formData.date
    };
    setTransactions([entry, ...transactions]);
    modalRef.current.close();
    setFormData({ type: 'expense', amount: '', description: '', category: 'Food', date: new Date().toISOString().slice(0, 10) });
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen max-w-[1180px] mx-auto bg-themeBg text-themeInk font-sans">
      <aside className="w-full md:w-[220px] md:shrink-0 p-7 flex flex-col gap-8 border-b md:border-b-0 md:border-r border-themeLine">
        <div className="flex items-center gap-2.5 font-bold tracking-tight text-xl">
          <div className="w-7 h-7 bg-themeAccent text-white rounded-lg grid place-items-center font-serif text-sm">P</div>
          <span>Prototype</span>
        </div>
        <nav className="flex flex-col gap-1">
          <span className="flex items-center gap-2.5 py-2.5 px-3 rounded-lg bg-themeAccentSoft font-medium text-[0.92rem]">▦ Dashboard</span>
          <button onClick={handleLogout} className="w-full text-left flex items-center gap-2.5 py-2.5 px-3 rounded-lg text-themeInkSoft hover:bg-rose-50 hover:text-themeNegative transition duration-150 text-[0.92rem]">
            <span className="text-rose-500 font-bold">⎋</span> Logout
          </button>
        </nav>
      </aside>

      <main className="flex-1 min-w-0 p-7">
        <header className="flex justify-between items-end gap-4 mb-6 flex-wrap">
          <div>
            <div className="text-themeInkSoft text-[0.76rem] font-bold tracking-widest uppercase mb-1.5">{monthLabel}</div>
            <h1 className="text-3xl font-bold font-serif leading-tight">Your Workspace</h1>
          </div>
          <button onClick={() => modalRef.current.showModal()} className="bg-themeAccent text-white py-2.5 px-4.5 rounded-lg text-[0.92rem] font-semibold shadow-sm hover:opacity-95 transition">+ Add transaction</button>
        </header>

        <div className="bg-themeAccent text-white rounded-2xl p-7 flex justify-between items-center mb-6 shadow-sm">
          <div>
            <p className="text-[0.78rem] tracking-wider uppercase opacity-80 mb-1.5">Available Balance</p>
            <h2 className="text-4xl font-bold font-serif">{money(balance)}</h2>
          </div>
        </div>

        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <article className="bg-themePanel border border-themeLine rounded-xl p-4.5 shadow-sm">
            <p className="text-themeInkSoft text-[0.82rem] mb-2">Income</p>
            <strong className="block text-[1.28rem] font-bold font-serif text-themePositive">{money(income)}</strong>
          </article>
          <article className="bg-themePanel border border-themeLine rounded-xl p-4.5 shadow-sm">
            <p className="text-themeInkSoft text-[0.82rem] mb-2">Spent</p>
            <strong className="block text-[1.28rem] font-bold font-serif text-themeNegative">{money(spent)}</strong>
          </article>
          <article className="bg-themePanel border border-themeLine rounded-xl p-4.5 shadow-sm">
            <p className="text-themeInkSoft text-[0.82rem] mb-2">Transactions</p>
            <strong className="block text-[1.28rem] font-bold font-serif">{monthItems.length}</strong>
          </article>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-4 items-start">
          <div className="bg-themePanel border border-themeLine rounded-2xl p-5 shadow-sm">
            <h3 className="text-[1.05rem] font-bold font-serif mb-4">Recent Ledger</h3>
            <div className="flex flex-col gap-1">
              {transactions.length === 0 ? (
                <p className="text-center text-sm py-4 text-themeInkSoft">No records logged yet.</p>
              ) : (
                transactions.slice(0, 6).map(t => (
                  <div key={t.id} className="flex items-center justify-between py-2.5 border-b border-themeLine last:border-b-0">
                    <span className="text-sm font-semibold text-themeInk">{t.description}</span>
                    <span className={`font-semibold text-[0.92rem] ${t.type === 'income' ? 'text-themePositive' : 'text-themeNegative'}`}>{money(t.amount)}</span>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="bg-themePanel border border-themeLine rounded-2xl p-5 shadow-sm">
            <h3 className="text-[1.05rem] font-bold font-serif mb-4">Breakdown</h3>
            <div className="flex justify-center mb-4">
              <div className="w-[150px] h-[150px] rounded-full grid place-items-center shadow-inner" style={{ background: conicGradientStyle }}>
                <div className="w-24 h-24 rounded-full bg-themePanel grid place-items-center"><span className="text-xs text-themeInkSoft">Active</span></div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <dialog ref={modalRef} className="border-none rounded-2xl p-0 bg-themePanel text-themeInk w-[min(420px,92vw)] shadow-2xl backdrop:bg-stone-900/45 outline-none">
        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-3.5">
          <div className="flex justify-between items-center mb-1">
            <h2 className="text-[1.3rem] font-bold font-serif">New Record</h2>
            <button type="button" onClick={() => modalRef.current.close()} className="text-xl">×</button>
          </div>
          <label className="flex flex-col text-xs font-semibold text-themeInkSoft uppercase">Type
            <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} className="bg-themeBg border border-themeLine rounded-lg py-2 px-3 mt-1"><option value="expense">Expense</option><option value="income">Income</option></select>
          </label>
          <label className="flex flex-col text-xs font-semibold text-themeInkSoft uppercase">Amount
            <input type="number" required value={formData.amount} onChange={e => setFormData({...formData, amount: e.target.value})} className="bg-themeBg border border-themeLine rounded-lg py-2 px-3 mt-1" />
          </label>
          <label className="flex flex-col text-xs font-semibold text-themeInkSoft uppercase">Description
            <input type="text" required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="bg-themeBg border border-themeLine rounded-lg py-2 px-3 mt-1" />
          </label>
          <button type="submit" className="bg-themeAccent text-white py-3 rounded-lg font-semibold w-full mt-2">Save</button>
        </form>
      </dialog>
    </div>
  );
};
