import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
//import { decryptData } from '../../utils/cryptojs';
import './index.css';

export default function Inicial()
{
    //const fullname = useSelector((state) => state.user.userData.fullname);
    const [fullname, setFullname] = useState(localStorage.getItem('fullname'));

    useEffect(() => {
        setFullname(fullname);
    }, [fullname]);

    return(
        
        <div className='container'>

        <h1>Bem vindo "{fullname || "Visitante"}"!</h1>

        </div>
    );
}