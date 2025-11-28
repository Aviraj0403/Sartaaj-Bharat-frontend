import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import debounce from "lodash.debounce";

import {
  addItemToCart,
  updateItemQty,
  removeItemFromCart,
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

  const findCartItem = (productId, size) =>
    cartItems.find((i) => i.id === productId && i.size === size);

  // ⭐ ADD TO CART
  const addToCart = async (product, size, quantity = 1) => {
    try {
      const existingItem = findCartItem(product._id, size);
      const newQty = (existingItem?.quantity || 0) + quantity;

      dispatch(
        addItem({
          id: product._id,
          name: product.name,
          image: product.pimage,
          size,
          price: product.variants?.price || 0,
          quantity: 1,
        })
      );

      if (isAuthenticated) {
        await dispatch(
          addItemToCart({
            productId: product._id,
            size,
            quantity: newQty,
          })
        ).unwrap();
      }

      return { success: true, newQuantity: newQty };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  // ⭐ UPDATE QTY
  const updateQuantity = async (productId, size, quantity) => {
    if (quantity < 1) return;

    dispatch(updateItemQuantity({ id: productId, size, quantity }));

    if (isAuthenticated) {
      await dispatch(updateItemQty({ productId, size, quantity })).unwrap();
    }
  };

  const updateQuantityDebounced = useCallback(
    debounce((productId, size, qty) => updateQuantity(productId, size, qty), 500),
    []
  );

  // ⭐ REMOVE ITEM
  const removeFromCart = async (productId, size) => {
    dispatch(removeItem({ id: productId, size }));

    if (isAuthenticated) {
      await dispatch(removeItemFromCart({ productId, size })).unwrap();
    }
  };

  // ⭐ CLEAR CART
  const clearCart = () => {
    cartItems.forEach((item) => dispatch(removeItem({ id: item.id, size: item.size })));
  };

  // ⭐ CALCULATE TOTALS
  const totalAmount = cartItems.reduce(
    (acc, item) => acc + (item.price || 0) * (item.quantity || 0),
    0
  );

  const totalItems = cartItems.reduce((acc, item) => acc + (item.quantity || 0), 0);

  return {
    cartItems,
    addToCart,
    updateQuantity,
    updateQuantityDebounced,
    removeFromCart,
    clearCart,
    totalAmount,   // ✅ Add this
    totalItems,    // ✅ Optional, for total item count
  };
};
