import React, { useState, useEffect } from 'react';
import PetList from './PetList';
import axios from 'axios';
// We'll render these sample pets for now. Later, we'll instead fetch the list
// of pets from the server! We won't need samplePets after that.
import samplePets from './samplePets';

const Root = () => {
  const [allPets, setPetList] = useState([]);
  const [errorMessage, setError] = useState('');
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getPets();
  }, []);

  const handleDelete = async petId => {
    setPetList(allPets.filter(pet => pet.id !== petId));
  };
  const getPets = async () => {
    try {
      const { data } = await axios.get('/api/pets');
      setPetList(data);
      setError('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <h1>Adoption Center</h1>
      {loading && <p>Loading</p>}
      {errorMessage && <div>Error: {errorMessage}</div>}
      <PetList pets={allPets} handleDelete={handleDelete} />
    </>
  );
};

export default Root;
