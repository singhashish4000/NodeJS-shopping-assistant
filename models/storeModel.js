//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var storeSchema = new Schema({
  name: String
});

module.exports = mongoose.model('Store', storeSchema);