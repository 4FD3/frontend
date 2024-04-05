import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';



export default function StickyHeadTable({ style, dataT }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  if (!dataT || !dataT.items) {
    return <div>Loading...</div>;
  }
  const { items } = dataT;

  return (
    <Paper sx={style}>
      <h5>Receipt Details</h5>
      <TableContainer sx={{ height: 300, width: '100%' }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell style={{ width: '40%', backgroundColor: '#B0C4DE', color: '#4682B4' }}>Item Name</TableCell>
              <TableCell style={{ width: '0%', backgroundColor: '#B0C4DE', color: '#4682B4' }} align="right">Price</TableCell>
              <TableCell style={{ width: '40%', backgroundColor: '#B0C4DE', color: '#4682B4' }} align="right">Quantity</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">{item.itemName}</TableCell>
                <TableCell align="right">{item.price}</TableCell>
                <TableCell align="right">{item.quantity}</TableCell>
              </TableRow>
            ))}
            {dataT.total.map((total, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">{total.itemName}</TableCell>
                <TableCell align="right">{total.price}</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>))}
            {dataT.tax.map((tax, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">{tax.itemName}</TableCell>
                <TableCell align="right">{tax.price}</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>))}
            <TableRow>
              <TableCell component="th" scope="row">Store</TableCell>
              <TableCell align="right">{dataT.storeName}</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={items.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};