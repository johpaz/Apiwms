const faker = require('faker');
const { Pedido, Cliente, Producto, Departamento, Municipio, Bodega, Almacen } = require('.'); // Ajusta las rutas a los modelos

async function generateFakeOrders(quantity) {
  try {
    const clients = [];

    for (let i = 0; i < quantity; i++) {
      const fakeClient = {
        // Genera datos ficticios para los clientes
        // ...
      };

      clients.push(fakeClient);
    }

    const createdClients = await Cliente.bulkCreate(clients);

    const products = await Producto.findAll(); // Obtén los productos de la base de datos
    const departments = await Departamento.findAll(); // Obtén los departamentos de la base de datos
    const municipalities = await Municipio.findAll(); // Obtén los municipios de la base de datos
    const warehouses = await Bodega.findAll(); // Obtén las bodegas de la base de datos
    const storageRooms = await Almacen.findAll(); // Obtén los almacenes de la base de datos

    const orders = [];

    for (let i = 0; i < quantity; i++) {
      const fakeOrder = {
        // Genera datos ficticios para los pedidos
        // ...

        // Relaciona los datos ficticios con los datos de la base de datos
        ClienteId: createdClients[i].id, // Asigna el id del cliente ficticio
        ProductoId: faker.random.arrayElement(products).id, // Asigna un producto aleatorio de la base de datos
        DepartamentoId: faker.random.arrayElement(departments).id, // Asigna un departamento aleatorio de la base de datos
        MunicipioId: faker.random.arrayElement(municipalities).id, // Asigna un municipio aleatorio de la base de datos
        BodegaId: faker.random.arrayElement(warehouses).id, // Asigna una bodega aleatoria de la base de datos
        AlmacenId: faker.random.arrayElement(storageRooms).id, // Asigna un almacén aleatorio de la base de datos
      };

      orders.push(fakeOrder);
    }

    await Pedido.bulkCreate(orders);
    console.log(`${quantity} pedidos falsos creados.`);
  } catch (error) {
    console.error('Error al crear los pedidos falsos:', error);
  }
}

const quantity = 1000;
generateFakeOrders(quantity);
