import React from 'react';
import { render, screen } from '@testing-library/react';
import { useAppContext } from 'fusion:context';
import LnIa from '../../../../../components/features/LN-10/IA/default';
import useTermica from '../../../../../components/private/common/hooks/useTermica';

jest.mock('fusion:context', () => ({
    useAppContext: jest.fn()
}));

jest.mock('../../../../../components/private/common/hooks/useTermica');

jest.mock(
    '../../../../../components/private/common/containerValidation',
    () => ({
        __esModule: true,
        default: ({ children }) => <div>{children}</div>
    })
);

jest.mock(
    '../../../../../components/features/LN/common/iaSummary/default',
    () => ({
        __esModule: true,
        default: () => <div>IaSummary</div>
    })
);

const globalContentWithSummary = {
    promo_items: {
        summary: {
            embed: { config: { arrayBullets: ['bullet1', 'bullet2'] } }
        }
    }
};

describe('features - LN-10 - IA - default', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        useTermica.mockReturnValue(true);
        useAppContext.mockReturnValue({
            globalContent: globalContentWithSummary,
            layout: 'Nota'
        });
    });

    it('renders IaSummary when summary is available and enabled', () => {
        render(<LnIa />);

        expect(screen.getByText('IaSummary')).toBeInTheDocument();
    });

    it('does not render when the summary thermal is disabled', () => {
        useTermica.mockReturnValue(false);

        render(<LnIa />);

        expect(screen.queryByText('IaSummary')).toBeNull();
    });

    it('does not render when there is no summary data', () => {
        useAppContext.mockReturnValue({
            globalContent: {},
            layout: 'Nota'
        });

        render(<LnIa />);

        expect(screen.queryByText('IaSummary')).toBeNull();
    });

    it('matches the snapshot when IaSummary is rendered', () => {
        const { asFragment } = render(<LnIa />);

        expect(asFragment()).toMatchSnapshot();
    });
});
