// const Joi = require('@hapi/joi');
const { insertSalesModel } = require('../models/salesModel');

const danger = (code = 'invalid_data', message, status = 422) => ({
  err: {
    code,
    message,
  },
    status,
});
 const insertSalesSerive = async (itensSold) => {
   const quantidade = itensSold.some(({ quantity }) => {
    if (quantity <= 0 || typeof quantity === 'string') { 
      return true;
    }
    return false;
  });  

  if (!quantidade) {
    const sales = await insertSalesModel(itensSold);

    return { sales };
  } 
  return danger(undefined, 'Wrong product ID or invalid quantity', 422);
 };

 module.exports = {
   insertSalesSerive,
 };