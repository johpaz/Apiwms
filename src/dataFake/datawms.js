const fs = require('fs');
const XLSX = require('xlsx');

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

// Filtrar y obtener solo los datos de las bodegas (sin repeticiones)
const dataBodegas = [...new Set(data.map(item => item['Bodega']))].map(bodega => ({
  'Bodega': bodega,
  'id bodega': data.find(item => item['Bodega'] === bodega)['id bodega'],
}));

// Función para agrupar los datos por el Customer ID (clientes) y obtener la información de cada cliente
function groupDataByCustomer(data) {
  const groupedData = {};
  data.forEach((item) => {
    const customerId = item['Customer ID'];
    if (!groupedData[customerId]) {
      groupedData[customerId] = {
        'Full Name': item['Full Name'],
        'Customer Type': item['Customer Type'],
      };
    }
  });
  return groupedData;
}

// Agrupar los datos por el Customer ID (clientes) y obtener la información de cada cliente
const dataClientes = groupDataByCustomer(data);

// Función para agrupar los datos por el Item Code (productos) y obtener la información de cada producto
function groupDataByItemCode(data) {
  const groupedData = {};
  data.forEach((item) => {
    const itemCode = item['Item Code'];
    if (!groupedData[itemCode]) {
      groupedData[itemCode] = {
        'Item Description': item['Item Description'],
        'Commissionable Volume': item['Commissionable Volume'],
      };
    }
  });
  return groupedData;
}

// Agrupar los datos por el Item Code (productos) y obtener la información de cada producto
const dataProductos = groupDataByItemCode(data);

// Función para guardar los datos en archivos JSON
function saveDataAsJSON(data, fileName) {
  const jsonData = JSON.stringify(data, null, 2);
  fs.writeFileSync(fileName, jsonData);
}

// Guardar los datos en archivos JSON
saveDataAsJSON(dataBodegas, 'dataBodegas.json');
saveDataAsJSON(dataClientes, 'dataClientes.json');
saveDataAsJSON(dataProductos, 'dataProductos.json');
