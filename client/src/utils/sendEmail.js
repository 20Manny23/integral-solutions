import { gql, useLazyQuery } from "@apollo/client";
import SEND_EMAIL from './queries';

// variables = email address, token... 
const SendEmail = () => {
  console.log('email function');

    //section start email
    // eslint-disable-next-line
    const [sendEmail, { loading: emailLoad, error: emailError, data: emailData },
    ] = useLazyQuery(SEND_EMAIL, {
      variables: {},
      fetchPolicy: 'cache-and-network', // ensure the query executes after each click
      onCompleted: () => {console.log('complete')},
    });
    //section end email  
    
    //section start email return
    if (emailLoad) return "Email send did not error";
    if (emailError) return `Error! ${emailError}`;
    // console.log(loading, !loading);
    // !loading && console.log(data);
    // section end email

  return "hello";
};

module.exports = {
  SendEmail,
};