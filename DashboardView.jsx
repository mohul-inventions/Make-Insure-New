import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function DashboardView() {
    const [stats, setStats] = useState({ total: 0, fraud: 0, pending: 0 });

    useEffect(() => {
        // Read the history from LocalStorage to make the dashboard dynamic!
        const history = JSON.parse(localStorage.getItem('makeInsureHistory')) || [];
        const fraudCount = history.filter(h => h.score >= 90).length;
        const pendingCount = history.filter(h => h.score >= 40 && h.score < 90).length;
        
        setStats({ total: history.length, fraud: fraudCount, pending: pendingCount });
    }, []);

    const cardStyle = { background: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', flex: 1, textAlign: 'center' };

    return (
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h1 style={{ color: '#1a365d', fontSize: '36px', marginBottom: '10px' }}>Welcome back, Mohul! 👋</h1>
            <p style={{ color: '#718096', fontSize: '18px', marginBottom: '40px' }}>Here is your Make Insure system overview.</p>

            <div style={{ display: 'flex', gap: '20px', marginBottom: '40px' }}>
                <div style={{ ...cardStyle, borderTop: '5px solid #3182ce' }}>
                    <h3 style={{ color: '#4a5568', margin: '0 0 10px 0' }}>Total Claims Audited</h3>
                    <p style={{ fontSize: '48px', fontWeight: 'bold', margin: 0, color: '#2b6cb0' }}>{stats.total}</p>
                </div>
                <div style={{ ...cardStyle, borderTop: '5px solid #e53e3e' }}>
                    <h3 style={{ color: '#4a5568', margin: '0 0 10px 0' }}>Fraud Prevented</h3>
                    <p style={{ fontSize: '48px', fontWeight: 'bold', margin: 0, color: '#c53030' }}>{stats.fraud}</p>
                </div>
                <div style={{ ...cardStyle, borderTop: '5px solid #dd6b20' }}>
                    <h3 style={{ color: '#4a5568', margin: '0 0 10px 0' }}>Pending Manual Audit</h3>
                    <p style={{ fontSize: '48px', fontWeight: 'bold', margin: 0, color: '#c05621' }}>{stats.pending}</p>
                </div>
            </div>

            <div style={{ textAlign: 'center', padding: '40px', background: 'linear-gradient(to right, #ebf4ff, #e6fffa)', borderRadius: '12px' }}>
                <h2 style={{ color: '#2d3748', margin: '0 0 20px 0' }}>Ready to run a new audit?</h2>
                <Link to="/audit" style={{ textDecoration: 'none', background: '#3182ce', color: 'white', padding: '15px 30px', borderRadius: '8px', fontWeight: 'bold', fontSize: '18px', display: 'inline-block' }}>
                    Launch AI Auditor 🚀
                </Link>
            </div>
        </div>
    );
}