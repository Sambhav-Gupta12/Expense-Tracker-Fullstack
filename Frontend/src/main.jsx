import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom'
import { createRoutesFromElements } from 'react-router-dom'
import './index.css'
import Layout from './Layout.jsx'
import Dashboard from './components/Dashboard/Dashboard.jsx'
import Transactions from './components/Transactions/Transactions.jsx'
import Budgets from './components/Budgets/Budgets.jsx'
import Profile from './components/Profile/Profile.jsx'
import AddExpense from './components/AddExpense/AddExpense.jsx'
import { ExpenseProvider } from "./context/ExpenseContext";
import { BudgetProvider } from "./context/BudgetContext";
import { CatBudProvider } from "./context/CatBudContext";
import Auth from './components/landingPage/Auth.jsx'
import ProtectedRoute from './components/ProtectedRoutes/ProtectedRoute.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { IncomeProvider } from './context/IncomeContext.jsx'
import { Toaster } from "react-hot-toast";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Auth />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path='dashboard' element={<Dashboard />} />
        <Route path='transactions' element={<Transactions />} />
        <Route path='budgets' element={<Budgets />} />
        <Route path='profile' element={<Profile />} />
        <Route path='add-expense' element={<AddExpense />} />
      </Route>
    </>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <IncomeProvider>
        <ExpenseProvider>
          <BudgetProvider>
            <CatBudProvider>

              <Toaster
                position="top-right"
                toastOptions={{
                  duration: 3000,

                  style: {
                    background: "#262624",
                    color: "#fff",
                    border: "1px solid #494945",
                  },

                  success: {
                    iconTheme: {
                      primary: "#22c55e",
                      secondary: "#fff",
                    },
                  },

                  error: {
                    iconTheme: {
                      primary: "#ef4444",
                      secondary: "#fff",
                    },
                  },
                }}
              />

              <RouterProvider router={router} />
            </CatBudProvider>
          </BudgetProvider>
        </ExpenseProvider>
      </IncomeProvider>
    </AuthProvider>
  </StrictMode>,
)
