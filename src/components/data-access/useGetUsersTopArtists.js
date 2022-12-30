import { useQuery } from "react-query";
import { apiClient } from "../../utils/api-client";

const fetchUsersTopArtists = () => apiClient.get(`/me/top/artists`);

export const useGetUsersTopArtists = () => {
  return useQuery(["usersTopArtists"], fetchUsersTopArtists);
};
