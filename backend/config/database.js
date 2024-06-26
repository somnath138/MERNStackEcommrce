const mongoose = require("mongoose"); //require mongoose

const connectDatabase = () => {
  //URI come to process.env file
  mongoose
    .connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((data) => {
      console.log(`MongoDb connected with server:${data.connection.host}`);
    });
}; //use in the one function to easy to return this function

module.exports = connectDatabase;
