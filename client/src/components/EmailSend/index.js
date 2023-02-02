import { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";

import { SEND_EMAIL } from "../../utils/queries";
import { getTinyURL, createURL } from "../../utils/tinyURL";

import {
  FROM_EMAIL,
  RESET_SUBJECT,
  reset_text_template,
  reset_html_template,
} from "./templates/resetTemplate";

import {
  CONTACT_US_SUBJECT,
  contactus_text_template,
  contactus_html_template,
} from "./templates/contactUsTemplate";
import "../../styles/Contact.css";

function useEmailSend(props) {
  const [tinyURI, setTinyURI] = useState("");

  const tiny_url = async () => {
    getTinyURL(props.token)
      .then((data) => {setTinyURI(data.data.tiny_url)})
  };
  
  // SECTION SET EMAIL CONTENT
  const toEmail =
    props?.source === "resetPassword"
      ? props?.toEmail
      : "callasteven@gmail.com";
  const fromEmail = FROM_EMAIL;
  const subject =
    props?.source === "resetPassword"
      ? RESET_SUBJECT(props)
      : CONTACT_US_SUBJECT(props);
  const textContent =
    props?.source === "resetPassword"
      ? reset_text_template(props, tinyURI, createURL(props.token))
      : contactus_text_template(props, tinyURI, createURL(props.token));
  const htmlContent =
    props?.source === "resetPassword"
      ? reset_html_template(props, tinyURI, createURL(props.token))
      : contactus_html_template(props, tinyURI, createURL(props.token));

  // SECTION SEND EMAIL VIA LAZY QUERY
  const [
    sendEmail,
    // eslint-disable-next-line
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

    if (props?.token?.token || props?.companyName) {
      // get tiny url
      // tiny_url();
      tiny_url();

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
