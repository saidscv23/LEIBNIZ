const express = require('express'); // Importa Express
const bodyParser = require('body-parser'); // Permite analizar datos JSON en las solicitudes POST/PUT

const app = express(); // Crea una instancia de la aplicación Express
app.use(bodyParser.json()); // Configura el middleware para procesar JSON

// Un objeto para almacenar datos en memoria (simulando una base de datos)
let items = {};

app.post('/items', (req, res) => {
    const { id, name } = req.body; // Extrae 'id' y 'name' del cuerpo de la solicitud
    if (items[id]) {
        return res.status(400).json({ message: 'Item ya existe' }); // Verifica si el ID ya existe
    }
    items[id] = name; // Guarda el elemento en el objeto 'items'
    res.status(201).json({ message: 'Item creado', item: { id, name } }); // Responde con estado 201 (Creado)
});



// Ruta PUT para actualizar un elemento existente
app.put('/items/:id', (req, res) => {
    const { id } = req.params; // Extrae el ID de los parámetros de la ruta
    const { name } = req.body; // Extrae 'name' del cuerpo de la solicitud
    if (!items[id]) {
        return res.status(404).json({ message: 'Item no encontrado' }); // Verifica si el ID existe
    }
    items[id] = name; // Actualiza el nombre del elemento
    res.json({ message: 'Item actualizado', item: { id, name } }); // Responde con el elemento actualizado
});




// Ruta DELETE para eliminar un elemento existente
app.delete('/items/:id', (req, res) => {
    const { id } = req.params; // Extrae el ID de los parámetros de la ruta
    if (!items[id]) {
        return res.status(404).json({ message: 'Item no encontrado' }); // Verifica si el ID existe
    }
    delete items[id]; // Elimina el elemento del objeto 'items'
    res.json({ message: 'Item eliminado', id }); // Responde con el ID del elemento eliminado
});

// Inicia el servidor en el puerto 3000
app.listen(3000, () => {
    console.log('Servidor ejecutándose en el puerto 3000');
});
