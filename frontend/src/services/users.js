import {client} from '../graphql/server/ApolloClient';
import {CREATE_USER, LOGIN_USER, USERS, DELETE_USER, EDIT_USER} from '../graphql/schemas/user';

export const loginUserService = async(userData) => {
  try{
    const response = await client.mutate({
      mutation: LOGIN_USER,
      variables: {
        mail: userData.mail,
        password: userData.password,
      },
    });
    //exemplos de retorno para captar dados;
    console.log("Service: ", response);
    console.log("Service.data.login: ", response.data.login);
    console.log("Service.token: ", response.data.login.token);
    console.log("Service.user: ", response.data.login.user);
    console.log("Service.isLoggedIn: ", response.data.login.user.isLoggedIn);
    return response.data.login;
  } 
  catch(error){
    console.error('Erro ao criar usuário:', error);
    // Normaliza o erro para o Saga
    if(error.graphQLErrors?.[0]?.message){
      throw new Error(error.graphQLErrors[0].message);
    }
    throw error;
  }
};

export const createUserService = async(userData) => {
    try{
        const response = await client.mutate({
          mutation: CREATE_USER,
          variables: {
            fullname: userData.fullname,
            mail: userData.mail,
            password: userData.password,
            level: userData.level,
          },
          update(cache, { data: { createUser } }) {
            //Ler os dados existentes de usuários do cache
            const existingUsers = cache.readQuery({ query: USERS });

            //Adicionar o novo usuário à lista existente
            cache.writeQuery({
                query: USERS,
                data: {
                    users: [...existingUsers.users, createUser],
                },
            });
          }
        });
        return response.data.createUser;
      } 
      catch(error){
        console.error('Erro ao criar usuário:', error);
        // Normaliza o erro para o Saga
        if (error.graphQLErrors?.[0]?.message) {
          throw new Error(error.graphQLErrors[0].message);
        }
        throw error;
      }
};

export const userEditService = async(userData) => {
    try{
        const response = await client.mutate({
          mutation: EDIT_USER,
          variables: {
            id: userData.id,
            fullname: userData.fullname,
            mail: userData.mail,
            password: userData.password,
            level: userData.level,
          },
          update(cache, { data: { editUser } }) {
            // Ler os dados dos usuários do cache
            const existingUsers = cache.readQuery({ query: USERS });

            // Substituir o usuário editado na lista
            const updatedUsers = existingUsers.users.map((user) =>
                user.id === editUser.id ? { ...user, ...editUser } : user
            );

            // Escrever os dados atualizados no cache
            cache.writeQuery({
                query: USERS,
                data: {
                    users: updatedUsers,
                },
            });
          }
        });
        return response.data.editUser;
      } 
      catch(error){
        console.error('Erro ao editar usuário:', error);
        // Normaliza o erro para o Saga
        if (error.graphQLErrors?.[0]?.message) {
          throw new Error(error.graphQLErrors[0].message);
        }
        throw error;
      }
}

export const userDeleteService = async(userData) => {
    try{
        const response = await client.mutate({
          mutation: DELETE_USER,
          variables: {
            id: userData.id,
          },
          update(cache, { data: { deleteUser } }) {
            //Ler os dados dos usuários do cache
            const existingUsers = cache.readQuery({ query: USERS });

            //Remover o usuário deletado da lista
            const updatedUsers = existingUsers.users.filter(
                (user) => user.id !== deleteUser.id
            );

            // Escrever os dados atualizados no cache
            cache.writeQuery({
                query: USERS,
                data: {
                    users: updatedUsers,
                },
            });
        }
        });
        return response.data.deleteUser;
      } 
      catch(error){
        console.error('Erro ao deletar usuário:', error);
        // Normaliza o erro para o Saga
        if (error.graphQLErrors?.[0]?.message) {
          throw new Error(error.graphQLErrors[0].message);
        }
        throw error;
      }
}

export const getOneUserService = async(userData) => {

};

export const allUsersService = async(userData) => {
    try{
        const response = await client.query({
        query: USERS,
        fetchPolicy: 'cache-first',
        });
        console.log("Users Service: ", response.data.users);
        return response.data.users;
    } 
    catch(error){
        console.error('Erro ao buscar usuários:', error);
        // Normaliza o erro para o Saga
        if(error.graphQLErrors?.[0]?.message){
        throw new Error(error.graphQLErrors[0].message);
        }
        throw error;
    }
};






