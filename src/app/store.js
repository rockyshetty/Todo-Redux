import { configureStore } from '@reduxjs/toolkit'
import TodoPersonSlice from './todoPersonSlice';
export default configureStore({
    reducer: {
    persons : TodoPersonSlice,
}
,})