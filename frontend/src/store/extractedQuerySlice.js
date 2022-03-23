import { createSlice } from '@reduxjs/toolkit'

const initialState = {}

export const extractedQuerySlice = createSlice({
    name: 'extractedQueries',
    initialState,
    reducers: {
        updateExtractedQuery: (state, action) => {},
    },
})

export const { updateExtractedQuery } = extractedQuerySlice.actions

export default extractedQuerySlice.reducer
