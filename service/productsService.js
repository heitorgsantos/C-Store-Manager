const Joi = require('@hapi/joi');
const productsModel = require('../models/productsModel');

const productsSchema = Joi.object({
  name: Joi.string().min(5).required().messages({
    'string.min': '"name" length must be at least 5 characters long', 
  }),
  quantity: Joi.number().greater(0).required().messages({
    'number.greater': '"quantity" must be larger than or equal to 1',
  }),
});

const danger = (code = 'invalid_data', message, status = 422) => ({
    err: {
      code,
      message,
    },
      status,
  });
  
  const createProducts = async (name, quantity) => {
  const { error } = productsSchema.validate({ name, quantity });
  console.log('dentro da função service ', error);
  const products = await productsModel.insertProductsModel(name, quantity);
  if (!products) return danger(undefined, 'Product already exists', 422);

  if (error) return danger(undefined, error.message, 422);
  return { product: products };
};

module.exports = {
  createProducts,
};