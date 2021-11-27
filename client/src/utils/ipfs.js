import axios from "axios";
import { create } from "ipfs-http-client";

export const uploadJSONToIPFS = (JSONBody) => {
  return axios
    .post(process.env.REACT_APP_PINATA_URL + "pinJSONToIPFS", JSONBody, {
      headers: {
        pinata_api_key: process.env.REACT_APP_PINATA_API_KEY,
        pinata_secret_api_key: process.env.REACT_APP_PINATA_SECRET_API_KEY,
      },
    })
    .then(function (response) {
      return response.data.IpfsHash;
    })
    .catch(function (error) {
      console.log(error);
    });
};
export const uploadFileToIPFS = async (file) => {
  let data = new FormData();
  data.append("file", file);
  return axios
    .post(process.env.REACT_APP_PINATA_URL + "pinFileToIPFS", data, {
      headers: {
        "Content-Type": `multipart/form-data`,
        pinata_api_key: process.env.REACT_APP_PINATA_API_KEY,
        pinata_secret_api_key: process.env.REACT_APP_PINATA_SECRET_API_KEY,
      },
    })
    .then(function (response) {
      return response.data.IpfsHash;
    })
    .catch(function (error) {
      console.log(error);
    });
};

const client = create("https://ipfs.infura.io:5001/api/v0");
export const uploadTextToIPFS = async (text) => {
  const { path } = await client.add(text);
  const body = {
    hashToPin: path,
  };
  return axios
    .post(process.env.REACT_APP_PINATA_URL + "pinByHash", body, {
      headers: {
        pinata_api_key: process.env.REACT_APP_PINATA_API_KEY,
        pinata_secret_api_key: process.env.REACT_APP_PINATA_SECRET_API_KEY,
      },
    })
    .then(function (response) {
      return path;
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const retrieveFromIPFS = (uri) => {
  return axios
    .get(uri)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
};
