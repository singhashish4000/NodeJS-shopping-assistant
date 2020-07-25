//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var cartSchema = new Schema({
  quantiy: String,
  item: { type: Schema.Types.ObjectId, ref: 'Item' },
});

module.exports = mongoose.model('Cart', cartSchema);