const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://getoudoorsfla_admin:RV7TmUKAsqzlIccV@cluster0.v9ej8dw.mongodb.net/googlebooks');

module.exports = mongoose.connection;
