import {createContext, useState} from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [token, setToken] = useState(localStorage.getItem('token'));

    const loginUser = (newToken) => {
        localStorage.setItem('token', newToken);
        setToken(newToken);
    };

    const logoutUser = () => {
        localStorage.removeItem('token');
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{token, loginUser, logoutUser}}>
            {children}
        </AuthContext.Provider>
    );
};