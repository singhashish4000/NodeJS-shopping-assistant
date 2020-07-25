//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var orderProductSchema = new Schema({
  item: { type: Schema.Types.ObjectId, ref: 'Item' },
  order: { type: Schema.Types.ObjectId, ref: 'Order' },
  quantity: Number,
  subtotal: Number
});

module.exports = mongoose.model('OrderProduct', orderProductSchema);