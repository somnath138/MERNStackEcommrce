const app = require("./app"); //first app require
const dotenv = require("dotenv"); //npm i dotenv require env file // env is global file
const cloudinary = require("cloudinary");
//config
dotenv.config(); //connect to the path //pointed to the env file

const connectDatabase = require("./config/database");
//console.log(you) randomly eisob likha ke bole uncaught error eta keo handle korte lage

process.on("uncaughtException", (err) => {
  console.log(`ERROR: ${err.message}`);
  console.log(`shutting down the server due to the uncaughtException error`);
  process.exit(1);
});

//connectDatabase
connectDatabase();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//server connected through this
const server = app.listen(process.env.PORT, () => {
  console.log(`server is working on  http://localhost:${process.env.PORT}`);
});

//console.log(helloxw)

//unhandled promise rejection
//mainly mongodb url ee kono rokom er error ele eta diye fixed hobe
process.on("unhandledRejection", (err) => {
  console.log(`ERROR: ${err.message}`);
  console.log(`shutting down the server due to the unhandled rejection`);

  server.close(() => {
    process.exit(1);
  });
});
