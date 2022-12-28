import { useQuery } from "react-query";
import { apiClient } from "../../utils/api-client";

const fetchUsersTopTracks = async () => await apiClient.get(`/me/top/tracks`);

export const useGetUsersTopTracks = () => {
  return useQuery(["usersTopTracks"], fetchUsersTopTracks);
};
