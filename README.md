# 🎓 CampusCare

**CampusCare** is a role-based Complaint & Announcement Management System for colleges, built with **React**, **Firebase**, and **Tailwind CSS**. It simplifies how students raise complaints, how department admins resolve them, and how super admins manage everything — all in a single dashboard.

🚀 Live Demo: [CampusCare App](https://players-e502c.web.app/)

---

## 📌 Features

### 👨‍🎓 Students
- Submit complaints with priority and department selection
- Auto-filled user info using Firebase Auth
- View complaint history and status updates
- Receive announcements from admins or super admin

### 🧑‍💼 Admins (Department-wise)
- View and manage student complaints for their department
- Change complaint status: `Pending`, `In Progress`, `Resolved`
- Reply to students via inbox
- Post department-specific announcements

### 🧑‍💼 Super Admin
- Create and manage admin and student accounts
- Full access to all complaints across departments
- Post global announcements
- Control over complaint limits, department creation, etc.

---

## 🛠️ Tech Stack

| Technology     | Purpose                          |
|----------------|----------------------------------|
| React          | Frontend UI                      |
| Firebase Auth  | Authentication                   |
| Realtime DB    | Data storage and access control  |
| Tailwind CSS   | Styling and responsive design    |
| Razorpay       | Subscription & Payment Handling  |

---

## 🧪 Role-Based System

- Student Sign-Up using **College Code**
- Admins are created by Super Admin (with department restriction)
- Roles are assigned via Firebase Database
- Data separation per college

---

## 💸 Subscription Plans

| Plan        | Complaint Limit | Announcement Limit | Admin Limit | Features             |
|-------------|------------------|---------------------|--------------|----------------------|
| Free        | 5/month          | 2/month             | 1            | Basic functionality  |
| Premium     | 20/month         | 10/month            | 3            | Most features        |
| Enterprise  | Unlimited        | Unlimited           | Unlimited    | Full access          |

> Payments handled using **Razorpay Test Mode**

---

## 📁 Folder Structure
```
src/
├── components/
│ ├── BlogModal.jsx
│ ├── DocumentationModal.jsx
│ ├── Email Verification.jsx
│ └── Footer.jsx
│ └── ForgotPasswordModal.jsx
│ └── PrivacyPolicyModal.jsx
│ └── ProtecteddRoute.jsx
│ └── SystemStatusModal.jsx
├── departmentAdmin/
│    ├── DepAnnouncementForm.jsx
│    └── DepartmentComplaint.jsx
│    └── DepartmentProfile.jsx
│    └── DepNav.jsx
│ ├── pages/
│    └── About.jsx
│    └── Contact.jsx
│    └── LandingPAge.jsx
│    └── LoginPage.jsx
│    └── SignUp.jsx
│    └── Unauthorized.jsx
├── StudentPage/
│ ├── DepComponent/
│   ├── ComplaintCardModal.jsx
│   ├── ComplaintForm.jsx
│   └── HandleDelete.jsx
│   └── Navbar.jsx
│   └── StatusCard.jsx
│ ├── ComplaintDetailPage.jsx
│ ├── ComplaintStatusPage.jsx
│ ├── Homepage.jsx
│ ├── ProfilePage.jsx
│ ├── StudentAnnouncements.jsx
├── SuperAdmin/
│ ├── AdminComponents/
│     ├── AdminComplaintCards.jsx
│     ├── AdminNav.jsx
│     ├── AllComplaints.jsx
│     ├── AnnouncementForm.jsx
│     ├── ComplaintCard.jsx
│     ├── DepartmentAdminList.jsx
│     ├── DepSignup.jsx
│     ├── StudentList.jsx
│     ├── SuperAdminModal.jsx
│ └── AdminPages/
│     ├── AdminProfile.jsx
│     ├── ControlCenter.jsx
│     ├── SuperAdminAnnouncement.jsx
│     ├── SuperAdminServices.jsx
│ └── HomepageAdmin.jsx
├── App.css
├── App.js
├── App.test.js
├── firebase.js
├── index.css
├── index.js
├── reportWebVitals.js
├── setupTests.js
.env
.firebaserc
.gitignore
firebase.json
package-lock.json
package.json
README.md
tailwind.config.js


---

## 🚀 Getting Started (Local Setup)

```bash
git clone https://github.com/muraritripathi/campuscare.git
cd campuscare
npm install
npm start
```
---
```bash
## 🚀 Getting Started (env Setup)
REACT_APP_FIREBASE_API_KEY=your_key
REACT_APP_FIREBASE_AUTH_DOMAIN=yourDomain
REACT_APP_FIREBASE_DATABASE_URL=enter_yourdb_url
REACT_APP_FIREBASE_PROJECT_ID=Enter_your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=Enter_your_storage_Bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=Enter_yourSender_ID
REACT_APP_FIREBASE_APP_ID=Enter_details

REACT_APP_EMAILJS_SERVICE_ID=Enter_details
REACT_APP_EMAILJS_TEMPLATE_ID=Enter_details
REACT_APP_EMAILJS_PUBLIC_KEY=Enter_details

```
## 📬 Contact
📧 [Mail](tripathimurari599@gmail.com/)

🌐 [Portfolio](muraritripathi.xyz/)

