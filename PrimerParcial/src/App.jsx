import React, { useState, useEffect } from 'react';
import PetList from './pages/PetList';
import AddPetForm from './pages/AddPetForm';
import EditPetModal from './pages/EditPetModal';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "./styles/App.css";

const App = () => {
    const [pets, setPets] = useState([]);

    useEffect(() => {
        fetchPets();
    }, []);

    const fetchPets = async () => {
        const response = await fetch('http://localhost:3005/api/pets');
        const data = await response.json();
        setPets(data);
    };

    const addPet = (newPet) => {
        setPets((prevPets) => [...prevPets, newPet]);
    };

    const adoptPet = (id) => {
        setPets((prevPets) => prevPets.filter((pet) => pet.id !== id));
    };

    return (
        <div>
            <Router>
                <Routes>
                    <Route path="/" element={<PetList pets={pets} onAdopt={adoptPet} />} />
                    <Route path="/add-pet" element={<AddPetForm onAdd={addPet} />} />
                    <Route path="/edit-pet/:id" element={<EditPetModal onEdit={fetchPets} />} />
                </Routes>
            </Router>
        </div>
    );
};

export default App;
