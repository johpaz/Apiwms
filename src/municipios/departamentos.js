const fs = require('fs');
const XLSX = require('xlsx');

// Ruta del archivo Excel
const excelFilePath = './departamentos.xlsx';

// Leer el archivo Excel
const workbook = XLSX.readFile(excelFilePath);

// Nombre de la hoja que contiene los datos de los departamentos
const sheetName = 'departamentos';
const worksheet = workbook.Sheets[sheetName];

// Convertir los datos a formato JSON
const jsonData = XLSX.utils.sheet_to_json(worksheet);

// Nombre del archivo donde se guardará el JSON
const jsonFileName = 'departamentos.json';

// Escribir el JSON en un archivo
fs.writeFile(jsonFileName, JSON.stringify(jsonData, null, 2), (err) => {
  if (err) {
    console.error('Error al escribir el archivo JSON:', err);
  } else {
    console.log('Archivo JSON creado exitosamente:', jsonFileName);
  }
});
