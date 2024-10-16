import React, { useState } from "react";
import { Link } from "react-router-dom";

const AddPetForm = ({ onPetAdded }) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("Cachorro");
  const [type, setType] = useState("Perro");
  const [description, setDescription] = useState("");
  const [characteristics, setCharacteristics] = useState("");
  const [photo, setPhoto] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPet = {
      name,
      age,
      type,
      description,
      characteristics: characteristics.split(",").map((char) => char.trim()),
      photo: photo,
    };

    fetch("http://localhost:3005/api/pets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPet),
    })
      .then((response) => response.json())
      .then((data) => {
        onPetAdded(data);
        setName("");
        setAge("Cachorro");
        setType("Perro");
        setDescription("");
        setCharacteristics("");
        setPhoto("");
      })
      .catch((error) => console.error("Error al agregar la mascota:", error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <select value={age} onChange={(e) => setAge(e.target.value)}>
        <option value="Cachorro">Cachorro</option>
        <option value="Adulto">Adulto</option>
        <option value="Senior">Senior</option>
      </select>
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="Perro">Perro</option>
        <option value="Gato">Gato</option>
      </select>
      <textarea
        placeholder="Descripción"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Características (separadas por comas)"
        value={characteristics}
        onChange={(e) => setCharacteristics(e.target.value)}
      />
      <input
        type="url"
        placeholder="URL de la Foto"
        value={photo}
        onChange={(e) => setPhoto(e.target.value)}
        required
      />
      <button type="submit">Agregar Mascota</button>
      <button>
        <Link to="/">Volver al Inicio</Link>
      </button>
    </form>
  );
};

export default AddPetForm;
