import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
  merged: false,   // IMPORTANT for guest → login sync
};

// Normalize item coming from payload or backend
const normalizeItem = (item) => ({
  id: item.id,
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
    // ⭐ LOCAL ADD (Optimistic Update)
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

    // ⭐ LOCAL UPDATE QTY
    updateItemQuantity(state, action) {
      const { id, size, quantity } = action.payload;

      const item = state.items.find((i) => i.id === id && i.size === size);
      if (item) {
        item.quantity = quantity;
      }

      const totals = calculateTotals(state.items);
      state.totalQuantity = totals.totalQuantity;
      state.totalAmount = totals.totalAmount;
    },

    // ⭐ LOCAL REMOVE
    removeItem(state, action) {
      const { id, size } = action.payload;

      state.items = state.items.filter((i) => !(i.id === id && i.size === size));

      const totals = calculateTotals(state.items);
      state.totalQuantity = totals.totalQuantity;
      state.totalAmount = totals.totalAmount;
    },

    // ⭐ SET CART (Backend overwrite)
    setCart(state, action) {
      const incoming = action.payload.items || [];
      state.items = incoming.map(normalizeItem);

      const totals = calculateTotals(state.items);
      state.totalQuantity = totals.totalQuantity;
      state.totalAmount = totals.totalAmount;

      state.merged = true;
    },

    // ⭐ GUEST CART MERGE WITH BACKEND CART
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

    setMerged(state, action) {
      state.merged = action.payload;
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
  clearCart,
  setCart,
  mergeCart,
  setMerged,
} = cartSlice.actions;

export default cartSlice.reducer;
