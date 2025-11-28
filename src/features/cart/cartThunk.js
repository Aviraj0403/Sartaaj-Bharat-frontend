// src/features/cart/cartThunks.js

import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getUserCart,
  addToCart,
  updateCartItem,
  removeCartItem,
  clearCart as clearCartApi,
} from "../../services/cartApi";

import { setCart, mergeCart, clearCart } from "./cartSlice";

// ⭐ 1. LOGIN → guest cart merge with backend
export const syncCartOnLogin = createAsyncThunk(
  "cart/syncOnLogin",
  async (_, { dispatch, getState }) => {
    const localCart = getState().cart.items;

    // STEP 1 → Fetch backend cart
    const backend = await getUserCart();
    const backendItems = backend.data.cartItems;

    if (localCart.length === 0) {
      dispatch(setCart({ items: backendItems }));
      return;
    }

    // STEP 2 → Push local guest items → backend
    for (const item of localCart) {
      await addToCart({
        productId: item.id,
        size: item.size,
        quantity: item.quantity,
      });
    }

    // STEP 3 → Fetch updated backend cart
    const finalCart = await getUserCart();

    // STEP 4 → Merge backend + local
    dispatch(
      mergeCart({
        items: finalCart.data.cartItems,
      })
    );
  }
);

// ⭐ 2. GET backend cart (page refresh)
export const fetchBackendCart = createAsyncThunk(
  "cart/fetchBackendCart",
  async (_, { dispatch }) => {
    const res = await getUserCart();
    dispatch(setCart({ items: res.data.cartItems }));
  }
);

// ⭐ 3. BACKEND add item (NO optimistic)
export const addItemToCart = createAsyncThunk(
  "cart/addItem",
  async ({ productId, size, quantity }, { dispatch }) => {
    await addToCart({ productId, size, quantity });

    const updated = await getUserCart();
    dispatch(setCart({ items: updated.data.cartItems }));
  }
);

// ⭐ 4. Update quantity
export const updateItemQty = createAsyncThunk(
  "cart/updateQty",
  async ({ productId, size, quantity }, { dispatch }) => {
    await updateCartItem({ productId, size, quantity });

    const updated = await getUserCart();
    dispatch(setCart({ items: updated.data.cartItems }));
  }
);

// ⭐ 5. Remove item
export const removeItemFromCart = createAsyncThunk(
  "cart/removeItem",
  async ({ productId, size }, { dispatch }) => {
    await removeCartItem({ productId, size });

    const updated = await getUserCart();
    dispatch(setCart({ items: updated.data.cartItems }));
  }
);

// ⭐ 6. CLEAR cart
export const clearEntireCart = createAsyncThunk(
  "cart/clear",
  async (_, { dispatch }) => {
    await clearCartApi();
    dispatch(clearCart());
  }
);
