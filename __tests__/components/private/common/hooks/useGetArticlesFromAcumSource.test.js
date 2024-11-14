import React from 'react';
import { useContent } from 'fusion:content';
import mockArticles from '../../../../../__mocks__/data/masNotas/articles.json';
import filter from '../../../../../content/filters/LN/acumulado/articleMasNotas';
import useGetArticlesFromAcumSource from '../../../../../components/private/LN/common/hooks/useGetArticlesFromAcumSource';

jest.mock('fusion:content', () => ({
    useContent: jest.fn()
}));
describe('Private - Common - Hooks - useGetArticlesFromAcumSource', () => {
    const args = {
        typesOfQuery: {
            sectionId: '/recetas'
        },
        filter,
        imageConfig: 'boxArticles',
        size: {
            tripleSize: 9,
            originalSize: 6
        },
        sourceOrigin: 'composer',
        excludeSectionId: false,
        type: 'story',
        shouldNotFilter: true,
        website: 'la-nacion-ar',
        promoItemsOnly: true,
        staticMode: true
    };
    it('should return the corresponding array of articles', () => {
        useContent.mockReturnValueOnce(mockArticles);
        expect(useGetArticlesFromAcumSource(args)).toStrictEqual(
            mockArticles.content_elements
        );
    });
    it('should return an empty array', () => {
        useContent.mockReturnValueOnce([]);
        expect(useGetArticlesFromAcumSource(args)).toStrictEqual([]);
    });
});
