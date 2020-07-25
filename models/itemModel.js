//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var itemSchema = new Schema({
  name: String
});

module.exports = mongoose.model('Item', itemSchema);