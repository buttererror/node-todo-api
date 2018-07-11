const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');

const {ObjectID} = require('mongodb');
const mongoose = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');

let app = express();
const port = process.env.PORT || 3000;

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
      return res.status(404).send();
   }
   Todo.findById(id, (err, todos) => {
      if(err){
         return res.status(400).send();
      }
      if(!todos){
         return res.status(404).send();
      }
      res.send({todos});
   });
});

app.delete('/todos/:id', (req, res) => {

   // validate id
      // error 404 - not found
   // removeById
   // success
         // if not found 404 - not found
         // remove and send todo with 200
   // error 400 send empty body

   let id = req.params.id;
   if(!ObjectID.isValid(id)){
      return res.status(404).send();
   }
   Todo.findByIdAndRemove(id).then((todo) => {
      if(!todo){
         return res.status(404).send();
      }
      res.send({todo});
   }).catch((err) => {
      res.status(400).send();
   });
});

app.patch('/todos/:id', (req, res) => {
   let body = _.pick(req.body, ["completed", "text"]);
   let id = req.params.id;

   if(!ObjectID.isValid(id)){
      return res.status(404).send();
   }

   if(_.isBoolean(body.completed) && body.completed){
      body.completedAt = new Date().getTime();
   }else {
      body.completed = false;
      body.completedAt = null;
   }
   Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
      if(!todo){
         return res.status(404).send();
      }
      res.send({todo});
   }).catch((err) => {
      res.status(400).send();
   });
});

app.listen(port, () => {
   console.log(`started up on port ${port}`);
});

module.exports = {app};

