var express = require('express');
var router = express.Router();

const assistController = require('../controllers/assistController');

const Item = require('../models/itemModel');
const Store = require('../models/storeModel');
const Cart = require('../models/cartModel');
const StoreItem = require('../models/storeItemModel');
const OrderProduct = require('../models/orderProductModel');
const Order = require('../models/orderModel');
const User = require('../models/userModel');

/* GET assist listing. */
router.get('/', async function(req, res, next) {
  let productOne = req.query.productOne;
  let productTwo = req.query.productTwo;
  let itemOne, itemTwo, storeItemsOne, storeItemsTwo, likeOne, likeTwo;
  try {
    itemOne = await Item.find({name: productOne}).select('_id');
    itemTwo = await Item.find({name: productTwo}).select('_id'); 
    storeItemsOne = await StoreItem.distinct('store').populate('item').find({item:  itemOne}).sort({rating: -1}).sort({price: 1});
    storeItemsTwo = await StoreItem.distinct('store').populate('item').find({item:  itemTwo}).sort({rating: -1}).sort({price: 1});
    // User will come from session normally
    likeOne = await User.findOne({name: 'Niel'}).populate({path: 'orders',populate: {path: 'orderProduct', model: 'OrderProduct',populate:{path: 'item', model: 'Item'}}});
    likeTwo = await User.findOne({name: 'Niel'}).populate({path: 'orders',populate: {path: 'orderProduct', model: 'OrderProduct',populate:{path: 'item', model: 'Item'}}})
  } catch (error) {
    console.error(error)
  }
  itemOneIds = itemOne.map(record => record._id);
  itemTwoIds = itemTwo.map(record => record._id);

  const likeOneIds = likeOne['orders'][0]['orderProduct'].reduce(item => item._id)
  const likeTwoIds = likeTwo['orders'][0]['orderProduct'].reduce(item => item._id)
  let response;
  if (storeItemsOne.length !=0 && storeItemsTwo.length !=0) {
     response = {results: [
      {productOne: 
        {
         highestRated: storeItemsOne[0],
         mostEconomical: storeItemsOne[1],
         youMayLike: likeOneIds,
        },
      },{productTwo:
        {
         highestRated: storeItemsTwo[0],
         mostEconomical: storeItemsTwo[1],
         youMayLike: likeTwoIds,
        }}]}
  } else {
    response = { 
      productOne: 'Not available',
      productTwo: 'Not available'
    }
  }
  res.send({result: response});
});

module.exports = router;