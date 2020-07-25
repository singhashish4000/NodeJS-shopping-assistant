//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var orderSchema = new Schema({
  orderProduct: [{ type: Schema.Types.ObjectId, ref: 'OrderProduct' }],
  total: Number
});

module.exports = mongoose.model('Order', orderSchema);