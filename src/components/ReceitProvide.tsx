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
        }

    };

    const handleFileUpload = async () => {
        if (selectedFile) {
            const formData = new FormData();
            formData.append('file', selectedFile);
            try {
                const response = await fetch('url', {
                    method: 'POST',
                    body: formData,
                    // Include headers if required by your API
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
                                <IconButton size="large" style={{ color: '#FFA500' }} onClick={() => { setImageSrc(null); }}><DeleteOutlineIcon /></IconButton>
                                <IconButton size="large" style={{ color: '#FFA500' }} onClick={() => { handleFileUpload(); setImageSrc(null); }}><ForwardIcon /></IconButton>
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
                    <Button style={{ borderRadius: '25px', backgroundColor: '#F4A460', padding: 10, color: '#4682B4', width: '150px' }} onClick={() => document.getElementById('image-upload').click()}>Upload Receit</Button>
                </label>
            </Box>
        </div>
    );
}