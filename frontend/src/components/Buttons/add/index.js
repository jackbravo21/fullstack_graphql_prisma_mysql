import React from 'react';
import './index.css';

const AddButton = ({ onClick }) => {
  return (
    <button onClick={onClick} style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}>
      <a className="buttonsubmit">Adicionar</a>
    </button>
  );
};

export default AddButton;