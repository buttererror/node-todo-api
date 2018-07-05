const request = require('supertest');
const expect = require('expect');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

let todos = [{
   text: "first test todo"
}, {
   text: "second test todo"
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