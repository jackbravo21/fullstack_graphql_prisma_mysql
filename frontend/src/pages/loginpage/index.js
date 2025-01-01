import React, {useState, useEffect} from 'react';
import './index.css';
import { validateMail, validatePassword } from '../../utils/validateform';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setErrorUser, resetErrorUser, loginRequest } from '../../redux/users/slice';

export default function Login()
{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
    const error = useSelector((state) => state.user.error);
    const [mail, setMail] = useState();
    const [password, setPassword] = useState();
    //const testeMail = useSelector((state) => state.user.userData.mail);

    useEffect(()=>{
        if(isLoggedIn)
            {
            alert("Você Logou com usuario: " + mail);
            localStorage.setItem('mail', mail);
            localStorage.setItem('isLoggedIn', true);
            navigate('/home');
            //window.location.reload();
            }
    }, [isLoggedIn, mail, navigate]);

    useEffect(()=>{
        if(error){
            setErrorUser(<li className='formError'><b>{error}</b></li>);
        }
    }, [error]);
    
    function handleChangeMail(e)
    {
        e.preventDefault();
        setMail(e.target.value);
    }
    function handleChangePasswd(e)
    {
        e.preventDefault();
        setPassword(e.target.value);
    }

    function handleLogin(e)
    {
        e.preventDefault();
        //(dispatch(resetErrorUser()));

        console.log("mail: ", mail);

        if (!mail || !password) {
            dispatch(setErrorUser({error: "Preencha todos os campos!"}));
            return;
        }
        else{
            const mailValidation = validateMail(mail);
            if(mailValidation !== true){
                dispatch(setErrorUser({error: mailValidation}));
                return;
            }
            dispatch(loginRequest({
                mail: mail,
                password: password,
            }));
        }
    }

    function register()
    {
        dispatch(dispatch(resetErrorUser()));
        navigate('/register');
    }

    function forgot()
    {
        dispatch(dispatch(resetErrorUser()));
        navigate('/forgotpasswd');
    }

    return(

    /* ================================== */
                   
<div>
    <div className="container">
    <section className="containerSection">

        <form>
        <h1 className="commumtitle">Entrar:</h1>

        <div className="row">
            <div className="col25">
                <label>E-mail:</label>
            </div>
            <div className="col75">
                <input type="mail" id="mail" name="mail" onChange={handleChangeMail} placeholder="Email de cadastro..."></input>
            </div>
        </div>

        <div className="row">
            <div className="col25">
                <label>Senha:</label>
            </div>
            <div className="col75">
                <input type="password" id="passwd" name="passwd" onChange={handleChangePasswd} placeholder="Digite sua senha..."></input>
            </div>
        </div>
        <br />

        <p className='loginErro'><b>{error}</b></p>

        <div class="containerCentral">
            <button className="buttonlogin" type="button" value="Submit" onClick={handleLogin}>Entrar</button>
            {/* buttonlogin */}
        </div>
        </form>

        <br /><br />
        <hr />

        <p className="login"><a onClick={forgot}>Esqueceu a senha?</a></p>


        <hr />
        <p className="login"><a onClick={register}>Não tem uma conta?<br />Cadastre-se!</a></p>

    </section>
    </div>
    
    <br /><br />
</div>

    );
}