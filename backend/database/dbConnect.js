const mongoose = require('mongoose');

const dbUrl = process.env.mongo_uri; 

mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('connected', () => {
  console.log('Connected ');
});

db.on('error', (err) => {
  console.error('error:', err);
});

db.on('disconnected', () => {
  console.log('Disconnected from MongoDB');
});

module.exports = db;
