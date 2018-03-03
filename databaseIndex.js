const mongoose = require('mongoose');
// const config = require('../config/index.js');
// const DATABASE_URL = config.DATABASE_URL;
mongoose.connect(process.env.MONGODB_URI);
// mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully!!!!');
});

var Schema = mongoose.Schema;

var EbutuoySchema = new Schema({
  name: {type: String, unique: true, dropDups: true},
});

var Ebutuoy = mongoose.model('Ebutuoy', EbutuoySchema);

module.exports = Ebutuoy;
