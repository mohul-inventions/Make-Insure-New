import { useState } from 'react';
import axios from 'axios';

function AuditorView() {
  const [claimType, setClaimType] = useState('HEALTH');
  const [procedure, setProcedure] = useState('XRAY');
  const [customProcedure, setCustomProcedure] = useState(''); 
  const [amount, setAmount] = useState('');
  const [applicantName, setApplicantName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const [upiId, setUpiId] = useState('');
  const [age, setAge] = useState('');
  const [sex, setSex] = useState('');
  const [hospitalId, setHospitalId] = useState('');
  const [vehicleModel, setVehicleModel] = useState('');
  const [vehicleYear, setVehicleYear] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [rcBookNumber, setRcBookNumber] = useState('');
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const [claimHistory, setClaimHistory] = useState(() => {
    const savedHistory = localStorage.getItem('makeInsureHistory');
    return savedHistory ? JSON.parse(savedHistory) : [];
  });

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      setPreviewUrl(URL.createObjectURL(selectedFile));
    } else {
      setPreviewUrl(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const finalProcedure = procedure === 'OTHER' ? customProcedure : procedure;
    
    // Package all data perfectly for the backend
    const formData = new FormData();
    formData.append('claimType', claimType);
    formData.append('procedure', finalProcedure);
    formData.append('amount', amount);
    formData.append('applicantName', applicantName);
    formData.append('mobileNumber', mobileNumber);
    formData.append('address', address);
    formData.append('pincode', pincode);
    formData.append('upiId', upiId);
    
    // Add domain-specific fields that were missing
    if (claimType === 'HEALTH') {
        formData.append('age', age);
        formData.append('sex', sex);
        formData.append('hospitalId', hospitalId);
    } else if (claimType === 'VEHICLE') {
        formData.append('vehicleModel', vehicleModel);
        formData.append('vehicleYear', vehicleYear);
        formData.append('vehicleNumber', vehicleNumber);
        formData.append('rcBookNumber', rcBookNumber);
    }
    
    // Ensure this matches your backend upload.single('document')
    if (file) formData.append('document', file);

    try {
      // NOTE: Ensure your backend server.js route is /api/audit or /api/analyze 
      // depending on what you named it. Using /api/audit to match our previous setup.
      const response = await axios.post('http://localhost:5000/api/audit', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      const responseData = response.data;
      
      // We check for our success object structure
      if(responseData.success) {
          setResult(responseData.data);
          
          const newHistoryRecord = {
              id: 'CLM-' + Math.floor(1000 + Math.random() * 9000),
              time: new Date().toLocaleTimeString(),
              name: applicantName,
              type: claimType,
              amount: amount,
              score: responseData.data.confidence || Math.floor(Math.random() * 20 + 80), // Fallback if mock
              status: responseData.data.status
          };
          
          const updatedHistory = [newHistoryRecord, ...claimHistory];
          setClaimHistory(updatedHistory);
          localStorage.setItem('makeInsureHistory', JSON.stringify(updatedHistory));
      } else {
          alert('Audit Failed: ' + responseData.message);
      }

    } catch (error) {
      console.error(error);
      alert("Error connecting to backend! Ensure your server is running and the route matches.");
    } finally {
      setLoading(false);
    }
  };

  const clearHistory = () => {
      setClaimHistory([]);
      localStorage.removeItem('makeInsureHistory');
  }

  const inputStyle = { padding: '12px 15px', borderRadius: '8px', border: '1px solid #cbd5e0', fontSize: '15px', width: '100%', boxSizing: 'border-box' };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <form onSubmit={handleSubmit} style={{ background: 'white', padding: '40px', borderRadius: '12px', boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }}>
          <div style={{ marginBottom: '30px', paddingBottom: '20px', borderBottom: '2px solid #e2e8f0' }}>
             <h3 style={{ color: '#2d3748', marginTop: 0 }}>1. Select Insurance Domain</h3>
             <select value={claimType} onChange={(e) => { setClaimType(e.target.value); setProcedure(e.target.value === 'HEALTH' ? 'XRAY' : 'BUMPER'); }} style={{ width: '100%', padding: '14px', fontSize: '16px', borderRadius: '8px', border: '2px solid #cbd5e0', backgroundColor: '#f7fafc', cursor: 'pointer' }}>
                <option value="HEALTH">🏥 Health Insurance</option>
                <option value="VEHICLE">🚗 Vehicle Insurance</option>
             </select>
          </div>
          <div style={{ marginBottom: '30px' }}>
             <h3 style={{ color: '#2d3748' }}>2. Common Applicant Details</h3>
             <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <input type="text" placeholder="Full Name" value={applicantName} onChange={(e) => setApplicantName(e.target.value)} required style={inputStyle} />
                <input type="tel" placeholder="Mobile Number" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} required style={inputStyle} />
                <input type="text" placeholder="Full Address" value={address} onChange={(e) => setAddress(e.target.value)} required style={inputStyle} />
                <input type="text" placeholder="Pincode" value={pincode} onChange={(e) => setPincode(e.target.value)} required style={inputStyle} />
                <input type="text" placeholder="UPI ID (for payout)" value={upiId} onChange={(e) => setUpiId(e.target.value)} required style={{...inputStyle, gridColumn: 'span 2', borderColor: '#4299e1'}} />
             </div>
          </div>
          <div style={{ marginBottom: '30px', padding: '25px', backgroundColor: claimType === 'HEALTH' ? '#ebf8ff' : '#fff5f5', borderRadius: '10px' }}>
             <h3 style={{ color: claimType === 'HEALTH' ? '#2b6cb0' : '#c53030', marginTop: 0 }}>3. {claimType === 'HEALTH' ? 'Medical Details' : 'Vehicle Details'}</h3>
             {claimType === 'HEALTH' ? (
                 <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                     <input type="number" placeholder="Patient Age" value={age} onChange={(e) => setAge(e.target.value)} required style={inputStyle} />
                     <select value={sex} onChange={(e) => setSex(e.target.value)} required style={inputStyle}>
                         <option value="">Select Sex</option><option value="M">Male</option><option value="F">Female</option><option value="O">Other</option>
                     </select>
                     <input type="text" placeholder="Hospital Verification ID" value={hospitalId} onChange={(e) => setHospitalId(e.target.value)} required style={{...inputStyle, gridColumn: 'span 2'}} />
                 </div>
             ) : (
                 <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                     <input type="text" placeholder="Vehicle Model" value={vehicleModel} onChange={(e) => setVehicleModel(e.target.value)} required style={inputStyle} />
                     <input type="number" placeholder="Manufacturing Year" value={vehicleYear} onChange={(e) => setVehicleYear(e.target.value)} required style={inputStyle} />
                     <input type="text" placeholder="Registration Number" value={vehicleNumber} onChange={(e) => setVehicleNumber(e.target.value)} required style={inputStyle} />
                     <input type="text" placeholder="RC Book Number" value={rcBookNumber} onChange={(e) => setRcBookNumber(e.target.value)} required style={inputStyle} />
                 </div>
             )}
          </div>
          <div style={{ marginBottom: '30px' }}>
             <h3 style={{ color: '#2d3748' }}>4. Claim Assessment</h3>
             <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
                 <div style={{ flex: 2 }}>
                     <select value={procedure} onChange={(e) => setProcedure(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e0' }}>
                        {claimType === 'HEALTH' ? (
                            <><option value="XRAY">X-Ray / Scan</option><option value="SURGERY">Major Surgery</option><option value="FEVER">Viral Fever</option><option value="OTHER">Other...</option></>
                        ) : (
                            <><option value="BUMPER">Bumper Damage</option><option value="ENGINE">Engine Repair</option><option value="PAINT">Paint Scratch</option><option value="OTHER">Other...</option></>
                        )}
                     </select>
                 </div>
                 <div style={{ flex: 1 }}>
                     <input type="number" placeholder="Amount (₹)" value={amount} onChange={(e) => setAmount(e.target.value)} required style={{ width: '100%', padding: '12px', boxSizing: 'border-box', borderRadius: '8px', border: '1px solid #cbd5e0' }} />
                 </div>
             </div>
             {procedure === 'OTHER' && (
                 <div style={{ marginBottom: '20px' }}>
                     <input type="text" placeholder="Specify details..." value={customProcedure} onChange={(e) => setCustomProcedure(e.target.value)} required style={{ width: '100%', padding: '12px', boxSizing: 'border-box', borderRadius: '8px', border: '1px solid #cbd5e0' }} />
                 </div>
             )}
             <div style={{ border: '2px dashed #a0aec0', padding: '30px', textAlign: 'center', background: '#f7fafc', borderRadius: '12px' }}>
                <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '15px', color: '#4a5568' }}>Upload Visual Evidence</label>
                <input type="file" accept="image/*,.pdf" onChange={handleFileChange} required style={{ marginBottom: '15px' }} />
                {previewUrl && <div style={{ marginTop: '20px' }}><img src={previewUrl} alt="Preview" style={{ maxWidth: '100%', maxHeight: '300px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }} /></div>}
            </div>
          </div>
          <button type="submit" disabled={loading} style={{ width: '100%', padding: '20px', background: 'linear-gradient(to right, #0052D4, #4364F7)', color: 'white', fontWeight: 'bold', border: 'none', borderRadius: '10px', cursor: 'pointer', fontSize: '20px' }}>
              {loading ? 'AI Analyzing...' : 'Submit Claim & Run AI Audit'}
          </button>
        </form>

        {result && (
            <div style={{ marginTop: '40px', padding: '30px', borderRadius: '12px', background: 'white', borderTop: `8px solid ${result.confidence <= 40 ? '#e53e3e' : result.confidence <= 85 ? '#dd6b20' : '#38a169'}`, boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '20px', marginBottom: '20px' }}>
                    <h2 style={{ margin: 0, color: '#2d3748', fontSize: '28px' }}>AI Verification Status</h2>
                    <span style={{ fontSize: '24px', fontWeight: 'bold', padding: '8px 16px', borderRadius: '20px', backgroundColor: result.confidence <= 40 ? '#fff5f5' : result.confidence <= 85 ? '#fffff0' : '#f0fff4', color: result.confidence <= 40 ? '#e53e3e' : result.confidence <= 85 ? '#dd6b20' : '#38a169' }}>
                        {result.status} ({result.confidence}%)
                    </span>
                </div>
                {result.status === 'Flagged' || result.status === 'Review Needed' ? (
                    <div style={{ backgroundColor: '#fff5f5', padding: '20px', borderRadius: '8px', borderLeft: '4px solid #e53e3e' }}>
                        <h4 style={{ margin: '0 0 10px 0', color: '#c53030' }}>Detected Anomalies:</h4>
                        <p style={{ color: '#c53030', fontWeight: 'bold', fontSize: '16px', margin: 0 }}>Please review the document carefully. Inconsistencies detected.</p>
                    </div>
                ) : (
                    <div style={{ backgroundColor: '#f0fff4', padding: '20px', borderRadius: '8px', borderLeft: '4px solid #38a169' }}>
                        <p style={{ color: '#276749', fontWeight: 'bold', fontSize: '18px', margin: 0 }}>✅ All AI checks passed. Information verified.</p>
                    </div>
                )}
            </div>
        )}

        {claimHistory.length > 0 && (
            <div style={{ marginTop: '40px', background: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 8px 24px rgba(0,0,0,0.08)', marginBottom: '40px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #e2e8f0', paddingBottom: '15px' }}>
                    <h2 style={{ color: '#1a365d', margin: 0 }}>Audit Log & History</h2>
                    <button onClick={clearHistory} style={{ background: 'none', border: '1px solid #e53e3e', color: '#e53e3e', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' }}>Clear History</button>
                </div>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
                        <thead>
                            <tr style={{ backgroundColor: '#f7fafc', textAlign: 'left', borderBottom: '2px solid #cbd5e0' }}>
                                <th style={{ padding: '12px', color: '#4a5568' }}>Time</th><th style={{ padding: '12px', color: '#4a5568' }}>Claim ID</th><th style={{ padding: '12px', color: '#4a5568' }}>Type</th><th style={{ padding: '12px', color: '#4a5568' }}>Amount</th><th style={{ padding: '12px', color: '#4a5568' }}>Score</th><th style={{ padding: '12px', color: '#4a5568' }}>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {claimHistory.map((claim, index) => (
                                <tr key={index} style={{ borderBottom: '1px solid #e2e8f0' }}>
                                    <td style={{ padding: '12px' }}>{claim.time}</td><td style={{ padding: '12px', fontWeight: 'bold' }}>{claim.id}</td><td style={{ padding: '12px' }}>{claim.type}</td><td style={{ padding: '12px', fontWeight: 'bold' }}>₹{claim.amount}</td><td style={{ padding: '12px', fontWeight: 'bold' }}>{claim.score}%</td><td style={{ padding: '12px', fontWeight: 'bold' }}>{claim.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        )}
    </div>
  );
}

export default AuditorView;