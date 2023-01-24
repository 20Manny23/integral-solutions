const phoneNumberFormatter = require("phone-number-formats");

const format_phone = (phone) => {
  let phoneFormatted = new phoneNumberFormatter(`3-${phone}`).format({
    type: "domestic",
  });
  return phoneFormatted.toString();
};

// console.log(phoneFormatted);

module.exports = format_phone;
