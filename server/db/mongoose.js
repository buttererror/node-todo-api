const mongoose = require('mongoose');

let db = {
   localhost: "mongodb://localhost:27017/TodoApp",
   mlabhost: "mongodb://butterface:b3Y0urS3lf@ds231941.mlab.com:31941/mongo-data"
};
mongoose.connect(db.mlabhost || db.localhost);

module.exports = {mongoose};