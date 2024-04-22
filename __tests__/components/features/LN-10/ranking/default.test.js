import React from 'react';
import Ranking from '../../../../../components/features/LN-10/ranking/default';
import { getDataContent } from '../../../../../components/features/LN-10/ranking/_helper';
import '@testing-library/jest-dom';
import Context from 'fusion:context';
import { render } from '@testing-library/react';
import mockArticles from '../../../../../__mocks__/data/ranking/homeLN10Response.json';

jest.mock('fusion:context', () => () => ({
    default: props => {
        const mockAvailableProps = {};
        return props.children(mockAvailableProps);
    },
    useAppContext: jest.fn(() => ({}))
}));

jest.mock('fusion:consumer', component => {
    return function(component) {
        return component;
    };
});

jest.mock('../../../../../components/features/LN-10/ranking/_helper', () => ({
    ...jest.requireActual(
        '../../../../../components/features/LN-10/ranking/_helper'
    ),
    getDataContent: jest.fn()
}));

describe('features - LN10 - Ranking', () => {
    Context.useAppContext = jest.fn(() => ({
        contextPath: '/pf',
        deployment: arg => arg
    }));

    test('should returns fragment if articles length is empty', () => {
        getDataContent.mockImplementation(() => ({ articles: [] }));

        const { container } = render(<Ranking />);
        const divElement = container.querySelector('div');
        expect(divElement.textContent).toBe('');
    });

    test('should returns the right articles length', () => {
        getDataContent.mockImplementation(() => ({ articles: mockArticles }));

        const { container } = render(<Ranking />);
        const articles = container.querySelectorAll('article');

        expect(articles).toHaveLength(mockArticles.length);
    });
});
