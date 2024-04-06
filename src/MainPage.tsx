import * as StyledComponents from 'styled-components';
import React, { useState, useEffect } from 'react';
// import Avatar from '@mui/material/Avatar';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Receit from './components/ReceitProvide.tsx';
import DataDis from './components/DataDisplay.tsx';
// import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import AssessmentIcon from '@mui/icons-material/Assessment';
import { styled, useTheme } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useMediaQuery } from '@mui/material';
import { Box } from '@mui/system';
import AccountMenu from './components/AccountMenu.tsx';
import TopRightDrawer from './components/Login.tsx';
import needlogin from './images/lgin.png';
import MultipleSelectCheckmarks from './components/DropdownCheck.tsx';
import { AuthContext } from './components/AuthContext.js';
import { useContext } from 'react';
import { SnackbarProvider, VariantType, useSnackbar } from 'notistack';


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
  const [value, setValue] = React.useState(0);
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [yearsdata, setYearsdata] = React.useState([]);
  const [area_chart_data, setArea_chart_data] = React.useState([{}]);
  const [radar_chart_data, setRadar_chart_data] = React.useState([{}]);
  
  const location = useLocation();
  const { enqueueSnackbar } = useSnackbar();

  const getYears = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/years`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          // Content-Type is automatically set for FormData
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log('years:', data);
        setYearsdata(data);
      } else {
        console.error('getting years list failed');
        enqueueSnackbar('getting years list failed');
      }
    } catch (error) {
      console.error('Error getting years list', error);
      enqueueSnackbar(error);
    }
  };

  const handleDrawerOpen = () => {
    setOpen(true);
    getYears();

  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
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

  const getWidth = () => window.innerWidth
    || document.documentElement.clientWidth
    || document.body.clientWidth;

  const getImageStyle = () => {
    let imageStyle = {
      width: '30%',
      height: 'auto',
      maxWidth: '600px',
      maxHeight: '337.5px',
      marginBottom: '20px',
      marginTop: '10px',
    };

    if (getWidth() < 600) {
      imageStyle = {
        ...imageStyle,
        marginTop: '30%',
      };
    }

    return imageStyle;
  };


  const imageStyle = getImageStyle();

  let { isLoggedIn, setIsLoggedIn, user_info, setUser_info } = useContext(AuthContext);

  return (
    <Container>
      <SnackbarProvider maxSnack={3}>
        <Header>
          <Box sx={{
            display: 'flex',
            flexDirection: 'row',
          }}
          ><script src="https://apis.google.com/js/platform.js" async defer></script>
            <Box sx={{
              display: 'flex',
              alignItems: 'center'
            }}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={() => { if (isLoggedIn) { handleDrawerOpen() } else { enqueueSnackbar("Please login.") } }}
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

          {isLoggedIn && <AccountMenu user_info={user_info} setUser_info={setUser_info} setIsLoggedIn={setIsLoggedIn} />}
          {!isLoggedIn && <TopRightDrawer isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setUser_info={setUser_info} />}

        </Header>
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
            keepMounted: true,
          }}

          anchor="left"

        >
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </DrawerHeader>
          <Divider sx={{ my: 2 }} />
          <Box sx={{ textAlign: 'center' }}>
            <h4>Charts Data Source</h4>
          </Box>
          <Divider />
          <MultipleSelectCheckmarks title_name={'Annual/Monthly Total'} years={yearsdata.map(item => item._id)} setFunc={setArea_chart_data} />
          <Divider sx={{ my: 2 }} />
          <MultipleSelectCheckmarks title_name={'Annual Consumption Category Ratio'} years={yearsdata.map(item => item._id)} setFunc={setRadar_chart_data} />


        </Drawer>
        <Main open={open}>
          <Routes>
            <Route path='/' element={<Receit isLoggedIn={isLoggedIn} />} />
            <Route path='/Data' element={isLoggedIn ? <DataDis area_chart_data={area_chart_data} radar_chart_data={radar_chart_data} /> : <div>
              <img src={needlogin} alt="Grocery Img" style={imageStyle} />
              <Box>
                <h2>Please Login...</h2>
              </Box>
            </div>} />
          </Routes>
        </Main>

        <Footer>
          <small>Copyright © 4FD3 DIGITALIZING RECIEPTS</small>
        </Footer>
      </SnackbarProvider>
    </Container>
  );
}



export default MainPage;