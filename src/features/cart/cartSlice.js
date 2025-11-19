// src/features/cart/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
  merged: false, // for guest → login sync
};

const calculateTotals = (items) => {
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return { totalQuantity, totalAmount };
};

// Normalize backend response → Redux format (size = unit)
const normalizeItem = (item) => ({
  id: item.productId,
  name: item.name,
  image: item.image,
  price: Number(item.price),
  quantity: Number(item.quantity),
  size: item.size, // ← yeh tumhara "unit" hai
});

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      const newItem = normalizeItem(action.payload);
      const existingItem = state.items.find(
        (item) => item.id === newItem.id && item.size === newItem.size
      );

      if (existingItem) {
        existingItem.quantity += newItem.quantity;
      } else {
        state.items.push(newItem);
      }

      const { totalQuantity, totalAmount } = calculateTotals(state.items);
      state.totalQuantity = totalQuantity;
      state.totalAmount = totalAmount;
    },

    updateItemQuantity(state, action) {
      const { id, size, quantity } = action.payload;
      const item = state.items.find((i) => i.id === id && i.size === size);
      if (item) {
        item.quantity = quantity;
      }

      const { totalQuantity, totalAmount } = calculateTotals(state.items);
      state.totalQuantity = totalQuantity;
      state.totalAmount = totalAmount;
    },

    removeItem(state, action) {
      const { id, size } = action.payload;
      state.items = state.items.filter((i) => !(i.id === id && i.size === size));

      const { totalQuantity, totalAmount } = calculateTotals(state.items);
      state.totalQuantity = totalQuantity;
      state.totalAmount = totalAmount;
    },

    clearCart(state) {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
      state.merged = false;
    },

    setCart(state, action) {
      const rawItems = action.payload.items || [];
      state.items = rawItems.map(normalizeItem);
      const { totalQuantity, totalAmount } = calculateTotals(state.items);
      state.totalQuantity = totalQuantity;
      state.totalAmount = totalAmount;
      state.merged = true;
    },

    mergeCart(state, action) {
      const backendItems = (action.payload.items || []).map(normalizeItem);

      backendItems.forEach((backendItem) => {
        const existing = state.items.find(
          (i) => i.id === backendItem.id && i.size === backendItem.size
        );

        if (existing) {
          existing.quantity += backendItem.quantity;
        } else {
          state.items.push(backendItem);
        }
      });

      const { totalQuantity, totalAmount } = calculateTotals(state.items);
      state.totalQuantity = totalQuantity;
      state.totalAmount = totalAmount;
      state.merged = true;
    },

    setMerged(state, action) {
      state.merged = action.payload;
    },
  },
});

export const {
  addItem,
  updateItemQuantity,
  removeItem,
  clearCart,
  setCart,
  mergeCart,
  setMerged,
} = cartSlice.actions;

export default cartSlice.reducer;