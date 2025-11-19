// src/features/cart/cartThunks.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getUserCart,
  addToCart,
  updateCartItem,
  removeCartItem,
  clearCart as clearCartApi,
} from '../../services/cartApi'; // tumhara path

import {
  setCart,
  mergeCart,
  clearCart,
  addItem,
} from './cartSlice';

// Login ke baad guest cart → backend sync
export const syncCartOnLogin = createAsyncThunk(
  'cart/syncOnLogin',
  async (_, { dispatch, getState }) => {
    const localCart = getState().cart.items;

    if (localCart.length === 0) {
      const res = await getUserCart();
      dispatch(setCart({ items: res.data.cartItems }));
      return;
    }

    // Add local items to backend
    for (const item of localCart) {
      await addToCart({
        productId: item.id,
        size: item.size,
        quantity: item.quantity,
      });
    }

    // Final sync
    const res = await getUserCart();
    dispatch(setCart({ items: res.data.cartItems }));
  }
);

// Page refresh pe backend se cart load karo
export const fetchBackendCart = createAsyncThunk(
  'cart/fetchBackendCart',
  async (_, { dispatch }) => {
    const res = await getUserCart();
    dispatch(setCart({ items: res.data.cartItems }));
  }
);

// Add item → backend + local
export const addItemToCart = createAsyncThunk(
  'cart/addItem',
  async ({ productId, size, quantity = 1 }, { dispatch }) => {
    await addToCart({ productId, size, quantity });
    dispatch(addItem({ productId, size, price: 0, quantity })); // price backend se aayega baad mein
    const res = await getUserCart();
    dispatch(setCart({ items: res.data.cartItems })); // fresh sync
  }
);

// Update quantity
export const updateItemQty = createAsyncThunk(
  'cart/updateQty',
  async ({ productId, size, quantity }, { dispatch }) => {
    await updateCartItem({ productId, size, quantity });
    const res = await getUserCart();
    dispatch(setCart({ items: res.data.cartItems }));
  }
);

// Remove item
export const removeItemFromCart = createAsyncThunk(
  'cart/removeItem',
  async ({ productId, size }, { dispatch }) => {
    await removeCartItem({ productId, size });
    const res = await getUserCart();
    dispatch(setCart({ items: res.data.cartItems }));
  }
);

// Clear cart
export const clearEntireCart = createAsyncThunk(
  'cart/clear',
  async (_, { dispatch }) => {
    await clearCartApi();
    dispatch(clearCart());
  }
);