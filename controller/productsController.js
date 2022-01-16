const productsService = require('../service/productsService');

// criar produtos
const insertProducts = async (req, res, _next) => {
  const { name, quantity } = req.body;
  
  try {
    const { err, status, product } = await productsService.createProducts(name, quantity);
    console.log(err);
    if (err) return res.status(status).json({ err });
    return res.status(201).json(product); 
  } catch (error) {
    console.log(error.message);
  }
};
// listar um produto pelo ID
const listOneProducts = async (req, res, _next) => {
  const { id } = req.params;
  // const {name, quantity} = req.body;
  // console.log(id);

  try {
    const { err, status, products } = await productsService.listOneProducts(id);
    if (err) return res.status(status).json({ err });
    return res.status(200).json(products);
  } catch (error) {
    console.log(error.message);
  }
};
// listar todos os produtos
const listAllProdcts = async (_req, res, _next) => {
  try {
    const product = await productsService.listAllProducts();
    return res.status(200).json({ products: product });
  } catch (error) {
    console.log(error.message);
  }
};

const updateProductsController = async (req, res) => {
  const { name, quantity } = req.body;
  const { id } = req.params; 
  try {
    const { err, status } = await productsService
    .updateProductsService(id, name, quantity);
    if (err) return res.status(status).json({ err });

    return res.status(200).json({ id, name, quantity });
  } catch (error) {
    return error.menssage;
  }
};

const deleteProductController = async (req, res) => {
  const { id } = req.params;
  try {
    const { err, status, product } = await productsService.deleteProductService(id);
    console.log(product, 'entrou');
    if (err) return res.status(status).json({ err });
    return res.status(200).json(product);
  } catch (error) {
    return error.message;
  }
};
module.exports = {
  insertProducts,
  listOneProducts,
  listAllProdcts,
  updateProductsController,
  deleteProductController,
};