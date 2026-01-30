// post.routes.js

const express = require('express');
const router = express.Router();
const {ObjectId} = require("mongodb");


router.get('/products', (req, res) => {
  req.db.collections.products
    .find()
    .toArray()
    .then((data) => {
      console.log('data:', data)
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json({message: err});
    });
});

router.get('/products/random', (req, res) => {
  req.db.collections.products
    .aggregate([{ $sample: { size: 1 } }])
    .toArray()
    .then((data) => {
      res.json(data[0]);
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
});

router.get('/products/:id', (req, res) => {
  req.db.collections.products
    .findOne({_id: new ObjectId(req.params.id)})
    .then((data) => {
      if (!data) res.status(404).json({message: 'Not found'});
      else res.json(data);
    })
    .catch((err) => {
      res.status(500).json({message: err});
    });
});

router.post('/products', (req, res) => {
  const { name, client } = req.body;
  req.db.collections.products
    .insertOne({ name: name, client: client })
    .then(() => {
      res.json({ message: 'OK' });
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    })
});

router.put('/products/:id', (req, res) => {
  const { name, client } = req.body;
  req.db.collections.products
    .updateOne({ _id: new ObjectId(req.params.id) }, { $set: {name: name, client: client }})
    .then(() => {
      res.json({ message: 'OK' });
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    })
});

router.delete('/products/:id', (req, res) => {
  req.db.collections.products
    .deleteOne({ _id: new ObjectId(req.params.id) })
    .then(() => {
      res.json({ message: 'OK' });
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    })
});

module.exports = router;
