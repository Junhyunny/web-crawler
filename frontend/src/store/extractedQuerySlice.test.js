import reducer, { updateExtractedQuery } from './extractedQuerySlice'

describe('extractedQuerySlice', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            queries: [],
        })
    })

    it('should return the updated queries', () => {
        const prevState = {
            queries: ['initial query'],
        }
        expect(reducer(prevState, updateExtractedQuery('queryFromDiv'))).toEqual({
            queries: ['initial query', 'queryFromDiv'],
        })
    })
})
