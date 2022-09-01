import { configureStore } from "@reduxjs/toolkit";
import leadSlice from "./features/leads/leadSlice";
import signUpUser from "./features/users/signUpSlice";

export const stores = configureStore({
    reducer: {
        sofia: leadSlice,
        lucia: signUpUser
    },
})