import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList } from 'react-window';
import Paper from '@mui/material/Paper';

function renderRow(props) {
    const { index, style } = props;

    return (
        <ListItem style={style} key={index} component="div" disablePadding>
            <ListItemButton>
                <ListItemText primary={`Receit ${index + 1}`} />
            </ListItemButton>
        </ListItem>
    );
}

export default function VirtualizedList(style) {
    return (
        <Paper
            sx={style}
        >
            <FixedSizeList
                height={400}
                width={360}
                itemSize={46}
                itemCount={200}
                overscanCount={5}
            >
                {renderRow}
            </FixedSizeList>
        </Paper>
    );
}