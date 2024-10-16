import React from 'react';
import { useNavigate } from 'react-router-dom';

const PetDetailsModal = ({ pet, closeModal, onAdopt }) => {
    const navigate = useNavigate(); // Hook para navegar entre rutas

    const handleEdit = () => {
        navigate(`/edit-pet/${pet.id}`); // Redirige a la página de edición
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close-btn" onClick={closeModal}>&times;</span>
                <h2>{pet.name}</h2>
                <img src={pet.photo} alt={pet.name} className="pet-image" />
                <p>Edad: {pet.age}</p>
                <p>Descripción: {pet.description}</p>
                <button onClick={handleEdit}>Editar</button> {/* Redirige a editar */}
                <button onClick={onAdopt}>Adoptar</button>  
            </div>
        </div>
    );
};

export default PetDetailsModal;
