import React from 'react';
import MainPage from './MainPage.tsx';
import { BrowserRouter } from 'react-router-dom';
import AuthProvider from './components/AuthContext';

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
