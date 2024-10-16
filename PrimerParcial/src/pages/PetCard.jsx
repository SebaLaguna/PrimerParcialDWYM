import React, { useState } from 'react';
import PetDetailsModal from './PetDetailsModal';
import { useNavigate } from 'react-router-dom';

const PetCard = ({ pet, onAdopt }) => {
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const handleEdit = () => {
        navigate(`/edit-pet/${pet.id}`);
    };

    return (
        <div className="pet-card">
            <img src={pet.photo} alt={pet.name} className="pet-image" />
            <h3>{pet.name}</h3>
            <p>{pet.age}</p>
            <button onClick={() => setShowModal(true)}>Ver detalles</button>

            {showModal && (
                <PetDetailsModal 
                    pet={pet} 
                    closeModal={() => setShowModal(false)} 
                    onAdopt={() => onAdopt(pet.id)} 
                    onEdit={handleEdit} 
                />
            )}
        </div>
    );
};

export default PetCard;
