const { Schema, model } = require("mongoose");


const hoursSchema = new Schema(
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



const Hours = model("Hours", hoursSchema);

module.exports = Hours;