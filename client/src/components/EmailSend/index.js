import { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";

import { SEND_EMAIL } from "../../utils/queries";
import { getTinyURL } from "../../utils/tinyURL";

import {
  FROM_EMAIL,
  RESET_SUBJECT,
  reset_text_template,
  reset_html_template,
} from "./templates/resetTemplate";

import {
  FROM_EMAIL,
  CONTACT_US_SUBJECT,
  contactus_text_template,
  contactus_html_template,
} from "./templates/contactUsTemplate";
import "../../styles/Contact.css";

function useEmailSend(props) {

  console.log("useEmail hook,props = ", props);

  // SECTION get tiny url
  const [tinyURI, setTinyURI] = useState("");


  // SECTION SET EMAIL CONTENT
  const toEmail = props?.source === "resetPassword" ? "callasteven@gmail.com" : "callasteven@gmail.com"; //fix reset password should use props.toEmail;
  const fromEmail = FROM_EMAIL;
  const subject = props?.source === "resetPassword" ? RESET_SUBJECT : CONTACT_US_SUBJECT;
  const textContent =
    props?.source === "resetPassword"
    // ? reset_text_template(tinyURI, props.firstName)
    ? reset_text_template(props)
      : contactus_text_template(props);
  const htmlContent =
    props?.source === "resetPassword"
    // ? reset_html_template(tinyURI, props.firstName)
    ? reset_html_template(props)
      : contactus_html_template(props);

  // SECTION TO SEND EMAIL VIA LAZY QUERY
  // eslint-disable-next-line
  const [
    sendEmail,
    { loading: emailLoad, error: emailError, data: emailData },
  ] = useLazyQuery(SEND_EMAIL, {
    variables: {
      toEmail: toEmail,
      fromEmail: fromEmail,
      subject: subject,
      textContent: textContent,
      htmlContent: htmlContent,
    },
    fetchPolicy: "cache-and-network", // ensure the query executes after each click
  });

  // SECTION USE EFFECT TO RUN SENDEMAIL IF TOKEN IS POPULATED (since this hook will run on every render for this component)
  useEffect(() => {
    console.log('use effect = ', props, props.token, !props.token, Object.keys(props).length !== 0  )

    if (props.token || Object.keys(props).length !== 0) {
      // get tiny url
      getTinyURL(props.token).then((data) => {
        setTinyURI(data.data.tiny_url);
      });
      console.log("tokenURL = ", tinyURI);

      // console.log('props passed');

      // send email
      sendEmail();

      if (emailError) {
        console.log(`Error! ${emailError}`);
        alert`Error! ${emailError}`;
      }
    }
    // eslint-disable-next-line
  }, [props]);

  return;
}

export default useEmailSend;
