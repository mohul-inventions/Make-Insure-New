import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import DashboardView from './views/Dashboard/DashboardView';
import AuditorView from './views/Auditor/AuditorView';
import OffersView from './views/Offers/OffersView';
import ProfileView from './views/Profile/ProfileView'; // <-- Added Profile!

function Navigation() {
  const location = useLocation(); // Gets current URL to highlight active tab
  
  const getLinkStyle = (path) => ({
      textDecoration: 'none',
      fontWeight: 'bold',
      fontSize: '16px',
      padding: '8px 12px',
      borderRadius: '8px',
      color: location.pathname === path ? '#3182ce' : '#4a5568',
      backgroundColor: location.pathname === path ? '#ebf8ff' : 'transparent',
      transition: 'all 0.2s'
  });

  return (
    <nav style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
        <Link to="/" style={getLinkStyle('/')}>Dashboard</Link>
        <Link to="/audit" style={getLinkStyle('/audit')}>AI Auditor</Link>
        <Link to="/offers" style={getLinkStyle('/offers')}>Offers</Link>
        <Link to="/profile" style={getLinkStyle('/profile')}>Profile (Mohul)</Link>
    </nav>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div style={{ backgroundColor: '#f0f4f8', minHeight: '100vh', fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
        
        <header style={{ backgroundColor: 'white', padding: '15px 40px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 100 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <img src="/logo.jpeg" alt="Make Insure Logo" style={{ height: '45px', borderRadius: '8px' }} />
              <h1 style={{ color: '#1a365d', fontSize: '26px', margin: 0, letterSpacing: '-0.5px' }}>Make Insure</h1>
          </div>
          <Navigation />
        </header>

        <div style={{ padding: '40px 20px', paddingBottom: '100px' }}>
            <Routes>
                <Route path="/" element={<DashboardView />} />
                <Route path="/audit" element={<AuditorView />} />
                <Route path="/offers" element={<OffersView />} />
                <Route path="/profile" element={<ProfileView />} />
            </Routes>
        </div>

      </div>
    </BrowserRouter>
  );
}

export default App;