const mongoose = require('mongoose');

// // плагины
// const toClientPlugin = require('./plugins/toClient');
// mongoose.plugin(toClientPlugin);

const db = mongoose.connection;     // установленное ранее соединение

module.exports = db;