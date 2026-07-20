import { createContext, useContext, useState } from "react";
import { useEffect } from "react";

const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState(() => {
  const saved = localStorage.getItem("expenses");
  return saved ? JSON.parse(saved) : [];
});

useEffect(() => {
  localStorage.setItem("expenses", JSON.stringify(expenses));
}, [expenses]);

  return (
    <ExpenseContext.Provider value={{ expenses, setExpenses }}>
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpense = () => {
  return useContext(ExpenseContext);
};