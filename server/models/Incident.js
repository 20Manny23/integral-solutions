const { Schema, model } = require("mongoose");

const incidentSchema = new Schema(
  {
    employeeName: {
      type: String,
    },
    locationName: {
      type: String,
    },
    employeePhone: {
      type: String,
    },
    subject: {
      type: String,
    },
    urgent: {
      type: String,
    },
    incidentDetails: {
      type: String,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

const Incident = model("Incident", incidentSchema);

module.exports = Incident;
