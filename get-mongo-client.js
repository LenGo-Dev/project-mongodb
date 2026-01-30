const MongoClient = require('mongodb').MongoClient;

let dbContainer;

const getMongoClient = async () => {
  if (dbContainer) {
    return dbContainer;
  }

  const client = new MongoClient('mongodb://admin:supersecret@localhost:27017');

  await client.connect();

  console.log('Connected successfully to server');

  const db = client.db('companyDB');

  const collections = {
    departments: db.collection('departments'),
    employees: db.collection('employees'),
    products: db.collection('products'),
  };

  dbContainer = { client, db, collections };

  // db.collection('employees')
  //   .find({ department: 'IT' })
  //   .toArray()
  //   .then((data) => {
  //     console.log(data);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });

  return dbContainer;
}

module.exports = { getMongoClient };