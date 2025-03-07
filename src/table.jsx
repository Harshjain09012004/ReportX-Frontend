import * as React from 'react';
import axios from 'axios';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import PropTypes from "prop-types";

const columns = [
  { id: 'title', label: 'Complaint', minWidth: 100},
  { id: 'name', label: 'Name', minWidth: 100 },
  { id: 'age', label: 'Age', minWidth: 20 },
  { id: 'gender', label: 'Gender', minWidth: 20},
  { id: 'description', label: 'Description', minWidth: 200},
  { id: 'extraInfo', label: 'More Information', minWidth: 120},
  { id: 'date', label: 'Date', minWidth: 50},
  { id: 'startTime', label: 'Time', minWidth: 50},
  { id: 'address', label: 'Location', minWidth: 120},
  { id: 'phone', label: 'Phone', minWidth: 50},
  { id: 'status', label: 'Status', minWidth: 50},

];

export default function StickyHeadTable({rows,setrows}) {

  React.useEffect(() => {
    axios.get('/allComplaints').then((data)=>{setrows(data.data);});
  }, [])

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '90%', margin:5, marginLeft:10, overflow: 'hidden'}} >
      <TableContainer sx={{ maxHeight: 5000 }}>
        <Table stickyHeader aria-label="sticky table" >
          <TableHead >
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  <p className='font-bold text-base'>{column.label}</p>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.phone}>
                    {columns.map((column) => {
                      let value = "";
                      if(column.id == 'date') {
                        value = row[column.id].slice(0,10);
                      }
                      else {value = row[column.id];}

                      return (
                        <TableCell key={column.id}>
                          {/* {column.id == 'description' ? 
                            <textarea key={column.id} value={value}/>:{value}
                          } */}
                          {value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

StickyHeadTable.propTypes = {
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      name: PropTypes.string,
      age: PropTypes.number,
      gender: PropTypes.string,
      description: PropTypes.string,
      extraInfo: PropTypes.string,
      date: PropTypes.string,
      startTime: PropTypes.string,
      address: PropTypes.string,
      phone: PropTypes.string,
      status: PropTypes.string,
    })
  ).isRequired,
  setrows: PropTypes.func.isRequired,
};