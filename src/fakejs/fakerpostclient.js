const fs = require('fs');
const faker = require('faker/locale/es_MX');

// Importar datos de ocupaciones desde el archivo JSON
const ocupationsData = require('../json/ocupation.json');

// Lista de títulos de ejemplo
const titles = [
  "Necesito un profesional para un proyecto emocionante",
  "Busco ayuda en una tarea importante",
  "Requiero asesoramiento de un experto en el campo",
  "Estoy buscando un colaborador creativo",
  "Necesito un servicio profesional confiable",
];

// Lista de frases de ejemplo
const phrases = [
  "para completar un proyecto desafiante",
  "para brindar asesoramiento experto",
  "para realizar tareas específicas",
  "para colaborar en un proyecto innovador",
  "para resolver un problema complejo",
];

// Generar posts con solicitudes
const generatePosts = (ocupations) => {
  const posts = [];

  for (let id = 1; id <= 20; id++) {
    // Obtener una ocupación aleatoria
    const randomOcupation = faker.random.arrayElement(ocupations);

    // Obtener un título aleatorio de la lista
    const randomTitle = faker.random.arrayElement(titles);

    // Obtener una frase aleatoria de la lista
    const randomPhrase = faker.random.arrayElement(phrases);

    // Generar la frase de la solicitud
    const content = `Solicitud: Necesito un ${randomOcupation.name} ${randomPhrase}`;

    // Crear el post con solicitud
    const post = {
      id: id,
      clientId: faker.random.uuid(), // Agregar clientId utilizando faker.random.uuid()
      title: randomTitle,
      image: faker.image.imageUrl(),
      content: content,
    };

    posts.push(post);
  }

  return posts;
};

// Generar los posts con solicitudes utilizando los datos de ocupaciones
const posts = generatePosts(ocupationsData.ocupations);

// Guardar los posts en un archivo JSON
const jsonData = JSON.stringify({ postclient: posts }, null, 2);
fs.writeFile('postsclient.json', jsonData, (error) => {
  if (error) {
    console.error('Error al escribir el archivo JSON:', error);
  } else {
    console.log('Archivo JSON generado exitosamente: postsclient.json');
  }
});
