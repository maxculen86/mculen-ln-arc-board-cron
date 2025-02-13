import React from 'react';
import Ranking from '../../../../../components/features/LN-10/ranking/default';
import { useRankingArticles } from '../../../../../components/features/LN-10/ranking/_helper';
import '@testing-library/jest-dom';
import Context from 'fusion:context';
import { render } from '@testing-library/react';
import mockArticles from '../../../../../__mocks__/data/ranking/homeLN10Response.json';

const props = { id: 'rankingHome' };

jest.mock('fusion:consumer', component => {
    return function (component) {
        return component;
    };
});

jest.mock('../../../../../components/features/LN-10/ranking/_helper', () => ({
    ...jest.requireActual(
        '../../../../../components/features/LN-10/ranking/_helper'
    ),
    useRankingArticles: jest.fn()
}));

jest.mock('fusion:context', () => ({ useAppContext: jest.fn() }));

describe('features - LN10 - Ranking', () => {
    Context.useAppContext = jest.fn(() => ({
        contextPath: '/pf',
        deployment: arg => arg,
        isAdmin: false
    }));

    it('should return null if the length of the items array is empty', () => {
        useRankingArticles.mockImplementation(() => ({ articles: [] }));

        const { container } = render(<Ranking {...props} />);
        expect(container.firstChild).toBeNull();
    });

    it('should returns the right articles length', () => {
        useRankingArticles.mockImplementation(() => ({
            articles: mockArticles
        }));

        const { container } = render(<Ranking {...props} />);
        const articles = container.querySelectorAll('article');

        expect(articles).toHaveLength(mockArticles.length);
    });
});
