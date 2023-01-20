const moment = require("moment");

const format_date_string = (date, time) => {
  // FROM: "01/19/2023" & Time similar to "09:00 AM"
  // TO: January 29 2023 09:00:00 (MST)
  const dateAndTime = date + " " + time;
  const tempdate = moment(dateAndTime).format("MMMM DD YYYY hh:mm:ss");
  const stringDateFormat = tempdate + " (MST)";

  // console.log(correctDateFormat);

  return stringDateFormat;
};

const format_date_MMDDYYYY = (date) => {
  // FROM: "November 29 2022 09:00:00 (MST)"
  // TO: "Wed Jan 11 2023"

  let dateMMDDYYYY;

  if (date) {
    dateMMDDYYYY = new Date(date).toDateString();
  }

  // console.log(new Date(date).toDateString());

  return dateMMDDYYYY;
};
const format_date_MMDD = (date) => {
  // FROM: "November 29 2022 09:00:00 (MST)"
  // TO: "Wed Jan 11 "

  
  const dateMMDD = moment(date).format("dddd, MMM DD");
  // if (date) {
  //   dateMMDD = new Date(date).toDateString();
  //   console.log(dateMMDD)
  // }

  // console.log(new Date(date).toDateString());

  return dateMMDD;
};

const format_date_YYYYDDMM = (date) => {
  // FROM: "November 29 2022 09:00:00 (MST)"
  // TO: "2017-06-01"

  let dateYYYYDDMM;

  if (date) {
    dateYYYYDDMM = new Date(date).toLocaleDateString("en-CA").toString();
  }

  // console.log(new Date(date).toDateString());
  // console.log(dateYYYYDDMM);

  return dateYYYYDDMM;

};

module.exports = {
  format_date_string,
  format_date_MMDDYYYY,
  format_date_YYYYDDMM,
  format_date_MMDD
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
