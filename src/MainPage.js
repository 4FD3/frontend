import styled from 'styled-components';
import React from 'react';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import { Routes, Route, Link } from 'react-router-dom';
import Receit from './components/ReceitProvide.tsx';
import DataDis from './components/DataDisplay.tsx';


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

  return (
    <Container>
      <Header>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button style={{ color: 'white', width: '150px' }} component={Link} to='/'>Provide Receit</Button>
          <Button style={{ color: 'white', width: '150px' }} component={Link} to='/Data'>Check Report</Button>
        </Box>
        <Avatar
          sx={{ bgcolor: '#F4A460' }}
          alt="Remy Sharp"
          src="/broken-image.jpg"
        >
          B
        </Avatar>
      </Header>
      <MainContent>
        <Routes>
          <Route path='/' element={<Receit />} />
          <Route path='/Data' element={<DataDis />} />
        </Routes>
      </MainContent>
      <Footer>
        Copyright ©
      </Footer>
    </Container>
  );
}

export default MainPage;
