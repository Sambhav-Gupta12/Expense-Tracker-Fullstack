import { createContext, useContext, useState } from "react";
import { useEffect } from "react";

const BudgetContext = createContext();

export const BudgetProvider = ({ children }) => {
  const [budget, setBudget] = useState(() => {
  const saved = localStorage.getItem("budget");
  return saved ? JSON.parse(saved) : 0
});

useEffect(() => {
  localStorage.setItem("budget", JSON.stringify(budget));
}, [budget]);

  return (
    <BudgetContext.Provider value={{ budget, setBudget }}>
      {children}
    </BudgetContext.Provider>
  );
};

export const useBudget = () => {
  return useContext(BudgetContext);
};