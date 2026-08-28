import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",

  initialState,

  reducers: {
    /*
     * Add product to cart
     */

    addToCart: (state, action) => {
      const newItem = action.payload;

      /*
       * A product + variant combination is
       * considered one cart item.
       */

      const existingItem = state.items.find(
        (item) =>
          item.productId === newItem.productId &&
          item.variantId === newItem.variantId,
      );

      if (existingItem) {
        existingItem.quantity = Math.min(
          existingItem.quantity + newItem.quantity,
          newItem.maxStock,
        );
      } else {
        state.items.push(newItem);
      }
    },

    /*
     * Remove product from cart
     */

    removeFromCart: (state, action) => {
      const { productId, variantId } = action.payload;

      state.items = state.items.filter(
        (item) =>
          !(item.productId === productId && item.variantId === variantId),
      );
    },

    /*
     * Update quantity
     */

    updateQuantity: (state, action) => {
      const { productId, variantId, quantity } = action.payload;

      const item = state.items.find(
        (item) => item.productId === productId && item.variantId === variantId,
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
            ),
        );

        return;
      }

      item.quantity = quantity;
    },

    /*
     * Clear entire cart
     */

    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;

export const selectCartCount = (state) =>
  state.cart.items.reduce((total, item) => total + item.quantity, 0);

export const selectCartSubtotal = (state) =>
  state.cart.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

export default cartSlice.reducer;
