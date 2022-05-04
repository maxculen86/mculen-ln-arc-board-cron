import React from 'react';
import GetArticlesFromAcumSource from '../../../../../components/private/LN/common/utils/getArticlesFromAcumSource';
import mockArticles from '../../../../../__mocks__/data/masNotas/articles.json';
import filter from '../../../../../content/filters/LN/acumulado/articleMasNotas';
import { render, screen } from '@testing-library/react';
import { useContent } from 'fusion:content';

jest.mock('fusion:content', () => ({
    useContent: jest.fn()
}));
describe('Testing get Articles from Acum Source', () => {
    const props = {
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
        const { container } = render(<GetArticlesFromAcumSource {...props} />);
        expect(screen.getByRole('')).toStrictEqual(mockArticles);
    });
    it('should return an empty array', () => {
        useContent.mockReturnValueOnce([]);
        render(<GetArticlesFromAcumSource {...props} />);
        expect(screen.getByRole('')).toStrictEqual([]);
    });
});
