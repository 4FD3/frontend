import styled from 'styled-components';
import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import { Routes, Route, Link } from 'react-router-dom';
import Receit from './components/ReceitProvide.tsx';
import DataDis from './components/DataDisplay.tsx';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import AssessmentIcon from '@mui/icons-material/Assessment';
import MiniDrawer from './components/SideDrawer.tsx';

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

function MainPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  async function onSuccess (response)  {
    console.log('Login Success:', response);
    setIsLoggedIn(true);
    const token = response?.credential;
    sessionStorage.setItem('authToken', token);
    // await sendTokenToBackend(token);
  };

  const onFailure = (response) => {
    console.log('Login Failed:', response);
  };

  return (
    <Container>
      <Header>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="icon position tabs example"
        >
          <Tab icon={<DocumentScannerIcon />} iconPosition="start" label="Scan" component={Link} to='/' style={{ color: 'white' }} />
          <Tab icon={<AssessmentIcon />} iconPosition="start" label="Report" component={Link} to='/Data' style={{ color: 'white' }} />
        </Tabs>
        {isLoggedIn && <Avatar
          sx={{ bgcolor: '#F4A460' }}
          alt="Remy Sharp"
          src="/broken-image.jpg"
        >
          B
        </Avatar>}
        {!isLoggedIn && (
          <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_OAUTH_PROVIDER_CLIENT_ID || 'foo_bar'}>

            <GoogleLogin
            onSuccess={credentialResponse => {onSuccess(credentialResponse)}}
            onError={() => { onFailure('')}}
            useOneTap
            auto_select
          />
        </GoogleOAuthProvider>
        )}
      </Header>
      <MainContent>
        <Routes>
          <Route path='/' element={<Receit />} />
          <Route path='/Data' element={<DataDis />} />
        </Routes>
        {/* <MiniDrawer/> */}
      </MainContent>
      <Footer>
        <small>Copyright © 4FD3 DIGITALIZING RECIEPTS</small>
      </Footer>
    </Container>
  );
}

async function sendTokenToBackend(token) {
  const apiUrl = `${process.env.REACT_APP_API_URL}/auth/google`;
  // Send this token to your server
  fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token }),
  })
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));


}


export default MainPage;