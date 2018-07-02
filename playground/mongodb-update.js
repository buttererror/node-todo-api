// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

const options = { useNewUrlParser: true };
MongoClient.connect('mongodb://localhost:27017/TodoApp',options ,(err, client) => {
   if(err){
      return console.log('Unable to connect to mongoDB server');
   }
   console.log('Connected to mongoDB server');
   const db = client.db('TodoApp');

   // db.collection('Todos').findOneAndUpdate({
   //    _id: new ObjectID('5b3a244904bc7593cdc5a1fc')
   // }, {
   //    $set: {completed: true}
   // }, {
   //    returnOriginal: false
   // }).then((result) => {
   //    console.log(JSON.stringify(result, null, 2));
   // })

   db.collection('Users').findOneAndUpdate({
      _id: new ObjectID('5b3502d7874d880d64bc5be7')
   }, {
      $set: {name: "Mahmoud"},
      $inc: {age: 1}
   }, {
      returnOriginal: false
   }).then((results) => {
      console.log(JSON.stringify(results, null, 2));
   });


   // client.close();
});