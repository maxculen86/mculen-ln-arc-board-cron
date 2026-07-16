import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SingWall from '../../../../../../components/features/foodit-global/common/singWall/foodit';
import useGetUserConfig from '../../../../../../components/features/foodit-global/hooks/useGetUserConfig';
import { addEventToDataLayerV2 } from '../../../../../../components/private/LN/common/utils/addEventToDataLayer';

jest.mock(
    '../../../../../../components/features/foodit-global/hooks/useGetUserConfig'
);
jest.mock(
    '../../../../../../components/private/LN/common/utils/addEventToDataLayer',
    () => ({
        addEventToDataLayerV2: jest.fn()
    })
);

describe('SingWall Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        useGetUserConfig.mockReturnValue({
            userType: 'guest',
            promotions: {
                buttonSubscribeText: 'Suscribite'
            }
        });
    });

    test('renders subscription message and button', () => {
        render(<SingWall />);

        expect(
            screen.getByText('Este contenido es exclusivo para suscriptores.')
        ).toBeInTheDocument();
        expect(
            screen.getByText(
                'Suscribite a Foodit para ingresar y accedé a miles de ideas para cocinar mejor.'
            )
        ).toBeInTheDocument();

        const subscribeLink = screen.getByRole('link', { name: /suscribite/i });
        expect(subscribeLink).toBeInTheDocument();
    });

    test('renders login button if user is not logged in', () => {
        render(<SingWall />);

        const loginLink = screen.getByRole('link', { name: /iniciá sesión/i });
        expect(loginLink).toBeInTheDocument();
    });

    test('does not render login button if user is logged in', () => {
        useGetUserConfig.mockReturnValue({
            userType: 'logged',
            promotions: {
                buttonSubscribeText: 'Suscribite'
            }
        });

        render(<SingWall />);
        expect(
            screen.queryByRole('link', { name: /iniciá sesión/i })
        ).not.toBeInTheDocument();
    });

    test('adds event to data layer when subscribe link is clicked', () => {
        render(<SingWall />);
        const subscribeLink = screen.getByRole('link', { name: /suscribite/i });

        fireEvent.click(subscribeLink);

        expect(addEventToDataLayerV2).toHaveBeenCalledWith({
            event: 'subscription_start',
            button: 'soft_paywall'
        });
    });

    test('renders subscription link with correct href', () => {
        render(<SingWall />);

        const subscribeLink = screen.getByRole('link', { name: /suscribite/i });
        expect(subscribeLink).toHaveAttribute(
            'href',
            expect.stringContaining('/foodit/suscribirme')
        );
    });

    test('renders login link with any href if user is not logged in', () => {
        render(<SingWall />);

        const loginLink = screen.getByRole('link', { name: /iniciá sesión/i });
        expect(loginLink).toHaveAttribute('href', expect.any(String));
    });
});
