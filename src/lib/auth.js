import { Base64 } from "js-base64";
import auth from "../auth";

export const basicAuthHeader = key => {
  const credentials = auth[key];

  if (credentials) {
    return {
      Authorization: `Basic ${Base64.encode(
        `${credentials.username}:${credentials.password}`
      )}`
    };
  }

  throw new Error(`No credentials found for ${key}.`);
};
