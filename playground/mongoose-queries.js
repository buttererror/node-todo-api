const {ObjectID} = require('mongodb');

const mongoose = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// let id = "6b3e3743308d0031b8c5eb111";

// if(!ObjectID.isValid(id)){
//    console.log("ID not valid");
// }
//
// Todo.find({
//    _id: id
// }).then((todos) => {
//    console.log("todos", todos);
// });
//
// Todo.findOne({
//    _id: id
// }).then((todo) => {
//    console.log("todo", todo);
// });
//
// Todo.findById(id).then((todo) => {
//    if(!todo){
//       return console.log("todo by id not found");
//    }
//    console.log("todo by id", todo);
// }).catch((err) => {
//    console.log(err);
// });

let id = "5b3a7f437b850c16c868578c";

User.findById(id).then((user) => {
   if(!user){
      return console.log("user not found");
   }
   console.log("user", user);
}, (err) => {
   console.log(err);
});