import React from 'react';
import { FaUserEdit } from 'react-icons/fa';
import './index.css';

const EditButton = ({ onClick }) => {
  return (
    <button className='buttonEdit1' onClick={onClick}>
      <FaUserEdit className='iconEditButton' /> Editar
    </button>
  );
};

export default EditButton;