# 🛒 CartDB — Your sassy grocery companion

> **CartDB** is a Snap Spectacles lens that turns grocery shopping into a fun, health-aware, and sassy experience.  
> Scan items, hear Cardi-B-style reactions, view nutrition info, and climb the leaderboard for the healthiest cart — powered by Supabase, Docker, and Lens Studio.

---

## 🚨 Problem

The U.S. faces a **major public health crisis** — over 40% of adults are obese, leading to heart disease, diabetes, and billions in healthcare costs.  
Healthy choices are often confusing, boring, and lack instant feedback.

---

## 💡 Solution

**CartDB** makes nutrition fun and social.  
As you shop with Snap Spectacles, CartDB scans your groceries, displays nutrition insights, and gives you *Cardi-B-inspired* voice commentary to keep you entertained (and accountable).

---

## 🧭 Features

- 🎯 **Smart Scan:** Detects grocery items and retrieves their nutrition data (Nutri-score, calories, price).  
- 🧠 **Supabase Backend:**  
  - User preferences (vegan/vegetarian/etc.)  
  - Food item metadata and pairings  
  - Real-time leaderboard via Supabase Realtime  
- 🗣️ **Cardi-B-Style Voice Feedback:** Fun, swappable voice quotes reacting to what you scan.  
- 🏆 **Healthy Shopping Leaderboard:** Compete with others by building the healthiest cart.  
- ☁️ **Edge Functions:** Analyze nutrition data and update scores instantly in the cloud.

---

## ⚙️ Technical Architecture

Camera (Spectacles) → Docker Container 1 → Scandit API (Barcode Detection) → Lens Studio (Lens Visualization + Voice Logic) → Supabase (Database + Edge Functions + Realtime Leaderboard)


- **Database & Storage:** Supabase Tables store user preferences, food data, and scan logs.  
- **Realtime Subscriptions:** Used for the global leaderboard and collaborative sessions.  
- **Edge Functions:** Calculate Nutri-scores, health ranks, and witty feedback responses.

---

## 🚀 Quick Start

### Prerequisites
- Snap Lens Studio  
- Docker  
- Node.js + npm  
- Supabase account (with project and tables set up)

---

### Installation

```bash
# Clone the repository
git clone https://github.com/nickross4444/CartDB.git
cd CartDB

# Set up environment variables
cp .env.example .env
# Add your Supabase URL, API key, and Scandit credentials

# Build and run containers
docker compose up --build
```

---

### Lens Integration

Open Lens Studio
Import the lens/ folder
Configure API endpoints to your running Docker backend
Deploy to your Spectacles

---

### 🧠 Future Work
- 🥦 3D Models of Foods: Animated AR items for a richer shopping experience
- 💳 Payment Integration: Connect to payment gateways or loyalty APIs
- 🛍️ Shareable Shopping Lists: Sync and send lists to friends
- 👩‍⚕️ Dietician Avatar: Personalized nutrition coaching
- 💸 Deals & Coupons: Suggest healthier alternatives on discount

---

### 👥 Team

- Project Lead	- Nick Ross
- Developers	- Nigel Hartman, Nick Ross, Guillaume Dagens, Uttam Grandhi
- Designers	- Guillaume Dagens, Uttam Grandhi

---

### 🏁 Acknowledgments
- **Snap** - for brining together the best minds from all over the world! 
- **Supabase** — for the realtime backend
- **Scandit** — for barcode recognition
- **Fineshare AI** - for audio generation
- **Snap Lens Studio** — for AR development
- **Cardi B** — for the inspiration and sass 💅







