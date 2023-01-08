const db = require("../config/connection");
const { User } = require("../models");
const userSeeds = require("./userSeeds.json");
const { Location } = require("../models");
const locationSeeds = require("./locationSeeds.json");
const { Incident } = require("../models");
const incidentSeeds = require("./incidentSeeds.json");
const { Event } = require("../models");
const eventSeeds = require("./eventSeeds.json");
const { Schedule } = require("../models");
const scheduleSeeds = require("./scheduleSeeds.json");
const { Client } = require("../models");
const clientSeeds = require("./clientSeeds.json");
const { Employee } = require("../models");
const employeeSeeds = require("./employeeSeeds.json");

db.once("open", async () => {
  try {
    await Location.deleteMany({});
    await User.deleteMany({});
    await Incident.deleteMany({});
    await Event.deleteMany({});
    await Schedule.deleteMany({});
    await Client.deleteMany({});
    await Employee.deleteMany({});

    await User.create(userSeeds);
    await Location.create(locationSeeds);
    await Incident.create(incidentSeeds);
    await Schedule.create(scheduleSeeds);
    await Client.create(clientSeeds);
    await Employee.create(employeeSeeds);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log("all done!");
  process.exit(0);
});
