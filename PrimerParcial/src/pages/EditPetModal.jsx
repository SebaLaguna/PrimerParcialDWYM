import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditPetModal = ({ onEdit }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [pet, setPet] = useState(null);
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [type, setType] = useState('');
    const [description, setDescription] = useState('');
    const [characteristics, setCharacteristics] = useState('');
    const [photo, setPhoto] = useState('');

    useEffect(() => {
       
        const fetchPet = async () => {
            const response = await fetch(`http://localhost:3005/api/pets/${id}`);
            const data = await response.json();
            setPet(data);
            setName(data.name);
            setAge(data.age);
            setType(data.type);
            setDescription(data.description);
            setCharacteristics(data.characteristics.join(', '));
            setPhoto(data.imageUrl);
        };

        fetchPet();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedPet = {
            name,
            age,
            type,
            description,
            characteristics: characteristics.split(',').map((char) => char.trim()),
            imageUrl: photo,
        };

        await fetch(`http://localhost:3005/api/pets/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedPet),
        });

        onEdit(); 
        navigate('/'); 
    };

    if (!pet) return <div>Cargando...</div>; 

    return (
        <div>
            <h2>Editar Mascota</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nombre"
                    required
                />
                <select value={age} onChange={(e) => setAge(e.target.value)} required>
                    <option value="Cachorro">Cachorro</option>
                    <option value="Adulto">Adulto</option>
                    <option value="Senior">Senior</option>
                </select>
                <select value={type} onChange={(e) => setType(e.target.value)}>
                    <option value="Perro">Perro</option>
                    <option value="Gato">Gato</option>
                </select>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Descripción"
                    required
                />
                <input
                    type="text"
                    value={characteristics}
                    onChange={(e) => setCharacteristics(e.target.value)}
                    placeholder="Características (separadas por coma)"
                    required
                />
                <input
                    type="text"
                    value={photo}
                    onChange={(e) => setPhoto(e.target.value)}
                    placeholder="URL de la foto"
                />
                <button type="submit">Guardar Cambios</button>
            </form>
        </div>
    );
};

export default EditPetModal;
