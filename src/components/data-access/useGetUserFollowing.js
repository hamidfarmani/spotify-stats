import { useQuery } from "react-query";
import { apiClient } from "../../utils/api-client";

const fetchUserFollowing = () => apiClient.get(`/me/following?type=artist`);

export const useGetUserFollowing = () => {
  return useQuery(["following"], fetchUserFollowing);
};
