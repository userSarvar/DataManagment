const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  field1: String,
  field2: String,
  category: { type: String, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

module.exports = mongoose.model('Data', dataSchema);
