import axios from "axios";

export const uploadToIPFS = (JSONBody) => {
  return axios
    .post(process.env.REACT_APP_PINATA_PINNING_URL, JSONBody, {
      headers: {
        pinata_api_key: process.env.REACT_APP_PINATA_API_KEY,
        pinata_secret_api_key: process.env.REACT_APP_PINATA_SECRET_API_KEY,
      },
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const retrieveFromIPFS = (cid) => {
  return axios
    .get(process.env.REACT_APP_IFPS_GATEWAY + cid)
    .then(function (response) {
      return response.data.value;
    })
    .catch(function (error) {
      console.log(error);
    });
};
