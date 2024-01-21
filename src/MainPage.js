import styled from 'styled-components';
import React, { useState } from 'react';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import { Routes, Route, Link } from 'react-router-dom';
import Receit from './components/ReceitProvide.tsx';
import DataDis from './components/DataDisplay.tsx';
import { GoogleLogin } from 'react-google-login';


const theme = {
  primary: '#4682B4',
  secondary: '#6c757d',
  accent: '#28a745',
  light: '#f8f9fa',
  dark: '#343a40',
  backgrnd: '#B0C4DE',
  btn: '#FFA500',
  white: '#FFFFFF'
};

const Container = styled.div`
    font-family: 'Arial', sans-serif;
    color: ${theme.dark};
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  `;

const Header = styled.header`
    background-color: ${theme.primary};
    color: ${theme.light};
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-grow: 1;
    flex-grow: 0;
  `;

const MainContent = styled.main`
    text-align: center;
    padding: 2rem;
    background-image: linear-gradient(to bottom right, ${theme.light}, ${theme.backgrnd});
    background-size: cover;    
    flex-grow: 1;
  `;

const Footer = styled.footer`
    background-color: ${theme.primary};
    color: ${theme.backgrnd};
    padding: 1rem;
    text-align: center;    
  `;

const StyledGoogleLogin = styled(GoogleLogin)`
  button {
    background-color: ${theme.primary};
    color: ${theme.primary};
    border: none;
    border-radius: 25px;
    padding: 10px 15px;
    @media (max-width: 600px) {
      background: url('path_to_google_logo.png') no-repeat center center;
      background-size: contain;
      border-radius: 50%; 
      height: 40px; 
      width: 40px; 
      padding: 0; 
      color: transparent; 
    }
  }
`;

function MainPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const onSuccess = (response) => {
    console.log('Login Success:', response);
    setIsLoggedIn(true);
    // Further process the response
  };

  const onFailure = (response) => {
    console.log('Login Failed:', response);
  };

  return (
    <Container>
      <Header>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button style={{ color: 'white', width: '150px' }} component={Link} to='/'>Provide Receit</Button>
          <Button style={{ color: 'white', width: '150px' }} component={Link} to='/Data'>Check Report</Button>
        </Box>
        {isLoggedIn && <Avatar
          sx={{ bgcolor: '#F4A460' }}
          alt="Remy Sharp"
          src="/broken-image.jpg"
        >
          B
        </Avatar>}
        {!isLoggedIn && (
          <StyledGoogleLogin
            clientId="YOUR_CLIENT_ID"
            buttonText="Login with Google"
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={'single_host_origin'}
          />
        )}
      </Header>
      <MainContent>
        <Routes>
          <Route path='/' element={<Receit />} />
          <Route path='/Data' element={<DataDis />} />
        </Routes>
      </MainContent>
      <Footer>
        <small>Copyright © 4FD3 DIGITALIZING RECIEPTS</small>
      </Footer>
    </Container>
  );
}

export default MainPage;