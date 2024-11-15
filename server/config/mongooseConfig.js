const mongoose = require('mongoose');
const {MONGO_URI} = require('./dotenvConfig'); 


const mongooseConnection = async () => {
  try {
    const mongoURI = MONGO_URI;

    if (!mongoURI) {
      console.log(mongoURI);
      throw new Error('MONGO_URI is not defined in the environment variables');
    }

    await mongoose.connect(mongoURI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1); 
  }
};

mongooseConnection();
module.exports = mongoose.connection;
