import { configureStore } from "@reduxjs/toolkit";
import tutorsReducer from './tutorsSlice'

export default configureStore({
    reducer: {
        tutors: tutorsReducer
    }
})