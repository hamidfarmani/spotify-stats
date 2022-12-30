import { useQuery } from "react-query";
import { apiClient } from "../../utils/api-client";

const fetchProfile = () => apiClient.get(`/me`);

export const useGetProfile = () => {
  return useQuery(["profile"], fetchProfile);
};
