const express = require('express');
const bodyParser = require('body-parser');

const {ObjectID} = require('mongodb');
const mongoose = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');

let app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
   let todo = new Todo({
      text: req.body.text
   });

   todo.save().then((doc) => {
      res.send(doc);
   }, (err) => {
      res.status(400).send(err);
   });
});

app.get('/todos', (req, res) => {
   Todo.find().then((todos) => {
      res.send({todos});
   }, (err) => {
      res.status(400).send(err);
   });
});

// GET /todos:123
app.get('/todos/:id', (req, res) => {
   // Valid id using isValid
     // invalid
       // 404 - send empty send

     // valid
       // findById
         // success
           // if todo - send it back
           // if no todo - send back 404 with empty send
         //error
           // 400 - and send empty body back
   let id = req.params.id;
   if(!ObjectID.isValid(id)){
      res.status(404).send();
      return;
   }
   Todo.findById(id, (err, todos) => {
      if(err){
         res.status(400).send();
         return;
      }
      if(!todos){
         res.status(404).send();
         return;
      }
      res.send({todos});
   });
});

app.listen(3000, () => {
   console.log("started on port 3000");
});

module.exports = {app};

