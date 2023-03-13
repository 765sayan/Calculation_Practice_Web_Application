import { configureStore } from "@reduxjs/toolkit";
import mainSlice from "../features/mainSlice";

export const store = configureStore({
  reducer: {
    main: mainSlice,
  },
});
