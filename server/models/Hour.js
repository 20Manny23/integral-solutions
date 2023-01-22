const { Schema, model } = require("mongoose");
// const dayjs = require("dayjs");


const hourSchema = new Schema(
  {
    dayHours: {
        type: String,
        required: true,
      },
    workDate: {
        type: String,
        required: true,
    },
    startTime: {
        type: String,
        required: true,
    },
    endTime: {
        type: String,
        required: true,
    },
    employee: {
      type: Schema.Types.String,
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