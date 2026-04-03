import { useQuery } from "@tanstack/react-query";
import { getProductBySlug, getProductById } from "../services/productApi";

export const useProduct = (slugOrId) => {
  return useQuery({
    queryKey: ["product", slugOrId],
    queryFn: () => {
      // Check if it's a 24-character hex MongoDB ObjectId
      if (/^[0-9a-fA-F]{24}$/.test(slugOrId)) {
        return getProductById(slugOrId);
      }
      return getProductBySlug(slugOrId);
    },
    staleTime: 10 * 60 * 1000, // 10 minutes cache
    gcTime: 30 * 60 * 1000, // 30 mins garbage collection
    refetchOnWindowFocus: false, // Prevent app-switch refetching
    enabled: !!slugOrId,
    select: (data) => {
      const productData = data?.data || data?.product || data;
      return productData || null;
    },
  });
};
