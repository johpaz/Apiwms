const fs = require('fs');
const faker = require('faker/locale/es_MX');

// Importar datos de profesionales desde el archivo JSON
const professionalsData = require('../json/profesionales.json');

// Verificar si el archivo JSON contiene la propiedad "profesionales"
if (!professionalsData.hasOwnProperty('profesionales')) {
  console.error('Error: El archivo JSON no contiene la propiedad "profesionales".');
  return;
}

// Verificar si la propiedad "profesionales" es un arreglo
if (!Array.isArray(professionalsData.profesionales)) {
  console.error('Error: La propiedad "profesionales" en el archivo JSON no es un arreglo.');
  return;
}

// Lista de servicios de ejemplo
const services = [
  "Descubre el sabor auténtico de la cocina tradicional",
  "Explora la belleza oculta de la naturaleza en cada fotografía",
  "Un viaje épico a través de la historia del arte",
  "Encuentra tu equilibrio interior a través del yoga y la meditación",
  "Transforma tu hogar en un oasis de tranquilidad con el diseño de interiores",
  "Conviértete en el héroe de tu propia historia de éxito",
  "Descubre el poder curativo de la música en cada nota",
  "Una experiencia única de moda y estilo personalizado",
  "Sumérgete en la magia del teatro y déjate llevar por las emociones",
  "Alimenta tu mente con libros que despierten tu imaginación",
  "La danza como expresión de libertad y movimiento",
  "Despierta tu lado creativo con cursos de arte y manualidades",
  "Descubre los secretos de la fotografía y captura momentos inolvidables",
  "Explora la magia del cine a través de películas icónicas",
  "Convierte tu jardín en un paraíso de colores y fragancias",
  "Las letras que transforman vidas: taller de escritura creativa",
  "Descubre el poder del maquillaje para resaltar tu belleza natural",
  "Conviértete en el chef de tus propios experimentos culinarios",
  "Desafía tus límites en un entrenamiento físico de alto rendimiento",
  "Embárcate en una aventura llena de adrenalina y emociones extremas"
];

// Generar posts relacionados al ofrecimiento del servicio
const generatePosts = (professionals) => {
  const posts = [];

  for (let id = 1; id <= 20; id++) {
    // Obtener un profesional aleatorio
    const randomProfessional = faker.random.arrayElement(professionals);

    // Verificar si el profesional tiene el campo "profesiones" y es un arreglo
    if (!randomProfessional.hasOwnProperty('profesiones') || !Array.isArray(randomProfessional.profesiones)) {
      console.error('Error: El campo "profesiones" en un profesional es inválido o está ausente.');
      return;
    }

    // Obtener una profesión aleatoria del profesional
    const randomProfession = faker.random.arrayElement(randomProfessional.profesiones);

    // Verificar si la profesión tiene el campo "name" y "description"
    if (!randomProfession.hasOwnProperty('name') || !randomProfession.hasOwnProperty('description')) {
      console.error('Error: El campo "name" o "description" en una profesión es inválido o está ausente.');
      return;
    }

    // Obtener un servicio aleatorio
    const randomService = faker.random.arrayElement(services);

    // Crear el post relacionado al ofrecimiento del servicio
    const post = {
      id: id,
      provider_id: randomProfessional.id,
      occupation_id: randomProfession.id,
      title: `Ofrezco mis servicios como ${randomProfession.name}`,
      content: `${randomService}. Contáctame en ${randomProfessional.email} para más información.`,
    };

    posts.push(post);
  }

  return posts;
};

// Generar los posts relacionados al ofrecimiento del servicio utilizando los datos de profesionales
const posts = generatePosts(professionalsData.profesionales);

// Guardar los posts en un archivo JSON
const jsonData = JSON.stringify({postprovider: posts}, null, 2);
fs.writeFile('service_posts.json', jsonData, (error) => {
  if (error) {
    console.error('Error al escribir el archivo JSON:', error);
  } else {
    console.log('Archivo JSON generado exitosamente: service_posts.json');
  }
});
