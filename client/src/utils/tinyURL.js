// set tinyURL path
export const TINY_URL_PATH = `https://api.tinyurl.com/create?api_token=${process.env.REACT_APP_TINY_URL_KEY}`;


// TINY URL API CALL
export const getTinyURL = async (token, data = {}) => {
  console.log(token, TINY_URL_PATH, data);

  const uri = `http://localhost:3000/resetpassword/${token?.token}`;
  console.log('uri = ', uri);
  let encodedURI = encodeURI(uri);

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
      url: encodedURI,
      domain: "tiny.one",
    }),
  });
  
  return response.json(); // parses JSON response into native JavaScript objects
};
