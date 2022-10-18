import setArticleQueryAcu from '../../../../../../components/private/LN/common/utils/setArticleQueryAcu';

describe('Private - LN - Common - Utils - setArticleQueryAcu', () => {
    const cases = [
        [
            'Test section with regular data',
            {
                testArguments: [
                    'section',
                    {
                        id: '/cultura',
                        name: 'Cultura'
                    }
                ],
                testResult: { sectionId: '/cultura' }
            }
        ],
        [
            'Test author with regular data',
            {
                testArguments: [
                    'author',
                    {
                        id: 'carlos-m-reymundo-roberts-86',
                        name: 'Carlos M. Reymundo Roberts',
                        canonicalUrl: '/autor/carlos-m-reymundo-roberts-86/'
                    }
                ],
                testResult: { authorId: 'carlos-m-reymundo-roberts-86' }
            }
        ],
        [
            'Test distributor with regular data',
            {
                testArguments: [
                    'distributor',
                    {
                        id:
                            'bd954cca5f56f01594d0775f67a9676b0616d4b3f6fffd5aba70aad964c5915b',
                        name: 'BBC Mundo',
                        canonicalUrl: '/distributor/bbc-mundo/'
                    }
                ],
                testResult: { distributorId: 'BBC Mundo' }
            }
        ],
        [
            'Test tag with regular data',
            {
                testArguments: [
                    'tags',
                    {
                        id:
                            'e2fadb5f7498d6ee93f6a2c07a48f6eda577e6b2740ecda3094b553b19ff817d',
                        name: 'Champions League',
                        canonicalUrl: '/tema/champions-league-tid47054/'
                    }
                ],
                testResult: { tagId: 'champions-league-tid47054' }
            }
        ],
        [
            'Test with undefined data',
            {
                testArguments: [undefined, undefined],
                testResult: {}
            }
        ],
        [
            'Test with unexpected nodeType',
            {
                testArguments: [
                    'otherNodeType',
                    {
                        id: 'carlos-m-reymundo-roberts-86',
                        name: 'Carlos M. Reymundo Roberts',
                        canonicalUrl: '/autor/carlos-m-reymundo-roberts-86/'
                    }
                ],
                testResult: {}
            }
        ],
        [
            'Test author without id',
            {
                testArguments: [
                    'author',
                    {
                        name: 'Carlos M. Reymundo Roberts',
                        canonicalUrl: '/autor/carlos-m-reymundo-roberts-86/'
                    }
                ],
                testResult: {}
            }
        ],
        [
            'Test tag without canonicalUrl',
            {
                testArguments: [
                    'tags',
                    {
                        id:
                            'e2fadb5f7498d6ee93f6a2c07a48f6eda577e6b2740ecda3094b553b19ff817d',
                        name: 'Champions League'
                    }
                ],
                testResult: {}
            }
        ]
    ];

    test.each(cases)('%s', (message, { testArguments, testResult }) => {
        const result = setArticleQueryAcu(...testArguments);
        expect(result).toEqual(testResult);
    });
});
