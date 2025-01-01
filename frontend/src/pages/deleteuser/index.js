import React from 'react';
import './index.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setErrorUser, resetErrorUser, clearDataTempUser, deleteUser} from '../../redux/users/slice';

export default function Register()
{ 
    const navigate = useNavigate();
    const dispatch = useDispatch();

    //Pegando valores da store
    const tempData = useSelector((state) => state.user.tempData);

    //Inicializando o estado com os valores da store
    const [id, setID] = useState(tempData?.id || '');
    const [fullname, setFullName] = useState(tempData?.fullname || '');
    const [mail, setMail] = useState(tempData?.mail || '');
    const [level, setLevel] = useState(tempData?.level ?? false);
    const [createdAt, setCreatAt] = useState(tempData?.createdAt || '');
    const error = useSelector((state) => state.user.error);

    useEffect(() => {
        if(tempData && tempData.id){
            setID(tempData.id);
            setFullName(tempData.fullname);
            setMail(tempData.mail);
            setLevel(tempData.level);
            setCreatAt(tempData.createdAt);
            console.log("TempData: ", tempData);
        }
        console.log("DeleteData: ", tempData);
    }, [tempData]);
       
useEffect(() => {
    if(error) {
        console.error("Erro detectado: ", error);
    }
}, [error]);

    function functionDelete(e){
        e.preventDefault();
        (dispatch(resetErrorUser()));

        if(id === "" || id === undefined){
            dispatch(setErrorUser({error: "Erro ao deletar! ID inexistente!"}));
            return;
        }
        else{
            dispatch(deleteUser({id: id}));
            alert(`Usuário '${mail}' DELETADO com Sucesso!`);
            navigate('/users');
        }
    }

    function backward(){
        //dispatch(clearDataTempUser());
        navigate('/users');
        return null;
    }

    function withOutID(){
        alert("Erro ao carregar dados!");
        dispatch(setErrorUser({error: "Erro ao carregar dados!"}));
        navigate('/users');
        return null;
    }

return (
    tempData.id !== null && tempData.id !== "" && tempData.id !== undefined ? (
        <div>
        <div className="container">
        <section className="containerSection">
            <form>
            <h1 className="commumtitle">Este usuário será deletado:</h1>

            <div className="row">
                <input type="hidden" id="id" name="id" value={id} readOnly />
            </div>

            <br />

            <div className="productItem">
            <table ClassName="ex1">
                    <tr className="ex1">
                        <th className="ex1">ID:</th>
                        <th className="ex1">Nome:</th>
                        <th className="ex1">E-mail:</th>
                        <th className="ex1">Nível:</th>
                        <th className="ex1">Data de Criação:</th>
                    </tr>
                    <tr className="ex8">
                        <td className="ex1">{id}</td>
                        <td className="ex1">{fullname}</td>
                        <td className="ex1">{mail}</td>
                        <td className="ex1">{level}</td>
                        <td className="ex1">{createdAt}</td>
                    </tr>
            </table>
            </div>

            {error && <> <br /><p className='formError'><b>{error}</b></p> </>}

            <div className="row">
                <div>                
                    <br />
                    <button className="buttonlogin" type="button" onClick={functionDelete}>
                        Confirma
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
