import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { NewsletterSubscriptionButton } from '../../../../../../components/features/foodit-global/common/Newsletter/components/NewsletterSubscriptionButton';

const mockAddToast = jest.fn();
const mockPostNewsletter = jest.fn();
const mockGetAuthTokens = jest.fn();

jest.mock(
    '../../../../../../components/features/foodit-global/common/Newsletter/components/NewsletterActionButtons',
    () => ({
        NewsletterActionButton: ({ selected, onClick, labelOn, labelOff }) => (
            <button data-testid="action-button" onClick={onClick}>
                {selected ? labelOn : labelOff}
            </button>
        )
    })
);

jest.mock(
    '../../../../../../components/features/foodit-global/common/bookmark/api/_helper',
    () => ({
        addToast: (...args) => mockAddToast(...args),
        TOAST: {
            SUCCESS: {
                VARIANT: 'success',
                TITLE: '¡Listo!',
                MESSAGE: {
                    SEND_NEWSLETTER: 'Pronto recibirás nuestro newsletter.',
                    UNSUBSCRIBE_NEWSLETTER:
                        'Ya no recibirás nuestro newsletter.'
                }
            },
            ERROR: {
                VARIANT: 'error',
                TITLE: 'Error',
                MESSAGE: { GENERIC: 'Ocurrió un error.' }
            }
        }
    })
);

jest.mock(
    '../../../../../../components/private/common/auth/helper/loginHelper',
    () => ({
        getAuthTokens: (...args) => mockGetAuthTokens(...args)
    })
);

jest.mock(
    '../../../../../../components/features/foodit-global/common/Newsletter/helpers/helpers',
    () => ({
        postNewsletter: (...args) => mockPostNewsletter(...args)
    })
);

const mockAddEventToDataLayerV2 = jest.fn();
jest.mock(
    '../../../../../../components/private/LN/common/utils/addEventToDataLayer',
    () => ({
        addEventToDataLayerV2: (...args) => mockAddEventToDataLayerV2(...args)
    })
);

describe('NewsletterSubscriptionButton', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        mockGetAuthTokens.mockResolvedValue({
            accessToken: 'Bearer abc',
            token: 'tok123'
        });
    });

    it('renders "Recibir newsletter" when not subscribed', () => {
        render(<NewsletterSubscriptionButton id={243} suscribed={false} />);
        expect(screen.getByText('Recibir newsletter')).toBeInTheDocument();
    });

    it('renders "Recibiendo" when subscribed', () => {
        render(<NewsletterSubscriptionButton id={243} suscribed />);
        expect(screen.getByText('Recibiendo')).toBeInTheDocument();
    });

    it('calls postNewsletter with add:[id] when subscribing', async () => {
        mockPostNewsletter.mockResolvedValueOnce({ ok: true });
        render(<NewsletterSubscriptionButton id={243} suscribed={false} />);

        fireEvent.click(screen.getByTestId('action-button'));

        await waitFor(() => {
            expect(mockPostNewsletter).toHaveBeenCalledWith(
                expect.objectContaining({ add: [243], remove: [] })
            );
        });
    });

    it('calls postNewsletter with remove:[id] when unsubscribing', async () => {
        mockPostNewsletter.mockResolvedValueOnce({ ok: true });
        render(<NewsletterSubscriptionButton id={243} suscribed />);

        fireEvent.click(screen.getByTestId('action-button'));

        await waitFor(() => {
            expect(mockPostNewsletter).toHaveBeenCalledWith(
                expect.objectContaining({ add: [], remove: [243] })
            );
        });
    });

    it('toggles to subscribed state on successful subscribe', async () => {
        mockPostNewsletter.mockResolvedValueOnce({ ok: true });
        render(<NewsletterSubscriptionButton id={243} suscribed={false} />);

        fireEvent.click(screen.getByTestId('action-button'));

        await waitFor(() => {
            expect(screen.getByText('Recibiendo')).toBeInTheDocument();
        });
    });

    it('toggles to unsubscribed state on successful unsubscribe', async () => {
        mockPostNewsletter.mockResolvedValueOnce({ ok: true });
        render(<NewsletterSubscriptionButton id={243} suscribed />);

        fireEvent.click(screen.getByTestId('action-button'));

        await waitFor(() => {
            expect(screen.getByText('Recibir newsletter')).toBeInTheDocument();
        });
    });

    it('shows success toast after subscribing', async () => {
        mockPostNewsletter.mockResolvedValueOnce({ ok: true });
        render(<NewsletterSubscriptionButton id={243} suscribed={false} />);

        fireEvent.click(screen.getByTestId('action-button'));

        await waitFor(() => {
            expect(mockAddToast).toHaveBeenCalledWith(
                expect.objectContaining({
                    message: 'Pronto recibirás nuestro newsletter.'
                })
            );
        });
    });

    it('shows success toast after unsubscribing', async () => {
        mockPostNewsletter.mockResolvedValueOnce({ ok: true });
        render(<NewsletterSubscriptionButton id={243} suscribed />);

        fireEvent.click(screen.getByTestId('action-button'));

        await waitFor(() => {
            expect(mockAddToast).toHaveBeenCalledWith(
                expect.objectContaining({
                    message: 'Ya no recibirás nuestro newsletter.'
                })
            );
        });
    });

    it('does not toggle state when response is not ok', async () => {
        mockPostNewsletter.mockResolvedValueOnce({ ok: false });
        render(<NewsletterSubscriptionButton id={243} suscribed={false} />);

        fireEvent.click(screen.getByTestId('action-button'));

        await waitFor(() => {
            expect(mockPostNewsletter).toHaveBeenCalled();
        });

        expect(screen.getByText('Recibir newsletter')).toBeInTheDocument();
        expect(mockAddToast).not.toHaveBeenCalled();
    });

    it('dispatches dataLayer event when subscribing successfully', async () => {
        mockPostNewsletter.mockResolvedValueOnce({ ok: true });
        render(
            <NewsletterSubscriptionButton
                id={243}
                suscribed={false}
                title="Planificá tu semana"
                category="nota"
            />
        );

        fireEvent.click(screen.getByTestId('action-button'));

        await waitFor(() => {
            expect(mockAddEventToDataLayerV2).toHaveBeenCalledWith({
                event: 'e_linkclick',
                action: 'newsletter',
                category: 'nota',
                label: 'Planificá tu semana'
            });
        });
    });

    it('does not dispatch dataLayer event when unsubscribing', async () => {
        mockPostNewsletter.mockResolvedValueOnce({ ok: true });
        render(
            <NewsletterSubscriptionButton
                id={243}
                suscribed
                title="Planificá tu semana"
                category="nota"
            />
        );

        fireEvent.click(screen.getByTestId('action-button'));

        await waitFor(() => {
            expect(mockPostNewsletter).toHaveBeenCalled();
        });

        expect(mockAddEventToDataLayerV2).not.toHaveBeenCalled();
    });

    it('shows error toast when postNewsletter throws', async () => {
        mockPostNewsletter.mockRejectedValueOnce(new Error('Network error'));
        render(<NewsletterSubscriptionButton id={243} suscribed={false} />);

        fireEvent.click(screen.getByTestId('action-button'));

        await waitFor(() => {
            expect(mockAddToast).toHaveBeenCalledWith(
                expect.objectContaining({ variant: 'error' })
            );
        });
    });
});
