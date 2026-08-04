<div align="center">

# 💸 SpendWise

### Smart Personal Finance Management Application

Track your income, expenses, budgets and spending insights — all in one secure, responsive, and intuitive platform.

<br/>

**🌐 Live Demo:** https://expense-tracker-fullstack-flame.vercel.app/

<br/>

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-22-339933?style=for-the-badge&logo=node.js)
![Express](https://img.shields.io/badge/Express-5-black?style=for-the-badge&logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-4-38B2AC?style=for-the-badge&logo=tailwindcss)
![JWT](https://img.shields.io/badge/JWT-Authentication-black?style=for-the-badge&logo=jsonwebtokens)
![Cloudinary](https://img.shields.io/badge/Cloudinary-Image%20Hosting-3448C5?style=for-the-badge&logo=cloudinary)
![Vercel](https://img.shields.io/badge/Vercel-Frontend-black?style=for-the-badge&logo=vercel)
![Render](https://img.shields.io/badge/Render-Backend-46E3B7?style=for-the-badge&logo=render)

<br/>

> **Manage your money smarter, not harder.**

</div>

---

# 📖 About

**SpendWise** is a modern **full-stack personal finance management application** built using the **MERN Stack**.

It helps users securely manage their finances by allowing them to:

- Track income & expenses
- Create monthly budgets
- Set category-wise budgets
- Visualize spending patterns
- Monitor financial health through analytics
- Manage their profile securely

The application is fully responsive and optimized for desktop and mobile devices.

---

# ✨ Features

## 🔐 Authentication

- Secure Sign Up & Login
- JWT Authentication
- Access & Refresh Token System
- HTTP Only Cookies
- Protected Routes
- Persistent Login Sessions

---

## 💰 Expense Management

- Add Expenses
- Edit Expenses
- Delete Expenses
- Custom Categories
- Custom Category Icons
- Filter by Category
- Real-time Updates

---

## 💵 Income Management

- Add Income
- Edit Income
- Delete Income
- Separate Income Tracking

---

## 📊 Budget Management

- Monthly Budget
- Category-wise Budgets
- Remaining Budget
- Budget Utilization
- Budget Progress

---

## 📈 Dashboard Analytics

- Income vs Expense Summary
- Spending by Category (Donut Chart)
- Daily Expense Trend
- Financial Overview Cards
- Recent Transactions

---

## 👤 User Profile

- Update Profile Information
- Change Avatar
- Delete Account
- Secure Logout

---

## 📱 User Experience

- Fully Responsive Design
- Beautiful Dashboard
- Interactive Charts
- Loading Screen
- Toast Notifications
- Password Visibility Toggle
- Smooth Animations

---

# 🛠 Tech Stack

## Frontend

- React 19
- React Router
- Context API
- Axios
- Tailwind CSS v4
- Recharts
- Lucide React
- React Hot Toast
- Vite

---

## Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- Bcrypt
- Cookie Parser
- Multer
- Cloudinary
- CORS

---

## Deployment

Frontend → **Vercel**

Backend → **Render**

Database → **MongoDB Atlas**

Image Storage → **Cloudinary**

---

# 📂 Project Structure

```
Expense-Tracker-Fullstack
│
├── Frontend
│   ├── src
│   │
│   ├── components
│   ├── context
│   ├── pages
│   ├── hooks
│   ├── utils
│   ├── assets
│   └── styles
│
└── Backend
    ├── src
    │
    ├── controllers
    ├── models
    ├── routes
    ├── middlewares
    ├── utils
    ├── db
    └── cloudinary
```

---

# 🚀 Getting Started

## Clone Repository

```bash
git clone https://github.com/Sambhav-Gupta12/Expense-Tracker-Fullstack.git

cd Expense-Tracker-Fullstack
```

---

## Backend Setup

```bash
cd Backend

npm install
```

Create a `.env`

```env
PORT=8000

MONGODB_URI=your_mongodb_uri

CORS_ORIGIN=http://localhost:5173

ACCESS_TOKEN_SECRET=your_secret

ACCESS_TOKEN_EXPIRY=1d

REFRESH_TOKEN_SECRET=your_secret

REFRESH_TOKEN_EXPIRY=10d

CLOUDINARY_CLOUD_NAME=your_cloud_name

CLOUDINARY_API_KEY=your_api_key

CLOUDINARY_API_SECRET=your_api_secret
```

Start Backend

```bash
npm run dev
```

---

## Frontend Setup

```bash
cd Frontend

npm install
```

Create a `.env`

```env
VITE_API_URL=http://localhost:8000/api/v1
```

Run

```bash
npm run dev
```

---

# 📊 Application Flow

```
User Authentication
        │
        ▼
JWT Token Generation
        │
        ▼
HTTP Only Cookies
        │
        ▼
Protected APIs
        │
        ▼
MongoDB Database
        │
        ▼
Dashboard Analytics
```

---

# 📸 Screenshots

## Dashboard

> Add your dashboard screenshot here

---

## Transactions

> Add transaction page screenshot here

---

## Analytics

> Add analytics screenshot here

---

## Profile

> Add profile screenshot here

---

# 🎯 Future Improvements

- Email Verification
- Forgot Password
- Dark / Light Theme
- Export Reports (PDF / CSV)
- Multiple Currency Support
- Recurring Transactions
- Expense Goals
- AI Spending Insights
- Monthly Email Reports
- Bank Integration

---

# 📚 What I Learned

This project helped me gain practical experience in:

- Building REST APIs
- JWT Authentication
- Cookie-based Authentication
- MongoDB & Mongoose
- Cloudinary Integration
- React Context API
- Protected Routes
- Backend Architecture
- Deployment on Render
- Deployment on Vercel
- Environment Variables
- Production Debugging
- Cross-Origin Authentication (CORS)
- Full Stack Project Deployment

---

# 🤝 Contributing

Contributions are always welcome.

1. Fork the repository

2. Create a new branch

```bash
git checkout -b feature-name
```

3. Commit changes

```bash
git commit -m "Added new feature"
```

4. Push

```bash
git push origin feature-name
```

5. Open a Pull Request

---

# 📄 License

This project is licensed under the MIT License.

---

# 👨‍💻 Author

**Sambhav Gupta**

- GitHub: https://github.com/Sambhav-Gupta12
- LinkedIn: https://www.linkedin.com/in/sambhav-gupta-494347369/

---

<div align="center">

### ⭐ If you like this project, consider giving it a Star!

Made with ❤️ using the MERN Stack.

</div>
