import React from 'react';
import './index.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { setErrorCourse, resetErrorCourse, clearDataCourses, deleteCourse} from '../../redux/courses/slice';

export default function Register()
{ 
    const navigate = useNavigate();
    const dispatch = useDispatch();

    //Pegando valores da store
    const courseData = useSelector((state) => state.course.courseData);
    const courses = useSelector((state) => state.course.courses);

    //Inicializando o estado com os valores da store
    const [id, setID] = useState(courseData?.id || '');
    const [title, setTitle] = useState(courseData?.title || '');
    const [description, setDescription] = useState(courseData?.description || '');
    const [teacher, setTeacher] = useState(courseData.teacher || '');
    const [createdAt, setCreatedAt] = useState(courseData?.createdAt || '');
    const error = useSelector((state) => state.course.error);
    const serverImgLink = "http://localhost:9000/images/";

    useEffect(() => {
        dispatch(resetErrorCourse());
    }, []);

    useEffect(() => {
        if(courseData && courseData.id){
            setID(courseData.id);
            setTitle(courseData.title);
            setDescription(courseData.description);
            setTeacher(courseData.teacher);
            setCreatedAt(courseData.createdAt);
        }
        console.log("DeleteData: ", courseData);
        console.log("DeleteDataCourses: ", courses);
    }, [courseData]);
       
useEffect(() => {
    if (error) {
        console.error("Erro detectado: ", error);
    }
}, [error]);

    function clearDataForm(){
        setID('')
        setTitle('');
        setDescription('');
        setTeacher('');
        setCreatedAt('');
    }


    function functionDelete(e)
    {
        e.preventDefault();
        (dispatch(resetErrorCourse()));

        if(id === "" || id === undefined){
            dispatch(setErrorCourse({error: "Erro ao deletar! ID inexistente!"}));
            return;
        }
        else{
            dispatch(deleteCourse({id: id}));
            alert(`Curso '${id}' DELETADO com Sucesso!`);
            console.log("Delete: " + JSON.stringify(courses, null, 2));
            clearDataForm();
            dispatch(clearDataCourses());
            navigate('/courses');
        }
    }

    function backward()
    {
        //dispatch(clearDataCourse());
        navigate('/courses');
        return null;
    }

    function withOutID()
    {
        alert("Erro ao carregar dados!");
        dispatch(setErrorCourse({error: "Erro ao carregar dados!"}));
        navigate('/courses');
        return null;
    }

return (
    courseData.id !== null && courseData.id !== "" && courseData.id !== undefined ? (
        <div>
        <div className="container">
        <section className="containerSectionDelete">
            <form>
            <h1 className="commumtitle">Quer mesmo deletar este Curso?</h1>

            <div className="row">
                <input type="hidden" id="id" name="id" value={id} readOnly />
            </div>
            <br />
            <div className="productGrid">
                <div className="productItem">
                    <p className="central"><strong>ID:</strong> {id}</p>
                    <p className="central"><strong>Titulo:</strong> {title}</p>
                    <p className="central"><strong>Descrição:</strong> {description}</p>
                    <p className="central"><strong>Professor:</strong> {teacher}</p>
                    <p className="central"><strong>Data de Criação:</strong> {createdAt}</p>
                </div>
            </div>

            {error && <> <br /><p className='formError'><b>{error}</b></p> </>}

            <div className="row">
                <div>                
                    <br />
                    <button className="buttonlogin" type="button" onClick={functionDelete}>
                        Confirmar
                    </button>
                    <button className="buttonlogin" style={{background: 'red', marginLeft: '15px', hover: 'blue'}} type="button" onClick={backward}>Voltar</button>                    
                </div>
            </div>
            </form>
            <br />
        </section>
        </div>

        <br />
        <br />

        </div>
    ) : (
        withOutID() || null
    )
);

}
