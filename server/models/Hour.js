const { Schema, model } = require("mongoose");
// const dayjs = require("dayjs");


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
    employees: {
      type: Schema.Types.Array,
      ref: "Employee",
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