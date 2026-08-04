import { createContext, useContext, useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { API } from '../utils/api.js'

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const checkUser = async () => {
            try {

                const response = await axios.get(
                    `${API}/users/current-user`,
                    {
                        withCredentials: true,
                    }
                );

                setUser(response.data.data);

            } catch (error) {

                setUser(null);

            } finally {
                setLoading(false);
            }
        };

        checkUser();

    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};