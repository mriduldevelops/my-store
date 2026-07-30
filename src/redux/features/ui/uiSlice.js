import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isMobileMenuOpen: false,
  isSearchOpen: false,
  isCartOpen: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleMobileMenu(state) {
      state.isMobileMenuOpen = !state.isMobileMenuOpen;
    },

    toggleSearch(state) {
      state.isSearchOpen = !state.isSearchOpen;
    },

    toggleCart(state) {
      state.isCartOpen = !state.isCartOpen;
    },

    closeAll(state) {
      state.isMobileMenuOpen = false;
      state.isSearchOpen = false;
      state.isCartOpen = false;
    },
  },
});

export const {
  toggleMobileMenu,
  toggleSearch,
  toggleCart,
  closeAll,
} = uiSlice.actions;

export default uiSlice.reducer;