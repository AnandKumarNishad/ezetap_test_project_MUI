import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Navbar from './Navbar'
import '../App.css';

const Agreements = () => {
    let agreementData;

    const [agreement, setAgreement] = useState();

    const column = [
        { field: 'id', headerName:'ID', width: '160', headerClassName: 'header'},
        { field: 'agreementtext', headerName:'Agreement Text', width: '1000', headerClassName: 'header'},
        { field: 'agreementcode', headerName:'Agreement Code', width: '190', headerClassName: 'header'},
        { field: 'orgcode', headerName:'Organisation Code', width: '185', headerClassName: 'header'},
    ];

    const getAgreements = async () => {
        const res = await axios.get("https://ezetap-test-apis.herokuapp.com/agreements")
        .catch((error) => {
            console.log(error.message);
        });
        agreementData = res.data;
        setAgreement(agreementData);
    }

    useEffect(() => {
        getAgreements();
        // eslint-disable-next-line
    }, [])

    return (
        <div className='main'>
            <Navbar />
            <>
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
            </>
        </div>
    );
};

export default Agreements;