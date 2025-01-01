import React from 'react';
import './index.css';
import ButtonEnviar from '../../components/Buttons/send/index';
import { validateMail, validatePassword } from '../../utils/validateform';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { setErrorUser, resetErrorUser, createUser } from '../../redux/users/slice';

export default function Register()
{
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [fullname, setFullName] = useState('');
    const [mail, setSetEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmassword] = useState('');
    const [error, setError] = useState(useSelector((state) => state.user.error));

    function prepareSetName(e){setFullName(e.target.value);}
    function prepareSetEmail(e){setSetEmail(e.target.value);}
    function prepareSetPassword(e){setPassword(e.target.value);}
    function prepareSetConfirmPassword(e){setConfirmassword(e.target.value);}

    useEffect(() => {
        if (error) {
            console.error("Erro detectado: ", error);
        }
    }, [error]);

    function register(e)
    {
        dispatch(resetErrorUser());
        e.preventDefault();

        if(password !== confirmpassword){
            dispatch(setErrorUser({error: "As senhas não são iguais!"}));
            return;
        }
        else{
            if(     
                fullname === "" || fullname === undefined 
                ||  mail === "" || mail === undefined
                ||  password === "" || password === undefined
            ){                
                dispatch(setErrorUser({error: "Preencha todos os campos!"}));
                return;
            }
            else{
                const mailValidation = validateMail(mail);
                if(mailValidation !== true){
                    dispatch(setErrorUser({error: mailValidation}));
                    return;
                }
                const passwordValidation = validatePassword(password);
                if(passwordValidation !== true){
                    dispatch(setErrorUser({error: passwordValidation}));
                    return;
                }
                try{
                    dispatch(createUser({
                        fullname: fullname,
                        mail: mail,
                        password: password,
                    }));


                    if(error)
                    {
                        return;
                    }
                    console.log(`Usuário "${mail}" cadastrado com sucesso!`);
                    alert(`Usuário "${mail}" cadastrado com sucesso!`);
                    dispatch(resetErrorUser());
                    navigate("/login");
                    return;

                }
                catch(error){
                    console.log("Erro ao cadastrar usuario: ", error);
                }                
            }
        }
    }

    function login()
    {
        dispatch(dispatch(resetErrorUser()));
        navigate('/login')
    }

    return(
                   
<div>
    <div className="container">
    <section className="containerSection">

        <form>
        <h1 className="commumtitle">Cadastre-se:</h1>

        <div className="row">
            <div className="col25">
                <label>Nome Completo:</label>
            </div>
            <div className="col75">
                <input type="text" id="fullname" name="fullname" maxLength="70" onChange={prepareSetName} placeholder="Seu nome..."></input>
            </div>
        </div>

        <div className="row">
            <div className="col25">
                <label>E-mail:</label>
            </div>
            <div className="col75">
                <input type="mail" id="mail" name="mail" onChange={prepareSetEmail} placeholder="Email de cadastro..."></input>
            </div>
        </div>

        <div className="row">
            <div className="col25">
                <label>Senha:</label>
            </div>
            <div className="col75">
                <input type="password" id="passwd" name="passwd" onChange={prepareSetPassword} placeholder="Digite sua senha..."></input>
            </div>
        </div>
        
        <div className="row">
            <div className="col25">
                <label>Confirmar Senha:</label>
            </div>
            <div className="col75">
                <input type="password" id="confirmpasswd" name="confirmpasswd" onChange={prepareSetConfirmPassword} placeholder="Confirme sua senha..."></input>
            </div>
        </div>
        
        <p className='registerErro'><b>{error}</b></p>

        <div class="containerCentral">
            <button className="buttonlogin" type="button" value="Submit" onClick={register}>Enviar</button>
        </div>
        {/* buttonlogin */}
        </form>
        <br />
        <p className="login"><a onClick={login}>Já tem uma conta?</a></p>

    </section>
    </div>
    <br /><br />
</div>

    );
}