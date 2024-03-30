import React from 'react';
import MainPage from './MainPage.tsx';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';


function App() {
  return (
    <BrowserRouter>
        <AuthProvider>
          <MainPage />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
