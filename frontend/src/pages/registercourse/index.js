import React from 'react';
import './index.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { setErrorCourse, resetErrorCourse, createCourse } from '../../redux/courses/slice';
import { validateImageFile } from '../../utils/validateform';

export default function Register()
{
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const userData = useSelector((state) => state.user.userData);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [teacher, setTeacher] = useState(userData?.id || '');

    const error = useSelector((state) => state.course.error);

    function prepareSetTitle(e){setTitle(e.target.value);}
    function prepareSetDescription(e){setDescription(e.target.value);}
    function prepareSetTeacher(e){setTeacher(e.target.value);}
    

    useEffect(() => {
        if (error) {
            console.error("Erro detectado: ", error);
        }
    }, [error]);

    function register(e)
    {
        (dispatch(resetErrorCourse()));
        e.preventDefault();

            if(     
                title === "" || title === undefined 
                ||  teacher === "" || teacher === undefined
                ||  description === "" || description === undefined
            ){
                dispatch(setErrorCourse({error: "Preencha TODOS os campos!"}));
                return;
            }
            else{
                const courseData = {
                    title,
                    description,
                    teacher,
                };

                dispatch(createCourse(courseData));      //aqui se nao fosse um formData, seria enviado um objeto {chave: valor};

                alert("Curso registrado com sucesso!");
                navigate('/addcourse');
                
                setTitle("");
                setDescription("");
                setTeacher("");
           }
    }

        function backward()
        {
            dispatch(resetErrorCourse());
            navigate('/courses');
            return null;
        }


return(
                   
<div>
    <div className="container">
    <section className="containerSection">

        <form>
        <h1 className="commumtitle">Cadastrar Curso:</h1>

        <div className="row">
            <div className="col25">
                <label>Título do curso:</label>
            </div>
            <div className="col75">
                <input type="text" id="title" name="title" maxLength="180" onChange={prepareSetTitle} placeholder="Título do curso..." value={title}></input>
            </div>
        </div>

        <div className="row">
            <div className="col25">
                <label>Descrição:</label>
            </div>
            <div className="col75">
                <textarea id="description" name="description"  maxLength="254" onChange={prepareSetDescription} placeholder="Descreva o curso..." value={description}></textarea>
            </div>
        </div>

        <div className="row">
                <input type="hidden" id="teacher" name="teacher" onChange={prepareSetTeacher} value={teacher} readOnly></input>
        </div>

        {error && <> <br /><p className='formError'><b>{error}</b></p> </>}

        <div className="row">
            <div>
                <button className="buttonlogin" type="buttonsubmit" value="Submit" onClick={register}>Enviar</button>
                <button className="buttonlogin" style={{background: 'red', marginLeft: '15px', hover: 'black'}} type="button" onClick={backward}>Voltar</button>
            </div>
        </div>
        </form>
        <br />

    </section>
    </div>
    
    <br /><br />
</div>

    );
}