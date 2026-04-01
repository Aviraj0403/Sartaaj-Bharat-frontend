import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  getMiniProducts,
  getProductBySlug,
  getRecommendations,
  searchProducts,
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
  // Stabilize params to prevent infinite re-renders if params is an inline object
  const memoParams = useMemo(() => {
    return Object.fromEntries(
      Object.entries(params).filter(
        ([, v]) => v !== undefined && v !== "" && v !== null,
      ),
    );
  }, [JSON.stringify(params)]);

  return useQuery({
    queryKey: ["products", memoParams],
    queryFn: () =>
      getMiniProducts(
        memoParams.page || 1,
        memoParams.limit || 10,
        memoParams.search || "",
        memoParams.category || "",
        memoParams.isHotProduct || "",
        memoParams.isBestseller || "",
        memoParams.isFeatured || "",
        memoParams.isCombo || "",
        memoParams,
      ),
    staleTime: 5 * 60 * 1000, 
    gcTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
    placeholderData: (prev) => prev, 
  });
};

// ─── Single product ─────────────────────────────────────────────────────────
export const useProductDetail = (slug) => {
  return useQuery({
    queryKey: ["product", slug],
    queryFn: () => getProductBySlug(slug),
    enabled: !!slug,
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};

// ─── Recommendations ────────────────────────────────────────────────────────
export const useRecommendations = (productId, limit = 4) => {
  return useQuery({
    queryKey: ["recommendations", productId, limit],
    queryFn: () => getRecommendations(productId, limit),
    enabled: !!productId,
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};
// ─── Search ──────────────────────────────────────────────────────────────────
export const useSearch = (query, page = 1, limit = 20) => {
  return useQuery({
    queryKey: ["search", query, page, limit],
    queryFn: () => searchProducts(query, page, limit),
    enabled: !!query && query.length > 0,
    staleTime: 5 * 60 * 1000,
    gcTime: 15 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};
