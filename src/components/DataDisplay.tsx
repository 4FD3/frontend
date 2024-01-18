import React from 'react';
import Box from '@mui/material/Box';
import backgroundImg from '../images/sorry.png';


export default function DataDis() {

    return (
        <div>
            <img src={backgroundImg} alt="Grocery Img" style={{
                width: '100%',
                height: 'auto',
                maxWidth: '600px',
                maxHeight: '337.5px',
                marginBottom: '20px'
            }} />
            <Box>
                <h2>Sorry, no data available...</h2>
            </Box>
        </div>
    );
}