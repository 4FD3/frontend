import React, { useEffect, useRef, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import ForwardIcon from '@mui/icons-material/Forward';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';


export function Camera({ setPhotoOpen }) {

  const videoRef = useRef(null);
  const [image, setImage] = useState('');
  const [streamStarted, setStreamStarted] = useState(false);

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

  useEffect(() => {
    getVideoStream();
    return () => {
      stopVideoStream();
    };
  }, [])

  const getVideoStream = async () => {
    try {
      setStreamStarted(true);
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = mediaStream;

    } catch (error) {
      console.error('Error accessing the camera', error);
    }
  };

  const stopVideoStream = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach(track => {
        console.log('before fired:', track.readyState);
        track.stop();
      });

      // Wait a few seconds to see if the onended event fires
      setTimeout(() => {
        console.log('Checking state after delay');
        tracks.forEach(track => console.log(track.readyState));
      }, 3000);

      videoRef.current.srcObject = null;
      setStreamStarted(false);
      window.location.reload();
    }
  };

  const dataURLtoBlob = (dataurl) => {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new Blob([u8arr], { type: mime });
  }

  const takePicture = () => {
    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0);
    const imageDataUrl = canvas.toDataURL('image/png');
    setImage(imageDataUrl);
  };

  const handleClose = () => {
    setPhotoOpen(false);
    window.location.reload();
  };

  const sendImageToOCR = async (imageDataUrl) => {
    if (imageDataUrl !== '') {
      const imageBlob = dataURLtoBlob(imageDataUrl);
      const imageFile = new File([imageBlob], "receipt.png", { type: 'image/png' });
      const formData = new FormData();
      formData.append('file', imageFile);

      try {
        const response = await fetch('url', {
          method: 'POST',
          body: formData,
          // Add headers if required by the OCR service
        });

        if (response.ok) {
          const data = await response.json();
          console.log('OCR Result:', data);
          // Handle the OCR data
        } else {
          console.error('OCR failed', response);
        }
      } catch (error) {
        console.error('Error sending image to OCR', error);
      }
    } else {
      console.log('Cannot send image to OCR. Image url is empty string.');
    }
  };

  return (
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
          {streamStarted && !image && (
            <video
              ref={videoRef}
              autoPlay
              style={{ width: '100%' }}
            ></video>
          )}
          {image && <img src={image} alt="Captured" style={{ width: '100%' }} />}
          <Box sx={{ textAlign: 'right' }}>
            {streamStarted && !image && (
              <IconButton style={{ color: '#FFA500' }} size="large" onClick={takePicture}><PhotoCameraIcon /></IconButton>
            )}
            {image && <IconButton size="large" style={{ color: '#FFA500' }} onClick={() => { setImage(''); getVideoStream() }}><DeleteOutlineIcon /></IconButton>}
            {image && <IconButton size="large" style={{ color: '#FFA500' }} onClick={() => { stopVideoStream(); sendImageToOCR(image); setImage(''); handleClose(); }}><ForwardIcon /></IconButton>}
            {!image && <IconButton size="large" style={{ color: '#FFA500' }} onClick={() => { setImage(''); handleClose(); stopVideoStream(); }}><HighlightOffIcon /></IconButton>}
          </Box>
        </Box>
      </Modal>
    </div>
  )
}