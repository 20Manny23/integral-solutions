const { Schema, model } = require("mongoose");

const scheduleSchema = new Schema(
  {
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
    client: {
      type: Schema.Types.String,
      ref: "Client"
    },
    employees: {
      type: Schema.Types.Array,
      ref: "Employee",
    },
  },
);

const Schedule = model("Schedule", scheduleSchema);

module.exports = Schedule;