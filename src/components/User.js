import { Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import Navbar from './Navbar';

const User = () => {
    const user = useSelector(selectUser);

    return (
        <div>
            <Navbar />
            <Typography variant='h2'>Welcome { user.name } </Typography>
            <Typography variant='h4'>Mobile No. : { user.mobilenumber } </Typography>
            <Typography variant='h4'>Email : { user.email } </Typography>
            <Typography variant='h4'>Organisation Code : { user.orgcode } </Typography>
            <Typography variant='h4'>Username : { user.username } </Typography>
        </div>
    );
};

export default User;