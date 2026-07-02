import 'regenerator-runtime/runtime';
import React from 'react';
import Context from 'fusion:context';
import { useContent } from 'fusion:content';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import acuResponse from '../../../../../__mocks__/data/ranking/acuResponse.json';

import Ranking from '../../../../../components/features/LN-common/ranking/default';

jest.mock(
    'fusion:context',
    () => {
        const context = {
            useAppContext: jest.fn(() => ({}))
        };

        return {
            __esModule: true,
            default: context,
            get useAppContext() {
                return context.useAppContext;
            }
        };
    },
    { virtual: true }
);

jest.mock(
    'fusion:content',
    () => ({
        __esModule: true,
        useContent: jest.fn()
    }),
    { virtual: true }
);

jest.mock(
    'fusion:static',
    () => {
        const React = require('react');

        return function Static({ children, ...props }) {
            return React.createElement('static', props, children);
        };
    },
    { virtual: true }
);

jest.mock('react', () => {
    const ActualReact = jest.requireActual('react');
    return {
        ...ActualReact,
        useContext: () => ({})
    };
});

afterEach(() => {
    useContent.mockClear();
});

describe('Features - LN - Common - Ranking - default', () => {
    it('Should not render without right props', () => {
        Context.useAppContext = jest.fn(() => ({
            globalContent: {}
        }));
        const { container } = render(<Ranking id="LN-acumulado" />);
        expect(container.innerHTML).toBe(
            '<static id="common-ranking-LN-acumulado"><div class="bg-light-0 py-32 overflow-hidden"><ol></ol></div></static>'
        );
    });
    it('Should render ranking acu politica', async () => {
        Context.useAppContext = jest.fn(() => ({
            globalContent: {
                name: 'Política',
                node_type: 'section',
                _id: '/politica'
            },
            arcSite: 'la-nacion-ar',
            layout: 'LN-acumulado',
            outputType: 'default'
        }));

        useContent.mockImplementationOnce(() => acuResponse);

        const { container } = render(<Ranking id="LN-acumulado" />);
        const titleElement = await screen.findByText('Más leídas de Política');
        expect(titleElement).toBeInTheDocument();
        expect(container.innerHTML).toContain(
            'https://www.lanacion.com.ar/resizer'
        );
        expect(useContent).toHaveBeenCalledWith({
            query: {
                imageConfig: 'boxArticles',
                sectionId: 'politica',
                website: 'la-nacion-ar',
                section: 'commonRanking'
            },
            source: 'rankingArticlesSource',
            staticMode: true
        });

        expect(container).toMatchSnapshot();
    });
});
