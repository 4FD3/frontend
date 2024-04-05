import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import { SnackbarProvider, VariantType, useSnackbar } from 'notistack';


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};



export default function MultipleSelectCheckmarks({ title_name, years, setFunc }) {
    const [specific_year, setSpecific_year] = React.useState<string[]>([]);
    const { enqueueSnackbar } = useSnackbar();


    const handleChange = (event: SelectChangeEvent<typeof specific_year>) => {
        const {
            target: { value },
        } = event;
        setSpecific_year(
            typeof value === 'string' ? value.split(',') : value,
        );
        if (value.length > 0) {
            if (title_name === 'Annual/Monthly Total') {
                handleMonthlyData(typeof value === 'string' ? value.split(',') : value);
            } else if (title_name === 'Annual Consumption Category Ratio') {
                handleRadarData(typeof value === 'string' ? value.split(',') : value);
            }
        } else {
            setFunc([{}]);
        }
    };
    const handleMonthlyData = async (selectedYears) => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/consumption_by_year`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
            },
            body: JSON.stringify({ years: selectedYears }),
        });
        if (response.ok) {
            const data = await response.json();
            setFunc(data);
            console.log(data); // Handle the data as needed
        } else {
            console.error('consumption_by_year failed');
            enqueueSnackbar('consumption_by_year failed');
        }
    };
    const handleRadarData = async (selectedYears) => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/radar_data`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
            },
            body: JSON.stringify({ years: selectedYears }),
        });
        if (response.ok) {
            const data = await response.json();
            setFunc(data);
            console.log(data); // Handle the data as needed
        } else {
            console.error('consumption_by_year failed');
            enqueueSnackbar('consumption_by_year failed');
        }
    };

    return (
        <Box sx={{ padding: '4%' }}>
            <SnackbarProvider maxSnack={3}>
                <FormControl sx={{ m: 0.2, width: 220 }}>
                    <InputLabel id={title_name} sx={{ fontSize: '0.875rem' }}>{title_name}</InputLabel>
                    <Select
                        labelId={title_name}
                        id={title_name}
                        multiple
                        value={specific_year}
                        onChange={handleChange}
                        input={<OutlinedInput label={title_name} sx={{ height: '40px' }} />}
                        renderValue={(selected) => selected.join(', ')}
                        MenuProps={MenuProps}

                    >
                        {years.map((year) => (
                            <MenuItem key={year} value={year} sx={{ py: 0.5, fontSize: '0.875rem' }}>
                                <Checkbox checked={specific_year.indexOf(year) > -1} size="small" />
                                <ListItemText primary={year} />
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </SnackbarProvider>
        </Box>
    );
}