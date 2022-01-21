import React, { useState } from 'react'
import Button from '@mui/material/Button';
import {Auth} from 'aws-amplify';

import { useAppSelector, useAppDispatch } from './hooks'

import { authenticated,
    unauthenticated,
    selectUserName,
    setUserName,
    selectAuthState } from './userSlice'
import {useNavigate} from "react-router-dom";

export default function ReduxUser(props: any) {
    const navigate = useNavigate();
    const userAuthState = useAppSelector(selectAuthState);
    const dispatch = useAppDispatch();
    const doUp = () => {
        dispatch(authenticated());
        dispatch(setUserName(props.userDetails.user.username));
    }
    doUp();
    return (
        <Button onClick={async () => {
            await Auth.signOut()
            navigate("/")
        }}>Sign Out</Button>
    )
}