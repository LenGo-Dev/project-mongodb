const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');

let dbContainer;

const getMongoClient = async () => {
  if (dbContainer) {
    return dbContainer;
  }

  const client = new mongoose('mongodb://admin:supersecret@localhost:27017');

  await client.connect();

  console.log('Connected successfully to server');

  const db = client.db('companyDB');

  const collections = {
    departments: db.collection('departments'),
    employees: db.collection('employees'),
    products: db.collection('products'),
  };

  dbContainer = { client, db, collections };

  return dbContainer;
}

module.exports = { getMongoClient };