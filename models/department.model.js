const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
  name: {type: String, required: true}
}, {
  toJSON: {
    transform: (doc, ret) => {
      delete ret.__v;
      return ret;
    },
  },
});

const DepartmentModels = mongoose.model('departments', departmentSchema);

module.exports = {departmentSchema, Department: DepartmentModels};
