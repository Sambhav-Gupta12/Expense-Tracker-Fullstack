import { createContext, useContext, useState, useEffect } from "react";

const CatBudContext = createContext();

export const CatBudProvider = ({ children }) => {
  const [catBudgets, setCatBudgets] = useState(() => {
    const saved = localStorage.getItem("catBudgets");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(
      "catBudgets",
      JSON.stringify(catBudgets)
    );
  }, [catBudgets]);

  const addCategoryBudget = (category, budget, categoryIcon) => {
    const newBudget = {
      id: crypto.randomUUID(),
      category,
      budget: Number(budget),
      categoryIcon,
    };

    setCatBudgets((prev) => [...prev, newBudget]);
  };

  const deleteCategoryBudget = (id) => {
      setCatBudgets((prev) =>
        prev.filter((item) => item.id !== id)
      );
    };

  return (
    <CatBudContext.Provider
      value={{
        catBudgets,
        addCategoryBudget,
        deleteCategoryBudget,
      }}
    >
      {children}
    </CatBudContext.Provider>
  );
};

export const useCatBudget = () => {
  return useContext(CatBudContext);
};