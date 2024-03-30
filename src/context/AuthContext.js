
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const logout = async () => {
    const apiUrl = `${process.env.REACT_APP_API_URL}/api/logout`;
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        credentials: 'include',
      });

      sessionStorage.removeItem('authToken');
      sessionStorage.removeItem('expiresAt');
      setIsLoggedIn(false);
      window.location.reload();

    } catch (error) {
      console.error('Logout Error:', error);
    }

  };

  const value = {
    isLoggedIn,
    setIsLoggedIn,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
