const express = require("express");
const { findAll, findOneById, create, createConId, update, destroy } = require("./database/data.manager.js");

require("dotenv").config();

const server = express();

// middlewares
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// Obtener todos los perros
server.get("/perros", (req, res) => {
    findAll()
        .then((perros) => res.status(200).send(perros))
        .catch((error) => res.status(400).send(error.message));
});

// Obtener un perro en especifico
server.get("/perros/:id", (req, res) => {
    const { id } = req.params;

    findOneById(Number(id))
        .then((perros) => res.status(200).send(perros))
        .catch((error) => res.status(400).send(error.message));
});

// Crear un nuevo perro
server.post("/perros", (req, res) => {
    const { imagen, nombre, raza, peso } = req.body;

    create({ imagen, nombre, raza, peso })
        .then((perro) => res.status(201).send(perro))
        .catch((error) => res.status(400).send(error.message));
});

// Crear un nuevo perro, se recibe id
server.post("/perros/:id", (req, res) => {
    const { id } = req.params;
    const { imagen, nombre, raza, peso } = req.body;

    createConId({ id: Number(id), imagen, nombre, raza, peso })
        .then((perro) => res.status(201).send(perro))
        .catch((error) => res.status(400).send(error.message));
});

// Modificar un perro en especifico
server.put("/perros/:id", (req, res) => {
    const { id } = req.params;
    const { imagen, nombre, raza, peso } = req.body;

    update({ id: Number(id), imagen, nombre, raza, peso })
        .then((perro) => res.status(200).send(perro))
        .catch((error) => res.status(400).send(error.message));
});


// Borrar un perro en especifico
server.delete("/perros/:id", (req, res) => {
    const { id } = req.params;

    destroy(Number(id))
        .then((perro) => res.status(200).send(perro))
        .catch((error) => res.status(400).send(error.message));
});

server.listen(process.env.SERVER_PORT, process.env.SERVER_HOST, () => console.log(`Ejecutandose en http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/perros`));
