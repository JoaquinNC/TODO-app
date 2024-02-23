const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: String,
  completed: Boolean,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

const Item = mongoose.model('Item', itemSchema);
module.exports = Item;
