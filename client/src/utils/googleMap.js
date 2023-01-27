const googleMap = (address, city, state, zip) => {
    let  google = `https://www.google.com/maps/dir/?api=1&destination=${address},${city},${state},${zip}&travelmode=driving`
    return google;
  };
  
 
  
  module.exports = googleMap;