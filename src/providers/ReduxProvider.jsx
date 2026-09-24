"use client";

import { useEffect } from "react";
import { Provider } from "react-redux";

import { store } from "@/redux/store";
import { hydrateCart } from "@/redux/slices/cartSlice";
import AuthProvider from "@/components/auth/AuthProvider";

const CART_STORAGE_KEY = "traikar-cart";

export default function ReduxProvider({ children }) {
  /*
   * Restore cart when application starts
   */

  useEffect(() => {
    try {
      const storedCart = localStorage.getItem(CART_STORAGE_KEY);

      if (!storedCart) {
        return;
      }

      const parsedCart = JSON.parse(storedCart);

      if (!Array.isArray(parsedCart)) {
        return;
      }

      store.dispatch(hydrateCart(parsedCart));
    } catch (error) {
      console.error("Failed to restore cart:", error);

      localStorage.removeItem(CART_STORAGE_KEY);
    }
  }, []);

  /*
   * Save cart whenever it changes
   */

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      try {
        const state = store.getState();

        localStorage.setItem(
          CART_STORAGE_KEY,
          JSON.stringify(state.cart.items),
        );
      } catch (error) {
        console.error("Failed to save cart:", error);
      }
    });

    return unsubscribe;
  }, []);

  return (
    <Provider store={store}>
      <AuthProvider>{children}</AuthProvider>
    </Provider>
  );
}
