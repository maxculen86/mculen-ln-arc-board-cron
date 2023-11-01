import React from 'react';
import { render } from '@testing-library/react';
import Resumen from '../../../../../components/features/LN-common/resumen/default';
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

describe('Resumen component', () => {
    it('renders SummaryNote inside StaticContent when hide prop is false', () => {
        const customFields = { hide: false };
        const { getByTestId } = render(<Resumen customFields={customFields} />);

        const summaryNote = getByTestId('summary-note');
        expect(summaryNote).toBeInTheDocument();
    });

    it('does not render SummaryNote inside StaticContent when hide prop is true', () => {
        const customFields = { hide: true };
        const { queryByTestId } = render(
            <Resumen customFields={customFields} />
        );

        const summaryNote = queryByTestId('summary-note');
        expect(summaryNote).not.toBeInTheDocument();
    });
});
