import { useQuery } from "@tanstack/react-query";
import {
  getMiniProducts,
  getProductBySlug,
  getRecommendations,
} from "../services/productApi";

// ─── Stable serializer ──────────────────────────────────────────────────────
// Omit undefined / empty values from query key so cache is shared correctly
const stableKey = (params = {}) =>
  Object.fromEntries(
    Object.entries(params).filter(
      ([, v]) => v !== undefined && v !== "" && v !== null,
    ),
  );

// ─── Products list ──────────────────────────────────────────────────────────
export const useProducts = (params = {}) => {
  const key = stableKey(params);
  return useQuery({
    queryKey: ["products", key],
    queryFn: () =>
      getMiniProducts(
        params.page || 1,
        params.limit || 10,
        params.search || "",
        params.category || "",
        params.isHotProduct || "",
        params.isBestseller || "",
        params.isFeatured || "",
        params.isCombo || "",
        params,
      ),
    staleTime: 1 * 60 * 1000, // 1 min — sync faster with admin updates
    gcTime: 2 * 60 * 1000, // 2 min before GC
    placeholderData: (prev) => prev, // replaces deprecated keepPreviousData
  });
};

// ─── Single product ─────────────────────────────────────────────────────────
export const useProductDetail = (slug) => {
  return useQuery({
    queryKey: ["product", slug],
    queryFn: () => getProductBySlug(slug),
    enabled: !!slug,
    staleTime: 1 * 60 * 1000,
    gcTime: 2 * 60 * 1000,
  });
};

// ─── Recommendations ────────────────────────────────────────────────────────
export const useRecommendations = (productId, limit = 4) => {
  return useQuery({
    queryKey: ["recommendations", productId, limit],
    queryFn: () => getRecommendations(productId, limit),
    enabled: !!productId,
    staleTime: 1 * 60 * 1000,
    gcTime: 2 * 60 * 1000,
  });
};
