const mongoose = require('mongoose');

const { MongoMemoryServer } = require('mongodb-memory-server');

const {server} = require("./server");

let mongod = null;

require("dotenv").config();

const connectDB = async () => {
  try {
    let dbUrl = process.env.MONGODB_URI;
    if (process.env.NODE_ENV === 'test') {
      if(mongod == null){
        mongod = await MongoMemoryServer.create();
        dbUrl = mongod.getUri();
      }  
     
    }

    const conn = await mongoose.connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,

    });
    console.log(dbUrl);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.log(err);
    server.close();
    process.exit(1);
  }
};

const disconnectDB = async () => {
  try {
    await mongoose.connection.close();
    if (mongod) {
      await mongod.stop();
    }
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = { connectDB, disconnectDB };