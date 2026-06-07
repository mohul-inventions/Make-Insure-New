import { useState } from 'react';

export default function ProfileView() {
    // We use State to track which setting panel is currently open
    const [activeSetting, setActiveSetting] = useState(null);

    // This function decides what to show based on what you clicked
    const renderSettingContent = () => {
        switch(activeSetting) {
            case 'security':
                return (
                    <div style={{ padding: '20px', background: '#f8fafc', borderRadius: '8px', marginTop: '15px', borderLeft: '4px solid #3182ce', animation: 'fadeIn 0.3s ease' }}>
                        <h4 style={{ margin: '0 0 10px 0', color: '#2d3748', fontSize: '18px' }}>Security & Privacy</h4>
                        <p style={{ margin: '0 0 15px 0', fontSize: '14px', color: '#4a5568' }}>Manage your account security, passwords, and two-factor authentication.</p>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <button style={{ background: '#e2e8f0', color: '#4a5568', border: 'none', padding: '10px 15px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>Change Password</button>
                            <button style={{ background: '#3182ce', color: 'white', border: 'none', padding: '10px 15px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>Enable 2FA Auth</button>
                        </div>
                    </div>
                );
            case 'payment':
                return (
                    <div style={{ padding: '20px', background: '#f0fff4', borderRadius: '8px', marginTop: '15px', borderLeft: '4px solid #38a169', animation: 'fadeIn 0.3s ease' }}>
                        <h4 style={{ margin: '0 0 10px 0', color: '#2d3748', fontSize: '18px' }}>Payment Methods</h4>
                        <p style={{ margin: '0 0 15px 0', fontSize: '14px', color: '#276749' }}><strong>Primary UPI:</strong> mohul@ybl ✅ (Verified)</p>
                        <button style={{ background: '#38a169', color: 'white', border: 'none', padding: '10px 15px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>+ Add New UPI / Card</button>
                    </div>
                );
            case 'vault':
                return (
                    <div style={{ padding: '20px', background: '#fffff0', borderRadius: '8px', marginTop: '15px', borderLeft: '4px solid #d69e2e', animation: 'fadeIn 0.3s ease' }}>
                        <h4 style={{ margin: '0 0 10px 0', color: '#2d3748', fontSize: '18px' }}>Insurance Document Vault</h4>
                        <ul style={{ margin: '0 0 15px 0', paddingLeft: '20px', color: '#744210', fontSize: '14px', lineHeight: '1.8' }}>
                            <li>📄 <strong>Student_Health_Policy_2026.pdf</strong> (Active)</li>
                            <li>📄 <strong>Vehicle_RC_Book_Verified.pdf</strong> (Uploaded)</li>
                        </ul>
                        <button style={{ background: '#d69e2e', color: 'white', border: 'none', padding: '10px 15px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>Upload New Document</button>
                    </div>
                );
            default:
                return null;
        }
    };

    // A reusable style for the list items to make the code cleaner
    const listItemStyle = {
        cursor: 'pointer',
        padding: '10px 15px',
        borderRadius: '8px',
        transition: 'background 0.2s',
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
    };

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', background: 'white', padding: '40px', borderRadius: '12px', boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }}>
            <h2 style={{ color: '#1a365d', borderBottom: '2px solid #e2e8f0', paddingBottom: '15px', marginTop: 0 }}>User Profile</h2>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '30px', marginTop: '30px' }}>
                <div style={{ width: '120px', height: '120px', borderRadius: '50%', background: 'linear-gradient(135deg, #0052D4, #4364F7)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '48px', fontWeight: 'bold', boxShadow: '0 4px 14px rgba(0, 82, 212, 0.4)' }}>
                    M
                </div>
                <div>
                    <h1 style={{ margin: '0 0 5px 0', color: '#2d3748', fontSize: '32px' }}>Mohul</h1>
                    <p style={{ margin: '0 0 8px 0', color: '#718096', fontSize: '18px' }}>🎓 Student at AVV Nagercoil</p>
                    <span style={{ background: '#e6fffa', color: '#234e52', padding: '5px 12px', borderRadius: '20px', fontWeight: 'bold', fontSize: '14px', border: '1px solid #319795' }}>
                        Premium Verified User ✅
                    </span>
                </div>
            </div>

            <div style={{ marginTop: '50px' }}>
                <h3 style={{ color: '#4a5568', marginBottom: '20px' }}>Account Settings</h3>
                
                {/* Clickable List Items */}
                <ul style={{ listStyle: 'none', padding: 0, color: '#2b6cb0', fontWeight: 'bold', fontSize: '16px', margin: 0 }}>
                    <li 
                        onClick={() => setActiveSetting(activeSetting === 'security' ? null : 'security')}
                        style={{ ...listItemStyle, backgroundColor: activeSetting === 'security' ? '#ebf8ff' : 'transparent' }}
                    >
                        ⚙️ Security & Privacy
                    </li>
                    <li 
                        onClick={() => setActiveSetting(activeSetting === 'payment' ? null : 'payment')}
                        style={{ ...listItemStyle, backgroundColor: activeSetting === 'payment' ? '#ebf8ff' : 'transparent' }}
                    >
                        💳 Payment Methods (UPI Linked)
                    </li>
                    <li 
                        onClick={() => setActiveSetting(activeSetting === 'vault' ? null : 'vault')}
                        style={{ ...listItemStyle, backgroundColor: activeSetting === 'vault' ? '#ebf8ff' : 'transparent' }}
                    >
                        📜 Insurance Document Vault
                    </li>
                </ul>

                {/* This renders the popup panel right below the list */}
                {renderSettingContent()}
                
            </div>
        </div>
    );
}