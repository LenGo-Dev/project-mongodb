const express = require('express');
const { Employee } = require("../models/employee.model");
const router = express.Router();

router.get('/employees', async (req, res) => {
  try {
    res.json(await Employee.find());
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
});

router.get('/employees/random', async (req, res) => {

  try {
    const count = await Employee.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const empl = await Employee.findOne().skip(rand);
    if(!empl) res.status(404).json({ message: 'Not found' });
    else res.json(empl);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }

});

router.get('/employees/:id', async (req, res) => {

  try {
    const empl = await Employee.findById(req.params.id);
    if(!empl) res.status(404).json({ message: 'Not found' });
    else res.json(empl);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }

});

router.post('/employees', async (req, res) => {

  try {

    const {firstName, lastName, department} = req.body;
    const newEmployee = new Employee({firstName: firstName, lastName: lastName, department: department});
    await newEmployee.save();
    res.json({message: 'OK'});

  } catch (err) {
    res.status(500).json({message: err});
  }

});

router.put('/employees/:id', async (req, res) => {
  const { firstName, lastName, department } = req.body;

  try {
    const empl = await Employee.findById(req.params.id);
    if(empl) {
      empl.firstName = firstName;
      empl.lastName = lastName;
      empl.department = department;
      await empl.save();
      res.json({ message: 'OK' });
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }

});

router.delete('/employees/:id', async (req, res) => {

  try {
    const empl = await Employee.findById(req.params.id);
    if(empl) {
      await Employee.deleteOne({ _id: req.params.id });
      res.json({ message: 'OK' });
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }

});

module.exports = router;



// router.get('/employees', (req, res) => {
//   req.db.collections.employees
//     .find()
//     .toArray()
//     .then((data) => {
//       console.log('data:', data)
//       res.json(data);
//     })
//     .catch((err) => {
//       res.status(500).json({message: err});
//     });
// });
//
// router.get('/employees/random', (req, res) => {
//   req.db.collections.employees
//     .aggregate([{$sample: {size: 1}}])
//     .toArray()
//     .then((data) => {
//       res.json(data[0]);
//     })
//     .catch((err) => {
//       res.status(500).json({message: err});
//     });
// });
//
// router.get('/employees/:id', (req, res) => {
//   req.db.collections.employees
//     .findOne({_id: new ObjectId(req.params.id)})
//     .then((data) => {
//       if (!data) res.status(404).json({message: 'Not found'});
//       else res.json(data);
//     })
//     .catch((err) => {
//       res.status(500).json({message: err});
//     });
// });
//
// router.post('/employees', (req, res) => {
//   const {firstName, lastName} = req.body;
//
//   req.db.collections.employees
//     .insertOne({firstName: firstName, lastName: lastName})
//     .then(() => {
//       res.json({message: 'OK'});
//     })
//     .catch((err) => {
//       res.status(500).json({message: err});
//     })
// });
//
// router.put('/employees/:id', (req, res) => {
//   const {firstName, lastName} = req.body;
//   req.db.collections.employees
//     .updateOne({_id: new ObjectId(req.params.id)}, {$set: {firstName: firstName, lastName: lastName}})
//     .then(() => {
//       res.json({message: 'OK'});
//     })
//     .catch((err) => {
//       res.status(500).json({message: err});
//     })
// });
//
// router.delete('/employees/:id', (req, res) => {
//   req.db.collections.employees
//     .deleteOne({_id: new ObjectId(req.params.id)})
//     .then(() => {
//       res.json({message: 'OK'});
//     })
//     .catch((err) => {
//       res.status(500).json({message: err});
//     })
// });
//
// module.exports = router;
