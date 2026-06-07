# 🛡️ Make Insure

**Make Insure** is an AI-powered insurance claim auditing platform designed to eliminate the inefficiencies of traditional manual claims processing. Built for the **GitHub DevDays Hackathon**, this application automates the triage process for health and vehicle insurance claims, instantly flagging price gouging and document manipulation.

---

## ✨ Key Features

* **🧠 Real-Time Verdict Triage:** Instantly calculates an AI confidence score and categorizes claims as "Verified," "Review Needed," or "Total Fraud."
* **📊 Intelligent Ratio Analysis:** An algorithm that calculates the ratio of the claimed amount versus standard limits to automatically detect and flag price gouging.
* **🗄️ Dynamic Limit Database:** Custom maximum thresholds for various health (X-rays, surgeries) and vehicle (bumpers, engines) procedures.
* **📸 Multi-Modal Image Verification:** Metadata scanning to detect copied, edited, or digitally manipulated evidence files.
* **💻 Modern UI/UX:** A responsive, premium dashboard featuring live statistics, policy offer curation, and user profile management.

---

## 🛠️ Tech Stack

* **Frontend:** React.js (Vite), Tailwind CSS, Lucide React Icons, React Router
* **Backend:** Node.js, Express.js, Multer (for multipart form/image data handling)
* **AI/Simulation:** Custom Node.js fraud-detection logic (built to interface with Microsoft Azure Document Intelligence SDK)

---

## 🚀 Getting Started

Follow these steps to run the Make Insure prototype locally on your machine.

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your system.

### 1. Clone the Repository
```bash
git clone [https://github.com/your-username/make-insure.git](https://github.com/your-username/make-insure.git)
cd make-insure
