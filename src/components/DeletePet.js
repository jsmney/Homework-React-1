import React from 'react';
import axios from 'axios';

const DeletePet = props => {
  const { petId, handleDelete } = props;
  const handleClick = async () => {
    try {
      await axios.delete(`/api/pets/${petId}`);
      handleDelete(petId);
    } catch (err) {
      // console.error(err);
    }
  };
  return (
    <button className="delete-button" onClick={handleClick}>
      Delete
    </button>
  );
};

export default DeletePet;
