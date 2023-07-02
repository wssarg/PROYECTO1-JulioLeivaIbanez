const fs   = require("fs");
const path = require("path");

const ruta = path.join(__dirname, "data.json");

function escribir(contenido) {
    return new Promise((resolve, reject) => {
        fs.writeFile(ruta, JSON.stringify(contenido, null, "\t"), "utf8", (error) => {
            if (error) reject(new Error("Error. No se puede escribir"));

            resolve(true);
        });
    });
}

function leer() {
    return new Promise((resolve, reject) => {
        fs.readFile(ruta, "utf8", (error, result) => {
            if (error) reject(new Error("Error. No se puede leer"));

            resolve(JSON.parse(result));
        });
    });
}

async function findAll() {
    const perros = await leer();
    return perros;
}

async function findOneById(id) {
    if (!id) throw new Error("Error. El Id está indefinido.");

    const perros = await leer();
    const perro  = perros.find((element) => element.id === id);

    if (!perro) throw new Error("Error. El Id no corresponde a un perro en existencia.");

    return perro;
}

function generarId(perros) {
    let mayorId = 0;

    perros.forEach((perro) => {
        if (Number(perro.id) > mayorId) {
            mayorId = Number(perro.id);
        }
    });

    return mayorId + 1;
}

async function create(perro) {
    if (!perro?.imagen || !perro?.nombre || !perro?.raza || !perro?.peso) throw new Error("Error. Datos incompletos.");

    let perros = await leer();
    const perroConId = { id: generarId(perros), ...perro };

    perros.push(perroConId);
    await escribir(perros);

    return perroConId;
}

async function createConId(perro) {
    if (!perro?.id || !perro?.imagen || !perro?.nombre || !perro?.raza || !perro?.peso) throw new Error("Error. Datos incompletos.");

    let perros = await leer();

    perros.push(perro);
    await escribir(perros);

    return perro;
}

async function update(perro) {
    if (!perro?.id || !perro?.imagen || !perro?.nombre || !perro?.raza || !perro?.peso) throw new Error("Error. Datos incompletos.");

    let perros   = await leer();
    const indice = perros.findIndex((element) => element.id === perro.id);

    if (indice < 0) throw new Error("Error. El Id no corresponde a un perro en existencia.");

    perros[indice] = perro;
    await escribir(perros);

    return perros[indice];
}

async function destroy(id) {
    if (!id) throw new Error("Error. El Id está indefinido.");

    let perros   = await leer();
    const indice = perros.findIndex((element) => element.id === id);

    if (indice < 0) throw new Error("Error. El Id no corresponde a un perro en existencia.");

    const perro = perros[indice];
    perros.splice(indice, 1);
    await escribir(perros);

    return perro;
}

module.exports = { findAll, findOneById, create, createConId, update, destroy };