import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUserCart, addToCart, updateCartItem, removeCartItem, clearCart as clearCartApi } from "../../services/cartApi";
import { setCart, mergeCart, clearCart } from "./cartSlice";

// Sync cart after login (Only push missing guest items to the backend)
export const syncCartOnLogin = createAsyncThunk(
  "cart/syncOnLogin",
  async (_, { dispatch, getState }) => {
    const localCart = getState().cart.items;

    try {
      // STEP 1: Fetch backend cart
      const backend = await getUserCart();
      const backendItems = backend.data.cartItems;

      if (localCart.length === 0) {
        dispatch(setCart({ items: backendItems }));
        return;
      }

      // STEP 2: Push local items to backend (only missing ones)
      const promises = [];
      for (const item of localCart) {
        const { id: productId, size, color, quantity } = item;  // Extract color here

        const exists = backendItems.find(
          (i) => i.id === productId && i.size === size && i.color === color  // Compare with color as well
        );

        if (!exists) {
          // Push missing item to backend with color
          promises.push(
            addToCart({
              productId,
              size,
              color,
              quantity: item.quantity,
            })
          );
        }
      }

      // Wait for all missing items to be added to the backend
      await Promise.all(promises);

      // STEP 3: Fetch final cart from backend and merge
      const finalCart = await getUserCart();
      dispatch(mergeCart({ items: finalCart.data.cartItems }));
    } catch (err) {
      console.error("❌ Failed to sync cart on login:", err);
    }
  }
);


// Fetch backend cart (on refresh or token restore)
export const fetchBackendCart = createAsyncThunk(
  "cart/fetchBackendCart",
  async (_, { dispatch }) => {
    try {
      const response = await getUserCart();
      // console.log("Fetched Backend Cart:", response);
      dispatch(setCart({ items: response.data.cartItems }));
    } catch (err) {
      console.error("❌ Fetch backend cart error:", err);
    }
  }
);

// Add item to cart (backend sync after local update)
export const addToCartThunk = createAsyncThunk(
  "cart/addToCart",
  async ({ productId, size, color, quantity }, { dispatch }) => {
    try {
      // Backend update with color
      await addToCart({ productId, size, color, quantity });

      // Fetch updated cart from backend
      const updatedCart = await getUserCart();
      dispatch(setCart({ items: updatedCart.data.cartItems }));
    } catch (err) {
      console.error("❌ Add to cart failed:", err);
      throw err;
    }
  }
);


// Update item quantity in cart (sync with backend)
export const updateCartItemThunk = createAsyncThunk(
  "cart/updateCartItem",
  async ({ productId, size, color, quantity }, { dispatch }) => {
    try {
      await updateCartItem({ productId, size, color, quantity });

      // Fetch updated cart from backend
      const updatedCart = await getUserCart();
      dispatch(setCart({ items: updatedCart.data.cartItems }));
    } catch (err) {
      console.error("❌ Update cart item failed:", err);
      throw err;
    }
  }
);


// Remove item from backend and update Redux
export const removeFromCartThunk = createAsyncThunk(
  "cart/removeFromCart",
  async ({ productId, size, color }, { dispatch }) => {
    try {
      await removeCartItem({ productId, size, color });

      // Fetch updated cart from backend
      const updatedCart = await getUserCart();
      dispatch(setCart({ items: updatedCart.data.cartItems }));
    } catch (err) {
      console.error("❌ Remove from cart failed:", err);
    }
  }
);


// Clear the entire cart from both Redux and backend
export const clearCartThunk = createAsyncThunk(
  "cart/clearCart",
  async (_, { dispatch }) => {
    try {
      await clearCartApi();
      dispatch(clearCart());
    } catch (err) {
      console.error("❌ Clear cart failed:", err);
    }
  }
);

