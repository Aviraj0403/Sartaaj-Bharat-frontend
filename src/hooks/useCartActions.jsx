// src/hooks/useCartActions.js
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useState } from "react";
import debounce from "lodash.debounce";

import {
  addItemToCart,
  updateItemQty,
  removeItemFromCart,
} from "../features/cart/cartThunk";
import { addItem, updateItemQuantity, removeItem } from "../features/cart/cartSlice";
import { useAuth } from "../context/AuthContext";

export const useCartActions = () => {
  const dispatch = useDispatch();
  const { items: cartItems, totalQuantity, totalAmount } = useSelector((state) => state.cart);
  const { user } = useAuth();
  const isAuthenticated = !!user;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Find item in cart by productId + size
  const findCartItem = (productId, size) => {
    return cartItems.find(
      (item) => item.id === productId && item.size === size
    );
  };

  // Add to Cart (Guest + Auth)
  const addToCart = async (productId, size, price, quantity = 1) => {
    setLoading(true);
    setError(null);

    try {
      const existingItem = findCartItem(productId, size);
      const newQty = (existingItem?.quantity || 0) + quantity;

      // Optimistic update (local state)
      dispatch(
        addItem({
          productId,
          name: existingItem?.name || "...", // name backend se aayega baad mein
          image: existingItem?.image || "",
          size,
          price,
          quantity,
        })
      );

      // Agar logged in hai → backend sync
      if (isAuthenticated) {
        await dispatch(
          addItemToCart({ productId, size, quantity })
        ).unwrap();
      }

      return { success: true, newQuantity: newQty };
    } catch (err) {
      setError(err.message || "Failed to add item");
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Update Quantity
  const updateQuantity = async (productId, size, quantity) => {
    if (quantity < 1) return;

    setLoading(true);
    setError(null);

    try {
      // Optimistic local update
      dispatch(updateItemQuantity({ id: productId, size, quantity }));

      if (isAuthenticated) {
        await dispatch(updateItemQty({ productId, size, quantity })).unwrap();
      }
    } catch (err) {
      setError("Failed to update quantity");
    } finally {
      setLoading(false);
    }
  };

  // Debounced version (for input field)
  const debouncedUpdate = useCallback(
    debounce((productId, size, qty) => {
      updateQuantity(productId, size, qty);
    }, 500),
    [isAuthenticated]
  );

  // Remove Item
  const removeFromCart = async (productId, size) => {
    setLoading(true);
    setError(null);

    try {
      // Optimistic remove
      dispatch(removeItem({ id: productId, size }));

      if (isAuthenticated) {
        await dispatch(removeItemFromCart({ productId, size })).unwrap();
      }
    } catch (err) {
      setError("Failed to remove item");
    } finally {
      setLoading(false);
    }
  };

  return {
    cartItems,
    totalQuantity,
    totalAmount,
    loading,
    error,

    addToCart,
    updateQuantity,
    updateQuantityDebounced: debouncedUpdate,
    removeFromCart,
    findCartItem,
  };
};