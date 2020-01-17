import React, { useState } from 'react';
import DeletePet from './DeletePet';

const SinglePet = props => {
  const [adopted, setAdopt] = useState(false);

  return (
    <div className="single-pet">
      <p>
        Name: {props.pet.name}
        <br /> Description: {props.pet.description}
        <br />
        Species: {props.pet.species}
      </p>
      <button onClick={() => setAdopt(true)}>Toggle Adopted</button>
      <p>{adopted ? 'Adopted!' : 'Available for adoption'}</p>
      <DeletePet petId={props.pet.id} handleDelete={props.handleDelete} />
    </div>
  );
};

export default SinglePet;
