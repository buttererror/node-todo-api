const mongoose = require('mongoose');


mongoose.connect("mongodb://localhost:27017/TodoApp");

let TodoSchema = mongoose.Schema({
   text: {
      type: "String"
   },
   completed: {
      type: "Boolean"
   },
   completedAt: {
      type: "Number"
   }
});

let Todo = mongoose.model('Todo', TodoSchema);

// let newTodo = new Todo({
//    text: "Cook dinner"
// });
//
// newTodo.save().then((doc) => {
//    console.log("saved todo", doc);
// }, (err) => {
//    console.log("Unable to save todo");
// });

let newTodo = new Todo({
   text: "run on the beach",
   completed: false,
   completedAt: 8
});

newTodo.save().then((doc) => {
   console.log('save todo', doc);
}, (err) => {
   console.log("Unable to save todo", err);
});