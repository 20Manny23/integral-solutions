// set tinyURL path
let tinyUrlApiPath = `https://api.tinyurl.com/create?api_token=${process.env.REACT_APP_TINY_URL_KEY}`;


// TINY URL API CALL
export const getTinyURL = async (token, data = {}) => {
  console.log(token, tinyUrlApiPath, data);

  const uri = `http://localhost:3000/resetpassword/${token.token}`;
  console.log('uri = ', uri);
  let encodedURI = encodeURI(uri);

  const response = await fetch(tinyUrlApiPath, {
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
  // console.log('tinyurl response = ', response );
  return response.json(); // parses JSON response into native JavaScript objects
};
