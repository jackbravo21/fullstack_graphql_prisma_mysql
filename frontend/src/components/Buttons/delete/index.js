import React from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import './index.css';

const DeleteButton = ({ onClick }) => {
  return (
    <button className='buttonDelete1' onClick={onClick}>
      <FaTrashAlt className='iconDeleteButton' /> Excluir
    </button>
  );
};

export default DeleteButton;