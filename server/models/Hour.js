const { Schema, model } = require("mongoose");


const hourSchema = new Schema(
  {
    hours: {
      type: String,
      required: true,
    },
    workDate: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);



const Hour = model("Hour", hourSchema);

module.exports = Hour;