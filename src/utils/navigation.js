/**
 * Helper to generate a standardized product URL.
 * Prioritizes slug mapping, falling back securely to ID-based dynamic lookup.
 * @param {Object} product - Product or cart item object structure
 * @returns {String} Standardized URL
 */
export const getProductUrl = (product) => {
  if (!product) return "/";

  // If a raw string is passed, guess it's already an ID or slug
  if (typeof product === "string") return `/product/${product}`;

  // Standard prioritization:
  // 1. Valid database slug mapping
  // 2. Direct backend database mapped id
  // 3. Fallback to generic unnormalized identifier parameter
  const identifier = product.slug || product.backendId || product._id || product.id;

  return `/product/${identifier}`;
};
