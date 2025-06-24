const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Le titre est requis'],
    trim: true,
    validate: {
      validator: function (v) {
        return v && v.trim().length > 0;
      },
      message: 'Le titre ne peut pas être vide'
    }
  }
});

module.exports = mongoose.model('Category', categorySchema);
