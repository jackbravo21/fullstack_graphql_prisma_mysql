import {call, put, takeLatest} from 'redux-saga/effects';
import {
    createCourseSuccess, createCourseFailure, clearDataCourses, 
    editCourseSuccess, editCourseFailure, 
    deleteCourseSuccess, deleteCourseFailure, 
    getCourseSuccess, getCourseFailure, 
    fetchCoursesSuccess, fetchCoursesFailure
} from './slice';
import {createCourseService, courseEditService, deleteCourseService, getOneCourseService, getAllCourseService} from '../../services/courses';


function* createCourse(action){

    try{
        console.log("Criando curso no DB...");
        
        //`action.payload` já é um FormData, enviado diretamente pelo componente;
        //const formData = action.payload;
        const formData = {
            title: action.payload.title,
            description: action.payload.description,
            teacher: action.payload.teacher,
            image: action.payload.image,
        };

        //Chamar o serviço com o `FormData` para envio multipart;
        const response = yield call(createCourseService, formData);
        console.log("Produto criado com Sucesso: ", response);
        //Sucesso: disparar a action com os dados do produto retornados pelo backend;
        yield put(createCourseSuccess());
    }
    catch(error){
        yield put(createCourseFailure(error.message));
        console.error("Erro ao criar curso: ", error);    
    }
};

function* editOneCourse(action){
    try{
        console.log("Editando curso no DB...");

        const courseData = {
            id: action.payload.id,
            title: action.payload.title,
            description: action.payload.description,
            teacher: action.payload.teacher,
        };

        const response = yield call(courseEditService, courseData);
        yield put(editCourseSuccess(response.data));
        //Buscar os cursos atualizados;
        yield call(getAllCourses);
    } 
    catch(error){
        yield put(editCourseFailure(error.message));
        console.error("Erro ao editar curso: ", error);   
    }
};

function* deleteOneCourse(action){
    try{
        console.log("Deletando curso no DB...");

        const courseData = {
            id: action.payload.id,
        };
        const response = yield call(deleteCourseService, courseData);
        yield put(deleteCourseSuccess(response));
        
        try {
            //yield call(clearDataCourses());
            const response = yield call(getAllCourseService);
            console.log("Caiu na final: ", response);
            yield put(fetchCoursesSuccess(response));
        }
        catch(error){
            yield put(fetchCoursesFailure(error.message));
            console.error("Erro ao buscar vários cursos: ", error);    
        }   
        
    }
    catch(error){
        yield put(deleteCourseFailure(error.message));
        console.error("Erro ao deletar curso: ", error);    
    }    
};

function* getOneCourse(action){
    try{
        console.log("Buscando um curso no DB...");
        
        const courseData = {
            id: action.payload.id,
        };

        const response = yield put(getOneCourseService, courseData);
        yield put(getCourseSuccess(response.data));
    }
    
    catch(error){
        yield put(getCourseFailure(error.message));
        console.error("Erro ao buscar um curso: ", error);    
    }
};

function* getAllCourses(action){
    try{
        console.log("Buscando cursos no DB...");

        const response = yield call(getAllCourseService);
        yield put(fetchCoursesSuccess(response));
    }
    catch(error){
        yield put(fetchCoursesFailure(error.message));
        console.error("Erro ao buscar vários cursos: ", error);    
    }   
};

function* courseSaga()
{
    yield takeLatest('course/createCourse', createCourse);
    yield takeLatest('course/deleteCourse', deleteOneCourse);
    yield takeLatest('course/getCourse', getOneCourse);
    yield takeLatest('course/editCourse', editOneCourse);
    yield takeLatest('course/fetchCourses', getAllCourses); 
}

export default courseSaga;