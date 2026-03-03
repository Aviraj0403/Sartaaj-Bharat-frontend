import Axios from '../utils/Axios';

/**
 * Fetch user's wishlist
 * Backend: GET /v1/api/wishlist
 */
export const getWishlist = async () => {
    try {
        const response = await Axios.get('/wishlist');
        return response.data;
    } catch (error) {
        console.error('Error fetching wishlist:', error);
        return { success: false, items: [] };
    }
};

/**
 * Add product to wishlist
 * Backend: POST /v1/api/wishlist
 */
export const addToWishlist = async (productId) => {
    try {
        const response = await Axios.post('/wishlist', { productId });
        return response.data;
    } catch (error) {
        console.error('Error adding to wishlist:', error);
        return { success: false, message: 'Failed to add to wishlist' };
    }
};

/**
 * Remove product from wishlist
 * Backend: DELETE /v1/api/wishlist/:productId
 */
export const removeFromWishlist = async (productId) => {
    try {
        const response = await Axios.delete(`/wishlist/${productId}`);
        return response.data;
    } catch (error) {
        console.error('Error removing from wishlist:', error);
        return { success: false, message: 'Failed to remove from wishlist' };
    }
};

/**
 * Check if product is in wishlist
 * Backend: GET /v1/api/wishlist/check/:productId
 */
export const checkInWishlist = async (productId) => {
    try {
        const response = await Axios.get(`/wishlist/check/${productId}`);
        return response.data;
    } catch (error) {
        console.error('Error checking wishlist status:', error);
        return { success: false, inWishlist: false };
    }
};

/**
 * Clear wishlist
 * Backend: DELETE /v1/api/wishlist
 */
export const clearWishlist = async () => {
    try {
        const response = await Axios.delete('/wishlist');
        return response.data;
    } catch (error) {
        console.error('Error clearing wishlist:', error);
        return { success: false, message: 'Failed to clear wishlist' };
    }
};
