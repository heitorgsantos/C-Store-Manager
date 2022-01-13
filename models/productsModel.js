const connect = require('./connection');

const insertProductsModel = async (name, quantity) => {
  const conn = await connect();
  const validateName = await conn.collection('products').findOne({ name });
  if (validateName) return null;
  const products = await conn.collection('products').insertOne({ name, quantity });
  // console.log(products);
  return { _id: products.insertedId, name, quantity };
};

module.exports = {
  insertProductsModel,
};
