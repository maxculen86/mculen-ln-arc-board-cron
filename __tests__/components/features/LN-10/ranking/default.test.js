import React from 'react';
import Ranking from '../../../../../components/features/LN-10/ranking/default';
import { getDataContent } from '../../../../../components/features/LN-10/ranking/_helper';
import '@testing-library/jest-dom';
import { useContent } from 'fusion:content';
import Context from 'fusion:context';
import { render, screen, fireEvent } from '@testing-library/react';
import menuData from '../../../../../__mocks__/data/menu/menu.json';

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
    Context.useAppContext = jest.fn(() => ({}));
    getDataContent.mockImplementation(() => ({ articles: [] }));

    test('should returns fragment if articles length is empty', () => {
        const { container } = render(<Ranking />);
        expect(container).toBeEmptyDOMElement();
    });
});
