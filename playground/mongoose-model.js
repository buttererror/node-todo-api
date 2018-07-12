const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/TankApp").catch((err) => {
   console.log(err);
});

let schema = new mongoose.Schema({ name: 'string', size: 'string' });
let Tank = mongoose.model('Tank', schema);

let tank = new Tank({
   name: "Sama",
   size: "1000"
});

tank.save().then((doc) => {
   console.log(doc);
}).catch((err) => {
   console.log(err);
});