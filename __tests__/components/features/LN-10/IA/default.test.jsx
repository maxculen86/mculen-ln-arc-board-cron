import React from 'react';
import { render, screen } from '@testing-library/react';
import { useAppContext } from 'fusion:context';
import arrayData from '../../../../../__mocks__/data/glossary/arrayWords.json';
import useTermica from '../../../../../components/private/common/hooks/useTermica';
import LnIa from '../../../../../components/features/LN-10/IA/default';

jest.mock('fusion:context', () => ({
    useAppContext: jest.fn()
}));

jest.mock('../../../../../components/private/common/hooks/useTermica', () =>
    jest.fn()
);

jest.mock('../../../../../components/features/LN-10/glossary/collapse', () => ({
    Collapse: ({ glossaryData }) => (
        <div data-testid="collapse">{glossaryData.length}</div>
    )
}));

describe('features - LN-common - IA - default', () => {
    beforeEach(() => {
        useAppContext.mockReturnValue({
            globalContent: {
                promo_items: {
                    glossary: {
                        embed: {
                            config: {
                                arrayData: arrayData
                            }
                        }
                    },
                    summary: {
                        embed: {
                            config: {
                                arrayBullets: [
                                    'This',
                                    'array',
                                    'bullets',
                                    'here'
                                ]
                            }
                        }
                    }
                }
            }
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders glossary and summary when both are enabled', () => {
        useTermica.mockReturnValue(true);
        const { getByTestId } = render(
            <LnIa customFields={{ hideSummary: false, hideGlossary: false }} />
        );

        expect(screen.getByTestId('collapse')).toBeInTheDocument();
        expect(getByTestId('summary-note')).toBeInTheDocument();
    });

    it('does not render glossary when hideGlossary is true', () => {
        useTermica.mockImplementation(feature => feature === 'resumen_nota');
        const { queryByTestId } = render(
            <LnIa customFields={{ hideSummary: false, hideGlossary: true }} />
        );

        expect(queryByTestId('collapse')).toBeNull();
        expect(queryByTestId('summary-note')).toBeInTheDocument();
    });

    it('does not render summary when hideSummary is true', () => {
        useTermica.mockImplementation(feature => feature === 'glosario');
        const { queryByTestId } = render(
            <LnIa customFields={{ hideSummary: true, hideGlossary: false }} />
        );

        expect(queryByTestId('collapse')).toBeInTheDocument();
        expect(queryByTestId('summary-note')).toBeNull();
    });

    it('renders nothing when both hideSummary and hideGlossary are true', () => {
        useTermica.mockReturnValue(true);
        const { container } = render(
            <LnIa customFields={{ hideSummary: true, hideGlossary: true }} />
        );

        expect(container).toBeEmptyDOMElement();
    });
});
