import { useState } from 'react';

// Added specific 'details' for every single offer!
const offersData = [
    { id: 1, type: 'Health', title: 'Student Health Plus', desc: 'Full coverage for viral fevers, minor injuries, and exams stress checkups.', price: '₹499/mo', details: ['Zero deductible', 'Free tele-consultations', 'Cashless at 50+ network hospitals'] },
    { id: 2, type: 'Vehicle', title: 'Campus Two-Wheeler', desc: 'Bumper-to-bumper coverage for scooters and bikes parked on campus.', price: '₹199/mo', details: ['Theft protection', 'Third-party liability', 'Instant roadside assistance'] },
    { id: 3, type: 'Tech', title: 'Laptop Screen Protect', desc: 'Instant replacement for cracked screens during hackathons.', price: '₹99/mo', details: ['Accidental drop cover', 'Liquid damage repair', '72-hour guaranteed fix'] },
    { id: 4, type: 'Health', title: 'Family Guardian Plan', desc: 'Comprehensive major surgery cover for up to 4 family members.', price: '₹1299/mo', details: ['Pre/Post hospitalization', 'Maternity benefit', 'Annual full-body checkup'] },
    { id: 5, type: 'Vehicle', title: 'Premium Car Shield', desc: 'Complete engine and paint scratch protection for 4-wheelers.', price: '₹899/mo', details: ['Zero depreciation', 'Engine protect cover', 'Consumables covered'] },
    { id: 6, type: 'Travel', title: 'Hackathon Travel Safe', desc: 'Flight cancellation and baggage loss cover for student events.', price: '₹49/trip', details: ['Trip delay reimbursement', 'Lost laptop coverage', 'Emergency medical evacuation'] },
    { id: 7, type: 'Health', title: 'Dental & Vision Base', desc: 'Free annual dental cleanings and eye-wear allowances.', price: '₹299/mo', details: ['Free scaling & polishing', 'Up to ₹2000 for frames', 'Root canal discounts'] },
    { id: 8, type: 'Vehicle', title: 'EV Battery Protect', desc: 'Specialized coverage for Electric Vehicle battery degradation.', price: '₹599/mo', details: ['Battery replacement', 'Charger theft cover', 'Fire & explosion shield'] },
    { id: 9, type: 'Tech', title: 'Smartphone Water Damage', desc: 'No-questions-asked repairs for water spills.', price: '₹149/mo', details: ['Motherboard replacement', 'Screen water spot fix', 'Worldwide coverage'] },
    { id: 10, type: 'Health', title: 'Critical Illness Pro', desc: 'Lump-sum payout upon diagnosis of 30+ critical illnesses.', price: '₹1999/yr', details: ['100% payout on diagnosis', 'No medical bills required', 'Tax benefits under 80D'] },
    { id: 11, type: 'Home', title: 'Hostel Theft Protect', desc: 'Covers stolen electronics and personal items from dorm rooms.', price: '₹89/mo', details: ['No FIR required for claims <₹5000', 'Cash theft up to ₹2000', 'Damage due to riots/strikes'] },
    { id: 12, type: 'Pet', title: 'Furry Friend Cover', desc: 'Vet visit coverage for cats and dogs.', price: '₹349/mo', details: ['Vaccination cover', 'Accidental injury treatment', 'Third-party bite liability'] }
];

function OfferCard({ offer }) {
    const [isHovered, setIsHovered] = useState(false);
    // NEW: State to track if the card is open or closed
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div 
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{ 
                background: 'white', 
                padding: '25px', 
                borderRadius: '12px', 
                boxShadow: isHovered ? '0 15px 30px rgba(0,0,0,0.15)' : '0 4px 10px rgba(0,0,0,0.05)',
                transform: isHovered ? 'translateY(-5px) scale(1.02)' : 'translateY(0) scale(1)',
                transition: 'all 0.3s ease',
                borderTop: offer.type === 'Health' ? '4px solid #38a169' : offer.type === 'Vehicle' ? '4px solid #3182ce' : '4px solid #805ad5',
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#718096', textTransform: 'uppercase', letterSpacing: '1px' }}>{offer.type}</span>
            <h3 style={{ margin: '10px 0', color: '#2d3748', fontSize: '20px' }}>{offer.title}</h3>
            <p style={{ color: '#4a5568', fontSize: '14px', lineHeight: '1.5', flexGrow: 1 }}>{offer.desc}</p>
            
            {/* NEW: The hidden details section that appears when clicked */}
            {isExpanded && (
                <div style={{ marginTop: '15px', padding: '15px', backgroundColor: '#f7fafc', borderRadius: '8px', borderLeft: '3px solid #cbd5e0' }}>
                    <h4 style={{ margin: '0 0 8px 0', color: '#2d3748', fontSize: '14px' }}>Key Benefits:</h4>
                    <ul style={{ margin: 0, paddingLeft: '20px', color: '#4a5568', fontSize: '13px' }}>
                        {offer.details.map((detail, idx) => (
                            <li key={idx} style={{ marginBottom: '5px' }}>{detail}</li>
                        ))}
                    </ul>
                </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px', borderTop: '1px solid #edf2f7', paddingTop: '15px' }}>
                <span style={{ fontSize: '22px', fontWeight: 'bold', color: '#2b6cb0' }}>{offer.price}</span>
                <button 
                    onClick={() => setIsExpanded(!isExpanded)} 
                    style={{ background: isHovered || isExpanded ? '#3182ce' : '#edf2f7', color: isHovered || isExpanded ? 'white' : '#4a5568', border: 'none', padding: '8px 15px', borderRadius: '6px', fontWeight: 'bold', transition: '0.3s', cursor: 'pointer' }}>
                    {isExpanded ? 'Hide Details' : 'View Details'}
                </button>
            </div>
        </div>
    );
}

export default function OffersView() {
    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h1 style={{ color: '#1a365d', textAlign: 'center', marginBottom: '10px', fontSize: '36px' }}>Curated Policy Offers</h1>
            <p style={{ textAlign: 'center', color: '#718096', marginBottom: '40px', fontSize: '18px' }}>Smart algorithms have selected these 12 policies based on your profile.</p>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
                {offersData.map(offer => (
                    <OfferCard key={offer.id} offer={offer} />
                ))}
            </div>
        </div>
    );
}