import 'regenerator-runtime/runtime';
import React from 'react';
import Context from 'fusion:context';
import { useContent } from 'fusion:content';
import Consumer from 'fusion:consumer';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import acuResponse from '../../../../../__mocks__/data/ranking/acuResponse.json';
import homeResponse from '../../../../../__mocks__/data/ranking/homeResponse.json';
import inverseHomeResponse from '../../../../../__mocks__/data/ranking/inverseHomeResponse.json';

import Ranking from '../../../../../components/features/LN-common/ranking/default';

jest.mock('fusion:context', () => () => ({
    default: props => {
        const mockAvailableProps = {};
        return props.children(mockAvailableProps);
    },
    useAppContext: jest.fn(() => ({}))
}));

jest.mock('react', () => {
    const ActualReact = require.requireActual('react');
    return {
        ...ActualReact,
        useContext: () => ({})
    };
});

global.MutationObserver = class {
    constructor(callback) {}
    disconnect() {}
    observe(element, initObject) {}
};

jest.mock(
    '../../../../../components/private/common/staticValidation',
    () => 'mock-static-validation'
);

afterEach(() => {
    useContent.mockClear();
});

const getMockContext = (layout, globalContent = {}) => {
    Context.useAppContext = jest.fn(() => ({
        globalContent,
        arcSite: 'la-nacion-ar',
        layout: layout,
        outputType: 'default'
    }));
};

describe('Features - LN - Common - Ranking - default', () => {
    it('Should not render without right props', () => {
        Context.useAppContext = jest.fn(() => ({
            globalContent: {}
        }));
        const { container } = render(<Ranking />);
        expect(container).toBeEmptyDOMElement();
    });
    it('Should render ranking acu politica', async () => {
        getMockContext('LN-acumulado', {
            name: 'Política',
            node_type: 'section',
            _id: '/politica'
        });

        useContent.mockImplementationOnce(() => acuResponse);

        const { container } = render(<Ranking id="LN-acumulado" />);

        const titleElement = await screen.findByText('Más leídas de Política');
        expect(titleElement).toBeInTheDocument();

        expect(useContent).toHaveBeenCalledWith({
            query: {
                imageConfig: 'boxArticles',
                sectionId: 'politica',
                website: 'la-nacion-ar'
            },
            source: 'rankingArticlesSource',
            staticMode: false
        });

        expect(container).toMatchSnapshot();
    });
    it('Should render ranking home', async () => {
        getMockContext('LN-Home_Main');

        useContent.mockImplementation(() => homeResponse);

        const { container } = render(<Ranking id="rankingHome" />);

        const titleElement = await screen.findByText('Más leídas');
        expect(titleElement).toBeInTheDocument();

        expect(useContent).toHaveBeenNthCalledWith(1, {
            query: {
                imageConfig: 'boxArticles',
                sectionId: '',
                website: 'la-nacion-ar'
            },
            source: 'rankingArticlesSource',
            staticMode: true
        });

        expect(container).toMatchSnapshot();
    });
    it('Should render ranking reverse home', async () => {
        Context.useAppContext = jest.fn(() => ({
            globalContent: {},
            arcSite: 'la-nacion-ar',
            layout: 'LN-Home_Main',
            outputType: 'default'
        }));

        useContent.mockImplementation(() => inverseHomeResponse);

        const { container } = render(<Ranking id="inverse-home" />);

        const titleElement = await screen.findByText('Te puede interesar');
        expect(titleElement).toBeInTheDocument();

        expect(useContent).toHaveBeenNthCalledWith(1, {
            query: {
                imageConfig: 'boxArticles',
                sectionId: 'inverse-home',
                website: 'la-nacion-ar'
            },
            source: 'rankingArticlesSource',
            staticMode: true
        });

        expect(container).toMatchSnapshot();
    });
});
