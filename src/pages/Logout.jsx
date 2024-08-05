import React from 'react';
import { useContext, useEffect } from 'react'
import { TokenContext } from '../App'
import { useNavigate } from 'react-router-dom'

const Logout = () => {
    const { setToken } = useContext(TokenContext);

    const navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem('token');
        setToken('');
        navigate('/login');
    }, [navigate, setToken]);

    return null; 
}

export default Logout
