const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { courseCreateSchema, courseEditSchema, idSchema } = require('../utils/validateForms/courseValidate');
const getCurrentDateTime = require('../utils/dateUtils');

async function courseCreate(title, description, teacher){
    try{
        //validacao dos campos;
        await courseCreateSchema.validateAsync({ title, description, teacher});
        const created_at = getCurrentDateTime();
        const newCourse = await prisma.courses.create({
            data: {title, description, teacher, created_at},
        });

        const courseData = {
            id: newCourse.id,
            title: newCourse.title,
            description: newCourse.description,
            teacher: newCourse.teacher,
            createdAt: newCourse.created_at, 
        }

        console.log("Curso criado: ", courseData);
        return courseData;
    }
    catch(error){
        console.error("Erro ao criar o curso:", error);
        throw new Error("Erro ao criar o curso. Verifique os dados e tente novamente.");
    }
};

async function courseEdit(id, title, description, teacher){
    try{
        await courseEditSchema.validateAsync({ id, title, description, teacher });
        const updateCourse = await prisma.courses.update({
            where: { id }, //Localiza o usuário pelo ID
            data: { title, description, teacher }, //Atualiza os campos especificados
        });
        console.log("Curso editado: ", updateCourse);
        return updateCourse;
    }
    catch(error){
        console.error("Erro ao editar o curso:", error);
        throw new Error("Erro ao editar o curso. Verifique os dados e tente novamente.");
    }
};

async function courseDelete(id){
    try {
        await idSchema.validateAsync({ id });
        await prisma.courses.delete({
            where: { id },      //Localiza o usuário pelo ID
        });
        console.log(`Curso ID ${id} deletado com sucesso!`);
        return true;
    }
    catch(error){
        console.error("Erro ao deletar curso:", error);
        throw new Error("Erro ao deletar o curso. Verifique os dados e tente novamente.");
    }
};

async function getOneCourse(id){
    try{
        await idSchema.validateAsync({ id });
        return await prisma.courses.findUnique({
            where: { id },          //Busca o usuário com o ID especificado
        });
    }
    catch(error){
        console.error("Erro ao buscar curso: ", error);
        throw new Error("Erro ao buscar curso.");
    }
}

async function fetchCourses(){
    try{
        const allCourses = await prisma.courses.findMany();

        const courses = allCourses.map(course => {
            const{ id, title, description, teacher, created_at } = course;     //Desestrutura para separar created_at
            return{
                id: id,
                title: title,
                description: description,
                teacher: teacher,
                createdAt: created_at,                  //Adiciona createdAt com o valor de created_at
            };
        });
        console.log(courses);
        return courses;
    }
    catch(error){
        console.error("Erro ao buscar os cursos: ", error);
        throw new Error("Erro ao buscar os cursos.");
    }
}

module.exports = { courseCreate, courseEdit, courseDelete, getOneCourse, fetchCourses };
