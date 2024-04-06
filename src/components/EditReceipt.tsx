import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddIcon from '@mui/icons-material/Add';
import StorefrontIcon from '@mui/icons-material/Storefront';
import Input from '@mui/material/Input';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

export function EditModal({ data, onSave }) {
    const [editableData, setEditableData] = useState(data);
    const [open, setOpen] = useState(true);

    const categories = [{ value: "grocery", label: "Grocery" },
    { value: "electronics", label: "Electronics" },
    { value: "home", label: "Home&Gardon" },
    { value: "apparel", label: "Apparel" },
    { value: "health", label: "Health&Beauty" },
    { value: "others", label: "Others" }];

    const handleChange = (e, index, type) => {
        // Clone the current data to avoid direct state mutation
        const newData = { ...editableData };

        if (type === 'items' || type === 'tax' || type === 'total') {
            // Update the specified item's name or price
            newData[type][index][e.target.name] = e.target.value;
            console.log("````````````", e.target.name, e.target.value)
        } else if (type === 'storeName') {
            newData[type] = e.target.value;
        }

        setEditableData(newData);
    };

    function addItem() {
        const newItem = { itemName: '', price: '' };
        const newItems = [...editableData.items, newItem];
        setEditableData({ ...editableData, items: newItems });
    }
    function addTotal() {
        const newTotal = { itemName: '', price: '' };
        const newtotals = [...editableData.total, newTotal];
        setEditableData({ ...editableData, total: newtotals });
    }

    function deleteItem(typ, index) {
        let newEditableData = { ...editableData };

        if (typ === 'items') {
            newEditableData.items = editableData.items.filter((_, i) => i !== index);
        } else if (typ === 'tax') {
            newEditableData.tax = editableData.tax.filter((_, i) => i !== index);
        } else if (typ === 'total') {
            newEditableData.total = editableData.total.filter((_, i) => i !== index);
        }

        setEditableData(newEditableData);
    }



    const handleClose = () => { setOpen(false); window.location.reload(); }
    return (
        <div>
            <Dialog
                open={open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{ backgroundImage: `linear-gradient(to top left, #f8f9fa, #B0C4DE)` }}
            >
                <Box sx={{ border: '1px solid black', padding: '20px', margin: '20px', backgroundImage: `linear-gradient(to bottom right, #f8f9fa, #B0C4DE)` }}>
                    <h2>Edit Data</h2>
                    {/* Example for items, similarly implement for tax and total */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}><h3>Items</h3>
                        <Box>
                            <IconButton size="small" style={{ color: '#FFA500' }} onClick={() => { addItem() }}><AddIcon /></IconButton>
                        </Box>
                    </Box>
                    {editableData.items.map((item, index) => (
                        item ?
                            <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Box>
                                    <IconButton size="small" style={{ color: '#FFA500' }} onClick={() => { deleteItem("items", index) }}><DeleteOutlineIcon /></IconButton>
                                </Box>
                                <Box>
                                    <Input
                                        name="itemName"
                                        value={item.itemName}
                                        onChange={(e) => handleChange(e, index, 'items')}
                                    />
                                    <Input
                                        name="price"
                                        value={item.price}
                                        type="number"
                                        onChange={(e) => handleChange(e, index, 'items')}
                                        sx={{ width: '30%' }}
                                    />
                                    <Input
                                        name="quantity"
                                        value={item.quantity}
                                        type="number"
                                        inputProps={{ min: 0 }}
                                        onChange={(e) => handleChange(e, index, 'items')}
                                        sx={{ width: '9%' }}
                                    />
                                    <TextField
                                        id="standard-select-currency"
                                        name="category"
                                        select
                                        // defaultValue="grocery"
                                        value={item.category}
                                        variant="standard"
                                        onChange={(e) => handleChange(e, index, 'items')}
                                        sx={{ width: 90 }}
                                    >
                                        {categories.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>

                                </Box>
                            </Box> : null
                    ))}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <h3>Others</h3>
                        <Box>
                            <IconButton size="small" style={{ color: '#FFA500' }} onClick={() => { addTotal() }}><AddIcon /></IconButton>
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Box>
                            <IconButton size="small" style={{ color: '#FFA500' }} ><StorefrontIcon /></IconButton>
                        </Box>
                        <Box>
                            <Input
                                name="StoreName"
                                value={'Store'}
                                readOnly={true}
                            />
                            <Input
                                name="Store"
                                value={editableData.storeName}
                                onChange={(e) => handleChange(e, -1, 'storeName')}
                            />
                        </Box>
                    </Box>
                    {editableData.tax.map((item, index) => (
                        item ?
                            <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Box>
                                    <IconButton size="small" style={{ color: '#FFA500' }} onClick={() => { deleteItem("tax", index) }}><DeleteOutlineIcon /></IconButton>
                                </Box>
                                <Box>

                                    <Input
                                        name="itemName"
                                        value={item.itemName}
                                        onChange={(e) => handleChange(e, index, 'tax')}
                                    />
                                    <Input
                                        name="price"
                                        value={item.price}
                                        type="number"
                                        onChange={(e) => handleChange(e, index, 'tax')}
                                    />
                                </Box>
                            </Box> : null
                    ))}
                    {editableData.total.map((item, index) => (
                        item ?
                            <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Box>
                                    <IconButton size="small" style={{ color: '#FFA500' }} onClick={() => { deleteItem("total", index) }}><DeleteOutlineIcon /></IconButton>
                                </Box>
                                <Box>
                                    <Input
                                        name="itemName"
                                        value={item.itemName}
                                        onChange={(e) => handleChange(e, index, 'total')}
                                    />
                                    <Input
                                        name="price"
                                        value={item.price}
                                        type="number"
                                        onChange={(e) => handleChange(e, index, 'total')}
                                    />
                                </Box>
                            </Box> : null
                    ))}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={() => onSave(editableData)}>Save Changes</Button>
                    </Box>
                </Box>
            </Dialog>
        </div>
    );
}
