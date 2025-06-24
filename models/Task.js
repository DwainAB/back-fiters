const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  deadline: { type: Date },
  tags: [{ type: String }],
  priority: { type: String, enum: ['low', 'medium', 'high'], default: 'low' },
  category: { type: String },
  status: { type: String, enum: ['Pending', 'In Progress', 'Completed'], default: 'Pending' }
});

module.exports = mongoose.model('Task', taskSchema);
