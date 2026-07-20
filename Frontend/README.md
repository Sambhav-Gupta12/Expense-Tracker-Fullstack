<div align="center">

# 💸 Expense Tracker

**A sleek, modern expense management app built with React.js & Tailwind CSS**

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![LocalStorage](https://img.shields.io/badge/LocalStorage-FF6B6B?style=for-the-badge&logo=databricks&logoColor=white)](#)

<br/>

> _Track your money. Own your finances. Live intentionally._

<br/>

![Expense Tracker Preview](https://via.placeholder.com/800x400/1a1a2e/61DAFB?text=Expense+Tracker+App+Preview)

</div>

---

## ✨ Features

| Feature | Description |
|---|---|
| ➕ **Add Transactions** | Log expenses and income with title, amount & category |
| 🗑️ **Delete Entries** | Remove any transaction instantly |
| 🔍 **Smart Filtering** | Filter by All, Income, or Expense with one click |
| 💾 **Data Persistence** | All data saved locally — no sign-up needed |
| 📱 **Fully Responsive** | Looks great on mobile, tablet & desktop |
| ⚡ **Blazing Fast** | Optimized React rendering for a snappy experience |

---

## 🛠️ Tech Stack

```
Frontend  →  React.js (Hooks + Context API)
Styling   →  Tailwind CSS
Storage   →  Browser LocalStorage
Bundler   →  Vite / Create React App
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js `v16+`
- npm or yarn

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/expense-tracker.git

# 2. Navigate into the project
cd expense-tracker

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

> 🌐 App will be live at `http://localhost:5173`

---

## 📁 Project Structure

```
expense-tracker/
│
├── public/
│   └── index.html
│
├── src/
│   ├── components/
│   │   ├── AddExpense.jsx       # Form to add new transactions
│   │   ├── ExpenseList.jsx      # Renders transaction list
│   │   ├── ExpenseItem.jsx      # Single transaction card
│   │   ├── FilterBar.jsx        # All / Income / Expense tabs
│   │   └── Summary.jsx          # Balance, income & expense totals
│   │
│   ├── context/
│   │   └── ExpenseContext.jsx   # Global state via Context API
│   │
│   ├── hooks/
│   │   └── useLocalStorage.js   # Custom hook for persistence
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── tailwind.config.js
└── package.json
```

---

## 🎯 How It Works

```
User adds a transaction
        ↓
State updates via Context API
        ↓
UI re-renders instantly (React Hooks)
        ↓
Data saved to LocalStorage
        ↓
On reload → data is restored automatically ✅
```

---

## 📸 Screenshots

<div align="center">

| Dashboard | Add Expense | Filtered View |
|:---------:|:-----------:|:-------------:|
| ![Dashboard](https://via.placeholder.com/240x160/1a1a2e/ffffff?text=Dashboard) | ![Add Expense](https://via.placeholder.com/240x160/16213e/61DAFB?text=Add+Expense) | ![Filter](https://via.placeholder.com/240x160/0f3460/ffffff?text=Filtered+View) |

</div>

---

## 🤝 Contributing

Contributions are always welcome! Here's how:

```bash
# Fork the repo, then:
git checkout -b feature/your-feature-name
git commit -m "feat: add your feature"
git push origin feature/your-feature-name
# Open a Pull Request 🎉
```

Please follow the existing code style and keep commits descriptive.

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## 🙌 Acknowledgements

- [React Docs](https://react.dev/) — for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) — for utility-first styling
- [Shields.io](https://shields.io/) — for the beautiful badges

---

<div align="center">

**Made with ❤️ and a lot of ☕**

⭐ If you found this useful, consider giving it a star!

</div>
