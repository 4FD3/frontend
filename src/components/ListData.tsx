import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList } from 'react-window';
import Paper from '@mui/material/Paper';

function renderRow({data,setReceiptContentIndex}) {

    return function({ index, style }){
    
    return (
        <ListItem style={style} key={index} component="div" disablePadding>
            <ListItemButton onClick={()=>setReceiptContentIndex(index)}>
                <ListItemText primary={`Receit ${data[index].dateOfReceipt}`} />
            </ListItemButton>
        </ListItem>
    );}
}

export default function VirtualizedList({style,data,setReceiptContentIndex}) {
    return (
        <Paper
            sx={style}
        >
            <FixedSizeList
                height={400}
                width={360}
                itemSize={46}
                itemCount={data?data.length:0}
                overscanCount={5}
            >
                {renderRow({data, setReceiptContentIndex})}
            </FixedSizeList>
        </Paper>
    );
}