import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import DrawerSections from '../../../../../../components/features/foodit-global/common/DrawerSections/foodit';

jest.mock('@ln/ds-common-drawer', () => {
    const original = jest.requireActual('@ln/ds-common-drawer');

    // IMPORTANTE: mantenemos Drawer real pero reemplazamos Portal
    const Drawer = props => <div data-testid="drawer-root" {...props} />;
    Drawer.Portal = ({ children }) => <>{children}</>;
    Drawer.Overlay = ({ children, ...props }) => (
        <div data-testid="drawer-overlay" {...props}>
            {children}
        </div>
    );
    Drawer.Content = ({ children, ...props }) => (
        <div data-testid="drawer-content" {...props}>
            {children}
        </div>
    );
    Drawer.Body = ({ children, ...props }) => (
        <div data-testid="drawer-body" {...props}>
            {children}
        </div>
    );

    return {
        ...original,
        Drawer,
        useDrawerVisibility: () => ({ isOpen: true }),
        drawerManager: { show: jest.fn(), hide: jest.fn() }
    };
});

jest.mock(
    '../../../../../../components/features/foodit-global/common/bookmark/api/_helper',
    () => ({
        addToast: jest.fn(),
        TOAST: {
            SUCCESS: {
                VARIANT: 'success',
                TITLE: 'Success',
                MESSAGE: { SEND_NEWSLETTER: 'Newsletter enviado' }
            }
        }
    })
);

const mockPostNewsletter = jest.fn();
jest.mock(
    '../../../../../../components/features/foodit-global/common/Newsletter/helpers/helpers',
    () => ({
        postNewsletter: (...args) => mockPostNewsletter(...args)
    })
);

jest.mock(
    '../../../../../../components/private/common/auth/helper/loginHelper',
    () => ({
        getAuthTokens: jest.fn().mockResolvedValue({
            accessToken: 'Bearer abc',
            token: 'tok123'
        })
    })
);

const mockAddEventToDataLayerV2 = jest.fn();
jest.mock(
    '../../../../../../components/private/LN/common/utils/addEventToDataLayer',
    () => ({
        addEventToDataLayerV2: (...args) => mockAddEventToDataLayerV2(...args)
    })
);

const dispatchNewsletterEvent = detail =>
    fireEvent(window, new CustomEvent('newsletterSelected', { detail }));

describe('DrawerSections', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders correctly (snapshot)', async () => {
        const { container } = render(<DrawerSections />);
        dispatchNewsletterEvent({ id: 243, title: 'Test Newsletter' });
        expect(container).toMatchSnapshot();
    });

    it('dispatches one dataLayer event per newsletter on successful subscription', async () => {
        mockPostNewsletter.mockResolvedValueOnce({ ok: true });
        render(<DrawerSections />);

        dispatchNewsletterEvent({
            id: 243,
            title: 'Planificá tu semana',
            selected: true,
            category: 'receta'
        });
        dispatchNewsletterEvent({
            id: 244,
            title: 'Newsletter Foodit veggie',
            selected: true,
            category: 'receta'
        });

        const emailInput = screen.getByPlaceholderText('Ingresá el mail');
        fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
        fireEvent.click(screen.getByText('Recibir newsletters'));

        await waitFor(() => {
            expect(mockAddEventToDataLayerV2).toHaveBeenCalledTimes(2);
            expect(mockAddEventToDataLayerV2).toHaveBeenCalledWith({
                event: 'e_linkclick',
                action: 'newsletter',
                category: 'receta',
                label: 'Planificá tu semana'
            });
            expect(mockAddEventToDataLayerV2).toHaveBeenCalledWith({
                event: 'e_linkclick',
                action: 'newsletter',
                category: 'receta',
                label: 'Newsletter Foodit veggie'
            });
        });
    });

    it('does not dispatch dataLayer event when subscription fails', async () => {
        mockPostNewsletter.mockResolvedValueOnce({ ok: false });
        render(<DrawerSections />);

        dispatchNewsletterEvent({
            id: 243,
            title: 'Planificá tu semana',
            selected: true,
            category: 'nota'
        });

        const emailInput = screen.getByPlaceholderText('Ingresá el mail');
        fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
        fireEvent.click(screen.getByText('Recibir newsletter'));

        await waitFor(() => {
            expect(mockPostNewsletter).toHaveBeenCalled();
        });

        expect(mockAddEventToDataLayerV2).not.toHaveBeenCalled();
    });
});
