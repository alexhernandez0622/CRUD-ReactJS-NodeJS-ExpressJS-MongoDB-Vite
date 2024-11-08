// src/services/itemService.js

// URL base de la API
const API_URL = "http://localhost:5000/items";

// Función para obtener todos los elementos
export const getItems = async () => {
    const response = await fetch(API_URL);
    return await response.json();
};

// Función para agregar un nuevo elemento
export const addItem = async (item) => {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
    });
    return await response.json();
};

// Función para actualizar un elemento existente
export const updateItem = async (id, item) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
    });
    return await response.json();
};

// Función para eliminar un elemento
export const deleteItem = async (id) => {
    await fetch(`${API_URL}/${id}`, { 
        method: "DELETE" });
};
