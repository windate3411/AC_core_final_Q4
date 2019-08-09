const mongoose = require('mongoose')
const config = require('config')
const db = process.env.MONGODB_URI || config.get('mongoUrl')

const connectDB = async () => {
  try {
    await mongoose.connect(db, { useNewUrlParser: true })
    console.log('mongodb connect');
  } catch (err) {
    console.log(err.message);
    process.exit(1)
  }
}

module.exports = connectDB