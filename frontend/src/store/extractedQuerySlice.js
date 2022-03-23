import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    queries: {},
}

export const extractedQuerySlice = createSlice({
    name: 'extractedQueries',
    initialState,
    reducers: {
        updateExtractedQuery: (state, action) => {
            state.queries = action.payload
        },
    },
})

export const { updateExtractedQuery } = extractedQuerySlice.actions

export default extractedQuerySlice.reducer
