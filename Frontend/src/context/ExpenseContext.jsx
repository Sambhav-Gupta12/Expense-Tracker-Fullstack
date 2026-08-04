import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { API } from "../utils/api";

const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);

  const { user } = useAuth();

  const fetchExpenses = async () => {
    try {

      const response = await axios.get(
        `${API}/expenses/get-expenses`,
        {
          withCredentials: true,
        }
      );

      setExpenses(response.data.data)

    } catch (error) {
      setExpenses([])
    }
  }

  useEffect(() => {
    if (user) {
      fetchExpenses();
    }
  }, [user]);

  return (
    <ExpenseContext.Provider value={{ expenses, setExpenses, fetchExpenses }}>
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpense = () => {
  return useContext(ExpenseContext);
};