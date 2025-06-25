# 📚 CampusCare – College Complaint & Announcement SaaS Platform

CampusCare is a role-based SaaS platform designed to streamline college complaint management, announcements, and subscription-based features. Built with modern frontend technologies and Firebase services, it aims to enhance administrative efficiency and student engagement.

## 🌐 Live Demo

🔗 [CampusCare Web App](https://players-e502c.web.app/)

---

## 🚀 Features

### 🧑‍🎓 Student
- Register/login with college code
- Create and track complaints
- View announcements
- Limited usage based on plan

### 🛠️ Admin (Department-wise)
- Manage complaints by status: **Pending**, **In Progress**, **Resolved**
- Respond to complaints via inbox
- Post announcements (limit based on subscription)
- Department-specific access

### 👑 Super Admin (SaaS Owner)
- Approve new college registrations
- Set or upgrade subscription plans
- Manage global announcements
- View analytics and control college limits

---

## 🏗️ Tech Stack

### 🔧 Frontend
- React.js
- Bootstrap
- Tailwind CSS (optional future upgrade)

### ☁️ Backend & Services
- Firebase Authentication (Email/Password)
- Firebase Realtime Database
- Firebase Hosting
- Razorpay (Test Mode) – For payment integration

### 🔐 Auth System
- Firebase Auth with role-based logic stored in Realtime DB
- College-based access via shared code during registration

---

## 📈 Subscription Plans

| Plan        | Complaint Limit | Announcement Limit | Admin Limit |
|-------------|-----------------|--------------------|-------------|
| Free        | 10              | 5                  | 1           |
| Premium     | 50              | 20                 | 3           |
| Enterprise  | Unlimited       | Unlimited          | Unlimited   |

💳 Payments handled via UPI for now and user is manually upgraded.

---

## 🧠 Upcoming Features

- 🔮 AI Chatbot for complaint creation guidance
- 🔁 Migration to Firestore (for better scaling)
- ✅ Enhanced student onboarding validation
- 📊 Admin dashboard analytics
- 🧑‍🤝‍🧑 Invite-based admin/staff collaboration

---

## 🛠️ Local Setup

```bash
git clone https://github.com/your-username/campuscare.git
cd campuscare
npm install
npm start
