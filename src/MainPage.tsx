import * as StyledComponents from 'styled-components';
import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Receit from './components/ReceitProvide.tsx';
import DataDis from './components/DataDisplay.tsx';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import AssessmentIcon from '@mui/icons-material/Assessment';
import { styled, useTheme } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import BarChartIcon from '@mui/icons-material/BarChart';
import BubbleChartIcon from '@mui/icons-material/BubbleChart';
import { useMediaQuery } from '@mui/material';
import { Box } from '@mui/system';

const themel = {
  primary: '#4682B4',
  secondary: '#6c757d',
  accent: '#28a745',
  light: '#f8f9fa',
  dark: '#343a40',
  backgrnd: '#B0C4DE',
  btn: '#FFA500',
  white: '#FFFFFF'
};

const Container = StyledComponents.styled.div`
    font-family: 'Arial', sans-serif;
    color: ${themel.dark};
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  `;

const Header = StyledComponents.styled.header`
    background-color: ${themel.primary};
    color: ${themel.light};
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-grow: 0;
  `;

// const MainContent = StyledComponents.styled.main`
//     text-align: center;
//     padding: 2rem;
//     background-image: linear-gradient(to bottom right, ${themel.light}, ${themel.backgrnd});
//     background-size: cover;    
//     flex-grow: 1;
//   `;

const Footer = StyledComponents.styled.footer`
    background-color: ${themel.primary};
    color: ${themel.backgrnd};
    padding: 1rem;
    text-align: center;    
  `;
const drawerWidth = 240;



function MainPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [value, setValue] = React.useState(0);
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const location = useLocation();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

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

  async function onSuccess(response) {
    console.log('Login Success:', response);
    setIsLoggedIn(true);
    const token = response?.credential;
    sessionStorage.setItem('authToken', token);
    // await sendTokenToBackend(token);
  };

  const onFailure = (response) => {
    console.log('Login Failed:', response);
  };

  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  }));
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
    open?: boolean;
  }>(({ theme, open }) => ({
    textAlign: "center",
    backgroundImage: `linear-gradient(to bottom right, ${themel.light}, ${themel.backgrnd})`,
    backgroundSize: "cover",
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: 0,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: isMobile ? 0 : `${drawerWidth}px`,
    }),
  }));

  return (
    <Container>
      <Header>
        <Box sx={{
          display: 'flex',
          flexDirection: 'row',
        }}
        >
          <Box sx={{
            display: 'flex',
            alignItems: 'center'
          }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                mr: 2,
                display: isMobile ? 'flex' : open ? 'none' : 'flex',
                ...(location.pathname === '/' && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="icon position tabs example"
          >
            <Tab icon={<DocumentScannerIcon />} iconPosition="start" label="Scan" component={Link} to='/' style={{ color: 'white' }} />
            <Tab icon={<AssessmentIcon />} iconPosition="start" label="Report" component={Link} to='/Data' style={{ color: 'white' }} />
          </Tabs>
        </Box>

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
              onSuccess={credentialResponse => { onSuccess(credentialResponse) }}
              onError={() => { onFailure('') }}
              useOneTap
              auto_select
            />
          </GoogleOAuthProvider>
        )}
      </Header>
      {/* <MainContent> */}
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundImage: `linear-gradient(to bottom right, ${themel.light}, ${themel.backgrnd})`,
          },
        }}
        variant={isMobile ? 'temporary' : 'persistent'}
        open={open}
        onClose={isMobile ? handleDrawerClose : undefined}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        // variant="persistent"
        anchor="left"
      // open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {['Mode 1', 'Mode 2', 'Mode 3', 'Mode 4'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <BarChartIcon /> : <BubbleChartIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['Mode 1', 'Mode 2', 'Mode 3'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <BarChartIcon /> : <BubbleChartIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Main open={open}>
        <Routes>
          <Route path='/' element={<Receit />} />
          <Route path='/Data' element={<DataDis />} />
        </Routes>
      </Main>
      {/* </MainContent> */}
      <Footer>
        <small>Copyright © 4FD3 DIGITALIZING RECIEPTS</small>
      </Footer>
    </Container>
  );
}



export default MainPage;