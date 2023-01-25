let format = "";
let phoneFormat = [];
let maskedPhone = "";

export const maskedPhoneInput = (rawPhone) => {
    format = rawPhone.replace(/-/g, ""); //remove "-" globally in rawPhone string input
    phoneFormat = format.split(""); //split to an array

    console.log('format = ', format)
    console.log('phone format = ', phoneFormat)

    if (rawPhone.length >= 3 && rawPhone.length < 7) {
      phoneFormat.splice(3, 0, '-'); //add hypen at index 3

    } else if (rawPhone.length >= 7) {
      phoneFormat.splice(3, 0, '-'); //add hypen at index 3
      phoneFormat.splice(7, 0, '-'); //add hypen at index 7
    }

  maskedPhone = phoneFormat.join(''); //convert phoneFormat array to string
  console.log('masked = ', maskedPhone)
  return maskedPhone;
};