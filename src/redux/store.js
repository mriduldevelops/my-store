// import { configureStore } from "@reduxjs/toolkit";

// import authReducer from "./features/auth/authSlice";
// import cartReducer from "./features/cart/cartSlice";
// import wishlistReducer from "./features/wishlist/wishlistSlice";
// import compareReducer from "./features/compare/compareSlice";
// import uiReducer from "./features/ui/uiSlice";

// export const store = configureStore({
//   reducer: {
//     auth: authReducer,
//     cart: cartReducer,
//     wishlist: wishlistReducer,
//     compare: compareReducer,
//     ui: uiReducer,
//   },
// });

import { configureStore } from "@reduxjs/toolkit";

import cartReducer from "./slices/cartSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});