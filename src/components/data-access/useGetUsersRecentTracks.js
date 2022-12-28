import { useQuery } from "react-query";
import { apiClient } from "../../utils/api-client";

const fetchUsersRecentTrackscks = async () =>
  await apiClient.get(`/me/player/recently-played`);

export const useGetUsersRecentTracks = () => {
  return useQuery(["usersRecentTracks"], fetchUsersRecentTrackscks);
};
