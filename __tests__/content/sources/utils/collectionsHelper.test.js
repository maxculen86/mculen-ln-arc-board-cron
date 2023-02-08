import {
    isNotRecommend,
    filterArticlesInCollection,
    getArticlesToShow,
    filterArticlesTypeStory
} from '../../../../content/sources/utils/collectionsHelper';
import 'regenerator-runtime/runtime';

describe('collectionsHelper - isNotRecommend', () => {
    const cases = [
        [
            'Test with text true',
            {
                article: {
                    _id: 'SL7APA7UNNBEDDC62AB62ERDKE',
                    label: {
                        recomendar: {
                            display: true,
                            text: 'Si',
                            url: ''
                        }
                    }
                },
                result: false
            }
        ],
        [
            'Test with text false',
            {
                article: {
                    _id: 'MLCM4EMLLBFPRFD3OWXJZDKKTA',
                    label: {
                        recomendar: {
                            display: true,
                            text: 'No',
                            url: ''
                        }
                    }
                },
                result: true
            }
        ]
    ];

    test.each(cases)('%s', (message, { article, result }) => {
        expect(isNotRecommend(article)).toEqual(result);
    });
});

describe('collectionsHelper - filterArticlesInCollection', () => {
    const cachedCallMocks = {
        first: {
            _id: 'QJ3BOEZVQNEYZEVBXHF4C7KAWY',
            content_elements: [
                { _id: 'SL7APA7UNNBEDDC62AB62ERDKE' },
                { _id: 'MLCM4EMLLBFPRFD3OWXJZDKKTA' }
            ]
        },
        second: {
            _id: 'ATQPBRBSXFHUJDW74KTQBEQDWQ',
            content_elements: [
                { _id: 'YJJ7JHAWNJFTDH2RLJ4QHUTA5A' },
                { _id: 'EG75SL7475F5JI66UXNCP5CUSU' }
            ]
        }
    };

    const generalMock = {
        siteProps: {
            id: 'FPKJS5YHQVFGVD46GOLY7A265U',
            size: 20,
            website: 'la-nacion-ar',
            from: 3,
            idCollectionsInPage: [
                'QJ3BOEZVQNEYZEVBXHF4C7KAWY',
                'ATQPBRBSXFHUJDW74KTQBEQDWQ'
            ],
            filterRecomendar: true,
            filterRepetead: true,
            notesQuantity: 3,
            imageConfig: 'm',
            isFocal: false,
            diagramation: '',
            'arc-site': 'la-nacion-ar'
        },

        originalArticles: [
            { _id: 'JQT2DUNMAFAQNABRN6JQVXQQHA' },
            { _id: 'GVFJYOZFHZAR7G6JCFNMQDXVCA' },
            { _id: 'PM33QUQ3ZNBSBJMKU6VRXN2LH4' },
            { _id: 'C5WUTDZIXBEALCE3CDLGN5BHCU' },
            { _id: 'A6TJQOLJ6BESFGHF32AON7HSZY' }
        ],

        cachedCall: jest
            .fn()
            .mockReturnValueOnce(cachedCallMocks.first)
            .mockReturnValueOnce(cachedCallMocks.second)
    };

    it('should filters articles in collection and avoid duplicate notes', () => {
        filterArticlesInCollection(generalMock).then(articles => {
            expect(generalMock.cachedCall).toBeCalledTimes(1);
            expect(
                articles.every(
                    article =>
                        !cachedCallMocks.first.content_elements.includes(
                            article
                        ) &&
                        !cachedCallMocks.second.content_elements.includes(
                            article
                        )
                )
            );
        });
    });
});

describe('collectionsHelper - getArticlesToShow', () => {
    const generalMock = {
        notesQuantity: 2,
        articles: [
            { _id: 'JQT2DUNMAFAQNABRN6JQVXQQHA' },
            { _id: 'GVFJYOZFHZAR7G6JCFNMQDXVCA' },
            { _id: 'PM33QUQ3ZNBSBJMKU6VRXN2LH4' },
            { _id: 'C5WUTDZIXBEALCE3CDLGN5BHCU' },
            { _id: 'A6TJQOLJ6BESFGHF32AON7HSZY' }
        ],
        idsArticlesToExclude: [
            'JQT2DUNMAFAQNABRN6JQVXQQHA',
            'GVFJYOZFHZAR7G6JCFNMQDXVCA'
        ]
    };

    const result = getArticlesToShow(...Object.values(generalMock));
    const resultWithoutExcluded = result.every(
        article => !generalMock.idsArticlesToExclude.includes(article)
    );

    expect(result).toHaveLength(generalMock.notesQuantity);
    expect(resultWithoutExcluded).toBeTruthy();
});

describe('collectionsHelper - filterArticlesTypeStory', () => {
    const collectionMock = [
        {
            _id: 'IZLVHK6F4FGCXJ5EGVH6UF7AFQ',
            type: 'video'
        },
        {
            _id: 'XQF2XSYVYRBQRBWV3AZ66O34EA',
            type: 'story'
        },
        {
            _id: 'IVXHUL4ZQ5F43HSNXBYOCOZJX4',
            type: 'video'
        }
    ];

    const result = filterArticlesTypeStory(collectionMock);

    it('Should return only elements of type story', () => {
        expect(result).toStrictEqual([
            {
                _id: 'XQF2XSYVYRBQRBWV3AZ66O34EA',
                type: 'story'
            }
        ]);
        expect(result).toHaveLength(1);
    });
});
