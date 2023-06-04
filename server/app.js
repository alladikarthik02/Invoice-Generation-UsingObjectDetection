const exp = require('express');
const mongo   = require('mongoose');
const path  = require('path');
const dotenv = require('dotenv');

dotenv.config()




const app = exp();

app.get('/', function (req, res) {
    res.send("Home");

} )

mongo.set('strictQuery', false);

mongo.connect(process.env.MONGO_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        app.listen(3000 , () => {
            console.log(`Server started at port 3000`); 
        });
    })
    .catch( function(err) {
        console.log(err);
    });


const { User, Bill, Product} = require('./models/model');

const user = new User({
    name: 'srujay',
  });
  
  // Save the user to the database
  user.save()
    .then(savedUser => {
      console.log('User saved:', savedUser);
  
      // Create a new bill
      const bill = new Bill({
        user: savedUser._id,
        products: [] // Add product IDs to this array
      });
  
      // Save the bill to the database
      bill.save()
        .then(savedBill => {
          console.log('Bill saved:', savedBill);
  
          // Create a new product
          const product = new Product({
            name: 'Kingston USB 16Gb',
            price: 1.99
          });
  
          // Save the product to the database
          product.save()
            .then(savedProduct => {
              console.log('Product saved:', savedProduct);
  
              // Add the product ID to the bill's products array
              savedBill.products.push(savedProduct._id);
              savedBill.save()
                .then(updatedBill => {
                  console.log('Bill updated with product:', updatedBill);
                })
                .catch(error => console.error('Failed to update bill:', error));
            })
            .catch(error => console.error('Failed to save product:', error));
        })
        .catch(error => console.error('Failed to save bill:', error));
    })
    .catch(error => console.error('Failed to save user:', error));