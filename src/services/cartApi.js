import Axios from '../utils/Axios';

/**
 * Get user's cart
 * Backend: GET /v1/api/cart
 */
export const getUserCart = () => {
  return Axios.get('/cart');
};

/**
 * Add item to cart
 * Backend: POST /v1/api/cart/items
 */
export const addToCart = (payload) => {
  return Axios.post('/cart/items', payload);
};

/**
 * Update cart item quantity
 * Backend: PUT /v1/api/cart/items/:itemId
 */
export const updateCartItem = (itemId, quantity) => {
  return Axios.put(`/cart/items/${itemId}`, { quantity });
};

/**
 * Remove item from cart
 * Backend: DELETE /v1/api/cart/items/:itemId
 */
export const removeCartItem = (itemId) => {
  return Axios.delete(`/cart/items/${itemId}`);
};

/**
 * Clear entire cart
 * Backend: DELETE /v1/api/cart
 */
export const clearCart = () => {
  return Axios.delete('/cart');
};

/**
 * Get cart summary
 * Backend: GET /v1/api/cart/summary
 */
export const getCartSummary = () => {
  return Axios.get('/cart/summary');
};
