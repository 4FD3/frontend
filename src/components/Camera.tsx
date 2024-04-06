import React, { useEffect, useRef, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import ForwardIcon from '@mui/icons-material/Forward';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { SnackbarProvider, VariantType, useSnackbar } from 'notistack';
import CameraswitchIcon from '@mui/icons-material/Cameraswitch';

export function Camera({ setPhotoOpen,setLoading,setData_edit,setIsModalOpen }) {
  
  const videoRef = useRef(null);
  const [image, setImage] = useState('');
  const [multi_cam, setMulti_cam] = useState(false);
  const [streamStarted, setStreamStarted] = useState(false);
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
  useEffect(() => {
    setDefaultCamera();
    return () => {
      const video = videoRef.current;
      if (video && video.srcObject) {
        video.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

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
  async function getCameras() {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      return devices.filter(device => device.kind === 'videoinput');
    } catch (error) {
      console.error('Error fetching devices:', error);
    }
  }
  async function setDefaultCamera() {
    const cameras = await getCameras();
    if (cameras) {
      if (cameras.length === 0) {
        throw new Error('No camera found.');
      } else if (cameras.length > 1) {
        setMulti_cam(true);
      } else if (cameras.length === 1) {
        setMulti_cam(false);
      }
      let backCamera = cameras[0]; // Default to the first camera if back camera is not identified

      for (let camera of cameras) {
        if ('label' in camera && camera.label.toLowerCase().includes('back')) {
          backCamera = camera;
          break;
        }
      }

      startVideoStream(backCamera.deviceId);
    }
  }
  function startVideoStream(deviceId) {
    navigator.mediaDevices.getUserMedia({
      video: { deviceId: { exact: deviceId } }
    }).then(stream => {
      const video = videoRef.current;
      if (video) {
        video.srcObject = stream;
      }
    }).catch(error => {
      console.error('Error accessing the camera:', error);
    });
  }
  const [currentCameraIndex, setCurrentCameraIndex] = useState(0);

  async function switchCamera() {
    const cameras = await getCameras();
    if (cameras && cameras.length > 1) {
      const nextCameraIndex = (currentCameraIndex + 1) % cameras.length;
      setCurrentCameraIndex(nextCameraIndex);
      startVideoStream(cameras[nextCameraIndex].deviceId);
    }
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
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/receipts/upload`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
            // Content-Type is automatically set for FormData
          },
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Image recognition result:', data);
          setLoading(false);
          setData_edit(data);
          setIsModalOpen(true);
          setImage('');
          setPhotoOpen(false);
        } else {
          console.error('Upload failed');
          setImage('');
          handleClose();
          enqueueSnackbar('Upload failed');          
        }
      } catch (error) {
        console.error('Error sending image to OCR', error);
        setImage('');
        handleClose();
        enqueueSnackbar(error);
      }
    } else {
      console.log('Cannot send image to OCR. Image url is empty string.');
      setImage('');
      handleClose();
      enqueueSnackbar('Cannot send image to OCR. Image url is empty string.');
    }
  };

  return (
    <div>
      <SnackbarProvider maxSnack={3}>
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
              {!image && multi_cam && <IconButton size="large" style={{ color: '#FFA500' }} onClick={() => { switchCamera() }}><CameraswitchIcon /></IconButton>}
              {image && <IconButton size="large" style={{ color: '#FFA500' }} onClick={() => { stopVideoStream(); sendImageToOCR(image); }}><ForwardIcon /></IconButton>}
              {!image && <IconButton size="large" style={{ color: '#FFA500' }} onClick={() => { setImage(''); handleClose(); stopVideoStream(); }}><HighlightOffIcon /></IconButton>}
            </Box>
          </Box>
        </Modal>
      </SnackbarProvider>
    </div>
  )
}