const faker = require('faker/locale/es_MX');
const fs = require('fs');

const generateClients = () => {
  const imageUrls = require('../json/imagesc.json').images;
  const clients = [];

  const ClientNeeds = [
    "Busco un diseñador de interiores para redecorar mi hogar",
  "Necesito un entrenador personal que me ayude a alcanzar mis objetivos de fitness",
  "Estoy buscando un chef privado para una cena especial en casa",
  "Requiero los servicios de un fotógrafo profesional para una sesión de fotos",
  "Necesito un consultor financiero que me ayude a planificar mis inversiones",
  "Estoy buscando un instructor de yoga para clases privadas",
  "Busco un experto en redes sociales que pueda ayudar a aumentar mi presencia en línea",
  "Requiero los servicios de un desarrollador web para crear un sitio de comercio electrónico",
  "Necesito un abogado de inmigración para asesorarme en mi proceso de solicitud de visa",
  "Estoy buscando un nutricionista que pueda ayudarme a mejorar mi alimentación",
  "Busco un terapeuta familiar para ayudar a resolver conflictos en mi hogar",
  "Requiero los servicios de un consultor de recursos humanos para mejorar la gestión del personal en mi empresa",
  "Necesito un traductor certificado para traducir documentos legales",
  "Estoy buscando un programador especializado en aplicaciones móviles para desarrollar una aplicación para mi negocio",
  "Busco un coach de vida que me brinde orientación y apoyo en la toma de decisiones importantes",
    "Necesito un desarrollador de software que pueda crear una aplicación móvil",
    "Estoy buscando un diseñador gráfico para diseñar el logotipo de mi empresa",
    "Requiero los servicios de un arquitecto para diseñar mi nueva casa",
    "Busco un psicólogo que pueda brindarme terapia para manejar el estrés",
    "Necesito un programador con experiencia en JavaScript para desarrollar un sitio web interactivo",
    "Estoy buscando un especialista en marketing digital que pueda ayudar a promocionar mi negocio en línea",
    "Requiero los servicios de un contador para manejar la contabilidad de mi empresa",
    "Necesito un redactor que pueda crear contenido persuasivo para mi página web",
    "Estoy buscando un traductor profesional para traducir documentos de inglés a español",
    "Busco un ingeniero civil para diseñar y supervisar la construcción de un puente",
    "Necesito un abogado experto en derecho laboral para asesorarme en un caso legal"
  ];

  for (let id = 1; id <= 26; id++) {
    const client = {
      id: id,
      name: faker.name.findName(),
      email: faker.internet.email(),
      image: faker.random.arrayElement(imageUrls),
      genre: faker.random.arrayElement(['male', 'female']),
      description: ClientNeeds[faker.random.number({ min: 0, max: ClientNeeds.length - 1 })],
      rating: faker.datatype.number({ min: 2, max: 5 }),
      phone: faker.phone.phoneNumber(),
      ubicacion: faker.address.city(),
      
    }
    clients.push(client);
  }

  return clients;
};

const clients = generateClients();
const jsonData = JSON.stringify({ clients: clients }, null, 2);

fs.writeFile('clients.json', jsonData, (error) => {
  if (error) {
    console.error('Error al escribir el archivo JSON:', error);
  } else {
    console.log('Archivo JSON generado exitosamente: clients.json');
  }
});
