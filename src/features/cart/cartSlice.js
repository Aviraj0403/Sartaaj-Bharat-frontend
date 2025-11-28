import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
  merged: false, // For tracking if the cart has been merged after guest login
};

// Normalize cart item
const normalizeItem = (item) => ({
  id: item.id || item.productId,
  name: item.name,
  image: item.image,
  price: Number(item.price),
  quantity: Number(item.quantity),
  size: item.size,
});

// Calculate totals for cart
const calculateTotals = (items) => {
  const totalQuantity = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalAmount = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  return { totalQuantity, totalAmount };
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Add item (optimistic update for local cart)
    addItem(state, action) {
      const newItem = normalizeItem(action.payload);
      const existing = state.items.find(
        (i) => i.id === newItem.id && i.size === newItem.size
      );

      if (existing) {
        existing.quantity += newItem.quantity;
      } else {
        state.items.push(newItem);
      }

      const totals = calculateTotals(state.items);
      state.totalQuantity = totals.totalQuantity;
      state.totalAmount = totals.totalAmount;
    },

    // Update item quantity
    updateItemQuantity(state, action) {
      const { id, size, quantity } = action.payload;
      const item = state.items.find((i) => i.id === id && i.size === size);
      if (item) item.quantity = quantity;

      const totals = calculateTotals(state.items);
      state.totalQuantity = totals.totalQuantity;
      state.totalAmount = totals.totalAmount;
    },

    // Remove item
    removeItem(state, action) {
      const { id, size } = action.payload;
      state.items = state.items.filter((i) => !(i.id === id && i.size === size));

      const totals = calculateTotals(state.items);
      state.totalQuantity = totals.totalQuantity;
      state.totalAmount = totals.totalAmount;
    },

    // Set cart items (overwrite with backend data)
    setCart(state, action) {
      const incoming = action.payload.items || [];
      state.items = incoming.map(normalizeItem);

      const totals = calculateTotals(state.items);
      state.totalQuantity = totals.totalQuantity;
      state.totalAmount = totals.totalAmount;
      state.merged = true;
    },

    // Merge cart (merge guest cart with backend)
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

      const totals = calculateTotals(state.items);
      state.totalQuantity = totals.totalQuantity;
      state.totalAmount = totals.totalAmount;
      state.merged = true;
    },

    clearCart(state) {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
      state.merged = false;
    },
  },
});

export const {
  addItem,
  updateItemQuantity,
  removeItem,
  setCart,
  mergeCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
