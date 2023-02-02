export const CONTACT_US_SUBJECT = (props) => {
  let template = `Contact Us: ${props.companyName}, Start: ${props.startDate}, Services: ${props.services}`;

  return template;
};

export const TO_EMAIL = "callasteven@gmail.com";

// SENDGRID RECOMMENDS INCLUDING A TEXT VERSION AS A BACKUP IF HTML ISN'T ACCEPTED
export const contactus_text_template = (props) => {
  //NEEDS TO BE SPACED AS BELOW TO DISPLAY PROPERLY IN THE EMAIL
  const template = `
Company Name: ${props.companyName}
Email Address: ${props.email} 
Contact Name: ${props.contactName}
Phone Number: ${props.phone}
Address: ${props.address}, ${props.city}, ${props.state} ${props.zip}
Square Feet: ${props.squareFeet} 
Employee Number: ${props.employeeNumber} 
Start Date: ${props.startDate}
Services Needed: ${props.services}
Job Details: ${props.jobDetails}
`;

  return template;
};

// DEFAULT HTML TEMPLATE WILL BE USED BY MOST BUT NOT ALL PLATFORMS
export const contactus_html_template = (props) => {
  //NEEDS TO BE SPACED AS BELOW TO DISPLAY PROPERLY IN THE EMAIL
  const template = `
      <p>Company Name: ${props.companyName}</p>
      <p>Email Address: ${props.email}</p>
      <p>Contact Name: ${props.contactName}</p>
      <p>Phone Number: ${props.phone}</p>
      <p>Address: ${props.address}, ${props.city}, ${props.state} ${props.zip}</p>
      <p>Square Feet: ${props.squareFeet} </p>
      <p>Employee Number: ${props.employeeNumber} </p>
      <p>Start Date: ${props.startDate}</p>
      <p>Services Needed: ${props.services}</p>
      <p>Job Details: ${props.jobDetails}</p>`;

  return template;
};
