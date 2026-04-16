import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { NewsletterFoodit } from '../../../../../../components/features/foodit-global/common/Newsletter/foodit';

const mockGetNewsletters = jest.fn();
let mockToken = 'tok123';
let mockAccessToken = 'Bearer abc';

jest.mock(
    '../../../../../../components/features/foodit-global/common/Newsletter/helpers/helpers',
    () => ({
        getNewsletters: (...args) => mockGetNewsletters(...args),
        newsletters: [
            {
                id: 243,
                title: 'Planifica tu semana',
                badge: 'LUNES',
                description: 'Descripcion newsletter 1',
                image: 'https://example.com/foodit.jpg'
            },
            {
                id: 244,
                title: 'Newsletter Foodit veggie',
                badge: 'MIERCOLES',
                description: 'Descripcion newsletter 2',
                image: 'https://example.com/veggie.jpg'
            }
        ]
    })
);

jest.mock(
    '../../../../../../components/private/common/auth/hooks/useAuthManager',
    () => ({
        __esModule: true,
        default: () => ({ token: mockToken, accessToken: mockAccessToken })
    })
);

jest.mock(
    '../../../../../../components/features/foodit-global/common/Newsletter/CardNewsletter',
    () => ({
        CardNewsletter: ({ title, id, suscribed }) => (
            <div data-testid={`card-${id}`}>
                <span>{title}</span>
                <span data-testid={`suscribed-${id}`}>{String(suscribed)}</span>
            </div>
        )
    })
);

jest.mock(
    '../../../../../../components/features/foodit-global/common/RoofFoodit/foodit',
    () => ({
        RoofFoodit: ({ title }) => (
            <div data-testid="roof-foodit">{title?.text}</div>
        )
    })
);

describe('NewsletterFoodit', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        mockToken = 'tok123';
        mockAccessToken = 'Bearer abc';
        mockGetNewsletters.mockResolvedValue({});
    });

    it('renders a card for each newsletter', async () => {
        render(<NewsletterFoodit />);

        await waitFor(() => {
            expect(screen.getByTestId('card-243')).toBeInTheDocument();
            expect(screen.getByTestId('card-244')).toBeInTheDocument();
        });
    });

    it('calls getNewsletters when both tokens are available', async () => {
        render(<NewsletterFoodit />);

        await waitFor(() => {
            expect(mockGetNewsletters).toHaveBeenCalledWith({
                accessToken: 'Bearer abc',
                token: 'tok123'
            });
        });
    });

    it('does not call getNewsletters when tokens are missing', () => {
        mockToken = null;
        mockAccessToken = null;

        render(<NewsletterFoodit />);
        expect(mockGetNewsletters).not.toHaveBeenCalled();
    });

    it('passes correct suscribed prop to each card', async () => {
        mockGetNewsletters.mockResolvedValueOnce({ 243: true, 244: false });

        render(<NewsletterFoodit />);

        await waitFor(() => {
            expect(screen.getByTestId('suscribed-243').textContent).toBe(
                'true'
            );
            expect(screen.getByTestId('suscribed-244').textContent).toBe(
                'false'
            );
        });
    });

    it('renders cards with undefined suscribed when getNewsletters fails', async () => {
        mockGetNewsletters.mockRejectedValueOnce(new Error('Network error'));

        render(<NewsletterFoodit />);

        await waitFor(() => {
            expect(screen.getByTestId('card-243')).toBeInTheDocument();
            expect(screen.getByTestId('suscribed-243').textContent).toBe(
                'undefined'
            );
        });
    });
});
