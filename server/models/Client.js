const { Schema, model } = require("mongoose");

const clientSchema = new Schema(
  {
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
      match: [/.+@.+\..+/, "Must use a valid email address"],
    },
    schedule: {
      type: Schema.Types.Array,
      ref: "Schedule",
    },
    isDisplayable: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Client = model("Client", clientSchema);

module.exports = Client;
