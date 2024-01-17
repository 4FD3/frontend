import backgroundImg from '../images/outry.png';
import React, { useState } from 'react';
import { Camera } from './Camera.tsx';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';


export default function Receit() {
    const [photoOpen, setPhotoOpen] = useState(false);

    return (
        <div>
            <img src={backgroundImg} alt="Grocery Img" style={{
                width: '100%',
                height: 'auto',
                maxWidth: '600px',
                maxHeight: '337.5px',
                marginBottom: '20px'
            }} />
            <br /><br />
            {photoOpen && <Camera setPhotoOpen={setPhotoOpen} />}
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4, alignItems: 'center', marginTop: '20px' }}>
                <Button style={{ borderRadius: '25px', backgroundColor: '#4682B4', padding: 10, color: 'white', width: '150px' }} onClick={() => setPhotoOpen(true)}>Take A Photo</Button>
                <Button style={{ borderRadius: '25px', backgroundColor: '#F4A460', padding: 10, color: '#4682B4', width: '150px' }} >Upload Receit</Button>
            </Box><br />
        </div>
    );
}