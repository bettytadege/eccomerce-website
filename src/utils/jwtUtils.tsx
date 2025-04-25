/* eslint-disable @typescript-eslint/no-explicit-any */

import { jwtDecode } from "jwt-decode";

//define decoded toekn type
type DecodedToken = {
  id: string;
  [key: string]: any;
};

// Define the return type
type DecodeResult = {
  userId: string | null;
  isValid: boolean;
};

export const decodeJWT = (token: string): DecodeResult => {
  try {
    // console.log(token);

    if (!token) {
      return { userId: null, isValid: false };
    }

    const decoded = jwtDecode<DecodedToken>(token);
    const userId = decoded.id;
    //return userid
    return { userId, isValid: true };

  } catch (error) {
    console.error("Error decoding JWT:", error);
    //return user id null if there is an error
    return { userId: null, isValid: false };
  }
};
