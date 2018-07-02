// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

const options = { useNewUrlParser: true };
MongoClient.connect('mongodb://localhost:27017/TodoApp',options ,(err, client) => {
   if(err){
      return console.log('Unable to connect to mongoDB server');
   }
   console.log('Connected to mongoDB server');
   const db = client.db('TodoApp');

   // deleteMany
   // db.collection('Todos').deleteMany({text: 'Eat lunch'}).then((result) => {
   //    console.log(result);
   // });

   // deleteOne
   // db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((result) => {
   //    console.log(result);
   // });

   // findOneAndDelete
   // db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
   //    console.log(result);
   // })

   // db.collection('Users').deleteMany({name: "Mahmoud"}).then((result) => {
   //    console.log("users deleted");
   // });

   db.collection('Users').findOneAndDelete({
      _id: new ObjectID("5b350eb55886d825a01a2cc8")
   }).then((result) => {
      console.log("user deleted");
   });


   // client.close();
});