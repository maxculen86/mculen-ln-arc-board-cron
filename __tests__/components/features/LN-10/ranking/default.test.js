import React from 'react';
import Ranking from '../../../../../components/features/LN-10/ranking/default';
import { getDataContent } from '../../../../../components/features/LN-10/ranking/_helper';
import '@testing-library/jest-dom';
import Context from 'fusion:context';
import checkHydrateOnly from '../../../../../components/private/LN/common/utils/checkHydrateOnly';
import { render } from '@testing-library/react';
import mockArticles from '../../../../../__mocks__/data/ranking/homeLN10Response.json';

jest.mock('fusion:context', () => () => ({
    default: props => {
        const mockAvailableProps = {};
        return props.children(mockAvailableProps);
    },
    useAppContext: jest.fn(() => ({}))
}));

jest.mock('../../../../../components/private/LN/common/utils/checkHydrateOnly');

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
    Context.useAppContext = jest.fn(() => ({}));

    test('should returns fragment if articles length is empty', () => {
        getDataContent.mockImplementation(() => ({ articles: [] }));

        const { container } = render(<Ranking />);
        expect(container).toBeEmptyDOMElement();
    });

    test('should returns the right articles length', () => {
        getDataContent.mockImplementation(() => ({ articles: mockArticles }));

        const { container } = render(<Ranking />);
        const articles = container.querySelectorAll('article');

        expect(articles).toHaveLength(mockArticles.length);
    });

    test('should returns static component when hydrateOnly is true', () => {
        getDataContent.mockImplementation(() => ({ articles: mockArticles }));
        checkHydrateOnly.mockImplementation(() => true);

        const { container, debug } = render(<Ranking />);
        expect(container.querySelector('.hidden')).toBeInTheDocument();
    });
});
