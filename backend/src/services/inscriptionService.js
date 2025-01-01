const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { inscriptionCreateSchema, idSchema } = require('../utils/validateForms/inscriptionValidate');
const getCurrentDateTime = require('../utils/dateUtils');

async function inscriptionCreate(studentID, courseID){
    try{
        await inscriptionCreateSchema.validateAsync({ studentID, courseID });
        const created_at = getCurrentDateTime();
        let newInscription  = await prisma.inscriptions.create({
            data: {id_student: studentID, id_course: courseID, created_at},
        });
        console.log("Inscrição criada: ", newInscription );
        newInscription = {
            id: newInscription.id,
            studentID: newInscription.id_student,  //Mapeie para o nome correto
            courseID: newInscription.id_course,    //Mapeie para o nome correto
            createdAt: newInscription.created_at
        };
        return newInscription ;
    }
    catch(error){
        console.error("Erro ao criar a Inscrição:", error);
        throw new Error("Erro ao criar a Inscrição. Verifique os dados e tente novamente.");
    }
};

async function inscriptionDelete(id){
    try {
        await idSchema.validateAsync({ id });
        await prisma.inscriptions.delete({
            where: { id },      //Localiza o usuário pelo ID
        });
        console.log(`Curso ID ${id} deletado com sucesso!`);
        return id;              //Retorna o ID do usuário deletado
    }
    catch(error){
        console.error("Erro ao deletar curso:", error);
        throw new Error("Erro ao deletar o curso. Verifique os dados e tente novamente.");
    }
};

async function getInscription(id){
    try{
        await idSchema.validateAsync({ id });
        let inscription = await prisma.inscriptions.findUnique({
            where: { id },          //Busca o usuário com o ID especificado
        });
        
        inscription = {
            id: inscription.id,
            studentID: inscription.id_student,  //Mapeie para o nome correto
            courseID: inscription.id_course,    //Mapeie para o nome correto
            createdAt: inscription.created_at
        };
        return inscription;

    }
    catch(error){
        console.error("Erro ao verificar inscrição no curso: ", error);
        throw new Error("Erro ao verificar inscrição no curso.");
    }
}

async function getInscriptionByUser(id) {
    try {
        await idSchema.validateAsync({ id }); // Validação do ID do estudante
        let inscription = await prisma.inscriptions.findMany({
            where: { id_student: id }, // Filtra inscrições pelo campo `id_student`
        });

        const mappedInscriptions = inscription.map((inscription) => ({
            id: inscription.id,
            studentID: inscription.id_student,  //Mapeie para o nome correto
            courseID: inscription.id_course,    //Mapeie para o nome correto
            createdAt: inscription.created_at
        }));
        return mappedInscriptions;

    } catch (error) {
        console.error("Erro ao buscar inscrições por usuário: ", error);
        throw new Error("Erro ao buscar inscrições por usuário.");
    }
}

async function getInscriptionByCourse(id) {
    try {
        await idSchema.validateAsync({ id }); // Validação do ID do curso
        let inscription = await prisma.inscriptions.findMany({
            where: { id_course: id }, // Filtra inscrições pelo campo `id_course`
        });

        const mappedInscriptions = inscription.map((inscription) => ({
            id: inscription.id,
            studentID: inscription.id_student,  //Mapeie para o nome correto
            courseID: inscription.id_course,    //Mapeie para o nome correto
            createdAt: inscription.created_at
        }));
        return mappedInscriptions;    
    } 
    catch(error){
        console.error("Erro ao buscar inscrições por curso: ", error);
        throw new Error("Erro ao buscar inscrições por curso.");
    }
}

async function fetchInscriptions(){
    try{
        const inscription = await prisma.inscriptions.findMany();

        const mappedInscriptions = inscription.map((inscription) => ({
            id: inscription.id,
            studentID: inscription.id_student,  //Mapeie para o nome correto
            courseID: inscription.id_course,    //Mapeie para o nome correto
            createdAt: inscription.created_at
        }));
        return mappedInscriptions;
    }
    catch(error){
        console.error("Erro ao buscar os cursos inscritos: ", error);
        throw new Error("Erro ao buscar os cursos inscritos.");
    }
}

module.exports = { inscriptionCreate, inscriptionDelete, getInscription, getInscriptionByUser, getInscriptionByCourse, fetchInscriptions };
