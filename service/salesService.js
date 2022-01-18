const Joi = require('@hapi/joi');
const {
   insertSalesModel,
   findAllSalesModel,
   findOneSalesModel,
   updateSalesModel,
 } = require('../models/salesModel');

 const salesSchema = Joi.array().items(Joi.object({
  productId: Joi.string().alphanum().max(24).min(24)
  .required(),
  quantity: Joi.number().integer().min(1).required()
  .messages({
  'number.base': 'Wrong product ID or invalid quantity',
  'number.min': 'Wrong product ID or invalid quantity',
  }),
}));

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
   const sale = await findOneSalesModel(id);
   if (!sale) return danger('not_found', 'Sale not found', 404);
   console.log(sale);
   return { sale };
 };

 const updateSalesService = async (itensSold, id) => {
  // const validate = itensSold.some(({ quantity }) => {
  //   if (quantity <= 0 || typeof quantity === 'string') { 
  //     return true;
  //   }
  //   return false;
  // });
  // if (!validate) {
  //   const { ops } = await updateSalesModel(itensSold, id);
  // }
  const { error } = salesSchema.validate(itensSold);

  if (error) return danger(undefined, 'Wrong product ID or invalid quantity', 422);
  
  const { ops } = await updateSalesModel(itensSold, id);

  const sales = {
    _id: id,
    ...ops[0],
  };
  return { sales };
  // return danger(undefined, 'Wrong product ID or invalid quantity', 422);
 };

 module.exports = {
   insertSalesSerive,
   findAllService,
   findOneService,
   updateSalesService,
 };