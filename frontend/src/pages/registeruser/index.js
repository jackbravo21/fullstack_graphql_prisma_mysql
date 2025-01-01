import React from 'react';
import './index.css';
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
    const [confirmpassword, setConfirmPassword] = useState('');
    const [level, setLevel] = useState('');
    const error = useSelector((state) => state.user.error);

    function prepareSetName(e){setFullName(e.target.value);}
    function prepareSetEmail(e){setSetEmail(e.target.value);}
    function prepareSetPassword(e){setPassword(e.target.value);}
    function prepareSetConfirmPassword(e){setConfirmPassword(e.target.value);}
    function prepareSetLevel(e){setLevel(e.target.value);}

    useEffect(() => {
        if (error) {
            console.error("Erro detectado: ", error);
        }
    }, [error]);

    function register(e)
    {
        (dispatch(resetErrorUser()));
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
                dispatch(setErrorUser({error: "Preencha TODOS os campos!"}));
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
                        level: level,
                    }));

                    alert("Usuário registrado com sucesso!");

                    setFullName("");
                    setSetEmail("");
                    setPassword("");
                    setConfirmPassword("");
                    setLevel("");
                    (dispatch(resetErrorUser()));
                }
                catch(error){
                    console.log("Erro ao cadastrar usuario: ", error);
                }
            }
        }
    }

return(
                   
<div>
    <div className="container">
    <section className="containerSection">

        <form>
        <h1 className="commumtitle">Adicionar usuário:</h1>

        <div className="row">
            <div className="col25">
                <label>Nome Completo:</label>
            </div>
            <div className="col75">
                <input type="text" id="fullname" name="fullname" maxLength="70" onChange={prepareSetName} placeholder="Nome..." value={fullname}></input>
            </div>
        </div>

        <div className="row">
            <div className="col25">
                <label>E-mail:</label>
            </div>
            <div className="col75">
                <input type="mail" id="mail" name="mail" onChange={prepareSetEmail} placeholder="Email de cadastro..." value={mail}></input>
            </div>
        </div>

        <div className="row">
            <div className="col25">
                <label>Senha:</label>
            </div>
            <div className="col75">
                <input type="password" id="passwd" name="passwd" onChange={prepareSetPassword} placeholder="Digite sua senha..." value={password}></input>
            </div>
        </div>
        
        <div className="row">
            <div className="col25">
                <label>Confirmar Senha:</label>
            </div>
            <div className="col75">
                <input type="password" id="confirmpasswd" name="confirmpasswd" onChange={prepareSetConfirmPassword} placeholder="Confirme sua senha..." value={confirmpassword}></input>
            </div>
        </div>

        <div className="row">
            <div className="col25">
                <label>Nível:</label>
            </div>
            <div className="col75">
                <select id="level" name="level" onChange={prepareSetLevel} placeholder="Escolha..." value={level}>
                    <option value="user">user</option>
                    <option value="teacher">treacher</option>
                    <option value="administrator">administrator</option>
                </select>
            </div>
        </div>
        
        {error && <> <br /><p className='formError'><b>{error}</b></p> </>}

        <div className="row">
            <div>
                <button className="buttonlogin" type="buttonsubmit" value="Submit" onClick={register}>Enviar</button>
            </div>
        </div>
        </form>
        <br />

    </section>
    </div>
    
    <br /><br />
</div>

    );
}