import React from 'react';
import { render } from '@testing-library/react';
import Resumen from '../../../../../components/features/LN-common/resumen/default';
import useTermica from '../../../../../components/private/common/hooks/useTermica';
import '@testing-library/jest-dom';

jest.mock('fusion:context', () => ({
    useAppContext: () => ({
        globalContent: {
            promo_items: {
                summary: {
                    embed: {
                        config: {
                            arrayBullets: ['This', 'array', 'bullets', 'here']
                        }
                    }
                }
            }
        }
    })
}));

jest.mock('../../../../../components/private/common/hooks/useTermica', () =>
    jest.fn()
);

describe('Resumen component', () => {
    it('renders SummaryNote inside StaticContent when thermalSummary is true and hide is false', () => {
        useTermica.mockImplementation(() => true);
        const customFields = { hide: false };
        const { getByTestId } = render(<Resumen customFields={customFields} />);

        const summaryNote = getByTestId('summary-note');
        expect(summaryNote).toBeInTheDocument();
    });
});
