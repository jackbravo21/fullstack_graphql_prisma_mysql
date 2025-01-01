import { call, put, takeLatest } from 'redux-saga/effects';
import {    
    createUserSuccess, createUserFailure,
    loginSuccess, loginFailure,
    getUserSuccess, getUserFailure,
    editUserSuccess, editUserFailure,
    deleteUserSuccess, deleteUserFailure,
    fetchUsersSuccess, fetchUsersFailure
} from './slice';
import {loginUserService, createUserService, userEditService, userDeleteService, getOneUserService, allUsersService} from '../../services/users';

function* createUser(action){
    try{
        console.log("Verificando usuário no DB...");

        // Chama o service com os dados do usuário
        const userData = {
            fullname: action.payload.fullname,
            mail: action.payload.mail,
            password: action.payload.password,
            level: action.payload.level,
        };

        const response = yield call(createUserService, userData);
        console.log("Usuário criado com sucesso: ", response);
        console.log("Apos criação: ", response);
        // Dispara a ação de sucesso
        yield put(createUserSuccess());
    }

    catch(error){
        const errorMessage = "Erro ao cadastrar usuário!";
        yield put(createUserFailure(errorMessage));          // Passando o erro para a action;
        console.error("Erro ao criar usuário!", error);
    }
};

function* loginUser(action) {
    try {
        console.log("Verificando no DB...");

        const userData = {
            mail: action.payload.mail,
            password: action.payload.password,
        };
        
        //Chama o service que faz a requisição à API;
        const response = yield call(loginUserService, userData);

        //Verifica o status e os dados;
        if(response.user.statusCode === 200){
            console.log("Usuário encontrado com sucesso!");
            console.log(response.user);

            //Armazena os dados localmente;
            localStorage.setItem("id", response.user.id);
            localStorage.setItem("mail", response.user.mail);
            localStorage.setItem("fullname", response.user.fullname);
            localStorage.setItem("level", response.user.level);
            localStorage.setItem("createdAt", response.user.created_at);
            localStorage.setItem("isLoggedIn", response.user.isLoggedIn);
            localStorage.setItem("token", response.token);
            console.log("Dados armazenados localmente com sucesso!");

            //Salvando no Redux;
            yield put(loginSuccess(response.user));
            //ou: yield put(loginSuccess(response.data.user));
        } 
        else{
            yield put(loginFailure("Usuário ou senha inválidos!"));
        }

    } catch (error) {
        yield put(loginFailure("Usuário ou senha incorreto!"));
        console.error("Erro ao realizar login: ", error);
    }
};

function* userDelete(action){
    try{
        console.log("Buscando usuário do DB para deletar...");

        const userData = {
            id: action.payload.id
        };

        const response = yield call(userDeleteService, userData);

        if(!response){
            deleteUserFailure("Erro ao deletar o usuário!");
            return;
        }

        yield put(deleteUserSuccess("Usuário deletado com sucesso!"));

        const responseAllUsers = yield call(allUsersService);
        yield put(fetchUsersSuccess(responseAllUsers.data || responseAllUsers));
    }
    catch(error){
        yield put(deleteUserFailure("Erro ao enviar os dados do usuário para deletar!"));
        console.error("Erro ao desativar usuário!", error);
    }
};

function* getOneUser(action){
    try {
        console.log("Buscando usuário no DB...");

        const userData = {
            id: action.payload.id,
        };
        const response = yield call(getOneUserService, userData);
        yield put(getUserSuccess(response.data));
    } 
    
    catch(error){
        yield put(getUserFailure(error.message));
        console.error("Erro ao desativar usuário!", error);
    }
};

function* userEdit(action){
    try{
        console.log("Verificando usuário no DB...");

        const userData = {
            id: action.payload.id,
            fullname: action.payload.fullname,
            mail: action.payload.mail,
            level: action.payload.level,
            password: action.payload.password,
        }
        
        //Atualiza o usuário;
        const response = yield call(userEditService, userData);
        yield put(editUserSuccess(response.data));

        //Busca os usuários atualizados e retorna com os dados atuais (joinha);
        const responseAllUsers = yield call(allUsersService);
        console.log("allUsers: ", responseAllUsers.data || responseAllUsers);
        yield put(fetchUsersSuccess(responseAllUsers.data || responseAllUsers));
    }
    catch(error){
        yield put(editUserFailure(error.message));  //Passando o erro para a action;
        console.error("Erro ao editar usuário!", error);
    }
};

function* allUsers(){
    try{
        console.log("Buscando usuários no DB...");

        const response = yield call(allUsersService);
        console.log("allUsers: ", response);
        yield put(fetchUsersSuccess(response));
    }

    catch(error){
        yield put(fetchUsersFailure(error.message));
        console.error("Erro ao buscar usuários!", error);
    }
};

function* userSaga()
{
    yield takeLatest('user/createUser', createUser);
    yield takeLatest('user/loginRequest', loginUser);
    yield takeLatest('user/deleteUser', userDelete);
    yield takeLatest('user/getUser', getOneUser);
    yield takeLatest('user/editUser', userEdit); 
    yield takeLatest('user/fetchUsers', allUsers); 
}

export default userSaga;