const request = require('supertest');
const expect = require('expect');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

let todos = [{
   _id: new ObjectID(),
   text: "first test todo"
}, {
   _id: new ObjectID(),
   text: "second test todo",
   completed: true,
   completedAt: 333
}];

beforeEach((done) => {
   Todo.remove({}).then(() => {
      Todo.insertMany(todos);
      done();
   });
});

describe('POST /todos', () => {

   it('should create a new todo', (done) => {
      let text = "test todo text";
      request(app)
         .post('/todos')
         .send({text})
         .expect((res) => {
            expect(res.body.text).toBe(text);
         })
         .expect(200)
         .end((err, res) => {
            if(err){
               return done(err);
            }
            Todo.find({text}).then((todos) => {
               expect(todos.length).toBe(1);
               expect(todos[0].text).toBe(text);
               done();
            }).catch((err) => {
               done(err);
            });
         })
   });

   it('should not create todo with invalid body data', (done) => {

      request(app)
         .post('/todos')
         .send({})
         .expect(400)
         .end((err, res) => {
            if(err){
               return done(err);
            }

            Todo.find().then((todos) => {
               expect(todos.length).toBe(2);
               done();
            }).catch((err) => {
               done(err);
            });
         });
   });
});

describe('GET /todos', () => {

   it('should get all todos', (done) => {
      request(app)
         .get('/todos')
         .expect(200)
         .expect((res) => {
            expect(res.body.todos.length).toBe(2);
         })
         .end(done);
   });

});

describe('GET /todos/:id', () => {

   it('should return todo doc', (done) => {
      let id = todos[0]._id.toHexString();
      request(app)
         .get(`/todos/${id}`)
         .expect(200)
         .expect((res) => {
            expect(res.body.todos.text).toBe(todos[0].text);
         })
         .end(done);
   });

   it('should return 404 if todo not found', (done) => {
      let id = new ObjectID();
      request(app)
         .get(`/todos/${id}`)
         .expect(404)
         .end(done);
   });

   it('should return 404 for non-object ids', (done) =>{
      request(app)
         .get('/todos/123')
         .expect(404)
         .end(done);
   });
});

describe("DELETE /todos", () => {

   it('should remove a todo', (done) => {
      let hexId = todos[0]._id.toHexString();

      request(app)
         .delete(`/todos/${hexId}`)
         .expect(200)
         .expect((res) => {
            expect(res.body.todo._id).toBe(hexId);
         })
         .end((err, res) => {
            if(err){
               return done(err);
            }
            Todo.findById(hexId).then((todo) => {
               expect(todo).toNotExist();
               done();
            }).catch((err) => done(err));
         });
   });

   it('should return 404 if todo not found', (done) => {
      let hexId = new ObjectID();

      request(app)
         .delete(`/todos/${hexId}`)
         .expect(404)
         .end(done);
   });

   it('should return 404 if object id invalid', (done) => {
      request(app)
         .delete("/todo/123")
         .expect(404)
         .end(done);
   });

});

describe('PATCH /todos', () => {
   it('should update the todo', (done) => {
      let hexId = todos[0]._id.toHexString();
      let text = "something updated";
      request(app)
         .patch(`/todos/${hexId}`)
         .send({text, completed: true})
         .expect(200)
         .expect((res) => {
            expect(res.body.todo.completed).toBe(true);
            expect(res.body.todo.completedAt).toBeA('number');
            expect(res.body.todo.text).toBe(text);
         })
         .end(done);
   });

   it('should clear completedAt when todo is not completed', (done) => {
      let hexId = todos[1]._id.toHexString();
      let text = "update something to do";
      request(app)
         .patch(`/todos/${hexId}`)
         .send({text})
         .expect(200)
         .expect((res) => {
            expect(res.body.todo.completed).toBe(false);
            expect(res.body.todo.text).toBe(text);
            expect(res.body.todo.completedAt).toNotExist();
         })
         .end(done);
   });

});