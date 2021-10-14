require('dotenv').config();

const {
  PORT = 3000, DATA_BASE = 'mongodb://localhost:27017/moviesdb', NODE_ENV, JWT_SECRET,
} = process.env;

module.exports = {
  PORT, DATA_BASE, NODE_ENV, JWT_SECRET,
};
