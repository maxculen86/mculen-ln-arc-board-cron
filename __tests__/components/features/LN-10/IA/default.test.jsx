import React from 'react';
import { fireEvent, render } from '@testing-library/react';
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

        window.LN = {
            observable: {
                subscribe: jest.fn((event, callback) => {
                    if (event === 'showIa') {
                        callback({ show: true });
                    }
                }),
                unsubscribe: jest.fn()
            }
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
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
        const { queryByTestId, getByText } = render(
            <LnIa customFields={{ hideSummary: true, hideGlossary: false }} />
        );

        fireEvent.click(getByText('Glosario'));

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

    it('renders summary by default when both glossary and summary are available', () => {
        useTermica.mockReturnValue(true);
        const { queryByTestId } = render(
            <LnIa customFields={{ hideSummary: false, hideGlossary: false }} />
        );

        expect(queryByTestId('summary-note')).toBeInTheDocument();
        expect(queryByTestId('collapse')).toBeNull();
    });

    it('switches back to summary when summary button is clicked after switching to glossary', () => {
        useTermica.mockReturnValue(true);
        const { getByText, queryByTestId } = render(
            <LnIa customFields={{ hideSummary: false, hideGlossary: false }} />
        );

        fireEvent.click(getByText('Glosario'));
        expect(queryByTestId('collapse')).toBeInTheDocument();
        expect(queryByTestId('summary-note')).toBeNull();

        fireEvent.click(getByText('Resumen de la nota'));
        expect(queryByTestId('summary-note')).toBeInTheDocument();
        expect(queryByTestId('collapse')).toBeNull();
    });
});
