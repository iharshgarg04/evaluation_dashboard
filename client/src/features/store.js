import { configureStore } from "@reduxjs/toolkit";
import studentReducer from "./student";
// import refreshSidebar from "./refreshSlice";
// import marksReducer from './marks';

export const store = configureStore({
    reducer:{
        studentKey:studentReducer,
        // refreshKey:refreshSidebar,
        // marksKey:marksReducer
    }
})