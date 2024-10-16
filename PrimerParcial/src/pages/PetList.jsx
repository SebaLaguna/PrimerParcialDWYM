import React, { useState, useEffect } from "react";
import PetCard from "./PetCard";
import { Link } from "react-router-dom";

const PetList = () => {
  const [pets, setPets] = useState([]);
  const [filteredPets, setFilteredPets] = useState([]);
  const [typeFilter, setTypeFilter] = useState('');
  const [ageFilter, setAgeFilter] = useState('');

  useEffect(() => {
    const fetchPets = async () => {
      const response = await fetch('http://localhost:3005/api/pets');
      const data = await response.json();
      setPets(data);
      setFilteredPets(data);
    };
    fetchPets();
  }, []);

  const handleAdopt = (id) => {
    setPets(pets.filter(pet => pet.id !== id));
    setFilteredPets(filteredPets.filter(pet => pet.id !== id));
  };

  const handleEdit = (updatedPet) => {
    setPets(pets.map(pet => (pet.id === updatedPet.id ? updatedPet : pet)));
    setFilteredPets(filteredPets.map(pet => (pet.id === updatedPet.id ? updatedPet : pet)));
  };

  const handleFilterChange = () => {
    const filtered = pets.filter(pet => {
      const matchesType = typeFilter ? pet.type === typeFilter : true;
      const matchesAge = ageFilter ? pet.age === ageFilter : true;
      return matchesType && matchesAge;
    });
    setFilteredPets(filtered);
  };

  useEffect(() => {
    handleFilterChange();
  }, [typeFilter, ageFilter, pets]);

  return (
    <div>
      <h1>Lista de Mascotas disponibles</h1>
      <button>
        <Link to="/add-pet">Agregar una Mascota</Link>
      </button>
      <div className="filter-container">
        <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
          <option value="">Todos los tipos</option>
          <option value="Perro">Perro</option>
          <option value="Gato">Gato</option>
        </select>

        <select value={ageFilter} onChange={(e) => setAgeFilter(e.target.value)}>
          <option value="">Todas las edades</option>
          <option value="Cachorro">Cachorro</option>
          <option value="Adulto">Adulto</option>
          <option value="Senior">Senior</option>
        </select>
      </div>

      <div className="pets-container">
        {filteredPets.map(pet => (
          <PetCard key={pet.id} pet={pet} onAdopt={handleAdopt} onEdit={handleEdit} />
        ))}
      </div>
    </div>
  );
};

export default PetList;
