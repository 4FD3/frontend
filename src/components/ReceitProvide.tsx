import backgroundImg from '../images/outry.png';
import React, { useState } from 'react';
import { Camera } from './Camera.tsx';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ForwardIcon from '@mui/icons-material/Forward';
import Modal from '@mui/material/Modal';


export default function Receit() {

    const [photoOpen, setPhotoOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [imageSrc, setImageSrc] = useState(null);

    const styleVideo = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '80vh',
        width: '50vw',
        backgroundColor: 'green',
        boxShadow: 24,
        p: 4,
        outline: 'none',
        margin: 'auto',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    };

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImageSrc(e.target.result);
            };
            reader.readAsDataURL(file);
        }else{
            console.log('file null or type not start with image');
        }
        event.target.value = '';
    };

    const handleFileUpload = async () => {
        if (selectedFile) {
            const formData = new FormData();
            formData.append('file', selectedFile);
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/receipts/`, {
                    method: 'POST',
                    body: formData,
                    credentials: 'include',
                    headers: {
                        'Authorization': `Bearer ${sessionStorage.getItem('authToken')}`,
                      },
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log('Image recognition result:', data);
                    // Handle the response data
                } else {
                    console.error('Upload failed');
                }
            } catch (error) {
                console.error('Error uploading image', error);
            }
        }
    };
    const getWidth = () => window.innerWidth 
    || document.documentElement.clientWidth 
    || document.body.clientWidth;
  
  const getImageStyle = () => {
    let imageStyle = {
      width: '100%',
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
  
    return (
        <div>
            <img src={backgroundImg} alt="Grocery Img" style={ imageStyle } />
            <br /><br />
            {photoOpen && <Camera setPhotoOpen={setPhotoOpen} />}

            {imageSrc &&
                <div>
                    <Modal
                        open={true}
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '100vh'
                        }}
                        aria-labelledby='modal-modal-title'
                        aria-describedby='modal-modal-description'
                    >
                        <Box sx={{ styleVideo }}>
                            <img src={imageSrc} alt="Uploaded" style={{ maxWidth: '100%', maxHeight: '300px' }} />
                            <Box sx={{ textAlign: 'right' }}>
                                <IconButton size="large" style={{ color: '#FFA500' }} onClick={() => { setImageSrc(null); setSelectedFile(null); }}><DeleteOutlineIcon /></IconButton>
                                <IconButton size="large" style={{ color: '#FFA500' }} onClick={() => { handleFileUpload(); setImageSrc(null); setSelectedFile(null); }}><ForwardIcon /></IconButton>
                            </Box>
                        </Box>
                    </Modal>
                </div>
            }

            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4, alignItems: 'center', marginTop: '20px' }}>
                <Button style={{ borderRadius: '25px', backgroundColor: '#4682B4', padding: 10, color: 'white', width: '150px' }} onClick={() => setPhotoOpen(true)}>Take A Photo</Button>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                    id="image-upload"
                />
                <label htmlFor="image-upload">
                    <Button style={{ borderRadius: '25px', backgroundColor: '#F4A460', padding: 10, color: 'black', width: '150px' }} onClick={() => document.getElementById('image-upload').click()}>Upload Receit</Button>
                </label>
            </Box>
        </div>
    );
}