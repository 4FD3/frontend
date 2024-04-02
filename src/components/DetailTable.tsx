import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';



export default function StickyHeadTable({ style, dataT }){
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
    <Paper  sx={style}>
    <TableContainer  sx={{ height: 350, width: '100%' }}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell style={{ backgroundColor: '#B0C4DE', color: '#4682B4' }}>Item Name</TableCell>
            <TableCell style={{ backgroundColor: '#B0C4DE', color: '#4682B4' }} align="right">Price</TableCell>
            <TableCell style={{ backgroundColor: '#B0C4DE', color: '#4682B4' }} align="right">Quantity</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row">{item.name}</TableCell>
              <TableCell align="right">{item.price.toFixed(2)}</TableCell>
              <TableCell align="right">{item.quantity}</TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell component="th" scope="row">Total</TableCell>
            <TableCell align="right">{dataT.totalAmount.toFixed(2)}</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row">Store</TableCell>
            <TableCell align="right">{dataT.store.name}</TableCell>
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




// interface Column {
//   id: 'name' | 'value';
//   label: string;
//   minWidth?: number;
//   align?: 'right';
//   format?: (value: number) => string;
// }

// const columns: readonly Column[] = [
//   { id: 'name', label: 'Name', minWidth: 100 },
//   {
//     id: 'value',
//     label: 'Value',
//     minWidth: 150,
//     align: 'right',
//     format: (value: number) => value.toFixed(2),
//   },
// ];

// interface Data {
//   name: string;
//   value: string;
// }

// function createData(
//   name: string,
//   value: string,
// ): Data {
//   return { name, value };
// }

// const getData = (data) => {
//   let result: any[] = [];
//   if (data){
//   for (const [key, value] of Object.entries(data)) {
//     if (typeof value === 'string') {
//       result.push(createData(key, value));
//     } else if (typeof value === 'number') {
//       result.push(createData(key, value.toString()));
//     } else if (typeof value === 'object') {
//       if (Array.isArray(value)) {
//         value.map((v,i)=>{
//           if (typeof v === 'object') {
//             for (const [kk, vv] of Object.entries(v)) {
//               if (typeof vv === 'string') {
//                 result.push(createData(key+" "+(i+1)+" "+kk, vv));
//               }else if (typeof vv === 'number') {
//                 result.push(createData(key+" "+(i+1)+" "+kk, vv.toString()));
//               }
//             }
//           }
//         })
//       }else{
//       for (const [k, v] of Object.entries(value)) {
//         if (typeof v === 'string') {
//           result.push(createData(k, v));
//         }else if (typeof v === 'number') {
//           result.push(createData(k, v.toString()));
//         }
//       }}
//     }
//   };}
//   console.log("--------------- ",result)
//   return result;
// };

// export default function StickyHeadTable({ style, dataT }) {
//   const [page, setPage] = React.useState(0);
//   const [rowsPerPage, setRowsPerPage] = React.useState(10);
//   const [rows, setRows] = React.useState<Data[]>([]);

//   React.useEffect(() => {
//     setRows(getData(dataT));
//   }, [dataT]);
//   // const rows = getData(dataT);

//   const handleChangePage = (event: unknown, newPage: number) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setRowsPerPage(+event.target.value);
//     setPage(0);
//   };

//   return (
//     <Paper sx={style}>
//       <TableContainer sx={{ height: 350, width: '100%' }}>
//         <Table stickyHeader aria-label="sticky table">
//           <TableHead>
//             <TableRow>
//               {columns.map((column) => (
//                 <TableCell
//                   key={column.id}
//                   align={column.align}
//                   style={{ minWidth: column.minWidth, backgroundColor: '#B0C4DE', color: '#4682B4' }}
//                 >
//                   {column.label}
//                 </TableCell>
//               ))}
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {rows
//               .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//               .map((row,ind) => {
//                 return (
//                   <TableRow hover role="checkbox" tabIndex={-1} key={row.value+ind}>
//                     {columns.map((column) => {
//                       const value = row[column.id];
//                       return (
//                         <TableCell key={column.id} align={column.align}>
//                           {column.format && typeof value === 'number'
//                             ? column.format(value)
//                             : value}
//                         </TableCell>
//                       );
//                     })}
//                   </TableRow>
//                 );
//               })}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       <TablePagination
//         rowsPerPageOptions={[10, 25, 100]}
//         component="div"
//         count={rows.length}
//         rowsPerPage={rowsPerPage}
//         page={page}
//         onPageChange={handleChangePage}
//         onRowsPerPageChange={handleChangeRowsPerPage}
//       />
//     </Paper>
//   );
// }
