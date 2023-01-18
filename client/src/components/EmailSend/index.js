import { gql, useLazyQuery} from "@apollo/client";
import { useState, useEffect } from "react";
import "../../styles/Contact.css";
 
const SENDEMAIL = gql`
  query Query {
    sendEmail
  }
`;

// section start email
function useEmailSend({ submitInput }) { 

  console.log( submitInput )

  // eslint-disable-next-line
  const [sendEmail, { loading: emailLoad, error: emailError, data: emailData },
  ] = useLazyQuery(SENDEMAIL, {
    variables: {},
    fetchPolicy: 'cache-and-network', // ensure the query executes after each click
    onCompleted: () => {
      console.log(emailData)
      console.log('complete')
    },
  });

  useEffect(() => {
    console.log(submitInput)
    console.log(Object.keys(submitInput).length )

    if ( Object.keys(submitInput).length > 0 ) {
      sendEmail();
    }
    // eslint-disable-next-line
  }, [submitInput])
  

  //section end email  
  
  //section start email return
  if (emailLoad) return console.log('email load');
  if (emailError) return console.log(`Error! ${emailError}`);
  // console.log(loading, !loading);
  // !loading && console.log(data);
  // section end email

  return (
    <>
      {/* <button onClick={() => sendEmail()}>Send Email</button> */}
    </>
  );
}

export default useEmailSend;