// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

const options = { useNewUrlParser: true };
MongoClient.connect('mongodb://localhost:27017/TodoApp',options ,(err, client) => {
   if(err){
      return console.log('Unable to connect to mongoDB server');
   }
   console.log('Connected to mongoDB server');
   const db = client.db('TodoApp');

   // db.collection("Todos").insertOne({
   //    text: "something to do",
   //    completed: false
   // }, (err, result) => {
   //    if(err){
   //       return console.log("Unable to insert todo", err);
   //    }
   //    console.log(JSON.stringify(result.ops, null, 2));
   // });

   // db.collection("Users").insertOne({
   //    name: "Mahmoud",
   //    age: 26,
   //    location: "Alexandria"
   // }, (err, result) => {
   //    if(err){
   //       return console.log("Unable to insert user", err);
   //    }
   //    console.log(result.ops[0]._id.getTimestamp());
   // });

   client.close();
});