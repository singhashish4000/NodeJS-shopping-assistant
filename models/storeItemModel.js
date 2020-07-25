//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var storeItemSchema = new Schema({
  store: { type: Schema.Types.ObjectId, ref: 'Store' },    
  item: { type: Schema.Types.ObjectId, ref: 'Item' },
  price: Number,
  rating: Number
});

module.exports = mongoose.model('StoreItem', storeItemSchema);