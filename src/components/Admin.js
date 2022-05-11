import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import '../App.css'

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
        { field: 'id', headerName: "ID", width: '154', headerClassName: 'header' },
        { field: 'name', headerName: "Name", width: '245', headerClassName: 'header' },
        { field: 'mobilenumber', headerName: "Mobile", width: '245', headerClassName: 'header' },
        { field: 'email', headerName: "Email", width: '245', headerClassName: 'header' },
        { field: 'orgcode', headerName: "Org. Code", width: '200', headerClassName: 'header' },
        { field: 'username', headerName: "Username", width: '220', headerClassName: 'header' },
        { field: 'role', headerName: "Role", width: '225', headerClassName: 'header' },
    ]; 

    useEffect(() => {
        getUsers()
        // eslint-disable-next-line
    }, []);

    return (
        <div className='main'>
            <Navbar />
            <>
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
        </div>
    );
};

export default Admin;