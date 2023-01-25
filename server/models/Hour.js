const { Schema, model } = require("mongoose");

const hourSchema = new Schema(
  {
    jobDate: {
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
    hoursWorked: {
      type: String,
      required: true,
    },
    employee: {
      type: Schema.Types.String,
      ref: "Employee",
    },
  },
  {
    timestamps: true
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

const Hour = model("Hour", hourSchema);

module.exports = Hour;
