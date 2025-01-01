const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { securePassword, comparePassword } = require('../middlewares/bcrypt');
const { userLoginSchema, userCheckSchema, userCreateSchema, userEditSchema, idSchema } = require('../utils/validateForms/userValidate');
const getCurrentDateTime = require('../utils/dateUtils');

async function userLogin(mail, password){
    try{
        await userLoginSchema.validateAsync({ mail, password });
        const selectUser = await prisma.users.findUnique({
            where: { mail },
        });

        if(!selectUser){
            console.log("Usuário não encontrado! Verifique seu email!");
            throw new Error("Usuário não encontrado! Verifique seu email!");
        }

        const passwordDB = selectUser.password;
        const checkPassword = await comparePassword(password, passwordDB);

        if(!checkPassword){
            console.log("Senha incorreta!");
            throw new Error("Senha incorreta!");
        }

        //Removo o campo da senha para retornar ao front seguro;
        delete selectUser.password;
        selectUser.isLoggedIn = true;
        selectUser.statusCode = 200;

        // Criando o token JWT
        const token = jwt.sign(
            { id: selectUser.id, mail: selectUser.mail },   //Payload, dados do usuário
            process.env.JWT_SECRET,                             //Chave secreta do JWT (dev ser guardada em .env)
            { expiresIn: '1h' }                                 //Expiração do token (pode ser ajustado conforme necessário)
        );

        console.log("Token gerado e enviado para o front-end");

        console.log("BackEnd: ", selectUser);
        //Retornando os dados do usuário e o token para o front-end;
        return {user: selectUser, token};
    }
    catch(error){
        console.error("Erro ao verificar Login:", error.message || error);
        throw new Error("Erro ao verificar Login: " + (error.message || "Detalhes indisponíveis"));
    }
};

async function userCheckInDB(mail){
    try{
        await userCheckSchema.validateAsync({ mail });
        const count = await prisma.users.count({
            where: {
              mail: mail,
            },
        });

        if(count > 0){
            console.log("Count do userCheckInDb:", count);
            console.log("\x1b[31m"+"Usuário já existe no sistema!");
            return count;
        }
        else{
            console.log("Count do userCheckInDb:", count);
            console.log("\x1b[32m"+"Usuário não existe no sistema!");
            return count;
        }
    }
    catch(error){
        console.error("Erro ao criar usuário:", error);
        throw new Error("Erro ao verificar usuário. Verifique os dados e tente novamente.");
    }
};

async function userCreate(fullname, mail, cleanPassword, level){
    try{
        if(level !== 'administrator' && level !== 'teacher'){
            level = 'user';
        }
        await userCreateSchema.validateAsync({ fullname, mail, cleanPassword, level });
        //Criptografa a senha do usuário;
        const hashPassword = await securePassword(cleanPassword); 
        const created_at = getCurrentDateTime();

        const newUser = await prisma.users.create({
            data: {fullname, mail, password: hashPassword, level, created_at},
        });

        delete newUser.password;

        const userReturn = {
            id: newUser.id,
            fullname: newUser.fullname,
            mail: newUser.mail,
            level: newUser.level,
            createdAt: newUser.created_at
        }
        
        console.log("Usuario criado: ", userReturn);
        return userReturn;
    }
    catch(error){
        console.error("Erro ao criar usuário:", error);
        throw new Error("Erro ao criar o usuário. Verifique os dados e tente novamente.");
    }
};

async function userEdit(id, fullname, mail, password, level){
    try{
        await userEditSchema.validateAsync({ id, fullname, mail, password, level });
        const updateUser = await prisma.users.update({
            where: { id }, //Localiza o usuário pelo ID
            data: { fullname, mail, password, level }, //Atualiza os campos especificados
        });
        console.log("Usuario editado: ", updateUser);
        return updateUser;
    }
    catch(error){
        console.error("Erro ao editar usuário:", error);
        throw new Error("Erro ao editar o usuário. Verifique os dados e tente novamente.");
    }
};

async function userDelete(id){
    try {
        await idSchema.validateAsync({ id });
        await prisma.users.delete({
            where: { id },      //Localiza o usuário pelo ID
        });
        console.log(`Usuario ID ${id} deletado com sucesso!`);
        return id;              //Retorna o ID do usuário deletado
    }
    catch(error){
        console.error("Erro ao deletar usuário:", error);
        throw new Error("Erro ao deletar o usuário. Verifique os dados e tente novamente.");
    }
};

async function getOneUsers(id){
    try{
        await idSchema.validateAsync({ id });
        return await prisma.users.findUnique({
            where: { id },          //Busca o usuário com o ID especificado
        });
    }
    catch(error){
        console.error("Erro ao buscar usuário: ", error);
        throw new Error("Erro ao buscar usuário.");
    }
}

async function fetchUsers(){
    try{
        return await prisma.users.findMany();
    }
    catch(error){
        console.error("Erro ao buscar usuários: ", error);
        throw new Error("Erro ao buscar usuários.");
    }
}

module.exports = { userLogin, userCheckInDB, userCreate, userEdit, userDelete, getOneUsers, fetchUsers };