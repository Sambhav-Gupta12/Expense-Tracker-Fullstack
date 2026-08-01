import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import axios from "axios";

const CatBudContext = createContext();

export const CatBudProvider = ({ children }) => {
  const [catBudgets, setCatBudgets] = useState([]);

  const { user } = useAuth();

  const fetchCatBudgets = async () => {
    try {

      const response = await axios.get(
        "http://localhost:8000/api/v1/category-budgets/get-category-budgets",
        {
          withCredentials: true,
        }
      );

      setCatBudgets(response.data.data)

    } catch (error) {
      setCatBudgets([])
    }
  }

  useEffect(() => {
    if (user) {
      fetchCatBudgets();
    }
  }, [user]);

  // const addCategoryBudget = (category, budget, categoryIcon) => {
  //   const newBudget = {
  //     id: crypto.randomUUID(),
  //     category,
  //     budget: Number(budget),
  //     categoryIcon,
  //   };

  //   setCatBudgets((prev) => [...prev, newBudget]);
  // };

  // const deleteCategoryBudget = (id) => {
  //   setCatBudgets((prev) =>
  //     prev.filter((item) => item.id !== id)
  //   );
  // };

  return (
    <CatBudContext.Provider
      value={{
        catBudgets,
        setCatBudgets,
        fetchCatBudgets
      }}
    >
      {children}
    </CatBudContext.Provider>
  );
};

export const useCatBudget = () => {
  return useContext(CatBudContext);
};