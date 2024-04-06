import backgroundImg from '../images/outry.png';
import React, { useState } from 'react';
import { Camera } from './Camera.tsx';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ForwardIcon from '@mui/icons-material/Forward';
import Modal from '@mui/material/Modal';
import { EditModal } from './EditReceipt.tsx';
import CircularProgress from '@mui/material/CircularProgress';
import { SnackbarProvider, VariantType, useSnackbar } from 'notistack';

export default function Receit({ isLoggedIn }) {

  const [photoOpen, setPhotoOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data_edit, setData_edit] = useState(null);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
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
    } else {
      console.log('file null or type not start with image');
    }
    event.target.value = '';
  };

  function GradientCircularProgress() {
    return (
      <React.Fragment>
        <svg width={0} height={0}>
          <defs>
            <linearGradient id="my_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#e01cd5" />
              <stop offset="100%" stopColor="#1CB5E0" />
            </linearGradient>
          </defs>
        </svg>
        <CircularProgress sx={{ 'svg circle': { stroke: 'url(#my_gradient)' } }} />
      </React.Fragment>
    );
  }

  const handleSaveChanges = async (updatedData) => {
    // Send updated data to backend
    let sentData = updatedData;
    sentData.items = sentData.items.filter(item => item);
    sentData.tax = sentData.tax.filter(item => item);
    sentData.total = sentData.total.filter(item => item);
    console.log(sentData);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/receipts/insertData`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
        body: JSON.stringify(sentData),
      });

      if (response.ok) {
        window.location.reload();
        console.log('Data saved successfully');
        enqueueSnackbar('Receipt saved successfully');
      } else {
        // Handle server error response
        window.location.reload();
        console.error('Server error');
        enqueueSnackbar('Server error');
      }
    } catch (error) {
      // Handle network error
      window.location.reload();
      console.error('Network error:', error);
      enqueueSnackbar(error);
    }

    setIsModalOpen(false);
  };


  async function handleFileUpload() {
    if (selectedFile) {
      setLoading(true);
      const reader = new FileReader();

      reader.onload = async (event) => {
        const img = new Image();
        img.onload = async () => {
          // Create a canvas and get its context
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          canvas.width = img.width;
          canvas.height = img.height;

          // Draw the image onto the canvas
          ctx.drawImage(img, 0, 0);

          // Apply increaseContrast directly on the canvas
          increaseContrast(ctx);

          // Convert the canvas content back to a Blob
          canvas.toBlob(async (blob) => {
            // Append the Blob to FormData
            const formData = new FormData();
            formData.append('file', blob, 'modified-image.png');

            // Upload the modified image
            try {
              const response = await fetch(`${process.env.REACT_APP_API_URL}/api/receipts/upload`, {
                method: 'POST',
                body: formData,
                headers: {
                  'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                  // Content-Type is automatically set for FormData
                },
              });

              if (response.ok) {
                const data = await response.json();
                console.log('Image recognition result:', data);
                setLoading(false);
                setData_edit(data);
                setIsModalOpen(true);
              } else {
                console.error('Upload failed');
                enqueueSnackbar('Upload failed');
              }
            } catch (error) {
              console.error('Error uploading image', error);
              enqueueSnackbar(error);
            }
          }, 'image/png');
        };
        img.src = event.target.result;
      };

      reader.readAsDataURL(selectedFile);
    }
  }

  // Increase contrast function
  function increaseContrast(ctx) {
    const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
    const data = imageData.data;

    // Algorithm to increase contrast
    for (let i = 0; i < data.length; i += 4) {
      // Modify pixel data; simplistic contrast increase for demonstration
      data[i] = (data[i] - 128) * 1.1 + 128; // R
      data[i + 1] = (data[i + 1] - 128) * 1.1 + 128; // G
      data[i + 2] = (data[i + 2] - 128) * 1.1 + 128; // B
      // Alpha (data[i + 3]) is unchanged
    }

    // Put the modified image data back to the canvas
    ctx.putImageData(imageData, 0, 0);
  }



  const getWidth = () => window.innerWidth
    || document.documentElement.clientWidth
    || document.body.clientWidth;

  // Function to dynamically generate the image style based on screen width
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
      <SnackbarProvider maxSnack={3}>
        <img src={backgroundImg} alt="Grocery Img" style={imageStyle} />
        <br /><br />
        {photoOpen && <Camera setPhotoOpen={setPhotoOpen} setLoading={setLoading} setData_edit={setData_edit} setIsModalOpen={setIsModalOpen}/>}
        {isModalOpen && <EditModal data={data_edit} onSave={handleSaveChanges} />}

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
          <Button style={{ borderRadius: '25px', backgroundColor: '#4682B4', padding: 10, color: 'white', width: '150px' }} onClick={() => { if (isLoggedIn) { setPhotoOpen(true) } else { enqueueSnackbar("Please login.") } }}>Take A Photo</Button>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: 'none' }}
            id="image-upload"
          />
          <label htmlFor="image-upload">
            <Button style={{ borderRadius: '25px', backgroundColor: '#F4A460', padding: 10, color: 'black', width: '150px' }} onClick={() => { if (isLoggedIn) { document.getElementById('image-upload').click() } else { enqueueSnackbar("Please login.") } }}>Upload Receipt</Button>
          </label>
        </Box>
        {loading && <Box sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <GradientCircularProgress /></Box>}
      </SnackbarProvider>
    </div>
  );
}