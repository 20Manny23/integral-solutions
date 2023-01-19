import { useLazyQuery } from "@apollo/client";
import { useEffect } from "react";
import "../../styles/Contact.css";

import { SEND_EMAIL } from "../../utils/queries";
import {
  reset_text_template,
  RESET_SUBJECT,
  FROM_EMAIL,
  reset_html_template,
} from "./templates/resetTemplate";

import { getTinyURL } from "../../utils/tinyURL";

// section start email
function useEmailSend(props) {
  console.log("useEmail hook,props = ", props);

  let tokenURL = getTinyURL(props.token);
  console.log('tokenURL = ', tokenURL);

  // const toEmail = props.toEmail ? "callasteven@gmail.com" : "";
  const toEmail = "callasteven@gmail.com";
  const fromEmail = FROM_EMAIL;
  const subject = props.source === "resetPassword" ? RESET_SUBJECT : "TBD";
  const textContent =
    props.source === "resetPassword"
      ? reset_text_template(props.tokenURL, props.firstName)
      : "TBD";
  const htmlContent =
    props.source === "resetPassword"
      ? reset_html_template(props.tokenURL, props.firstName)
      : "TBD";

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

  useEffect(() => {
    // console.log('use effect = ', props, props.token )
    if (props.token) {
      // console.log('props passed');
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
