const { ObjectId } = require('mongodb');
const connect = require('./connection');

const insertProductsModel = async (name, quantity) => {
  const conn = await connect();
  const validateName = await conn.collection('products').findOne({ name });
  if (validateName) return null;
  const products = await conn.collection('products').insertOne({ name, quantity });
  // console.log(products);
  return { _id: products.insertedId, name, quantity };
};

const listOneProducts = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const conn = await connect();
  const query = await conn.collection('products').findOne({ _id: ObjectId(id) });
  return query;
};

const listAllProducts = async () => {
  const conn = await connect();
  const query = await conn.collection('products').find({}).toArray();
  console.log(query);
  return query;
};

const updateProductsModel = async (id, name, quantity) => {
if (!ObjectId.isValid(id)) return null; 
const conn = await connect();
const product = await conn.collection('products')
.updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } });
console.log(product, 'dentro do produto');
return product;
};

const deleteProductsModel = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const conn = await connect();
  const validateId = await conn.collection('products').findOne({ _id: ObjectId(id) });
  if (!validateId) return null;
  await conn.collection('products').deleteOne({ _id: ObjectId(id) });
  return validateId;
};

module.exports = {
  insertProductsModel,
  listOneProducts,
  listAllProducts,
  updateProductsModel,
  deleteProductsModel,
};
