import { gql, useLazyQuery} from "@apollo/client";
import { useState, useEffect } from "react";
import "../../styles/Contact.css";

import {
  SEND_EMAIL,
} from "../../utils/queries";

// section start email
function useEmailSendContactUs(props) { 

  // eslint-disable-next-line
  const [sendEmail, { loading: emailLoad, error: emailError, data: emailData },
  ] = useLazyQuery(SEND_EMAIL, {
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
    onCompleted: () => {
      console.log('lazyQuery data = ', emailData)
      console.log('complete')
    },
  });

  useEffect(() => {
    console.log(props.companyName, props.companyName === null)

    if ( props.companyName ) {
      sendEmail();
    }
    // eslint-disable-next-line
  }, [props])
  
  if (emailLoad) return console.log('email load');
  if (emailError) return console.log(`Error! ${emailError}`);

  return;
}

export default useEmailSend;