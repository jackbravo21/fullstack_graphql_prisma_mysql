import React, {useState} from 'react';
import './index.css';
import { useNavigate } from 'react-router-dom';

export default function Cadastro(props)
{

    //no console:
    //let valor = document.querySelectorAll('input')[0].value;

    const navigate = useNavigate();
    const[mail, setmail] = useState();
    
    function handleChangeMail(e)
    {
        setmail(e.target.value);
        
        let limpar = document.querySelectorAll('input')[0];
        limpar = limpar.value = ''; 
    }

    function handleChange(e)
    {
        alert(`Foi enviado um email de recuperacao para "${mail}", favor verificar!`);
        navigate('/login');
    }


    function login()
    {
        navigate('/login');
    }

    function cadastro()
    {
        navigate('/register');
    }

    return(
                   
<div>
    <div className="container">
    <section className="containerSection">

        <form>
        <h1 className="commumtitle">Recuperar senha:</h1>

        <div className="row">
            <div>
                <label name="email">E-mail de cadastro:</label>
            </div>
        </div>
        <div>
            <input type="mail" id="mail" name="mail" value={mail} onChange={handleChangeMail} placeholder="Email de cadastro..."></input>
        </div>
        

        <br />
        <div className="containerCentral">
            <button className="buttonlogin" type="button" value="Enviar" onClick={handleChange}>Enviar</button>
        </div>    
        </form>

        <br /><br />
        <hr />

        <p className="login"><a onClick={login}>Já tem uma conta? Faça login!</a></p>


        <hr />
        <p className="login"><a onClick={cadastro}>Não tem uma conta?<br />Cadastre-se!</a></p>

    </section>
    </div>
    
    <br /><br />
</div>

    );
}