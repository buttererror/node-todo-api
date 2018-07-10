const {ObjectID} = require('mongodb');

const mongoose = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove().then((result) => {
//    console.log(result);
// });

Todo.findByIdAndRemove("5b44d8e2a6f97dad68b1402d").then((doc) => {
   console.log(doc);
});

Todo.findOneAndRemove({_id: "5b44d8e2a6f97dad68b1402d"}).then((doc) => {
   console.log(doc);
});