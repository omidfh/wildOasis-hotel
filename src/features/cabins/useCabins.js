import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";

export function useCabins() {
  const {
    isLoading,
    data: cabins,
    error,
  } = useQuery({
    //query key hatman bayad array bashe
    queryKey: ["cabins"],
    //query function hatman bayad Promis return kone
    queryFn: getCabins,
  });
  return { isLoading, cabins, error };
}
