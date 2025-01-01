import React from 'react';
import { FaUserEdit } from 'react-icons/fa';
import './index.css';

const SubscribleButton = ({ onClick }) => {
  return (
    <button className='buttonSubscrible1' onClick={onClick}>
      <FaUserEdit className='iconEditButton' /> Inscrever-se
    </button>
  );
};

export default SubscribleButton;