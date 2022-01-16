// const Joi = require('@hapi/joi');
const { insertSalesModel } = require('../models/salesModel');

// const productsSchema = Joi.object({
//   quantity: Joi.number().greater(0).required(),
// });

const danger = (code = 'invalid_data', message, status = 422) => ({
  err: {
    code,
    message,
  },
    status,
});
 const insertSalesSerive = async (itensSold) => {
   const quantidade = itensSold.some(({ quantity }) => {
    //  const { error } = productsSchema.validate({ quantity });
    if (quantity <= 0 || typeof quantity === 'string') { 
      return true;
    }
    return false;
  });  

  // console.log(quantidade);

  if (!quantidade) {
    const sales = await insertSalesModel(itensSold);

    return { sales };
  } 
  return danger(undefined, 'Wrong product ID or invalid quantity', 422);
 };

 module.exports = {
   insertSalesSerive,
 };