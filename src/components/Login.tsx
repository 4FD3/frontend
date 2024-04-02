import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import LoginIcon from '@mui/icons-material/Login';
import { jwtDecode } from "jwt-decode";
import { GoogleLogin, GoogleOAuthProvider , } from '@react-oauth/google';
export default function TopRightDrawer({isLoggedIn, setIsLoggedIn}) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    // const [isLoggedIn, setIsLoggedIn] = useState(false);
    const open = Boolean(anchorEl);

    useEffect(() => {
        const token = sessionStorage.getItem('authToken');
        const expiresAt = sessionStorage.getItem('expiresAt');
        const now = new Date();
    
        if (token && expiresAt && now.getTime() < parseInt(expiresAt)) {
            setIsLoggedIn(true);
        } else {
            // Token is expired or not present
            sessionStorage.removeItem('authToken');
            sessionStorage.removeItem('expiresAt');
            setIsLoggedIn(false);
        }
    }, [setIsLoggedIn]);
    

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
        const decodedToken = jwtDecode(token) as { exp: number };

        const expiresAt = decodedToken.exp * 1000;
        sessionStorage.setItem('authToken', token);
        sessionStorage.setItem('expiresAt', expiresAt.toString());
    

        sessionStorage.setItem('authToken', token);
        await sendTokenToBackend(token);
    };

    const onFailure = (response) => {
        console.log('Login Failed:', response);
    };

    async function sendTokenToBackend(token) {
        const apiUrl = `${process.env.REACT_APP_API_URL}/api/auth/google`;
        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ token }),
        })
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(error => console.error('Error:', error));
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