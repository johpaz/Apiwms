const fs = require('fs');
const faker = require('faker/locale/es_MX');

// Generar imágenes para los proveedores
const generateImages = () => {
  const images = [];

  for (let providerId = 1; providerId <= 50; providerId++) {
    const numImages = faker.random.number({ min: 3, max: 5 });
    const providerImages = [];

    for (let i = 1; i <= numImages; i++) {
      const imageName = `image${i}`;

      const image = {
        name: imageName,
        image: faker.image.imageUrl(),
        
      };

      providerImages.push(image);
    }

    const providerData = {
      providerId: providerId,
      images: providerImages
    };

    images.push(providerData);
  }

  return images;
};

// Generar las imágenes agrupadas por ID de proveedor
const groupedImages = generateImages();

// Guardar las imágenes agrupadas en un archivo JSON
const jsonData = JSON.stringify({imagesprovider:groupedImages}, null, 2);
fs.writeFile('provider_images.json', jsonData, (error) => {
  if (error) {
    console.error('Error al escribir el archivo JSON:', error);
  } else {
    console.log('Archivo JSON generado exitosamente: provider_images.json');
  }
});
