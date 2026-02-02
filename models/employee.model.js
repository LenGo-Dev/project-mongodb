const mongoose = require('mongoose');
const { Schema } = mongoose;
// const { Department} = require('./department.model');

const employeeSchema = new mongoose.Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  department: {
    type: Schema.Types.ObjectId,
    ref: 'departments',
    required: true
  },
},{
  toJSON: {
    transform: (doc, ret) => {
      delete ret.__v;
      return ret;
    },
  },
});

const employeeModels = mongoose.model('employees', employeeSchema);


module.exports = {employeeSchema, Employee: employeeModels};