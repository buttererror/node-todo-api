const mongoose = require('mongoose');

// let options = {
//    user: "butterface",
//    pass: "b3Y0urs3lf",
//    auth: {
//       authdb: "magic"
//    }
// };
let db = {
   localhost: "mongodb://localhost:27017/TodoApp",
   mlabhost: "mongodb://butterface:b3Y0urS3lf@ds231941.mlab.com:31941/mongo-data"
};
mongoose.connect(process.env.MONGODB_URI || db.localhost);
module.exports = {mongoose};