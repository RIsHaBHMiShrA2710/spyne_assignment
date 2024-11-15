require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 8000,
  MONGO_URI: process.env.MONGO_URI,
  SESSION_SECRET: process.env.SECRET_KEY,
};
