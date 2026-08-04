import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { API } from "../utils/api";

const IncomeContext = createContext();

export const IncomeProvider = ({ children }) => {
  const [incomes, setIncomes] = useState([]);

  const { user } = useAuth();

  const fetchIncomes = async () => {
    try {

      const response = await axios.get(
        `${API}/incomes/get-incomes`,
        {
          withCredentials: true,
        }
      );

      setIncomes(response.data.data)

    } catch (error) {
      setIncomes([])
    }
  }

  useEffect(() => {
    if (user) {
      fetchIncomes();
    }
  }, [user]);

  return (
    <IncomeContext.Provider value={{ incomes, setIncomes, fetchIncomes }}>
      {children}
    </IncomeContext.Provider>
  );
};

export const useIncome = () => {
  return useContext(IncomeContext);
};