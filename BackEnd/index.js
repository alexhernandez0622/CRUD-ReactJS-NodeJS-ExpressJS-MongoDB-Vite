// Importar las dependencias (paquetes) necesarios
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config(); // Carga las variables de entorno al inicio del archivo

// Configurar el servidor de Express
const app = express();
// Middleware para analizar los JSON que se soliciten
app.use(express.json());
// Habilitando el intercambio de información para permitir las diferentes solicitudes
app.use(cors());

// Obtener la URI de MongoDB desde las variables del entorno
const mongoUri = process.env.MONGODB_URI;
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

// Creamos una promesa para especificar si pudimos conectarnos a la bdd de MongoDB
.then(() => console.log("Conexión exitosa a MongoDB"))
.catch((error) => console.error("Error al conectar a la base de datos: " , error));

// Creamos un modelo de Mongoose para nuestros datos
const Item = mongoose.model("users", new mongoose.Schema({
    name: {type: String, required: true},
    description: String
}));

// Crear las rutas para el CRUD

// Ruta para obtener todos los nombres con sus descripciones
// http://localhost:5000/items
app.get("/items", async (req, res) => {
    const items = await Item.find(); // Obtenemos la lista de los nombres en formato JSON
    res.json(items);
});

// Ruta para crear un nuevo usuario con su descripción
// http://localhost:5000/items
app.post("/items" , async (req, res) => {
    const newItem = new Item(req.body);
    await newItem.save(); // Guardamos el nombre y la descripción en la bdd
    res.status(201).json(newItem); // Enviamos el dato del usuario creado en JSON
});

// Ruta para actualizar un elemento existente
// http://localhost:5000/items/id?
app.put("/items/:id", async (req, res) => {
    const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.json(updatedItem); // Ejecutamos el elemento actualizado en formato JSON
});

// Ruta para eliminar un usuario existente
// http://localhost:5000/items/id?
app.delete("/items/:id", async (req, res) => {
    await Item.findByIdAndDelete(req.params.id); // Eliminamos el elemento de la base de datos
    res.status(204).send(); // Enviamos una respuesta sin contenido (elimino el dato)
});

// Configurar el puerto y ponemos el servidor en produccion
const PORT = process.env.PORT || 5000; // Si no tienes un puerto asignado , el servidor correra en el puerto 5000
app.listen(PORT, () => {
    console.log(`Servidor funcionando en el puerto ${PORT}`);
});