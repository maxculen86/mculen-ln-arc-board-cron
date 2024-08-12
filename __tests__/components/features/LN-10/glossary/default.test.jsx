import React from 'react';
import { render, screen } from '@testing-library/react';
import { useAppContext } from 'fusion:context';
import Glossary from '../../../../../components/features/LN-10/glossary/default';
import arrayData from '../../../../../__mocks__/data/glossary/arrayWords.json';

jest.mock('fusion:context', () => ({
    useAppContext: jest.fn()
}));

jest.mock('../../../../../components/features/LN-10/glossary/collapse', () => ({
    Collapse: ({ glossaryData }) => (
        <div data-testid="collapse">{glossaryData.length}</div>
    )
}));

describe('features - LN-common - Glossary - default', () => {
    it('should render Collapse, Dialog, and Tooltip components when glossaryData is present', () => {
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

        render(<Glossary customFields={{ hide: false }} />);

        expect(screen.getByTestId('collapse')).toBeInTheDocument();
    });

    it('should not render anything when hide is true', () => {
        render(<Glossary customFields={{ hide: true }} />);

        expect(screen.queryByTestId('collapse')).not.toBeInTheDocument();
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
    });
});
