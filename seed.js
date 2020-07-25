const mongosse = require('mongoose');
const config = require('./config');

const Item = require('./models/itemModel');
const Store = require('./models/storeModel');
const Cart = require('./models/cartModel');
const StoreItem = require('./models/storeItemModel');
const OrderProduct = require('./models/orderProductModel');
const Order = require('./models/orderModel');
const User = require('./models/userModel');

mongosse.connect(config.database, async (err) => {
    if(err) {
      console.log('Error', err);
    } else {
      console.log('Connected from seed');

      // Store 1 => 5 Items

      let itemRecord = await Item.create({name: 'Item1'});
      let storeRecord = await Store.create({name: 'Store1'});
      await StoreItem.create({item: itemRecord, store: storeRecord, price: 10, rating: 1});

      itemRecord = await Item.create({name: 'Item2'});
      storeRecord = await Store.findOne({name: 'Store1'});
      await StoreItem.create({item: itemRecord, store: storeRecord, price: 15, rating: 3});

      itemRecord = await Item.create({name: 'Item3'});
      storeRecord = await Store.findOne({name: 'Store1'});
      await StoreItem.create({item: itemRecord, store: storeRecord, price: 20, rating: 2});

      itemRecord = await Item.create({name: 'Item4'});
      storeRecord = await Store.findOne({name: 'Store1'});
      await StoreItem.create({item: itemRecord, store: storeRecord, price: 16, rating: 5});

      itemRecord = await Item.create({name: 'Item5'});
      storeRecord = await Store.findOne({name: 'Store1'});
      await StoreItem.create({item: itemRecord, store: storeRecord, price: 10, rating: 1});

      // Store 2 => 5 Items

      let itemRecord2 = await Item.findOne({name: 'Item1'});
      let storeRecord2 = await Store.create({name: 'Store2'});
      await StoreItem.create({item: itemRecord, store: storeRecord, price: 12, rating: 2});

      itemRecord2 = await Item.findOne({name: 'Item2'});
      storeRecord2 = await Store.findOne({name: 'Store2'});
      await StoreItem.create({item: itemRecord2, store: storeRecord2, price: 19, rating: 5});

      itemRecord2 = await Item.findOne({name: 'Item3'});
      storeRecord2 = await Store.findOne({name: 'Store2'});
      await StoreItem.create({item: itemRecord2, store: storeRecord2, price: 25, rating: 4});

      itemRecord2 = await Item.findOne({name: 'Item4'});
      storeRecord2 = await Store.findOne({name: 'Store2'});
      await StoreItem.create({item: itemRecord2, store: storeRecord2, price: 10, rating: 5});

      itemRecord2 = await Item.findOne({name: 'Item5'});
      storeRecord2 = await Store.findOne({name: 'Store2'});
      await StoreItem.create({item: itemRecord2, store: storeRecord2, price: 11, rating: 3});
      
      
      // Store 3 => 5 Items

      let itemRecord3 = await Item.findOne({name: 'Item1'});
      let storeRecord3 = await Store.findOne({name: 'Store3'});
      await StoreItem.create({item: itemRecord3, store: storeRecord3, price: 20, rating: 4});

      itemRecord3 = await Item.findOne({name: 'Item2'});
      storeRecord3 = await Store.findOne({name: 'Store3'});
      await StoreItem.create({item: itemRecord3, store: storeRecord3, price: 25, rating: 3});

      itemRecord3 = await Item.findOne({name: 'Item3'});
      storeRecord3 = await Store.findOne({name: 'Store3'});
      await StoreItem.create({item: itemRecord3, store: storeRecord3, price: 29, rating: 2});

      itemRecord3 = await Item.findOne({name: 'Item4'});
      storeRecord3 = await Store.findOne({name: 'Store3'});
      await StoreItem.create({item: itemRecord3, store: storeRecord3, price: 15, rating: 4});

      itemRecord3 = await Item.findOne({name: 'Item5'});
      storeRecord3 = await Store.findOne({name: 'Store3'});
      await StoreItem.create({item: itemRecord3, store: storeRecord3, price: 21, rating: 4});

      let itemRecord1 = await Item.findOne({name: 'Item1'});
      let itemRecord2 = await Item.findOne({name: 'Item2'});
      let itemRecord3 = await Item.findOne({name: 'Item3'});

      // OrderProducts
      orderProduct1 = await new OrderProduct({item: itemRecord1, quantity: 1, subtotal: 50})
      orderProduct2 = await new OrderProduct({item: itemRecord2, quantity: 2, subtotal: 100})
      orderProduct3 = await new OrderProduct({item: itemRecord3, quantity: 3, subtotal: 70})

      OrderProduct.collection.insert([orderProduct1,orderProduct2,orderProduct3])
      .then(async (data)=>{
        const order_product_ids = data['ops'].map(a => a._id)
      // Order
        let order = await Order.create({orderProducts: order_product_ids, total: 220})
      //1 User  
        await User.create({name: 'Niel', orders: [order._id]})
      });
    }


  });  