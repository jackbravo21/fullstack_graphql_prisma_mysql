import React, { useState, useEffect } from 'react';
import { BsCircleHalf, BsCircleFill } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './index.css';
import Logo1 from './img/redlogo.png';
import Logo2 from './img/fullbluelogo.png';
import { resetErrorUser } from '../../redux/users/slice';
import { resetErrorCourse } from '../../redux/courses/slice';

export default function Menu()
{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
    const level = useSelector((state) => state.user.userData?.level);
    const mail = useSelector((state) => state.user.userData?.mail);
    const [logo, setLogo] = useState(Logo1);
    const [theme, setTheme] = useState('dark');

    function handleChange(e)
    {
        e.preventDefault();
        if(logo === Logo1){
            setLogo(Logo2);
        }
        else{
            setLogo(Logo1);
        }
    }

    function handleChangeTheme(e)
    {        
        e.preventDefault();
        if(theme === 'dark'){
            setTheme('white');
        }
        else{
            setTheme('dark');
        }
    }

    function login(){
        dispatch(resetErrorUser());
        navigate('/login');
    }
    function logout(){navigate('/logout');}
    function handleCourses(){
        dispatch(resetErrorCourse());
        navigate('/courses');
    }
    function handleCreateCourse(){
        dispatch(resetErrorCourse());
        navigate('/addcourse');
    }
    function handleUsers(){
        dispatch(resetErrorUser());
        navigate('/users');
    }
    function handleAddUser(){
        dispatch(resetErrorUser());
        navigate('/adduser');
    }

    return(

    <div className='menuHeader'>

        <ul className="ex3">
            <li className="ex1"><a href="#site"><img src={logo} className="logo" onClick={handleChange} /></a></li>
            
            <li className="dropdown">
                <a className="dropbtn">Menu</a>
                <div className="dropdownContent">
                    <a onClick={handleCourses}>Cursos</a>                 
                    {isLoggedIn ? (
                    <>
                    <a onClick={handleCreateCourse}>Criar Curso</a>
                    <a onClick={handleUsers}>Usuários</a>
                    <a onClick={handleAddUser}>Adicionar usuário</a>
                    </>
                    ) : null}
                </div>
            </li>

            <li className="dropdown">
                <a className="dropbtn">Opções</a>
                <div className="dropdownContent">   
                         
                    {theme === "dark" ? (
                        <a onClick={handleChangeTheme}>Theme <BsCircleHalf /></a>
                    ):
                        <a onClick={handleChangeTheme}>Theme <BsCircleFill /></a>
                    }

                    <a href="/options">Opções</a>
                </div>
            </li>



            {isLoggedIn === true ? (
                <li className="ex6"><a className="active6" onClick={logout}>Logoff</a></li>
                ) : (
                <li className="ex8"><a className="active8" onClick={login}>Login</a></li>
            )}
            
            {isLoggedIn === true ? (
                <li className="ex7"><a className="active7">Bem Vindo, <b>{mail}</b>!</a></li>
                ) : (
                <li className="ex9"><a className="active9">Bem Vindo, <b>Visitante</b>!</a></li>
            )}

            
        
            

        </ul>



    </div>

    );

}