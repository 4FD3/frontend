import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList } from 'react-window';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { SnackbarProvider, VariantType, useSnackbar } from 'notistack';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function renderRow({ data, setReceiptContentIndex }) {

    return function ({ index, style }) {
        const { enqueueSnackbar } = useSnackbar();
        const [open, setOpen] = React.useState(false);

        const handleClickOpen = () => {
            setOpen(true);
        };

        const handleClose = () => {
            setOpen(false);
        };
        const handleDeleteReceipt = async (index) => {
            const receiptId = data[index]._id;
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/receipts/${receiptId}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                    },

                });

                if (response.ok) {
                    const data = await response.json();
                    enqueueSnackbar(data)
                    console.log('get pie data:', data);
                    // Handle the response data
                } else {
                    console.error('get data failed');
                    enqueueSnackbar('get data failed');
                }
            } catch (error) {
                console.error('Error get data', error);
                enqueueSnackbar(error);
            }
        }

        return (
            <SnackbarProvider maxSnack={3}>
                <ListItem style={style} key={index} component="div" disablePadding>
                    <ListItemButton onClick={() => setReceiptContentIndex(index)}>
                        <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Box>
                                <IconButton size="small" style={{ color: '#FFA500' }} onClick={handleClickOpen}><CloseIcon /></IconButton>
                            </Box>
                            <ListItemText primary={`Receit ${data[index].createdAt}`} />
                            <Dialog
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <DialogTitle id="alert-dialog-title" sx={{ backgroundColor: `#B0C4DE` }}>
                                    Once deleted, you cannot recover it.
                                </DialogTitle>
                                <DialogContent sx={{ backgroundColor: `#B0C4DE` }}>
                                    <DialogContentText id="alert-dialog-description" sx={{ backgroundColor: `#B0C4DE` }}>
                                        {`Do you want to delete Receit ${data[index].createdAt}?`}
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions sx={{ backgroundColor: `#B0C4DE` }}>
                                    <Button onClick={handleClose} autoFocus>Cancel</Button>
                                    <Button onClick={() => { handleDeleteReceipt(index); handleClose(); window.location.reload(); }}>
                                        Delete
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </Box>
                    </ListItemButton>
                </ListItem>

            </SnackbarProvider>
        );
    }
}

export default function VirtualizedList({ style, data, setReceiptContentIndex }) {

    return (
        <Paper
            sx={style}
        >
            <h5>Receipts History</h5>
            <FixedSizeList
                height={370}
                width={360}
                itemSize={46}
                itemCount={data ? data.length : 0}
                overscanCount={5}
            >
                {renderRow({ data, setReceiptContentIndex })}
            </FixedSizeList>
        </Paper>
    );
}