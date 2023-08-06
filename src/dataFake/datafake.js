const fs = require('fs');
const XLSX = require('xlsx');
const faker = require('faker');

// Función para leer los datos desde el archivo Excel
function readDataFromExcel(filePath) {
  const workbook = XLSX.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
  return data;
}

// Ruta del archivo Excel (suponiendo que se llama "data.xlsx")
const filePath = 'datawms.xlsx';

// Leer los datos desde el archivo Excel
const data = readDataFromExcel(filePath);

// Función para agregar datos ficticios a la categoría de bodegas
function addFakeDataToBodegas(data) {
  const bodegasMap = {};
  return data.reduce((result, item) => {
    const idBodega = item['id bodega'];
    if (!bodegasMap[idBodega]) {
      bodegasMap[idBodega] = true;
      result.push({
        idBodega: idBodega,
        nombreBodega: item['Bodega'],
        idAlmacen: faker.random.number(),
        capacidadMaximaCubica: faker.random.number(),
        cantPosiciones: faker.random.number(),
        mtCuadrados: faker.random.number(),
        esHabilitada: true,
      });
    }
    return result;
  }, []);
}

// Función para agregar datos ficticios a la categoría de productos
function addFakeDataToProductos(data) {
  const productosMap = {};
  return data.reduce((result, item) => {
    const idArticulo = item['Item Code'];
    if (!productosMap[idArticulo]) {
      productosMap[idArticulo] = true;
      result.push({
        idArticulo: idArticulo,
        nombreArticulo: item['Item Description'],
        esActivo: true,
        esPeligroso: faker.random.boolean(),
        esElectronico: faker.random.boolean(),
        largo: faker.random.number({ min: 1, max: 100 }),
        alto: faker.random.number({ min: 1, max: 100 }),
        ancho: faker.random.number({ min: 1, max: 100 }),
        peso: faker.random.number({ min: 1, max: 100 }),
        undMedida: faker.random.arrayElement(['unidad', 'docena', 'litro', 'metro', 'caja']),
        fechaVencimiento: faker.date.future(),
        lote: faker.random.alphaNumeric(10),
        codigoERP: faker.random.alphaNumeric(10),
        idBodega: faker.random.number(), // Aquí debes reemplazarlo con el id de la bodega relacionada
      });
    }
    return result;
  }, []);
}

// Función para agregar datos ficticios a la categoría de clientes
function addFakeDataToClientes(data) {
  const clientesMap = {};
  return data.reduce((result, item) => {
    const customerID = item['Customer ID'];
    if (!clientesMap[customerID]) {
      clientesMap[customerID] = true;
      result.push({
        'Customer ID': customerID,
        'Full Name': item['Full Name'],
        ciudadDane: 'Bogotá', // Datos ficticios
        departamentodane: 'Cundinamarca', // Datos ficticios
        direccion: faker.address.streetAddress(),
      });
    }
    return result;
  }, []);
}

// Agregar datos ficticios a la categoría de bodegas
const dataBodegas = addFakeDataToBodegas(data);

// Agregar datos ficticios a la categoría de productos
const dataProductos = addFakeDataToProductos(data);

// Agregar datos ficticios a la categoría de clientes
const dataClientes = addFakeDataToClientes(data);

// Función para guardar los datos en un archivo JSON
function saveDataAsJSON(data, fileName) {
  const jsonData = JSON.stringify(data, null, 2);
  fs.writeFileSync(fileName, jsonData);
}

// Guardar los datos en archivos JSON
saveDataAsJSON(dataBodegas, 'dataBodegas.json');
saveDataAsJSON(dataProductos, 'dataProductos.json');
saveDataAsJSON(dataClientes, 'dataClientes.json');
