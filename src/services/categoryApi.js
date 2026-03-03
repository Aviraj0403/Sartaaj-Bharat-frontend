import Axios from '../utils/Axios';

/**
 * Fetch categories for the menu
 * Backend: GET /v1/api/categories/tree
 */
export const getMenuCategories = async () => {
  try {
    const response = await Axios.get('/categories/tree');
    if (response.data.success) {
      return response.data.data || response.data.categories || [];
    } else {
      throw new Error('Failed to fetch categories');
    }
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};

/**
 * Fetch search suggestions
 * Backend: GET /v1/api/products/search with query
 */
export const getSearchSuggestions = async (query) => {
  try {
    const response = await Axios.get(`/products/search`, {
      params: { q: query },
    });
    if (response.data.success) {
      return response.data.products; // Adjusted from suggestions to products based on common patterns
    } else {
      throw new Error('Failed to fetch search suggestions');
    }
  } catch (error) {
    console.error('Error fetching search suggestions:', error);
    return [];
  }
};
