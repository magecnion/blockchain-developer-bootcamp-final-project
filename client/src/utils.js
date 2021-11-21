import { AES } from "crypto-js";
import Base64 from "crypto-js/enc-base64";
import Utf8 from "crypto-js/enc-utf8";

export const encrypt = (content, key) => {
  const content64 = Base64.stringify(Utf8.parse(content));
  return AES.encrypt(content64, key).toString();
};

export const decrypt = (content, key) => {
  const contentDec = AES.decrypt(content, key);
  const contentUtf8 = Utf8.stringify(contentDec);
  const content64 = Base64.parse(contentUtf8.toString());
  return Utf8.stringify(content64);
};
