const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: String,
  completed: { type: Boolean, default: false }
});

const Item = mongoose.model('Item', itemSchema);
module.exports = Item;
