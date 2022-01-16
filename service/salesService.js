// const Joi = require('@hapi/joi');
const {
   insertSalesModel,
   findAllSalesModel,
   findOneSalesModel,
 } = require('../models/salesModel');

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

 const findAllService = async () => {
   const sales = await findAllSalesModel();
   if (!sales) danger('not_found', 'Sale not found', 404);
   return sales;
 };

 const findOneService = async (id) => {
   const sales = await findOneSalesModel(id);
   if (!sales) return danger('not_found', 'Sale not found', 404);
   return sales;
 };

 module.exports = {
   insertSalesSerive,
   findAllService,
   findOneService,
 };