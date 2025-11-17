import Axios from '../utils/Axios';

// API call to fetch products by category slug
export const getProductsByCategorySlug = async (slug, page = 1, limit = 20) => {
  try {
    // Send GET request to the server to fetch products by category slug
    const response = await Axios.get(`/products/${slug}`, {
      params: { page, limit },
    });

    // Check if the response is successful
    if (response.data && response.data.success) {
      return response.data;
    } else {
      // If not successful, throw an error
      throw new Error('Failed to fetch products');
    }
  } catch (error) {
    // Log the error and provide fallback data
    console.error('Error fetching products by category slug:', error);
    return { success: false, products: [], pagination: {} };
  }
};
