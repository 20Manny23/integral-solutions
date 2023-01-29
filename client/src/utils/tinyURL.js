// set tinyURL path
export const TINY_URL_PATH = `https://api.tinyurl.com/create?api_token=${process.env.REACT_APP_TINY_URL_KEY}`;

export const createURL = (token) => {
  // console.log(process.env.NODE_ENV);
  // console.log(process.env.REACT_APP_DEVELOPMENT_URL);
  // console.log(process.env.REACT_APP_TINY_URL_KEY);

  let uri =
    process.env.NODE_ENV === "development"
      ? `${process.env.REACT_APP_DEVELOPMENT_URL}/resetpassword/${token?.token}`
      : `${process.env.REACT_APP_PRODUCTION_URL}/resetpassword/${token?.token}`;

  // console.log('uri = ', uri);

  let encodedURI = encodeURI(uri);

  return {encodedURI, uri}; //fix was mising parathesis
};

// TINY URL API CALL
export const getTinyURL = async (token, data = {}) => {
  // console.log(token, TINY_URL_PATH, data);

  const encodedURI = createURL(token);

  console.log('encoded uri = ', encodedURI);

  const response = await fetch(TINY_URL_PATH, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify({
      url: encodedURI.encodedURI,
      domain: "tiny.one",
    }),
  });

  return response.json(); // parses JSON response into native JavaScript objects
};
