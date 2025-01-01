import React, {useEffect} from 'react';
import './index.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutRequest } from '../../redux/users/slice';

export default function Login()
{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

    useEffect(()=>
    {
        if(isLoggedIn){
        localStorage.setItem('isLoggedIn', false);
        localStorage.removeItem("id");
        localStorage.removeItem("mail");
        localStorage.removeItem("fullname");
        localStorage.removeItem("administrator");
        localStorage.removeItem("createdAt");
        //localStorage.clear();         //limpa todos os dados;
        console.log("Dados Removidos localmente com sucesso!");

        dispatch(logoutRequest());
        navigate('/login');
        }
    }, []);
                   
    return(
        
        <div className='container'>

        <h1>Você saiu do sistema!</h1>

        </div>
    );

}