import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import LoginIcon from '@mui/icons-material/Login';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';

export default function TopRightDrawer({isLoggedIn, setIsLoggedIn}) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    // const [isLoggedIn, setIsLoggedIn] = useState(false);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    async function onSuccess(response) {
        console.log('Login Success:', response.clientId);
        setIsLoggedIn(true);
        const token = response?.credential;
        sessionStorage.setItem('authToken', token);
        // await sendTokenToBackend(token);
    };

    const onFailure = (response) => {
        console.log('Login Failed:', response);
    };
    function loginWithGoogle() {
        window.location.href = `${process.env.REACT_APP_API_URL}/oauth2/authorization/google`;
      }

    return (
        <div>
            
            <Button
                color= "inherit"
                id="fade-button"
                aria-controls={open ? 'fade-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <LoginIcon />&nbsp;
                Login
            </Button>
            <Menu
                id="fade-menu"
                MenuListProps={{
                    'aria-labelledby': 'fade-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}                
            >
                <Typography sx={{padding: 5}}>Use Your Google Account:</Typography>
                <MenuItem onClick={handleClose}>
                    <div style={{ width: '100%', overflow: 'hidden',textAlign: 'center', padding: '10px' }}>
                    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_OAUTH_PROVIDER_CLIENT_ID || 'foo_bar'}>
                        <GoogleLogin
                            onSuccess={credentialResponse => { onSuccess(credentialResponse) }}
                            onError={() => { onFailure('') }}
                            useOneTap
                            auto_select
                        />
                    </GoogleOAuthProvider>
                    </div>
                </MenuItem>
                
            </Menu>
        </div>
    );
}