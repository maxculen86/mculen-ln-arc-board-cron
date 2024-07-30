import React from 'react';
import { render, screen } from '@testing-library/react';
import { useAppContext } from 'fusion:context';
import Glossary from '../../../../../components/features/LN-10/glossary/default';

jest.mock('fusion:context', () => ({
    useAppContext: jest.fn()
}));

jest.mock(
    '../../../../../components/features/LN-10/glossary/components/collapse',
    () => ({
        Collapse: ({ glossaryData }) => (
            <div data-testid="collapse">{glossaryData.length}</div>
        )
    })
);
jest.mock(
    '../../../../../components/features/LN-10/glossary/components/dialog',
    () => ({
        Dialog: ({ glossaryData }) => (
            <div data-testid="dialog">{glossaryData.length}</div>
        )
    })
);
jest.mock(
    '../../../../../components/features/LN-10/glossary/components/tooltip',
    () => ({
        Tooltip: ({ glossaryData }) => (
            <div data-testid="tooltip">{glossaryData.length}</div>
        )
    })
);

describe('features - LN-common - Glossary - default', () => {
    const mockGlossaryData = [
        {
            key: 'Anses',
            value:
                'Programa de asistencia económica del gobierno para diversos sectores de la sociedad.'
        },
        {
            key: 'BCRA',
            value:
                'Banco Central de la República Argentina, encargado de regular la moneda y la economía del país.'
        }
    ];

    it('should render Collapse, Dialog, and Tooltip components when glossaryData is present', () => {
        useAppContext.mockReturnValue({
            globalContent: {
                promo_items: {
                    glossary: {
                        embed: {
                            config: {
                                arrayData: mockGlossaryData
                            }
                        }
                    }
                }
            }
        });

        render(<Glossary customFields={{ hide: false }} />);

        expect(screen.getByTestId('collapse')).toBeInTheDocument();
        expect(screen.getByTestId('dialog')).toBeInTheDocument();
        expect(screen.getByTestId('tooltip')).toBeInTheDocument();
    });

    it('should not render anything when hide is true', () => {
        render(<Glossary customFields={{ hide: true }} />);

        expect(screen.queryByTestId('collapse')).not.toBeInTheDocument();
        expect(screen.queryByTestId('dialog')).not.toBeInTheDocument();
        expect(screen.queryByTestId('tooltip')).not.toBeInTheDocument();
    });

    it('should not render anything when glossaryData is empty array', () => {
        useAppContext.mockReturnValue({
            globalContent: {
                promo_items: {
                    glossary: {
                        embed: {
                            config: {
                                arrayData: []
                            }
                        }
                    }
                }
            }
        });

        render(<Glossary customFields={{ hide: false }} />);

        expect(screen.queryByTestId('collapse')).not.toBeInTheDocument();
        expect(screen.queryByTestId('dialog')).not.toBeInTheDocument();
        expect(screen.queryByTestId('tooltip')).not.toBeInTheDocument();
    });
});
