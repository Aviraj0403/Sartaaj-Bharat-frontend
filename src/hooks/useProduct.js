import { useQuery } from "@tanstack/react-query";
import { getProductBySlug } from "../services/productApi";

export const useProduct = (slug) => {
  return useQuery({
    queryKey: ["product", slug],
    queryFn: () => getProductBySlug(slug),
    staleTime: 10 * 60 * 1000, // 10 minutes cache
    gcTime: 30 * 60 * 1000, // 30 mins garbage collection
    refetchOnWindowFocus: false, // Prevent app-switch refetching
    enabled: !!slug,
    select: (data) => {
      const productData = data?.data || data?.product || data;
      return productData || null;
    },
  });
};
