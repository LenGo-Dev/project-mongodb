const {Employee} = require("../models/employee.model");
const {Department} = require("../models/department.model");

exports.getAll = async (req, res) => {
  try {
    res.json(await Employee.find().populate('department'));
  } catch (err) {
    res.status(500).json({message: err});
  }
};

exports.getRandom = async (req, res) => {

  try {
    const count = await Employee.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const empl = await Employee.findOne().skip(rand);
    if (!empl) res.status(404).json({message: 'Not found'});
    else res.json(empl);
  } catch (err) {
    res.status(500).json({message: err});
  }

};

exports.getId = async (req, res) => {

  try {
    const empl = await Employee.findById(req.params.id).populate('department');
    if (!empl) res.status(404).json({message: 'Not found'});
    else res.json(empl);
  } catch (err) {
    res.status(500).json({message: err});
  }

};

exports.getCreate = async (req, res) => {
  try {
    const {firstName, lastName, department} = req.body;
    const dep = await Department.findOne({name: department});

    if (!dep) {
      throw new Error('Department not found');
    }

    const newEmployee = new Employee({firstName: firstName, lastName: lastName, department: dep._id});
    await newEmployee.save();
    res.json({message: 'OK'});

  } catch (err) {
    res.status(500).json({message: err});
  }

};

exports.getUpdate = async (req, res) => {
  const {firstName, lastName, department} = req.body;

  try {
    const dep = await Department.findOne({name: department});

    if (!dep) {
      throw new Error('Department not found');
    }

    const empl = await Employee.findById(req.params.id).populate('department');
    if (empl) {
      empl.firstName = firstName;
      empl.lastName = lastName;
      empl.department = dep._id;
      await empl.save();
      res.json({message: 'OK'});
    } else res.status(404).json({message: 'Not found...'});
  } catch (err) {
    res.status(500).json({message: err});
  }

};

exports.getDelete = async (req, res) => {

  try {
    const empl = await Employee.findById(req.params.id).populate('department');
    if (empl) {
      await Employee.deleteOne({_id: req.params.id});
      res.json({message: 'OK'});
    } else res.status(404).json({message: 'Not found...'});
  } catch (err) {
    res.status(500).json({message: err});
  }

};


