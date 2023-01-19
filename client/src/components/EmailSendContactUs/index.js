import { gql, useLazyQuery} from "@apollo/client";
import { useState, useEffect } from "react";
import "../../styles/Contact.css";

import { SEND_EMAIL_CONTACT_US } from "../../utils/queries";

// section start email
function useEmailSendContactUs(props) { 
  // const [ message, setMessage] = useState("");
  // console.log('useEmail hook,props = ', props);

  // eslint-disable-next-line
  const [sendEmailContactUs, { loading: emailLoad, error: emailError, data: emailData },
  ] = useLazyQuery(SEND_EMAIL_CONTACT_US, {
    variables: { 
      companyName: props.companyName,
      contactName: props.contactName,
      phoneNumber: props.phoneNumber,
      emailAddress: props.emailAddress,
      address: props.address,
      city: props.city,
      state: props.state,
      zip: props.zip,
      squareFeet: props.squareFeet,
      employeeNumber: props.employeeNumber,
      startDate: props.startDate,
      jobDetails: props.jobDetails,
      services: props.services,
    },
    fetchPolicy: 'cache-and-network', // ensure the query executes after each click
  });

  useEffect(() => {
    if ( props.companyName ) {
      // console.log('props passed');

      sendEmailContactUs();

      if (emailError) {
        console.log(`Error! ${emailError}`);
        alert`Error! ${emailError}`;
      }
    }
    // eslint-disable-next-line
  }, [props])


  return;
}

export default useEmailSendContactUs;