const { Schema, model } = require("mongoose");

const scheduleSchema = new Schema(
  {
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
    startDate: {
      type: String,
    },
    endDate: {
      type: String,
    },
    startTime: {
      type: String,
    },
    endTime: {
      type: String,
    },
    squareFeet: {
      type: String,
    },
    jobDetails: {
      type: String,
    },
    numberOfClientEmployees: {
      type: String,
    },
    client: {
      type: Schema.Types.String,
      ref: "Client"
    },
    employees: {
      type: Schema.Types.Array,
      ref: "Employee",
    },
    isDisplayable: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true
  },
);

const Schedule = model("Schedule", scheduleSchema);

module.exports = Schedule;