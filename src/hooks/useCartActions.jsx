import { useDispatch, useSelector } from "react-redux";
import {
  addToCartThunk,
  removeFromCartThunk,
  updateCartItemThunk,
} from "../features/cart/cartThunks";
import {
  addItem,
  removeItem as removeLocalItem,
  updateItemQuantity,
} from "../features/cart/cartSlice";
import { useCallback, useState } from "react";
import debounce from "lodash.debounce";
import { useAuth } from "../context/AuthContext";

// Normalize food data to standardize the structure
const normalizeFood = (food) => {
  const id = food._id || food.id;  // Unified `id` field
  const name = food.name;
  const image = food.foodImages?.[0] || food.image || '/fallback.jpg';  // Handle missing image
  const description = food.description || food.desc || 'No description available';  // Handle missing description
  const variants = food.variants || food.products?.[0]?.variants || [];  // Handle different variant structures

  return { id, name, image, description, variants };
};

export const useCartActions = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const { user } = useAuth();
  const isAuthenticated = !!user;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getCartItem = (id, size) =>
    cartItems.find((item) => item.id === id && item.selectedVariant.size === size);

  const addOrUpdateItem = async (food, variant, quantity = 1) => {
    setLoading(true);
    setError(null);

    try {
      // Normalize the food item to handle different API structures
      const normalizedFood = normalizeFood(food);

      const existingItem = getCartItem(normalizedFood.id, variant.size);
      const newQuantity = (existingItem?.quantity || 0) + quantity;

      const itemPayload = {
        id: normalizedFood.id,
        name: normalizedFood.name,
        image: normalizedFood.image,
        description: normalizedFood.description,
        selectedVariant: {
          size: variant.size,
          price: variant.price,
          priceAfterDiscount: variant.priceAfterDiscount,
        },
        quantity,
      };

      // Dispatch to Redux store for local cart management
      dispatch(addItem(itemPayload));

      // Handle API cart actions for authenticated users
      if (isAuthenticated) {
        await dispatch(addToCartThunk(itemPayload)).unwrap();
      }

      return { success: true, newQuantity };
    } catch (err) {
      console.error("Error adding item:", err);
      setError("Failed to add item to cart.");
      if (!isAuthenticated) {
        dispatch(removeLocalItem({ id: normalizedFood.id, size: variant.size }));
      }
      return { success: false, error: err.message || err };
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (id, variant, quantity) => {
    if (quantity < 1) return;
    setLoading(true);
    setError(null);

    try {
      if (isAuthenticated) {
        await dispatch(updateCartItemThunk({ id, size: variant.size, quantity })).unwrap();
      } else {
        dispatch(updateItemQuantity({ id, size: variant.size, quantity }));
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const debouncedUpdateQuantity = useCallback(
    debounce((id, variant, qty) => {
      if (qty >= 1) updateQuantity(id, variant, qty);
    }, 400),
    [dispatch, isAuthenticated]
  );

  const removeItem = async (id, variant) => {
    setLoading(true);
    try {
      if (isAuthenticated) {
        await dispatch(removeFromCartThunk({ id, size: variant.size })).unwrap();
      } else {
        dispatch(removeLocalItem({ id, size: variant.size }));
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    cartItems,
    addOrUpdateItem,
    updateQuantity,
    debouncedUpdateQuantity,
    removeItem,
  };
};
