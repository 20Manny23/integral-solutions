const { Schema, model } = require("mongoose");

const clientSchema = new Schema({
  businessName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  streetAddress: {
    type: String,
    required: true,
  },
  suite: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  zip: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

const Location = model("Client", clientSchema);

module.exports = Client;
