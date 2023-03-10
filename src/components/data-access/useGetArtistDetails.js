import { useQuery } from "react-query";
import { apiClient } from "../../utils/api-client";

const fetchArtistDetails = (id) => apiClient.get(`/artists/${id}`);

export const useGetArtistDetails = (id) => {
  return useQuery(["artist"], () => fetchArtistDetails(id));
};
