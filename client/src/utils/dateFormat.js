const moment = require("moment");

const format_date_string = (date, time) => {
  // FROM: "01/19/2023" & Time similar to "09:00 AM"
  // TO: January 29 2023 09:00:00 (MST)

  const dateAndTime = date + " " + time;
  const tempdate = moment(dateAndTime).format("MMMM DD YYYY hh:mm:ss");
  const stringDateFormat = tempdate + " (MST)";

  return stringDateFormat;
};

const format_date_MMDDYYYY = (date) => {
  // FROM: "November 29 2022 09:00:00 (MST)"
  // TO: "Wed Jan 11 2023"

  let dateMMDDYYYY;

  if (date) {
    dateMMDDYYYY = new Date(date).toDateString();
  }

  return dateMMDDYYYY;
};
const format_date_MMDD = (date) => {
  // FROM: "November 29 2022 09:00:00 (MST)"
  // TO: "Wedneday Jan 11"

  const dateMMDD = moment(date).format("dddd, MMM DD");
 
  return dateMMDD;
};
const format_date_no_hyphen = (date) => {
  const newDate = moment(date).format("dddd, MMM DD YYYY")
  return newDate
}

const format_date_YYYYDDMM = (date) => {
  // FROM: "November 29 2022 09:00:00 (MST)"
  // TO: "2017-06-01"

  let dateYYYYDDMM;

  if (date) {
    dateYYYYDDMM = new Date(date).toLocaleDateString("en-CA").toString();
  }

  return dateYYYYDDMM;
};

const format_time_HHmmss = (time) => {
  // FROM: "08:00:00 (MST)"
  // TO: "HH:mm:ss"

  let time_HHmmss;

  if (time) {
    time_HHmmss = time.substring(0, 8);
  }
  
  // console.log(time_HHmmss);

  return time_HHmmss;
};

// The specified value "08:00:00 (MST)" does not conform to the required format.  The format is "HH:mm", "HH:mm:ss" or "HH:mm:ss.SSS" where HH is 00-23, mm is 00-59, ss is 00-59, and SSS is 000-999.

module.exports = {
  format_date_string,
  format_date_MMDDYYYY,
  format_date_YYYYDDMM,
  format_date_MMDD,
  format_date_no_hyphen,
  format_time_HHmmss,
};

  // if (date) {
  //   dateYYYYDDMM = new Date(date).toISOString().substring(0, 10)
  // }

  // console.log(new Date().toISOString().substring(0, 10))
  // console.log(prevScheduleData?.startTime, prevScheduleData?.startTime.slice(0,9).toString())
  // console.log((new Date(prevScheduleData?.startDate)).toISOString()); //2023-01-11T12:02:00.000Z
  // console.log(new Date()); // Sun Jan 15 2023 20:52:58 GMT-0700 (Mountain Standard Time)
  // // "2017-06-01"
  // console.log((new Date(prevScheduleData?.startDate)).getFullYear());
  // let month = (new Date(prevScheduleData?.startDate)).getFullYear();
  // let year = (new Date(prevScheduleData?.startDate)).getMonth();
  // let day = (new Date(prevScheduleData?.startDate)).getDate();

  // console.log('hello date = ', `${year}-${day}-${month}`);

  // let test = format_date_YYYYDDMM(prevScheduleData?.startDate);

  // console.log('function = ', test);

  // https://stackoverflow.com/questions/23593052/format-javascript-date-as-yyyy-mm-dd

  // https://stackoverflow.com/questions/6982692/how-to-set-input-type-dates-default-value-to-today
