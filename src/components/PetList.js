import React, { useState } from 'react';
import SinglePet from './SinglePet';

const cody = {
  id: 2,
  name: 'Cody',
  description: 'Adorable pug who loves to hug',
  species: 'dog',
};

// PetList only renders one SinglePet. We'd like it to render a list of pets,
// passed in as props.pets. Don't forget to add a unique key to each one!
const PetList = props => {
  const [filter, setFilter] = useState('all');
  let [filteredPets, setFilteredPets] = useState(props.pets);
  const handleChange = evt => {
    setFilter(evt.target.value);
  };

  const pets = props.pets.filter(pet => {
    if (filter === 'all') return pet;
    if (filter === 'cats') return pet.species === 'cat';
    if (filter === 'dogs') return pet.species === 'dog';
  });

  return (
    <div className="pet-list">
      <select value={filter} onChange={handleChange}>
        <option>all</option>
        <option>cats</option>
        <option>dogs</option>
      </select>
      {pets.map(pet => {
        return (
          <SinglePet pet={pet} key={pet.id} handleDelete={props.handleDelete} />
        );
      })}
    </div>
  );
};

export default PetList;
