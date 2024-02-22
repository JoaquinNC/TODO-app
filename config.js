const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/tareasDB");

module.exports = mongoose;