import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Nav } from './components/Nav';
import HeroSection from './components/Hero';
import Section2 from './components/2ndSection';
import { Section3 } from './components/3rdSection';
import { Section4 } from './components/4thSection';
import { Trust } from './components/5thSection';
import { Waitlist } from './components/6thSection';
import { Dashboard } from './components/Dashboard';
import { Login } from './components/Login';
import { Register } from './components/Register';

const LandingPage = () => (
  <div className="min-h-screen bg-white">
    <Nav />
    <HeroSection />
    <Section2 />
    <Section3 />
    <Section4 />
    <Trust />
    <Waitlist />
  </div>
);

const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem('user'); 
  return user ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
