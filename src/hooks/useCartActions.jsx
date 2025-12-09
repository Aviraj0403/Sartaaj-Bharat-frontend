import { useDispatch, useSelector } from "react-redux";
import { useCallback, useState } from "react";
import debounce from "lodash.debounce";

import {
  syncCartOnLogin,
  addToCartThunk,
  updateCartItemThunk,
  removeFromCartThunk,
  clearCartThunk,
} from "../features/cart/cartThunk";

import {
  addItem,
  updateItemQuantity,
  removeItem,
} from "../features/cart/cartSlice";

import { useAuth } from "../context/AuthContext";

export const useCartActions = () => {
  const dispatch = useDispatch();
  const { items: cartItems } = useSelector((state) => state.cart);
  const { user } = useAuth();
  const isAuthenticated = !!user;

  // Local state to track loading and error
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // console.log(cartItems);
  // Function to find a specific item in the cart by product ID and size
  const findCartItem = (productId, size) =>
    cartItems.find((item) => item.id === productId && item.size === size);

  // Helper function to handle loading and error states
  const handleAction = async (actionCallback) => {
    setLoading(true);
    setError(null);
    try {
      const result = await actionCallback();
      return result;
    } catch (err) {
      setError(err.message || err);
      return { success: false, error: err.message || err };
    } finally {
      setLoading(false);
    }
  };
//  console.log("useCartActions - cartItems:", cartItems);
  // ⭐ Sync Cart after login (merge guest cart with backend cart)
  const syncCart = async () => {
    await handleAction(() => dispatch(syncCartOnLogin()).unwrap());
  };
// console.log("findCartItem:", findCartItem);
// ⭐ Add to Cart (Optimistic Update for Local Cart + Backend Sync)
const addToCart = async (product, size, color, quantity = 1) => {
  const existingItem = findCartItem(product._id, size, color); // Ensure color is being passed correctly
  const newQty = (existingItem?.quantity || 0) + quantity;

  // console.log('addToCart - color:', color); // Debug the color value being passed
  const addItemAction = async () => {
    // Optimistically update local cart
    dispatch(
      addItem({
        id: product._id,
        name: product.name,
        image: product.pimage,
        size,
        color,  // Include color in the payload
        price: product.variants?.price || 0,
        quantity: 1,
      })
    );

    // If authenticated, sync with backend
    if (isAuthenticated) {
      await dispatch(addToCartThunk({ productId: product._id, size, color, quantity: newQty })).unwrap();
    }

    return { success: true, newQuantity: newQty };
  };

  return handleAction(addItemAction);
};



// ⭐ Update Quantity in Cart (Optimistic Update for Local Cart + Backend Sync)
const updateQuantity = async (productId, size, color, quantity) => {
  if (quantity < 1) return;

  const updateQtyAction = async () => {
    // Optimistically update local cart
    dispatch(updateItemQuantity({ id: productId, size, color, quantity })); // Added color

    // If authenticated, sync with backend
    if (isAuthenticated) {
      await dispatch(updateCartItemThunk({ productId, size, color, quantity })).unwrap();
    }

    return { success: true };
  };

  return handleAction(updateQtyAction);
};


  // Debounced version of updateQuantity to reduce backend calls
  const updateQuantityDebounced = useCallback(
    debounce((productId, size, qty) => updateQuantity(productId, size, qty), 500),
    []
  );

// ⭐ Remove Item from Cart (Backend Sync)
const removeFromCart = async (productId, size, color) => {
  const removeItemAction = async () => {
    // Optimistically remove item from local cart
    dispatch(removeItem({ id: productId, size, color }));  // Added color

    // If authenticated, remove from backend
    if (isAuthenticated) {
      await dispatch(removeFromCartThunk({ productId, size, color })).unwrap();
    }

    return { success: true };
  };

  return handleAction(removeItemAction);
};


  // ⭐ Clear Cart (Backend Sync + Local)
  const clearCart = async () => {
    const clearAction = async () => {
      // Optimistically clear local cart
      cartItems.forEach((item) => dispatch(removeItem({ id: item.id, size: item.size })));

      // If authenticated, clear from backend
      if (isAuthenticated) {
        await dispatch(clearCartThunk()).unwrap();
      }

      return { success: true };
    };

    return handleAction(clearAction);
  };

  // ⭐ Calculate Cart Totals
  const totalAmount = cartItems.reduce(
    (acc, item) => acc + (item.price || 0) * (item.quantity || 0),
    0
  );

  const totalItems = cartItems.reduce(
    (acc, item) => acc + (item.quantity || 0),
    0
  );

  return {
    cartItems,
    syncCart,
    addToCart,
    updateQuantity,
    updateQuantityDebounced,
    removeFromCart,
    clearCart,
    totalAmount,
    totalItems,
    loading, // Provide loading state for UI feedback
    error,   // Provide error state for UI feedback
  };
};
