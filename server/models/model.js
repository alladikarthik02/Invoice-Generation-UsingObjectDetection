const mongoose = require('mongoose');
const { Schema } = mongoose;


// User schema
const UserSchema = new Schema({
    name: String,
    bills: [{ type: Schema.Types.ObjectId, ref: 'Bill' }]
});
  
// Bill schema
const BillSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    products: [{ type: Schema.Types.ObjectId, ref: 'Product' }]
});

// Product schema
const ProductSchema = new Schema({
    name: String,
    price: Number
});

const User = mongoose.model('User', UserSchema);
const Bill = mongoose.model('Bill', BillSchema);
const Product = mongoose.model('Product', ProductSchema);

module.exports = {
    User,
    Bill,
    Product
};
