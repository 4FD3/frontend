import { createContext, useState, useEffect } from 'react';
import { SnackbarProvider, VariantType, useSnackbar } from 'notistack';

export const AuthContext = createContext({
  isLoggedIn: false,
  setIsLoggedIn: () => { },
  user_info: null,
  setUser_info: () => { },
});

export default function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') ? true : false);
  const [user_info, setUser_info] = useState(null);
  const { enqueueSnackbar } = useSnackbar();

  const authenticateUserWithToken = async (token) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/validateToken`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        setIsLoggedIn(false);
        localStorage.removeItem('isLoggedIn');
        throw new Error('Token validation failed');
      } else if (response.ok) {
        const userData = await response.json();
        console.log(userData);
        setUser_info(JSON.parse(localStorage.getItem('userInfo')));
        setIsLoggedIn(true);
        localStorage.setItem('isLoggedIn', 'true');
      }
    } catch (error) {
      console.error('Error during token authentication:', error.message);
      localStorage.removeItem('authToken');
      setIsLoggedIn(false);
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('userInfo');
      enqueueSnackbar(error.message);
    }
  };
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      authenticateUserWithToken(token);
    }
  }, []);
  return (
    <SnackbarProvider maxSnack={3}>
      <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, user_info, setUser_info }}>
        {children}
      </AuthContext.Provider>
    </SnackbarProvider>
  );
}