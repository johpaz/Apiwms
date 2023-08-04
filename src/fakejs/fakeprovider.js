const fs = require('fs');
const faker = require('faker/locale/es_MX');

const generateProfesionales = async () => {
  const profesionales = [];

  const imageUrls = require('../json/imagesp.json').images;

  const categorias = [
    {
      "idcategoria": 1,
      "nombre": "Tecnología",
      "profesiones": [
        { "id": 1, "name": "Programador", "description": "Desarrollador de software especializado en ingeniería" },
        { "id": 2, "name": "Diseñador web", "description": "Experto en diseño y desarrollo de sitios web" },
        { "id": 3, "name": "Especialista en SEO", "description": "Experto en optimización de motores de búsqueda" },
        { "id": 4, "name": "Ingeniero de software", "description": "Experto en desarrollo y mantenimiento de software" },
        { "id": 5, "name": "Analista de datos", "description": "Experto en análisis y gestión de datos" },
        { "id": 6, "name": "Desarrollador de aplicaciones móviles", "description": "Creador de aplicaciones móviles para iOS y Android" },
        { "id": 7, "name": "Administrador de sistemas", "description": "Encargado de la administración y mantenimiento de sistemas informáticos" },
        { "id": 8, "name": "Ingeniero de redes", "description": "Experto en diseño y configuración de redes de computadoras" },
        { "id": 9, "name": "Experto en ciberseguridad", "description": "Especialista en protección y seguridad de sistemas informáticos" },
        { "id": 10, "name": "Especialista en inteligencia artificial", "description": "Experto en desarrollo de sistemas y algoritmos de inteligencia artificial" }
      ]
    },
    {
      "idcategoria": 2,
      "nombre": "Arte y Diseño",
      "profesiones": [
        { "id": 11, "name": "Diseñador gráfico", "description": "Creador de diseños gráficos para diversos proyectos" },
        { "id": 12, "name": "Ilustrador", "description": "Artista que crea ilustraciones y dibujos" },
        { "id": 13, "name": "Fotógrafo", "description": "Profesional de la fotografía" },
        { "id": 14, "name": "Animador 3D", "description": "Creador de animaciones en 3D" },
        { "id": 15, "name": "Diseñador de moda", "description": "Creador de diseños de moda y prendas de vestir" },
        { "id": 16, "name": "Artista digital", "description": "Creador de arte digital y gráficos" },
        { "id": 17, "name": "Escenógrafo", "description": "Diseñador de escenarios para teatro, cine y televisión" },
        { "id": 18, "name": "Maquetista", "description": "Creador de maquetas y modelos tridimensionales" },
        { "id": 19, "name": "Diseñador de interiores", "description": "Creador de diseños y planos de interiores de espacios" },
        { "id": 20, "name": "Diseñador de logotipos", "description": "Creador de logotipos y marcas gráficas" }
      ]
    },
    {
      "idcategoria": 3,
      "nombre": "Consultoría",
      "profesiones": [
        { "id": 21, "name": "Consultor de marketing", "description": "Experto en estrategias y técnicas de marketing" },
        { "id": 22, "name": "Consultor financiero", "description": "Especialista en asesoramiento financiero y gestión de finanzas" },
        { "id": 23, "name": "Consultor de recursos humanos", "description": "Especialista en gestión de recursos humanos y desarrollo organizacional" },
        { "id": 24, "name": "Consultor de negocios", "description": "Asesor de negocios para la mejora de procesos y toma de decisiones" },
        { "id": 25, "name": "Consultor de estrategia", "description": "Experto en desarrollo de estrategias empresariales" },
        { "id": 26, "name": "Consultor de ventas", "description": "Especialista en técnicas de venta y negociación" },
        { "id": 27, "name": "Consultor de gestión", "description": "Asesor de gestión empresarial para la mejora de procesos y eficiencia" },
        { "id": 28, "name": "Consultor de calidad", "description": "Especialista en gestión de calidad y mejora continua" },
        { "id": 29, "name": "Consultor de logística", "description": "Experto en gestión y optimización de la cadena de suministro" },
        { "id": 30, "name": "Consultor de transformación digital", "description": "Asesor en procesos de transformación digital de empresas" }
      ]
    },
    {
      "idcategoria": 4,
      "nombre": "Servicios",
      "profesiones": [
        { "id": 31, "name": "Asistente virtual", "description": "Asistente personal remoto que realiza tareas administrativas" },
        { "id": 32, "name": "Redactor de contenido", "description": "Escritor de contenido creativo y persuasivo" },
        { "id": 33, "name": "Traductor", "description": "Profesional que brinda servicios de traducción de idiomas" },
        { "id": 34, "name": "Community Manager", "description": "Encargado de gestionar las redes sociales de una marca o empresa" },
        { "id": 35, "name": "Nutricionista", "description": "Profesional en nutrición y alimentación saludable" },
        { "id": 36, "name": "Entrenador personal", "description": "Especialista en entrenamiento físico personalizado" },
        { "id": 37, "name": "Terapeuta", "description": "Profesional en terapia y tratamiento de problemas emocionales y mentales" },
        { "id": 38, "name": "Consejero financiero", "description": "Experto en asesoramiento financiero y planificación económica" },
        { "id": 39, "name": "Gestor de redes sociales", "description": "Encargado de gestionar las redes sociales de una marca o empresa" },
        { "id": 40, "name": "Especialista en marketing digital", "description": "Experto en estrategias de marketing digital" }
      ]
    },
    {
      "idcategoria": 5,
      "nombre": "Manualidades",
      "profesiones": [
        { "id": 41, "name": "Pastelero", "description": "Creador de pasteles y postres" },
        { "id": 42, "name": "Ceramista", "description": "Creador de piezas de cerámica y alfarería" },
        { "id": 43, "name": "Sastrería", "description": "Profesional en diseño y confección de prendas a medida" },
        { "id": 44, "name": "Joyería artesanal", "description": "Creador de joyas y accesorios hechos a mano" },
        { "id": 45, "name": "Escultor", "description": "Artista que crea esculturas en diferentes materiales" },
        { "id": 46, "name": "Bisutería", "description": "Creador de accesorios de bisutería y complementos" },
        { "id": 47, "name": "Elaboración de velas", "description": "Creador de velas artesanales y aromáticas" },
        { "id": 48, "name": "Arreglos florales", "description": "Creador de arreglos y decoraciones florales" },
        { "id": 49, "name": "Decorador de eventos", "description": "Especialista en decoración de eventos y celebraciones" },
        { "id": 50, "name": "Origamista", "description": "Experto en el arte del origami, plegado de papel" }
      ]
    }
  ];
  
  for (let id = 1; id < 51; id++) {
    const profesional = {
      id: id,
      name: faker.name.findName(),
      email: faker.internet.email(),
      image: faker.random.arrayElement(imageUrls),
      genre: faker.random.arrayElement(['male', 'female']),
      years_exp: faker.datatype.number({ min: 1, max: 5 }).toString(),
      description:'',
      categorias: [],
      profesiones: [],
      rating: faker.datatype.number({ min: 1, max: 5 }),
      ubicacion: faker.address.city(),
      phone: faker.phone.phoneNumber(),
    };

    const randomCategorias = faker.random.arrayElements(categorias, faker.random.number({ min: 1, max: 1 }));
    randomCategorias.forEach(categoria => {
      profesional.categorias.push({
        id: categoria.idcategoria,
        nombre: categoria.nombre
      });

      const randomProfesiones = faker.random.arrayElements(categoria.profesiones, faker.random.number({ min: 1, max: 2 }));
      randomProfesiones.forEach(profesion => {
        profesional.profesiones.push({
          id: profesion.id,
          name: profesion.name,
           });

        if (profesional.description !== '') {
          profesional.description += ', ';
        }
        profesional.description += profesion.description;
      });
    });
    profesionales.push(profesional);
  }

  const jsonData = JSON.stringify({ profesionales: profesionales }, null, 2);
  fs.writeFile('profesionales.json', jsonData, (error) => {
    if (error) {
      console.error('Error al escribir el archivo JSON:', error);
    } else {
      console.log('Archivo JSON generado exitosamente: profesionales.json');
    }
  });
};

generateProfesionales();
