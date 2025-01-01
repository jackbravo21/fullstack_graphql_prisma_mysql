const { fetchUsers, getOneUsers, userCreate, userEdit, userDelete, userLogin, userCheckInDB } = require('../../services/userService');
const {checkAuth} = require('../../middlewares/checkContextUser');

const userResolvers = {
  Query: {

    users: async (_, __, context) => {
      console.log("Context : ", context);
      checkAuth(context);
      try{      
        const users = await fetchUsers();
        return users;
      } 
      catch(error){
        console.error("Erro ao buscar usuário:", error);
        throw new Error("Erro ao buscar usuário. Tente novamente.");
      }
    },

    user: async (_, { id }, context) => {
      checkAuth(context);
      try{      
        const user = await getOneUsers(id);
        return user;
      } 
      catch(error){
        console.error("Erro ao buscar usuário:", error);
        throw new Error("Erro ao buscar usuário. Tente novamente.");
      }
    },

    checkUserMail: async (_, { mail }) => await userCheckInDB(mail),
  },

  Mutation: {

    login: async (_, { mail, password }) => {
      const { user, token } = await userLogin(mail, password);
      return { user, token };
    },

    createUser: async (_, { fullname, mail, password, level }, context,) => {
      checkAuth(context);
      console.log("CreateUser: ", fullname, mail, password, level);
      try{      
        const createUser = await userCreate(fullname, mail, password, level);
        return createUser;
      } 
      catch(error){
        console.error("Erro ao criar usuário:", error);
        throw new Error("Erro ao criar usuário. Tente novamente.");
      }
    },

    editUser: async (_, { id, fullname, mail, password, level }, context) => {
      checkAuth(context);
      try{      
        const editUser = await userEdit(id, fullname, mail, password, level);
        return editUser;
      } 
      catch(error){
        console.error("Erro ao editar usuário:", error);
        throw new Error("Erro ao editar usuário. Tente novamente.");
      }
    },

    deleteUser: async (_, { id }, context) => {
      checkAuth(context);
      try{      
        await userDelete(id);
        return { success: true, id };
      } 
      catch(error){
        console.error("Erro ao editar usuário:", error);
        throw new Error("Erro ao editar usuário. Tente novamente.");
      }
    },
  },
};

module.exports = userResolvers;