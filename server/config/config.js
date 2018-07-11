let env = process.env.NODE_ENV || "development";

if(env === 'test'){
   process.env.PORT = "3000";
   process.env.MONGODB_URI = "mongodb://localhost:27017/TodoAppTest";
}else if(env === "development"){
   process.env.PORT = "3000";
   process.env.MONGODB_URI = "mongodb://localhost:27017/TodoApp";
}else{
   process.env.MONGODB_URI = "mongodb://butterface:b3Y0urS3lf@ds231941.mlab.com:31941/mongo-data";
}