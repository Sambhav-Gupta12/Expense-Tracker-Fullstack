import { createContext, useContext, useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";

const BudgetContext = createContext();

export const BudgetProvider = ({ children }) => {
  const [budget, setBudget] = useState([]);

  const { user } = useAuth();

  const fetchBudgets = async () => {
    try {

      const response = await axios.get(
        "http://localhost:8000/api/v1/budgets/get-budgets",
        {
          withCredentials: true,
        }
      );

      console.log(response.data.data);

      setBudget(response.data.data)

    } catch (error) {
      setBudget([])
    }
  }

  useEffect(() => {
    if (user) {
      fetchBudgets();
    }
  }, [user]);

  return (
    <BudgetContext.Provider value={{ budget, setBudget, fetchBudgets }}>
      {children}
    </BudgetContext.Provider>
  );
};

export const useBudget = () => {
  return useContext(BudgetContext);
};