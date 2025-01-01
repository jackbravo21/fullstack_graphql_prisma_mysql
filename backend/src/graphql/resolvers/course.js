const { fetchCourses, getOneCourse, courseCreate, courseEdit, courseDelete } = require('../../services/courseService');
const { imageDataSave } = require('../../middlewares/imageDataSave');
const {checkAuth} = require('../../middlewares/checkContextUser');

const courseResolvers = {

  Query: {
    courses: async () => await fetchCourses(),
    course: async (_, { id }) => await getOneCourse(id),
  },

  Mutation: {

    createCourse: async (_, { title, description, teacher }, context) => {
      checkAuth(context);
      try{
        //Salvar no banco de dados;
        const newCourse = await courseCreate(title, description, teacher);
        return newCourse;
      } 
      catch(error){
        console.error("Erro ao criar curso:", error);
        throw new Error("Erro ao criar curso. Tente novamente.");
      }
    },
    
    editCourse: async (_, { id, title, description, teacher }, context) => {
      checkAuth(context);
      try{
        const editCourse = await courseEdit(id, title, description, teacher);
        return editCourse;
      } 
      catch(error){
        console.error("Erro ao editar curso:", error);
        throw new Error("Erro ao editar curso. Tente novamente.");
      }
    },

    deleteCourse: async (_, { id }, context) => {
      checkAuth(context);
      try{
        await courseDelete(id);
        return { success: true, id };
      } 
      catch(error){
        console.error("Erro ao deletar curso:", error);
        throw new Error("Erro ao deletar curso. Tente novamente.");
      }
    },
  },
};

module.exports = courseResolvers;