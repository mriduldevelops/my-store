import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",

  initialState,

  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;

      const existingItem = state.items.find(
        (item) =>
          item.productId === newItem.productId &&
          item.variantId === newItem.variantId
      );

      if (existingItem) {
        existingItem.quantity = Math.min(
          existingItem.quantity + newItem.quantity,
          newItem.maxStock
        );
      } else {
        state.items.push(newItem);
      }
    },

    removeFromCart: (state, action) => {
      const {
        productId,
        variantId,
      } = action.payload;

      state.items = state.items.filter(
        (item) =>
          !(
            item.productId === productId &&
            item.variantId === variantId
          )
      );
    },

    updateQuantity: (state, action) => {
      const {
        productId,
        variantId,
        quantity,
      } = action.payload;

      const item = state.items.find(
        (item) =>
          item.productId === productId &&
          item.variantId === variantId
      );

      if (!item) {
        return;
      }

      if (quantity <= 0) {
        state.items = state.items.filter(
          (cartItem) =>
            !(
              cartItem.productId === productId &&
              cartItem.variantId === variantId
            )
        );

        return;
      }

      item.quantity = Math.min(
        quantity,
        item.maxStock
      );
    },

    clearCart: (state) => {
      state.items = [];
    },

    /*
     * Restore cart from localStorage
     */

    hydrateCart: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  hydrateCart,
} = cartSlice.actions;

/*
 * Selectors
 */

export const selectCartItems = (state) =>
  state.cart.items;

export const selectCartCount = (state) =>
  state.cart.items.reduce(
    (total, item) =>
      total + item.quantity,
    0
  );

export const selectCartSubtotal = (state) =>
  state.cart.items.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

export default cartSlice.reducer;