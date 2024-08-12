const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ['Promoter', 'Regional Manager', 'HR', 'Retail Coordinator', 'Retail Analytics', 'Supervisor'] },
});

module.exports = mongoose.model('User', userSchema);
