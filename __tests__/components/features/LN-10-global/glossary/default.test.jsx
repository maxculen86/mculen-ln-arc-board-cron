import React from 'react';
import { render, screen } from '@testing-library/react';
import { useAppContext } from 'fusion:context';
import Glossary from '../../../../../components/features/LN-10-global/glossary/default';
import arrayData from '../../../../../__mocks__/data/glossary/arrayWords.json';

jest.mock('fusion:context', () => ({
    useAppContext: jest.fn()
}));

jest.mock(
    '../../../../../components/features/LN-10-global/glossary/components/dialog',
    () => ({
        __esModule: true,
        default: ({ glossaryData }) => (
            <div data-testid="dialog">{glossaryData.length}</div>
        )
    })
);
jest.mock(
    '../../../../../components/features/LN-10-global/glossary/components/tooltip',
    () => ({
        __esModule: true,
        default: ({ glossaryData }) => (
            <div data-testid="tooltip">{glossaryData.length}</div>
        )
    })
);
jest.mock(
    '../../../../../components/private/common/scriptManager/handleGlossary',
    () => ({
        __esModule: true,
        default: () => <div data-testid="handle-glossary-script" />
    })
);

describe('features - LN-10-GLOBAL - Glossary - default', () => {
    it('should render mocks correctly', () => {
        useAppContext.mockReturnValue({
            globalContent: {
                promo_items: {
                    glossary: {
                        embed: {
                            config: {
                                arrayData: arrayData
                            }
                        }
                    }
                }
            }
        });

        render(<Glossary />);
        expect(screen.getByTestId('dialog')).toBeInTheDocument();
        expect(screen.getByTestId('tooltip')).toBeInTheDocument();
        expect(
            screen.getByTestId('handle-glossary-script')
        ).toBeInTheDocument();
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

        const { container } = render(<Glossary />);
        expect(container.firstChild).toBeNull();
    });
});
