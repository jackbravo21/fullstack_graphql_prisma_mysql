import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCourses, dataTempCourse, clearDataCourse } from '../../redux/courses/slice';
import { useNavigate } from 'react-router-dom';
import { FaUserEdit, FaTrashAlt } from "react-icons/fa";
import { LuNotebookPen } from "react-icons/lu";
import EditButton from '../../components/Buttons/edit/index';
import DeleteButton from '../../components/Buttons/delete/index';
import SubscribleButton from '../../components/Buttons/inscription/index';
import UnbuscribleButton from '../../components/Buttons/unsubscribe/index';
//import AddButton from '../../components/Buttons/add/index';
import './index.css';

export default function Courses() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    //Pegando os produtos diretamente da store
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
    const courses = useSelector((state) => state.course.courses);
    const loading = useSelector((state) => state.course.loading);
    const error = useSelector((state) => state.course.error);
    const serverImgLink = "http://localhost:9000/images/";

    useEffect(() => {
        if (error) {
            console.error("Erro detectado: ", error);
        }
    }, [error]);

    useEffect(() => {
        console.log("Buscando Cursos...");
        dispatch(fetchCourses());
    }, [dispatch, courses]);

    function actioncourse(id, title, description, teacher, createdAt, module){
        dispatch(clearDataCourse());
        console.log(`Dados do curso temporário limpos antes de realizar a ação: ${module}`);
        dispatch(dataTempCourse({
            id: id, 
            title: title, 
            description: description, 
            teacher: teacher,
            createdAt: createdAt,
        }));
        if(module == 'edit'){navigate('/editcourse');}
        if(module == 'delete'){navigate('/deletecourse');}
    }

    if (loading) {
        return <div className='commumtitle'>Carregando produtos...</div>;
    }

    //<p className='central'><img className='centralImage' src={`${serverImgLink}${course.way}`} alt="course" /></p>

    return (
        <div style={{marginBottom: '65px'}} className="containerSection">
            <h2 className="commumtitle">Cursos:</h2>

            {courses.length === 0 && <p>Não há cursos disponíveis.</p>}

            <div className="courseGrid">
                {courses.map((course) => (
                    <div key={course.id} className="courseItem">
                        <h3>{course.name}</h3>
                        {/*<p className="central">{course.way}</p>*/}
                        <p className="central"><strong>Idenficação:</strong> {course.id}</p>
                        <p className="central"><strong>Title:</strong> {course.title}</p>
                        <p className="central"><strong>Descrição:</strong> {course.description}</p>
                        <p className="central"><strong>Teacher:</strong> {course.teacher}</p>
                        <p className="central"><strong>Data de Criação:</strong> {course.createdAt}</p>
                        <div>
                            {isLoggedIn === true ? (
                            <>
                            <EditButton onClick={() => actioncourse(course.id, course.title, course.description, course.teacher, course.createdAt, 'edit')} />
                            <DeleteButton onClick={() => actioncourse(course.id, course.title, course.description, course.teacher, course.createdAt, 'delete')} />
                            </>
                            ): null}
                        </div>
                    </div>
                ))}
            </div>
            {error && <p>{error}</p>}
        </div>
    );
}