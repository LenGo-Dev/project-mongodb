const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  department: {type: String, required: true}
}, {
  toJSON: {
    transform: (doc, ret) => {
      delete ret.__v;
      return ret;
    },
  },
});

const employeeModels = mongoose.model('Employees', employeeSchema);


module.exports = {employeeSchema, Employee: employeeModels};