import { useQuery } from "react-query";
import { apiClient } from "../../utils/api-client";

const fetchArtistDetails = async (id) => await apiClient.get(`/artists/${id}`);

export const useGetArtistDetails = (id) => {
  return useQuery(["artist"], () => fetchArtistDetails(id));
};
