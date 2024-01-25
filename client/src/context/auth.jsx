import { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";

// This Context is used to check if the user is "Loged-In" Or not....
//  If the user is "Loged-In" then we will remove "register" and "login" option from the header and show the "Logout" option
const AuthContext = createContext();
const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        user: null, // By Default the user is not "Loged-In" (Obiously user have to login first)
        token: "",
    });

    //default axios
    axios.defaults.headers.common["Authorization"] = auth?.token;

    useEffect(() => {
        const data = localStorage.getItem("auth");
        if (data) {
            const parseData = JSON.parse(data);
            setAuth({
                ...auth,
                user: parseData.user,
                token: parseData.token,
            });
        }
        //eslint-disable-next-line
    }, []);
    return (
        <AuthContext.Provider value={[auth, setAuth]}>
            {children}
        </AuthContext.Provider>
    );
};

// custom hook
const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };