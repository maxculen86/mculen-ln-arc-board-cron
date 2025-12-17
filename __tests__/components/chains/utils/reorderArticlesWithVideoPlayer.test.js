import { assignPropsToChildren } from '../../../../components/chains/LN10_Caja_Collection/common/_helper-WebApi';
import { reorderArticlesWithVideoPlayer } from '../../../../components/chains/utils/reorderArticlesWithVideoPlayer';

jest.mock(
    '../../../../components/chains/LN10_Caja_Collection/common/_helper-WebApi',
    () => ({
        assignPropsToChildren: jest.fn()
    })
);

describe('components - chains - utils - reorderArticlesWithVideoPlayer', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return articles without reordering when no videoPlayer is present', () => {
        const articlesWithProps = [
            {
                collection: 'features',
                type: 'LN-10/article',
                id: 'f0fgQb5Ec02g5LH',
                nodo: {
                    type: {},
                    key: 'f0fgQb5Ec02g5LH',
                    ref: null,
                    props: {}
                }
            },
            {
                collection: 'features',
                type: 'LN-10/article',
                id: 'f0fSgnvuzutC481',
                nodo: {
                    type: {},
                    key: 'f0fSgnvuzutC481',
                    ref: null,
                    props: {}
                }
            }
        ];

        const articles = [
            {
                collection: 'features',
                type: 'LN-10/article',
                id: 'f0fgQb5Ec02g5LH'
            },
            {
                collection: 'features',
                type: 'LN-10/article',
                id: 'f0fSgnvuzutC481'
            }
        ];

        const childProps = [
            {
                type: {},
                key: 'f0fgQb5Ec02g5LH',
                ref: null,
                props: {}
            },
            {
                type: {},
                key: 'f0fSgnvuzutC481',
                ref: null,
                props: {}
            }
        ];

        assignPropsToChildren.mockReturnValue(articlesWithProps);

        const result = reorderArticlesWithVideoPlayer(articles, childProps);

        expect(assignPropsToChildren).toHaveBeenCalledWith(
            articles,
            childProps
        );
        expect(result).toEqual(childProps);
    });

    it('should place the videoPlayer at the end when present', () => {
        const articlesWithProps = [
            {
                collection: 'features',
                type: 'LN-10/videoPlayer',
                id: 'f0fVideoPlayer123',
                nodo: {
                    type: {},
                    key: 'f0fVideoPlayer123',
                    ref: null,
                    props: {}
                }
            },
            {
                collection: 'features',
                type: 'LN-10/article',
                id: 'f0fSgnvuzutC481',
                nodo: {
                    type: {},
                    key: 'f0fSgnvuzutC481',
                    ref: null,
                    props: {}
                }
            },
            {
                collection: 'features',
                type: 'LN-10/article',
                id: 'f0fgQb5Ec02g5LH',
                nodo: {
                    type: {},
                    key: 'f0fgQb5Ec02g5LH',
                    ref: null,
                    props: {}
                }
            }
        ];

        const articles = [
            {
                collection: 'features',
                type: 'LN-10/videoPlayer',
                id: 'f0fVideoPlayer123'
            },
            {
                collection: 'features',
                type: 'LN-10/article',
                id: 'f0fSgnvuzutC481'
            },
            {
                collection: 'features',
                type: 'LN-10/article',
                id: 'f0fgQb5Ec02g5LH'
            }
        ];

        const childProps = [
            {
                type: {},
                key: 'f0fVideoPlayer123',
                ref: null,
                props: {}
            },
            {
                type: {},
                key: 'f0fSgnvuzutC481',
                ref: null,
                props: {}
            },
            {
                type: {},
                key: 'f0fgQb5Ec02g5LH',
                ref: null,
                props: {}
            }
        ];

        assignPropsToChildren.mockReturnValue(articlesWithProps);

        const result = reorderArticlesWithVideoPlayer(articles, childProps);

        expect(result).toEqual([childProps[1], childProps[2], childProps[0]]);
    });

    it('should filter out timeline when present with videoPlayer', () => {
        const articlesWithProps = [
            {
                collection: 'features',
                type: 'LN-10/article',
                id: 'f0fArticle1',
                nodo: {
                    type: {},
                    key: 'f0fArticle1',
                    ref: null,
                    props: {}
                }
            },
            {
                collection: 'features',
                type: 'LN-10/timeline',
                id: 'f0fTimeline123',
                nodo: {
                    type: {},
                    key: 'f0fTimeline123',
                    ref: null,
                    props: {}
                }
            },
            {
                collection: 'features',
                type: 'LN-10/videoPlayer',
                id: 'f0fVideoPlayer123',
                nodo: {
                    type: {},
                    key: 'f0fVideoPlayer123',
                    ref: null,
                    props: {}
                }
            },
            {
                collection: 'features',
                type: 'LN-10/article',
                id: 'f0fArticle2',
                nodo: {
                    type: {},
                    key: 'f0fArticle2',
                    ref: null,
                    props: {}
                }
            }
        ];

        const articles = [
            {
                collection: 'features',
                type: 'LN-10/article',
                id: 'f0fArticle1'
            },
            {
                collection: 'features',
                type: 'LN-10/timeline',
                id: 'f0fTimeline123'
            },
            {
                collection: 'features',
                type: 'LN-10/videoPlayer',
                id: 'f0fVideoPlayer123'
            },
            {
                collection: 'features',
                type: 'LN-10/article',
                id: 'f0fArticle2'
            }
        ];

        const childProps = [
            {
                type: {},
                key: 'f0fArticle1',
                ref: null,
                props: {}
            },
            {
                type: {},
                key: 'f0fTimeline123',
                ref: null,
                props: {}
            },
            {
                type: {},
                key: 'f0fVideoPlayer123',
                ref: null,
                props: {}
            },
            {
                type: {},
                key: 'f0fArticle2',
                ref: null,
                props: {}
            }
        ];

        assignPropsToChildren.mockReturnValue(articlesWithProps);

        const result = reorderArticlesWithVideoPlayer(articles, childProps);

        expect(result).toEqual([childProps[0], childProps[3], childProps[2]]);
        expect(result).not.toContainEqual(childProps[1]);
    });

    it('should handle videoPlayer in middle position', () => {
        const articlesWithProps = [
            {
                collection: 'features',
                type: 'LN-10/article',
                id: 'f0fArticle1',
                nodo: {
                    type: {},
                    key: 'f0fArticle1',
                    ref: null,
                    props: {}
                }
            },
            {
                collection: 'features',
                type: 'LN-10/article',
                id: 'f0fArticle2',
                nodo: {
                    type: {},
                    key: 'f0fArticle2',
                    ref: null,
                    props: {}
                }
            },
            {
                collection: 'features',
                type: 'LN-10/videoPlayer',
                id: 'f0fVideoPlayer123',
                nodo: {
                    type: {},
                    key: 'f0fVideoPlayer123',
                    ref: null,
                    props: {}
                }
            },
            {
                collection: 'features',
                type: 'LN-10/article',
                id: 'f0fArticle3',
                nodo: {
                    type: {},
                    key: 'f0fArticle3',
                    ref: null,
                    props: {}
                }
            },
            {
                collection: 'features',
                type: 'LN-10/article',
                id: 'f0fArticle4',
                nodo: {
                    type: {},
                    key: 'f0fArticle4',
                    ref: null,
                    props: {}
                }
            }
        ];

        const childProps = [
            { type: {}, key: 'f0fArticle1', ref: null, props: {} },
            { type: {}, key: 'f0fArticle2', ref: null, props: {} },
            { type: {}, key: 'f0fVideoPlayer123', ref: null, props: {} },
            { type: {}, key: 'f0fArticle3', ref: null, props: {} },
            { type: {}, key: 'f0fArticle4', ref: null, props: {} }
        ];

        assignPropsToChildren.mockReturnValue(articlesWithProps);

        const result = reorderArticlesWithVideoPlayer([], childProps);

        expect(result).toEqual([
            childProps[0],
            childProps[1],
            childProps[3],
            childProps[4],
            childProps[2]
        ]);
    });

    it('should return an empty array when no articles or childProps are provided', () => {
        assignPropsToChildren.mockReturnValue([]);

        const result = reorderArticlesWithVideoPlayer([], []);

        expect(result).toEqual([]);
    });

    it('should handle only videoPlayer without articles', () => {
        const articlesWithProps = [
            {
                collection: 'features',
                type: 'LN-10/videoPlayer',
                id: 'f0fVideoPlayer123',
                nodo: {
                    type: {},
                    key: 'f0fVideoPlayer123',
                    ref: null,
                    props: {}
                }
            }
        ];

        const childProps = [
            {
                type: {},
                key: 'f0fVideoPlayer123',
                ref: null,
                props: {}
            }
        ];

        assignPropsToChildren.mockReturnValue(articlesWithProps);

        const result = reorderArticlesWithVideoPlayer([], childProps);

        expect(result).toEqual([childProps[0]]);
    });
});
