import {client} from '../graphql/server/ApolloClient';
import {COURSES, EDIT_COURSE, DELETE_COURSE, CREATE_COURSE} from '../graphql/schemas/course';

export const createCourseService = async(courseData) => {
  try {
    const response = await client.mutate({
      mutation: CREATE_COURSE, // Defina a mutação CREATE_COURSE corretamente
      variables: {
        title: courseData.title,
        description: courseData.description,
        teacher: courseData.teacher,
      },
      update: (cache, { data: { createCourse } }) => {
        // Atualizando a lista de cursos no cache após a criação de um novo curso
        const existingCourses = cache.readQuery({ query: COURSES });
        const newCourseList = [...existingCourses.courses, createCourse]; // Adicionando o novo curso à lista
        cache.writeQuery({
          query: COURSES,
          data: { courses: newCourseList },
        });
      },
    });
    return response.data.createCourse;
  } catch (error) {
    console.error('Erro ao criar curso:', error);
    if (error.graphQLErrors?.[0]?.message) {
      throw new Error(error.graphQLErrors[0].message);
    }
    throw error;
  }
};

export const courseEditService = async(courseData) => {
    try{
        const response = await client.mutate({
          mutation: EDIT_COURSE,
          variables: {
            id: courseData.id,
            title: courseData.title,
            description: courseData.description,
            teacher: courseData.teacher,
          },
          update: (cache, { data: { editCourse } }) => {
            // Atualizando a lista de cursos no cache após a edição do curso
            const existingCourses = cache.readQuery({ query: COURSES });
            const updatedCourses = existingCourses.courses.map(course =>
              course.id === editCourse.id ? editCourse : course
            );
            cache.writeQuery({
              query: COURSES,
              data: { courses: updatedCourses },
            });
          },
        });
        return response.data.editCourse;
      } 
      catch(error){
        console.error('Erro ao editar curso:', error);
        // Normaliza o erro para o Saga
        if (error.graphQLErrors?.[0]?.message) {
          throw new Error(error.graphQLErrors[0].message);
        }
        throw error;
      }
};

export const courseDataEditService = async(courseData) => {
  //reservado para caso for usar dataFile;
};

export const deleteCourseService = async(courseData) => {
    try{
        const response = await client.mutate({
          mutation: DELETE_COURSE,
          variables: {
            id: courseData.id,
          },
          update: (cache) => {
            // Atualizando a lista de cursos no cache após a exclusão do curso
            const existingCourses = cache.readQuery({ query: COURSES });
            const updatedCourses = existingCourses.courses.filter(course => course.id !== courseData.id);
            cache.writeQuery({
              query: COURSES,
              data: { courses: updatedCourses },
            });
          },
        });
        return response.data.deleteCourse;
      } 
      catch(error){
        console.error('Erro ao deletar curso:', error);
        // Normaliza o erro para o Saga
        if (error.graphQLErrors?.[0]?.message) {
          throw new Error(error.graphQLErrors[0].message);
        }
        throw error;
      }
}

export const getOneCourseService = async(courseData) => {

}

export const getAllCourseService = async() => {
    try{
        const response = await client.query({
        query: COURSES,
        //fetchPolicy: 'cache-and-network',
        fetchPolicy: 'cache-first',
        });
        console.log("Courses Service: ", response.data.courses);
        return response.data.courses;
    } 
    catch(error){
        console.error('Erro ao buscar cursos:', error);
        // Normaliza o erro para o Saga
        if(error.graphQLErrors?.[0]?.message){
        throw new Error(error.graphQLErrors[0].message);
        }
        throw error;
    }
};

