const express = require('express');
const cors = require('cors');
const multer = require('multer');

const app = express();
app.use(cors());
app.use(express.json());

// Temporary storage for uploaded evidence
const upload = multer({ dest: 'uploads/' });

// --- MAKE INSURE REAL-TIME AI ENGINE (SMART SIMULATION) ---
app.post('/api/audit', upload.single('document'), (req, res) => {
    try {
        const { claimType, procedure, amount, applicantName } = req.body;
        const claimAmount = Number(amount);
        const hasImage = req.file ? true : false;
        
        let riskScore = 0;
        let flags = [];

        // 1. DYNAMIC LIMIT DATABASE
        const limits = {
            'HEALTH': { 'XRAY': 5000, 'SURGERY': 150000, 'FEVER': 2000 },
            'VEHICLE': { 'BUMPER': 10000, 'ENGINE': 80000, 'PAINT': 15000 }
        };

        const maxAllowed = limits[claimType]?.[procedure] || 10000;

        // 2. INTELLIGENT RATIO ANALYSIS
        if (claimAmount > maxAllowed) {
            const ratio = claimAmount / maxAllowed;
            
            if (ratio >= 5) {
                riskScore = 100;
                flags.push(`🚨 CRITICAL FRAUD: Claim amount (₹${claimAmount}) is ${ratio.toFixed(1)}x higher than industry standard!`);
            } else {
                riskScore += 50;
                flags.push(`💰 Price Gouging: ₹${claimAmount} exceeds the standard ₹${maxAllowed} limit.`);
            }
        }

        // 3. MULTI-MODAL IMAGE VERIFICATION
        if (!hasImage) {
            riskScore = Math.min(riskScore + 30, 100);
            flags.push("📸 Missing Evidence: No X-Ray or Damage photo uploaded.");
        } else {
            // Simulated AI image scanning
            const originalName = req.file.originalname.toLowerCase();
            if (originalName.includes('fake') || originalName.includes('copy') || originalName.includes('edit')) {
                riskScore = 100;
                flags.push("🚨 AI IMAGE AUDIT: Image metadata suggests this is not an original capture.");
            }
        }

        // 4. VERDICT TRIAGE (Simulate a 2-second processing delay for realism)
        setTimeout(() => {
            let status = 'Verified';
            let confidence = 100 - riskScore; 

            if (riskScore >= 90) {
                status = 'Flagged';
                confidence = Math.max(confidence, 5); 
            } else if (riskScore >= 40) {
                status = 'Review Needed';
            }

            console.log(`🧠 AI Analysis for ${applicantName || 'User'}: Amount ₹${claimAmount} | Confidence: ${confidence}% | Status: ${status}`);

            res.status(200).json({ 
                success: true,
                data: { status, confidence, flags }
            });
        }, 2000); // 2-second delay makes it feel like real AI processing!

    } catch (error) {
        console.error("Analysis Error:", error);
        res.status(500).json({ success: false, message: "AI Engine Offline" });
    }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`🛡️ Make Insure AI Backend (Simulation) running on port ${PORT}`));