import { Button, Typography } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import Navbar from './Navbar'
import '../App.css';

const Agreements = () => {
    let agreementData;

    const user = useSelector(selectUser);
    const [agreement, setAgreement] = useState();

    const column = [
        { field: 'id', headerName:'ID', width: '120', headerClassName: 'header'},
        { field: 'agreementtext', headerName:'Agreement Text', width: '900', headerClassName: 'header'},
        { field: 'agreementcode', headerName:'Agreement Code', width: '180', headerClassName: 'header'},
        { field: 'orgcode', headerName:'Organisation Code', width: '180', headerClassName: 'header'},
    ];

    const getAgreements = async () => {
        const res = await axios.get("https://ezetap-test-apis.herokuapp.com/agreements")
        .catch((error) => {
            console.log(error.message);
        });
        agreementData = res.data;
        setAgreement(agreementData);
    }

    const goToCreateUser = () => {
        console.log("hi");
    }

    const goToCreateAgreement = () => {
        console.log("hello");
    }

    const buttonStyle = {
        marginTop : '15px',
        borderRadius : '10px',
        padding: '10px 25px',
        margin: '0 10px',
    }

    useEffect(() => {
        getAgreements()
    }, [])

    return (
        <div className='main'>
            <Navbar />
            <>
                <Typography variant='h3'> Welcome {user.name}</Typography>
                <Typography variant='h5'> Agreements </Typography>
                {
                    agreement
                    ?
                    <div className = 'datagridStyle'>
                        <DataGrid
                            components = {{ Toolbar: GridToolbar }}
                            rows = { agreement }
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
                {
                    user.role === 'admin'
                    ?
                        <>
                            <Button className='btn' variant='contained' type = 'submit' color = 'secondary' style = { buttonStyle } onClick = { goToCreateUser } >Add User</Button>
                            <Button className='btn' variant='contained' type = 'submit' color = 'secondary' style = { buttonStyle } onClick = { goToCreateAgreement } >Add Agreement</Button>
                        </>
                    :
                    null
                }
            </>
        </div>
    );
};

export default Agreements;