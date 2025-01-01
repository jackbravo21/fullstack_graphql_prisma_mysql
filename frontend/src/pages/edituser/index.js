import React from 'react';
import './index.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { setErrorUser, resetErrorUser, clearDataTempUser, editUser } from '../../redux/users/slice';

export default function Register()
{ 
    const navigate = useNavigate();
    const dispatch = useDispatch();

    //Pegando valores da store
    const editData = useSelector((state) => state.user.tempData);

    //Inicializando o estado com os valores da store
    const [id, setID] = useState(editData?.id || '');
    const [fullname, setFullName] = useState(editData?.fullname || '');
    const [mail, setMail] = useState(editData?.mail || '');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmassword] = useState('');
    const [level, setLevel] = useState(editData?.level || '');
    const [createdAt, setCreatAt] = useState(editData?.createdAt || '');
    const error = useSelector((state) => state.user.error);

    function prepareSetName(e){setFullName(e.target.value);}
    function prepareSetEmail(e){setMail(e.target.value);}
    function prepareSetPassword(e){setPassword(e.target.value);}
    function prepareSetConfirmPassword(e){setConfirmassword(e.target.value);}
    function prepareSetLevel(e){setLevel(e.target.value);}

    useEffect(() => {
        if(editData && editData.id){
            setID(editData.id);
            setFullName(editData.fullname);
            setMail(editData.mail);
            setLevel(editData.level);
            setCreatAt(editData.createdAt);
        }
        console.log("EditData: ", editData);
    }, [editData]);
       
useEffect(() => {
    if (error) {
        console.error("Erro detectado: ", error);
    }
}, [error]);

    function register(e)
    {
        e.preventDefault();
        (dispatch(resetErrorUser()));

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
                dispatch(editUser({
                    id: id,
                    fullname: fullname,
                    mail: mail,
                    password: password,
                    level: level,
                }));
                alert(`Usuário '${mail}' Editado com Sucesso!`);
                navigate('/users');
            }
        }
    }

    function backward()
    {
        //dispatch(clearDataTempUser());
        dispatch(resetErrorUser());
        navigate('/users');
        return null;
    }

    function withOutID()
    {
        alert("Erro ao carregar dados!");
        dispatch(setErrorUser({error: "Erro ao carregar dados!"}));
        navigate('/users');
        return null;
    }

return (
    editData.id !== null && editData.id !== "" && editData.id !== undefined ? (
        <div>
        <div className="container">
        <section className="containerSection">
            <form>
            <h1 className="commumtitle">Editar usuário:</h1>

            <div className="row">
                <input type="hidden" id="id" name="id" value={id} readOnly />
            </div>

            <div className="row">
                <div className="col25">
                    <label>Nome Completo:</label>
                </div>
                <div className="col75">
                    <input type="text" id="fullname" name="fullname" maxLength="70" 
                        onChange={prepareSetName} value={fullname} />
                </div>
            </div>

            <div className="row">
                <div className="col25">
                    <label>E-mail:</label>
                </div>
                <div className="col75">
                    <input type="mail" id="mail" name="mail" 
                    onChange={prepareSetEmail} value={mail} />
                </div>
            </div>

            <div className="row">
                <div className="col25">
                    <label>Senha:</label>
                </div>
                <div className="col75">
                    <input type="password" id="passwd" name="passwd"
                        onChange={prepareSetPassword} placeholder="Digite a senha..." />
                </div>
            </div>

            <div className="row">
                <div className="col25">
                    <label>Confirmar Senha:</label>
                </div>
                <div className="col75">
                    <input type="password" id="confirmpasswd" name="confirmpasswd" 
                    onChange={prepareSetConfirmPassword} placeholder="Confirme a senha..." />
                </div>
            </div>

            <div className="row">
            <div className="col25">
                <label>Nível:</label>
            </div>
            <div className="col75">
                <select id="type" name="type" onChange={prepareSetLevel} placeholder="Escolha..." value={level}>
                    <option value="user">user</option>
                    <option value="teacher">treacher</option>
                    <option value="administrator">administrator</option>
                </select>
            </div>
            </div>

            <div className="row">
                <div className="col25">
                    <label>Data de criação:</label>
                </div>
                <div className="col75">
                    <span>{createdAt}</span>
                </div>
            </div>

            {error && <> <br /><p className='formError'><b>{error}</b></p> </>}

            <div className="row">
                <div>                
                    <button className="buttonlogin" type="button" onClick={register}>
                        Enviar
                    </button>
                    <button className="buttonlogin" style={{background: 'red', marginLeft: '15px', hover: 'blue'}} type="button" onClick={backward}>Voltar</button>
                </div>
            </div>
            </form>
            <br />
        </section>
        </div>

        <br />
        <br />

        </div>
    ) : (
        withOutID() || null
    )
);

}
