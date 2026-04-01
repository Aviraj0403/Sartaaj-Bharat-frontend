import { useQuery } from "@tanstack/react-query";
import { getMenuCategories } from "../services/categoryApi";

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getMenuCategories,
    staleTime: 60 * 60 * 1000, // Categories don't change often, keep cached for 1 hour
    gcTime: 24 * 60 * 60 * 1000, // Keep in memory for 24 hours
    refetchOnWindowFocus: false, // Prevents background fetch on tab switch
    refetchOnMount: false, // Don't refetch on component remount if not stale
    select: (data) => data || [],
  });
};
