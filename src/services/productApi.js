import Axios from '../utils/Axios';

/**
 * Fetch products by category slug
 * Backend: GET /v1/api/products?category=:slug
 */
export const getProductsByCategorySlug = async (slug, page = 1, limit = 100) => {
  try {
    const response = await Axios.get('/products', {
      params: { category: slug, page, limit },
    });

    if (response.data && response.data.success) {
      return {
        ...response.data,
        products: response.data.data || [],
        pagination: response.data.meta || {}
      };
    } else {
      throw new Error('Failed to fetch products');
    }
  } catch (error) {
    console.error('Error fetching products by category slug:', error);
    return { success: false, products: [], pagination: {} };
  }
};

/**
 * Fetch products by category and sub-category slug
 * Backend: GET /v1/api/products?category=:categorySlug&subCategory=:subCategorySlug
 */
export const getProductsByCategoryAndSubCategorySlug = async (categorySlug, subCategorySlug, page = 1, limit = 20) => {
  try {
    const response = await Axios.get('/products', {
      params: { category: categorySlug, subCategory: subCategorySlug, page, limit },
    });
    if (response.data && response.data.success) {
      return {
        ...response.data,
        products: response.data.data || [],
        pagination: response.data.meta || {}
      };
    } else {
      throw new Error('Failed to fetch products');
    }
  } catch (error) {
    console.error('Error fetching products by category and sub-category slug:', error);
    return { success: false, products: [], pagination: {} };
  }
};

/**
 * Fetch products with filters (mimicking the previous getminiversion)
 * Backend: GET /v1/api/products with search, category, isFeatured, etc.
 */
export const getMiniProducts = async (
  page = 1,
  limit = 100,
  search = '',
  category = '',
  isHotProduct = '',
  isBestseller = '',
  isFeatured = '',
  isCombo = ''
) => {
  try {
    const params = { page, limit, search, category };
    if (isHotProduct !== '') params.isHotProduct = isHotProduct;
    if (isBestseller !== '') params.isBestseller = isBestseller;
    if (isFeatured !== '') params.isFeatured = isFeatured;
    if (isCombo !== '') params.isCombo = isCombo;

    const response = await Axios.get('/products', { params });

    if (response.data && response.data.success) {
      return {
        ...response.data,
        products: response.data.data || [],
        pagination: response.data.meta || {}
      };
    } else {
      throw new Error('Failed to fetch mini products');
    }
  } catch (error) {
    console.error('Error fetching mini products:', error);
    return { success: false, products: [], pagination: {} };
  }
};

/**
 * Fetch single product by slug
 * Backend: GET /v1/api/products/slug/:slug
 */
export const getProductBySlug = async (slug) => {
  try {
    const response = await Axios.get(`/products/slug/${slug}`);

    if (response.data && response.data.success) {
      return response.data.data || response.data.product || response.data;
    } else {
      throw new Error('Failed to fetch product');
    }
  } catch (error) {
    console.error('Error fetching product by slug:', error);
    return { success: false, product: null };
  }
};

