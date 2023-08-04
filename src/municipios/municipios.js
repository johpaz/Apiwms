const fs = require('fs');
const xlsx = require('xlsx');

// Ruta del archivo Excel
const excelFilePath = './municipios.xlsx';

// Ruta donde se guardará el archivo JSON
const jsonFilePath = './municipios.json';

// Leer el archivo Excel
const workbook = xlsx.readFile(excelFilePath);

// Obtener el nombre de las hojas en el archivo
const sheetNames = workbook.SheetNames;

// Usaremos solo la primera hoja del archivo
const firstSheetName = sheetNames[0];
const worksheet = workbook.Sheets[firstSheetName];

// Convertir los datos de la hoja en formato JSON omitiendo filas vacías y celdas vacías
const jsonData = xlsx.utils.sheet_to_json(worksheet, { header: 1, defval: '', blankrows: true });

// Eliminar filas vacías del resultado JSON
const filteredData = jsonData.filter((row) => row.some((cell) => cell !== ''));

// Obtener el encabezado de las columnas
const header = filteredData.shift();

// Convertir los datos en un objeto JSON
const result = filteredData.map((row) => {
  const obj = {};
  header.forEach((column, index) => {
    obj[column] = row[index];
  });
  return obj;
});

// Escribir los datos en un archivo JSON
fs.writeFileSync(jsonFilePath, JSON.stringify(result, null, 2));

console.log('Archivo JSON generado correctamente.');
