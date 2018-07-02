const mongoose = require('mongoose');


mongoose.connect("mongodb://localhost:27017/TodoApp");
let TodoSchema = mongoose.Schema({
   text: {
      type: "String",
      required: true,
      minlength: 1,
      trim: true
   },
   completed: {
      type: "Boolean",
      default: false
   },
   completedAt: {
      type: "Number",
      default: null
   }
});

let Todo = mongoose.model('Todo', TodoSchema);

// let newTodo = new Todo({
//    text: "  something to do  "
// });
//
// newTodo.save().then((doc) => {
//    console.log('save todo', doc);
// }, (err) => {
//    console.log("Unable to save todo", err);
// });

let UserSchema = mongoose.Schema({
   email: {
      type: "String",
      required: true,
      trim: true,
      minlength: 1
   }
});

let User = mongoose.model('User', UserSchema);

let newUser = new User({
   email: "myEmail@gmail.com"
});

newUser.save().then((doc) => {
   console.log("user saved", doc);
}, (err) => {
   console.log("Unable to save the user", err);
});