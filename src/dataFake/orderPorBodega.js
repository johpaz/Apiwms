const XLSX = require("xlsx");
const fs = require("fs");

// Lee el archivo Excel
const workbook = XLSX.readFile("./datawms.xlsx");
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];

// Convierte los datos del Excel a formato JSON
const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: "" });

// Agrupa las órdenes por el nombre de la bodega
const bodegasData = {};
jsonData.forEach((order) => {
  const bodega = order["Bodega"];
  if (!bodegasData[bodega]) {
    bodegasData[bodega] = [];
  }
  bodegasData[bodega].push(order);
});

// Guarda el resultado en un archivo JSON
fs.writeFileSync("ordenes_por_bodega.json", JSON.stringify(bodegasData, null, 2));

console.log("JSON generado exitosamente.");
