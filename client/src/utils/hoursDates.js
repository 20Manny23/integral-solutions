// data for hours/dates
const dayjs = require("dayjs");

const thisWeek = [
  {
    id: "1",
    date: dayjs().startOf("week").format("MMM-DD-YYYY"),
    day: "Sunday",
  },
  {
    id: "2",
    date: dayjs().startOf("week").add(1, "day").format("MMM-DD-YYYY"),
    day: "Monday",
  },
  {
    id: "3",
    date: dayjs().startOf("week").add(2, "day").format("MMM-DD-YYYY"),
    day: "Tuesday",
  },
  {
    id: "4",
    date: dayjs().startOf("week").add(3, "day").format("MMM-DD-YYYY"),
    day: "Wednesday",
  },
  {
    id: "5",
    date: dayjs().startOf("week").add(4, "day").format("MMM-DD-YYYY"),
    day: "Thursday",
  },
  {
    id: "6",
    date: dayjs().startOf("week").add(5, "day").format("MMM-DD-YYYY"),
    day: "Friday",
  },
  {
    id: "7",
    date: dayjs().startOf("week").add(6, "day").format("MMM-DD-YYYY"),
    day: "Saturday",
  },
];

const lastWeek = [
  {
    id: "1",
    date: dayjs().startOf("week").subtract(7, "day").format("MMM-DD-YYYY"),
    day: "Sunday",
  },
  {
    id: "2",
    date: dayjs().startOf("week").subtract(6, "day").format("MMM-DD-YYYY"),
    day: "Monday",
  },
  {
    id: "3",
    date: dayjs().startOf("week").subtract(5, "day").format("MMM-DD-YYYY"),
    day: "Tuesday",
  },
  {
    id: "4",
    date: dayjs().startOf("week").subtract(4, "day").format("MMM-DD-YYYY"),
    day: "Wednesday",
  },
  {
    id: "5",
    date: dayjs().startOf("week").subtract(3, "day").format("MMM-DD-YYYY"),
    day: "Thursday",
  },
  {
    id: "6",
    date: dayjs().startOf("week").subtract(2, "day").format("MMM-DD-YYYY"),
    day: "Friday",
  },
  {
    id: "7",
    date: dayjs().startOf("week").subtract(1, "day").format("MMM-DD-YYYY"),
    day: "Saturday",
  },
];

const hours = [
  {
    id: "1",
    startHours: "8:00",
    endHours: "5:00",
  },
  {
    id: "2",
    startHours: "9:00",
    endHours: "6:00",
  },
  {
    id: "3",
    startHours: "7:00",
    endHours: "7:00",
  },
  {
    id: "4",
    startHours: "9:00",
    endHours: "4:00",
  },
  {
    id: "5",
    startHours: "8:00",
    endHours: "6:00",
  },
  {
    id: "6",
    startHours: "11:00",
    endHours: "9:00",
  },
  {
    id: "7",
    startHours: "12:00",
    endHours: "8:00",
  },
];

module.exports = { thisWeek, lastWeek, hours };
