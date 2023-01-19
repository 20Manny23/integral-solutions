export const RESET_SUBJECT = "Integral Solutions Employee Password Reset";

export const FROM_EMAIL = "callasteven@gmail.com";

// SENDGRID RECOMMENDS INCLUDING A TEXT VERSION AS A BACKUP IF HTML ISN'T ACCEPTED
export const reset_text_template = (tokenURL, firstName) => {
  
  const template = `Hello ${firstName},
  
  Click on the link below to create a new password:
  
  ${tokenURL}
  
  This link will expire 15 minutes from the receipt of this email.
  
  Thank you,
  Integral Solutions`;
  
  return (template);
};

// DEFAULT HTML TEMPLATE WILL BE USED BY MOST BUT NOT ALL PLATFORMS
export const reset_html_template = (tokenURL, firstName) => {
  
  const template = `<p>Hello ${firstName},</p>
  
  <p>Click on the link below to create a new password:</p>

  <p>
    <a style="background-color: #1a73e8; padding: 10px 20px; color: white; text-decoration:none;font-size:14px; font-family:Roboto,sans-serif;border-radius:5px" href=${tokenURL}
    >
      Click Here
    </a>
  </p>
  
  <p>This link will expire 15 minutes from the receipt of this email.</p>

  
  <p>Thank you,</p>
  <p>Integral Solutions</p>`;
  
  return (template);
};