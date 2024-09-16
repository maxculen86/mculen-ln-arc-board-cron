import {
    assignPropsToChildren,
    filteredChildren
} from '../../../../components/chains/LN10_Caja_Collection/common/_helper-WebApi';
import { reorderArticlesWithTimeline } from '../../../../components/chains/utils/reorderArticlesWithTimeline';

jest.mock(
    '../../../../components/chains/LN10_Caja_Collection/common/_helper-WebApi',
    () => ({
        assignPropsToChildren: jest.fn(),
        filteredChildren: jest.fn()
    })
);

describe('components - chains - utils - reorderArticlesWithTimeline', () => {
    it('should return articles without reordering when no timeline article is present', () => {
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
        filteredChildren.mockReturnValue(undefined);

        const result = reorderArticlesWithTimeline(articles, childProps);

        expect(assignPropsToChildren).toHaveBeenCalledWith(
            articles,
            childProps
        );
        expect(filteredChildren).toHaveBeenCalledWith(articlesWithProps);
        expect(result).toEqual(childProps);
    });

    it('should place the timeline article at the end if present', () => {
        const articlesWithProps = [
            {
                collection: 'features',
                type: 'LN-10/timeline',
                id: 'f0fJaMrnTWnPAs',
                nodo: {
                    type: {},
                    key: 'f0fJaMrnTWnPAs',
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
                type: 'LN-10/timeline',
                id: 'f0fJaMrnTWnPAs'
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
                key: 'f0fJaMrnTWnPAs',
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
        filteredChildren.mockReturnValue(articlesWithProps[0]);

        const result = reorderArticlesWithTimeline(articles, childProps);

        expect(result).toEqual([childProps[1], childProps[0]]);
    });

    it('should return an empty array when no articles or childProps are provided', () => {
        assignPropsToChildren.mockReturnValue([]);
        filteredChildren.mockReturnValue(undefined);

        const result = reorderArticlesWithTimeline([], []);

        expect(result).toEqual([]);
    });
});
