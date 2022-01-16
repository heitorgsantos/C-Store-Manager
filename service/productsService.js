const Joi = require('@hapi/joi');
const productsModel = require('../models/productsModel');

// Validação name e quantity
const productsSchema = Joi.object({
  name: Joi.string().min(5).required().messages({
    'string.min': '"name" length must be at least 5 characters long', 
  }),
  quantity: Joi.number().greater(0).required().messages({
    'number.greater': '"quantity" must be larger than or equal to 1',
  }),
});

// Função de mensagem de erro padrão e dinâmica
const danger = (code = 'invalid_data', message, status = 422) => ({
    err: {
      code,
      message,
    },
      status,
  });
 
// Função para criar produtos
  const createProducts = async (name, quantity) => {
  const { error } = productsSchema.validate({ name, quantity });
  console.log('dentro da função service ', error);
  const products = await productsModel.insertProductsModel(name, quantity);
  if (!products) return danger(undefined, 'Product already exists', 422);

  if (error) return danger(undefined, error.message, 422);
  return { product: products };
};

// Função para listar produtos

const listOneProducts = async (id) => {
  const products = await productsModel.listOneProducts(id);
  if (!products) return danger(undefined, 'Wrong id format', 422);
  return { products };
};

const listAllProducts = async () => {
  const products = await productsModel.listAllProducts();
  // if (!products) return danger(undefined, 'Wrong id format', 422);
  return products;
};

const updateProductsService = async (id, name, quantity) => {
  const { error } = productsSchema.validate({ name, quantity });
  console.log('dentro da função service ', error);
  const products = await productsModel.updateProductsModel(id, name, quantity);
  
  if (error) return danger(undefined, error.message, 422);
  return { products };
};

const deleteProductService = async (id) => {
  const product = await productsModel.deleteProductsModel(id);
  if (product === null) return danger(undefined, 'Wrong id format', 422);
  
  return { product };
};

module.exports = {
  createProducts,
  listOneProducts,
  listAllProducts,
  updateProductsService,
  deleteProductService,
};