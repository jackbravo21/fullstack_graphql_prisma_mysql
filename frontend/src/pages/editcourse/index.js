import React from 'react';
import './index.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { editCourse, editCourseData, clearDataCourse, setErrorCourse, resetErrorCourse } from '../../redux/courses/slice';

export default function Register()
{
    const navigate = useNavigate();
    const dispatch = useDispatch();

    //Pegando valores da store
    const editData = useSelector((state) => state.course.courseData);

    const [id, setID] = useState(editData?.id || '');
    const [title, setTitle] = useState(editData?.title || '');
    const [description, setDescription] = useState(editData?.description || '');
    const [teacher, setTeacher] = useState(editData?.teacher || '');
    const [createdAt, setCreatedAt] = useState(editData?.createdAt || '');
    const error = useSelector((state) => state.course.error);
    const serverImgLink = "http://localhost:9000/images/";

    function prepareSetTitle(e){setTitle(e.target.value);}
    function prepareSetDescription(e){setDescription(e.target.value);}

    useEffect(() => {
        dispatch(resetErrorCourse());
    }, []);

    useEffect(() => {
        if(editData && editData.id){
            setID(editData.id);
            setTitle(editData.title);
            setDescription(editData.description);
            setTeacher(editData.teacher);
            setCreatedAt(editData.createdAt);
        }
        console.log("EditData: ", editData);
    }, [editData]);
    
    useEffect(() => {
        if (error) {
            console.error("Erro detectado: ", error);
        }
    }, [error]);

    function clearDataForm(){
        setID(null)
        setTitle(null);
        setDescription(null);
        setTeacher(null);
        setCreatedAt(null);
    }

    function register(e)
    {
        console.log("Função `register` foi chamada.");
        e.preventDefault();
        dispatch(resetErrorCourse());

        if(     
                id === "" || id === undefined 
            ||  title === "" || title === undefined 
            ||  description === "" || description === undefined
        ){
            dispatch(setErrorCourse({error: "Preencha TODOS os campos!"}));
            console.log(error);
            return;
        }

        dispatch(editCourse({
            id: id,
            title: title,
            description: description,
            teacher: teacher,
            createdAt: createdAt
        }));

        alert(`Produto '${title}' editado com Sucesso!`);
        clearDataForm();
        
        navigate('/courses');
    }

function backward()
{
    //dispatch(clearDataCourse());
    dispatch(resetErrorCourse());
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

return(

editData.id !== null && editData.id !== "" && editData.id !== undefined ? (
<div>
    <div className="container">
    <section className="containerSection">

        <form>
        <h1 className="commumtitle">Editar Curso:</h1>
        
        <div className="row">
            {error && <> <p className='formError'><b>{error}</b></p> </>}
        </div>
        
        <div className="row">
            <input type="hidden" id="id" name="id" value={id} readOnly />
        </div>

        <div className="row">
            <div className="col25">
                <label>Titulo do Curso:</label>
            </div>
            <div className="col75">
                <input type="text" id="title" name="title" maxLength="70" onChange={prepareSetTitle} placeholder="Nome do Curso..." value={title}></input>
            </div>
        </div>

        <div className="row">
                <input type="hidden" id="teacher" name="teacher" value={teacher} readOnly></input>
        </div>

        <div className="row">
            <div className="col25">
                <label>Descrição:</label>
            </div>
            <div className="col75">
                <textarea id="description" name="description"  maxLength="254" onChange={prepareSetDescription} placeholder="Descreva o produto..." value={description}></textarea>
            </div>
        </div>

        <div className="row">
                <div className="col25">
                    <label>Data de criação:</label>
                </div>
                <div className="col75">
                    <span>{createdAt}</span>
                </div>
        </div>
        <br />

        <div className="row">
            <div><br />
                <button className="buttonlogin" type="button" onClick={register}>
                        Enviar
                </button>
                <button className="buttonlogin" style={{background: 'red', marginLeft: '15px', hover: 'blue'}} type="button" onClick={backward}>Voltar</button>
            </div>
        </div>
        </form>
        <br />

    </section>
    </div>
    
    <br /><br />
</div>
    ) : (
        withOutID() || null
    )
    );
}