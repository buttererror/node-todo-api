// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

const options = { useNewUrlParser: true };
MongoClient.connect('mongodb://localhost:27017/TodoApp',options ,(err, client) => {
   if(err){
      return console.log('Unable to connect to mongoDB server');
   }
   console.log('Connected to mongoDB server');
   const db = client.db('TodoApp');
   // db.collection('Todos').find().count().then((count) => {
   //    console.log('Todos');
   //    console.log(count);
   // }, (err) => {
   //    console.log("Unable to fetch Todos", err);
   // });

   db.collection('Users').find({name: "Mahmoud"}).toArray().then((docs) => {
      console.log(JSON.stringify(docs, null, 2));
   }, (err) => {
      console.log("Unable to fetch users", err);
   });

   // client.close();
});