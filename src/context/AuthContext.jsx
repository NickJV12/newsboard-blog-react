import { createContext, useState, useEffect } from "react";
import { loginUser } from "../services/authService";
// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if(savedToken){
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setToken(savedToken);
    }
    setLoading(false);
    }, []);

    const login = async (credentials) => {
        try{
            const data = await loginUser(credentials);

            setUser(data);
            setToken(data.accessToken);
            localStorage.setItem("token", data.accessToken);
            localStorage.setItem("user", JSON.stringify(data));

            return {
                success: true,
            };
        } catch(error){
            return {
                success: false,
                message: error.response?.data?.message || "Login failed",
            };
        }
    };

    const logout = () => {
        setUser(null);
        setToken(null);

        localStorage.removeItem("token");
        localStorage.removeItem("user");
    };

    const value = {
        user, token, loading, login, logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;