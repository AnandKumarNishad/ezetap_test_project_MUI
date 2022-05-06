import { Button, Pagination, Toolbar, Typography } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import '../App.css'

// const useStyles = makeStyles((theme) =>
//   createStyles({
//     root: {
//       "& .MuiDataGrid-renderingZone": {
//         "& .MuiDataGrid-row": {
//           "&:nth-child(2n)": { backgroundColor: "rgba(235, 235, 235, .7)" }
//         }
//       }
//     }
//   })
// );

const Admin = () => {
    const [ user, setUser ] = useState();

    let userData;
    const getUsers = async () => {
        const res = await axios.get("https://ezetap-test-apis.herokuapp.com/users")
        .catch((error) => {
            console.log(error.message);
        });

        userData = res.data;
        setUser(userData);        
    };
    
    const column = [
        { field: 'id', headerName: "ID", width: '120', headerClassName: 'header' },
        { field: 'name', headerName: "Name", width: '200', headerClassName: 'header' },
        { field: 'mobilenumber', headerName: "Mobile", width: '200', headerClassName: 'header' },
        { field: 'email', headerName: "Email", width: '260', headerClassName: 'header' },
        { field: 'orgcode', headerName: "Org. Code", width: '174', headerClassName: 'header' },
        { field: 'username', headerName: "Username", width: '200', headerClassName: 'header' },
        { field: 'role', headerName: "Role", width: '200', headerClassName: 'header' },
    ]; 

    const goToCreateUser = () => {
        console.log("hi");
    }

    const goToCreateAgreement = () => {
        console.log("hello");
    }

    useEffect(() => {
        getUsers()
    }, []);

    const buttonStyle = {
        marginTop : '15px',
        borderRadius : '10px',
        padding: '10px 25px',
        margin: '0 10px',
    }

    return (
        <div className='main'>
            <Navbar />
            <>
                <Typography variant='h3'> welcome Admin</Typography>
                <Typography variant='h5'> Users Details </Typography>
                {
                user
                ?
                <div className = 'datagridStyle' >
                    <DataGrid 
                        components = {{ Toolbar: GridToolbar }}
                        rows={user}
                        className = 'dataGridRow'
                        rowHeight = { 70 }
                        columns = { column }
                        pageSize = { 6 }
                        rowsPerPageOptions = {[6]}
                        />
                </div>
                :
                null
                }
            </>
            <Button className='btn' variant='contained' type = 'submit' color = 'secondary' style = { buttonStyle } onClick = {goToCreateUser} >Add User</Button>
            <Button className='btn' variant='contained' type = 'submit' color = 'secondary' style = { buttonStyle } onClick = {goToCreateAgreement} >Add Agreement</Button>           
        </div>
    );
};

export default Admin;