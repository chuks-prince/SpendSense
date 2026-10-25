import { Link } from 'react-router-dom';
import Logo1 from '../assets/images/Logo1.svg'

export const Nav = () => {
  return (
    <nav className="bg-white inset-0 z-30 sticky top-0 left-0 right-0 h-12 flex items-center justify-around border-b border-slate-100">
      <div className="text-black text-2xl font-bold flex gap-4 items-center">
        <svg 
          className="size-7 md:hidden" 
          xmlns="http://w3.org" 
          fill="none" 
          viewBox="0 0 24 24" 
          strokeWidth="1.5" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" 
          />
        </svg>
        <Link to="/" className="flex flex-row items-center gap-2 focus:outline-none focus:ring-0 group">
            <img src={Logo1} alt="Logo" className="pt-5 w-40 h-40 -mr-15 object-contain transition-transform group-hover:scale-105"/>
            <span className="font-serif text-xl tracking-tight font-bold whitespace-nowrap bg-gradient-to-r from-stone-900 to-[#FF6B4A] bg-clip-text text-transparent">
            SpendSense
            </span>
        </Link>
      </div>
      
      <div className="hidden md:flex gap-10">
        <Link className="hover:text-[#E85A3A] font-medium text-stone-600 text-sm" to="/">Home</Link>
        <a className="hover:text-[#E85A3A] font-medium text-stone-600 text-sm" href="#features">About</a>
        <a className="hover:text-[#E85A3A] font-medium text-stone-600 text-sm" href="#waitlist-section">Contact</a>
      </div>
      
      <div className="flex gap-4">
        <Link className="w-20 text-center border border-slate-200 py-0.5 rounded-full text-white bg-[#FF6B4A] hover:bg-[#E85A3A] text-sm font-medium transition" to="/login">
          Login
        </Link>
        <Link className="w-20 text-center border border-slate-200 py-0.5 rounded-full text-white bg-[#FF6B4A] hover:bg-[#E85A3A] text-sm font-medium transition" to="/register">
          Register
        </Link>
      </div>
    </nav>
  );
};
