const mongoose = require('mongoose');

const connection = mongoose
  .connect(process.env.MONGO_URI)
  .then((db) => {
    console.log(`Database Connection Established: ${db.connection.host}`);
    return db;
  })
  .catch((err) => console.log(`Error Connecting to Database: ${err.message}`));

module.exports = connection;
