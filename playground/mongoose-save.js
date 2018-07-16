const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/animals');

let AnimalSchema = new mongoose.Schema({
   type: {
      type: String
   },
   age: {
      type: String
   }
});

let Animal = mongoose.model('Animal', AnimalSchema);

let animal = new Animal({
   type: 'Cat'
});

animal.save().then((animal) => {
   console.log(animal);
   animal.age = 4;
   animal.save().then((animal) => {
      console.log(animal);
   });
});

