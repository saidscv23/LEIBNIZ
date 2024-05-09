const express = require('express')
const app = express()

 

var tareas = [
    { id: '1', nombre: 'Comprar leche' },
    { id: '2', nombre: 'Lavar el coche' }
  ];
  
  // Define una ruta GET para obtener todas las tareas
  app.get('/tareas', (req, res) => {
    res.json(tareas); // Devuelve todas las tareas como respuesta JSON
  });   

  

// Ruta POST para crear una nueva tarea
app.post('/tareas', (req, res) => {
    const { id, nombre } = req.body; // Extrae 'id' y 'nombre' del cuerpo de la solicitud
    tareas.push({ id, nombre }); // Agrega una nueva tarea a la lista
    res.status(201).json({ message: 'Tarea creada', tarea: { id, nombre } }); // Responde con estado 201 (Creado)
});





// Ruta PUT para actualizar una tarea existente
app.put('/tareas/:id', (req, res) => {
    const { id } = req.params; // Obtiene el 'id' de los parámetros de la ruta
    const { nombre } = req.body; // Obtiene el nuevo 'nombre' del cuerpo de la solicitud

    // Encuentra la tarea con el ID especificado
    const tarea = tareas.find(t => t.id === id);
    if (!tarea) {
        return res.status(404).json({ message: 'Tarea no encontrada' }); // Verifica si la tarea existe
    }

    tarea.nombre = nombre; // Actualiza el nombre de la tarea
    res.json({ message: 'Tarea actualizada', tarea }); // Responde con el estado actualizado
});





// Ruta DELETE para eliminar una tarea por ID
app.delete('/tareas/:id', (req, res) => {
    const { id } = req.params; // Obtiene el 'id' de los parámetros de la ruta
    const indice = tareas.findIndex(t => t.id === id); // Encuentra el índice de la tarea

    if (indice === -1) {
        return res.status(404).json({ message: 'Tarea no encontrada' }); // Verifica si la tarea existe
    }

    tareas.splice(indice, 1); // Elimina la tarea por índice
    res.json({ message: 'Tarea eliminada', id }); // Responde confirmando la eliminación
});

// Inicia el servidor en el puerto 3000
app.listen(3000, () => {
    console.log('Servidor ejecutándose en el puerto 3000');
});
