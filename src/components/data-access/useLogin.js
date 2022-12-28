import axios from "axios";
import { useMutation } from "react-query";

const CLIENT_ID = "b83f71f2f54f4e50966d6c1fd1e1606a";
const CLIENT_SECRET = "eded630d7c4e4b13b48e16acc5048f9d";

const doLogin = () => {
  const authParameters = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`,
  };

  const data = axios.post(
    "https://accounts.spotify.com/api/token",
    authParameters
  );
  return data;
};

export const useLogin = () => {
  return useMutation(doLogin);
};
