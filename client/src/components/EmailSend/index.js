import { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";

import { SEND_EMAIL } from "../../utils/queries";

import { TINY_URL_PATH, getTinyURL } from "../../utils/tinyURL";
import {
  reset_text_template,
  RESET_SUBJECT,
  FROM_EMAIL,
  reset_html_template,
} from "./templates/resetTemplate";

import "../../styles/Contact.css";

function useEmailSend(props) {
  console.log("useEmail hook,props = ", props);

  // SECTION get tiny url
  const [tinyURI, setTinyURI] = useState("");


  // SECTION SET EMAIL CONTENT
  // const toEmail = props.toEmail ? "callasteven@gmail.com" : "";
  const toEmail = "callasteven@gmail.com";
  const fromEmail = FROM_EMAIL;
  const subject = props.source === "resetPassword" ? RESET_SUBJECT : "TBD";
  const textContent =
    props.source === "resetPassword"
      ? reset_text_template(tinyURI, props.firstName)
      : "TBD";
  const htmlContent =
    props.source === "resetPassword"
      ? reset_html_template(tinyURI, props.firstName)
      : "TBD";

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
