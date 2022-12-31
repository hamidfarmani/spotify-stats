import { useQuery } from "react-query";
import { apiClient } from "../../utils/api-client";

const fetchUsersTopTracks = (timeRange) =>
  apiClient.get(
    `/me/top/tracks?time_range=${timeRange ? timeRange : "medium_term"}`
  );

export const useGetUsersTopTracks = (timeRange) => {
  return useQuery(["usersTopTracks"], () => fetchUsersTopTracks(timeRange), {
    variables: { timeRange },
  });
};
