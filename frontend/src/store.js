import { configureStore } from '@reduxjs/toolkit'
import extractedQueries from './store/extractedQuerySlice'

export const store = configureStore({
    reducer: {
        extractedQueries,
    },
})
