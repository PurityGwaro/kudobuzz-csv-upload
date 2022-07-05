let mongoose = require("mongoose");
require("dotenv").config();

const CONNECTION = process.env.MONGODB_CONNECT;

class Database {
  constructor() {
    this._connect();
  }

  _connect() {
    mongoose
      .connect(CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => console.log("Connected to database"))
      .catch((error) => console.log(`${error} did not connect`));
  }
}

module.exports = new Database();
