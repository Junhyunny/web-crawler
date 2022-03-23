import reducer, { updateExtractedQuery } from './extractedQuerySlice'

describe('extractedQuerySlice', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            queries: {},
        })
    })

    it('should return the updated queries', () => {
        const prevState = {}
        expect(
            reducer(
                prevState,
                updateExtractedQuery({
                    queryFromDiv: 'queryFromDiv',
                    queryFromA: 'queryFromA',
                })
            )
        ).toEqual({
            queries: {
                queryFromDiv: 'queryFromDiv',
                queryFromA: 'queryFromA',
            },
        })
    })
})
