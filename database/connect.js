const mongoose = require('mongoose');
require('dotenv').config();
const connectToMongoDB= process.env.CONNECTION;

const connectToDB = (url) => {
     mongoose
          .connect(connectToMongoDB)
          .then(() => {
               console.log('Database store is connected!');
          })
          .catch((error) => {
               console.log(error);
          })
}

module.exports = connectToDB;