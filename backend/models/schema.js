const mongoose = require("mongoose");

const mongoosePaginate = require("mongoose-paginate-v2");

const customer = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    phone: { type: String, unique: true },
    fileId: String,
  },
  { timestamps: true }
);

const file = new mongoose.Schema(
  {
    name: String,
  },
  { timestamps: true }
);

customer.plugin(mongoosePaginate);

const Customer = mongoose.model("Customer", customer);
const File = mongoose.model("File", file);

module.exports = {
  Customer,
  File,
};
