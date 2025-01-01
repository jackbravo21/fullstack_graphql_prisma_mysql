import React, { useEffect } from 'react';
import { FaUserEdit, FaTrashAlt } from "react-icons/fa";
import { LuNotebookPen } from "react-icons/lu";
import { useDispatch, useSelector } from 'react-redux';
import { resetErrorUser, dataTempUser, clearDataTempUser, fetchUsers } from '../../redux/users/slice';
import './index.css';
import { useNavigate } from 'react-router-dom';

export default function Users() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    //Pegando os usuarios diretamente da store
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
    const users = useSelector((state) => state.user.users);
    const loading = useSelector((state) => state.user.loading);
    const error = useSelector((state) => state.user.error);

    useEffect(() => {
        if (error) {
            console.error("Erro detectado: ", error);
        }
    }, [error]);

    useEffect(() => {
        console.log("Buscando usuários...");
        dispatch(fetchUsers());
    }, [dispatch]);

    useEffect(() => {
        dispatch(clearDataTempUser());
        console.log("Dados do usuario temporario limpos!");
    },[]);

    function actionUser(id, fullname, mail, level, created_at, module){
        dispatch(resetErrorUser());
        dispatch(dataTempUser({
            id: id, 
            fullname: fullname, 
            mail: mail, 
            level: level,
            createdAt: created_at
        }));
        if(module == 'edit'){navigate('/edituser');}
        if(module == 'delete'){navigate('/deleteuser');}
    }

    if (loading) {
        return <div className='commumtitle'>Carregando usuários...</div>;
    }

    return (
        <div className="containerUsers">
            <h2 className="commumtitle">Usuários:</h2>

            {users.length === 0 && <p>Não há usuários disponíveis.</p>}

            <div className="productItem">
            <table ClassName="ex1">
                    <tr className="ex1">
                        <th className="ex1">ID:</th>
                        <th className="ex1">Nome:</th>
                        <th className="ex1">E-mail:</th>
                        <th className="ex1">Nível:</th>
                        <th className="ex1">Data de Criação:</th>
                        <th className="ex1">Editar:</th>
                        <th className="ex1">Excluir:</th>
                    </tr>
            {users.map((user) => ( 
                    <tr  key={user.id} className="ex8">
                        <td className="ex1">{user.id}</td>
                        <td className="ex1">{user.fullname}</td>
                        <td className="ex1">{user.mail}</td>
                        <td className="ex1">{user.level}</td>
                        <td className="ex1">{user.created_at}</td>
                        <td className="ex1"><a className='iconEdit' onClick={() => actionUser(user.id, user.fullname, user.mail, user.level, user.created_at, 'edit')}><LuNotebookPen /><FaUserEdit /></a></td>
                        <td className="ex1"><a className='iconDelete' onClick={() => actionUser(user.id, user.fullname, user.mail, user.level, user.created_at, 'delete')}><FaTrashAlt /></a></td>
                    </tr>
            ))}
            </table>
            </div>


            {error && <p>{error}</p>}
        </div>
    );
}