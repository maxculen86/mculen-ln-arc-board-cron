import React from 'react';
import '@testing-library/jest-dom';
import { useContent } from 'fusion:content';
import Context from 'fusion:context';
import { render, screen } from '@testing-library/react';
import CajaDolar from '../../../../components/features/LN-acumulado/cajaDolar';
import API_RESPONSE from '../../../../__mocks__/data/apiDolar/sourceFullResponse.json';

jest.mock('fusion:content', () => ({
    useContent: jest.fn()
}));

jest.mock('fusion:context', () => () => ({
    default: props => {
        const mockAvailableProps = {};
        return props.children(mockAvailableProps);
    },
    useAppContext: jest.fn(() => ({}))
}));

jest.mock('fusion:static', () => 'mock-static');

jest.mock(
    '../../../../components/private/common/staticContent.jsx',
    () => 'mock-static-content'
);

describe('Features - LN-acumulado - Caja Dolar Feature =>', () => {
    it('without data response should return null when data is undefined', () => {
        useContent.mockImplementation(() => {});
        Context.useAppContext = jest.fn(() => ({}));
        const { container } = render(<CajaDolar id={'f0f7MrGuNmfRtMo'} />);

        expect(
            screen.getByText(
                (content, element) =>
                    element.tagName.toLowerCase() === 'mock-static-content'
            )
        ).toBeVisible();
        expect(container.firstChild).toBeEmptyDOMElement();
    });

    it('without data response should return null when data is null', () => {
        useContent.mockImplementation(() => ({
            data: null
        }));
        Context.useAppContext = jest.fn(() => ({}));
        const { container } = render(<CajaDolar id={'f0f7MrGuNmfRtMo'} />);

        expect(
            screen.getByText(
                (content, element) =>
                    element.tagName.toLowerCase() === 'mock-static-content'
            )
        ).toBeVisible();
        expect(container.firstChild).toBeEmptyDOMElement();
    });
});

describe('with a valid response on any section', () => {
    it('should render all 8 types of dollars from the mock with their corresponding title', () => {
        Context.useAppContext = jest.fn(() => ({
            outputType: 'default',
            layout: 'LN-acumulado'
        }));
        useContent.mockImplementation(() => API_RESPONSE);
        render(<CajaDolar id={'f0f7MrGuNmfRtMo'} />);

        expect(screen.getByText('Dólar oficial')).toBeDefined();
        expect(screen.getByText('Dólar blue')).toBeDefined();
        expect(screen.getByText('Dólar tarjeta')).toBeDefined();
        expect(screen.getByText('Dólar turista')).toBeDefined();
        expect(screen.getByText('Dólar MEP')).toBeDefined();
        expect(screen.getByText('Dólar CCL')).toBeDefined();
        expect(screen.getByText('Dólar mayorista')).toBeDefined();
        expect(screen.getByText('Euro')).toBeDefined();
        expect(screen.getAllByRole('heading')).toHaveLength(8);
        expect(
            screen.getByText(
                (content, element) =>
                    element.tagName.toLowerCase() === 'mock-static-content'
            )
        ).toBeVisible();
    });
});
describe('with a valid response on a note', () => {
    it('should render all 8 types of dollars from the mock with their corresponding title when the kicker and label is enabled', () => {
        Context.useAppContext = jest.fn(() => ({
            outputType: 'default',
            layout: 'LN-nota-noticia',
            globalContent: {
                label: {
                    mostrar_caja_dolar: {
                        text: 'Mostrar'
                    }
                }
            }
        }));

        useContent.mockImplementation(() => API_RESPONSE);
        render(<CajaDolar id={'f0f7MrGuNmfRtMo'} />);

        expect(screen.getByText('Dólar oficial')).toBeDefined();
        expect(screen.getByText('Dólar blue')).toBeDefined();
        expect(screen.getByText('Dólar tarjeta')).toBeDefined();
        expect(screen.getByText('Dólar turista')).toBeDefined();
        expect(screen.getByText('Dólar MEP')).toBeDefined();
        expect(screen.getByText('Dólar CCL')).toBeDefined();
        expect(screen.getByText('Dólar mayorista')).toBeDefined();
        expect(screen.getByText('Euro')).toBeDefined();
        expect(screen.getAllByRole('heading')).toHaveLength(8);
        expect(
            screen.getByText(
                (content, element) =>
                    element.tagName.toLowerCase() === 'mock-static'
            )
        ).toBeVisible();
    });
});

describe('without kicker and label in a note', () => {
    it('should render empty fragment in a note with the kicker and label disabled', () => {
        Context.useAppContext = jest.fn(() => ({
            outputType: 'default',
            layout: 'LN-nota-noticia',
            globalContent: {
                label: {
                    mostrar_caja_dolar: {
                        text: ''
                    }
                }
            }
        }));

        useContent.mockImplementation(() => API_RESPONSE);
        const { container } = render(<CajaDolar id={'f0f7MrGuNmfRtMo'} />);
        expect(container).toBeEmptyDOMElement();
    });
});
