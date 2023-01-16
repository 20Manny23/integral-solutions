const moment = require("moment");

const format_date_string = (date, time) => {

  const dateAndTime = date + " " + time;
  const tempdate = moment(dateAndTime).format("MMMM DD YYYY hh:mm:ss");
  const correctDateFormat = tempdate + " (MST)";

  console.log(correctDateFormat);

  return correctDateFormat;

};

module.exports = format_date_string;