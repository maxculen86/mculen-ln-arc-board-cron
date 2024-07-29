import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { useContent } from 'fusion:content';
import Context from 'fusion:context';
import API_RESPONSE from '../../../../__mocks__/data/apiDolar/sourceFullResponse.json';
import CajaDolar from '../../../../components/features/LN-10-global/common/cajaDolar/default';

jest.mock('fusion:content', () => ({
    useContent: jest.fn()
}));

jest.mock('fusion:context', () => ({
    useAppContext: jest.fn()
}));

jest.mock('../../../../__mocks__/fusion:static', () => 'static');

describe('Features - LN-10-Global - Common - Caja Dolar', () => {
    describe('with a valid response on any section', () => {
        it('should render all 8 types of dollars from the mock with their corresponding title', () => {
            Context.useAppContext = jest.fn(() => ({
                outputType: 'default',
                layout: 'LN-acumulado',
                globalContent: { node_type: 'section' }
            }));
            useContent.mockImplementation(() => API_RESPONSE);
            render(<CajaDolar id={'f0f7MrGuNmfRtMo'} />);

            expect(
                screen.queryByText('Cotización del dólar de hoy')
            ).toBeNull();
            expect(screen.queryByText('Dólar oficial')).toBeDefined();
            expect(screen.queryByText('Dólar blue')).toBeDefined();
            expect(screen.queryByText('Dólar tarjeta')).toBeDefined();
            expect(screen.queryByText('Dólar turista')).toBeDefined();
            expect(screen.queryByText('Dólar MEP')).toBeDefined();
            expect(screen.queryByText('Dólar CCL')).toBeDefined();
            expect(screen.queryByText('Dólar mayorista')).toBeDefined();
            expect(screen.queryByText('Euro')).toBeDefined();
            expect(screen.queryAllByRole('heading')).toHaveLength(8);
        });

        it('should not render when theres no data', () => {
            Context.useAppContext = jest.fn(() => ({
                outputType: 'default',
                layout: 'LN-acumulado',
                globalContent: { node_type: 'section' }
            }));
            useContent.mockImplementation(() => {});
            const { container } = render(<CajaDolar id={'f0f7MrGuNmfRtMo'} />);

            expect(container.firstChild).toBeEmptyDOMElement();
        });
    });

    describe('with a valid response on a note', () => {
        it('should render all 8 types of dollars from the mock with their corresponding title and the general title when the kicker and label is enabled', () => {
            Context.useAppContext = jest.fn(() => ({
                outputType: 'default',
                layout: 'LN-nota-noticia',
                globalContent: {
                    type: 'story',
                    label: {
                        mostrar_caja_dolar: {
                            text: 'Mostrar'
                        }
                    }
                }
            }));
            useContent.mockImplementation(() => API_RESPONSE);
            render(<CajaDolar id={'f0f7MrGuNmfRtMo'} />);

            expect(
                screen.getByText('Cotización del dólar de hoy')
            ).toBeDefined();
            expect(screen.getByText('Dólar oficial')).toBeDefined();
            expect(screen.getByText('Dólar blue')).toBeDefined();
            expect(screen.getByText('Dólar tarjeta')).toBeDefined();
            expect(screen.getByText('Dólar turista')).toBeDefined();
            expect(screen.getByText('Dólar MEP')).toBeDefined();
            expect(screen.getByText('Dólar CCL')).toBeDefined();
            expect(screen.getByText('Dólar mayorista')).toBeDefined();
            expect(screen.getByText('Euro')).toBeDefined();
            expect(screen.getAllByRole('heading')).toHaveLength(9);
        });
    });

    describe('CajaDolar', () => {
        it('without data response should return null when data is undefined', () => {
            useContent.mockImplementation(() => {});
            Context.useAppContext = jest.fn(() => ({
                outputType: 'default',
                layout: 'LN-acumulado',
                globalContent: { node_type: 'section' }
            }));
            const { container } = render(<CajaDolar id={'f0f7MrGuNmfRtMo'} />);

            expect(container.firstChild).toBeEmptyDOMElement();
        });

        it('without data response should return null when data is null', () => {
            useContent.mockImplementation(() => ({
                data: null
            }));
            Context.useAppContext = jest.fn(() => ({
                outputType: 'default',
                layout: 'LN-acumulado',
                globalContent: { node_type: 'section' }
            }));
            const { container } = render(<CajaDolar id={'f0f7MrGuNmfRtMo'} />);

            expect(container.firstChild).toBeEmptyDOMElement();
        });

        it('should return an empty fragment when there is no data', () => {
            useContent.mockImplementation(() => {});
            Context.useAppContext = jest.fn(() => ({
                outputType: 'default',
                layout: 'LN-acumulado',
                globalContent: { node_type: 'section' }
            }));
            const { container } = render(<CajaDolar id={'f0f7MrGuNmfRtMo'} />);

            expect(container.firstChild).toBeEmptyDOMElement();
        });

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
});
