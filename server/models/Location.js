const { Schema, model } = require("mongoose");

const locationSchema = new Schema({
  businessName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  address: {
    type: String,
    required: true,
  },
  businessContact: {
    type: String,
  },
  shifts: {
    type: String,
  },
  daysOfWeek: {
    type: String,
  },
  startTime: {
    type: String,
  },
  laborHours: {
    type: Number,
    required: true,
  },
  instructions: {
    facilityType: {
      type: String,
    },
    cleaningType: {
      type: String,
    },
    bathrooms: {
      type: String,
    },
    lobby: {
      type: String,
    },
    sittingArea: {
      type: String,
    },
    breakRoom: {
      type: String,
    },
    frontdesk: {
      type: String,
    },
    appliances: {
      type: String,
    },
    dusting: {
      type: String,
    },
    windows: {
      type: String,
    },
    trash: {
      type: String,
    },
    vacuum: {
      type: String,
    },
    mop: {
      type: String,
    },
    additionalServices: {
      type: String,
    },
    exclusions: {
      type: String,
    },
  },
});

const Location = model("Location", locationSchema);

module.exports = Location;
