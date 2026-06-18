import React from 'react';
import { render, screen } from '@testing-library/react';
import { EmptyState } from '../../../../../../components/features/LN-acumulado/chatIa/components/EmptyState';

jest.mock('fusion:environment', () => ({
    LOGIN_URL: 'https://login.example.com/?url=',
    SITIO_SEGURO_REGISTRACION: 'https://secure.example.com'
}));

jest.mock(
    '../../../../../../components/features/LN/common/bannerMessage/default',
    () => jest.fn(props => <div data-testid="banner-message" {...props} />)
);

jest.mock(
    '../../../../../../components/features/LN/common/iconSubscribe/default',
    () => jest.fn(() => <div data-testid="icon-subscribe" />)
);

const BannerMessage = require('../../../../../../components/features/LN/common/bannerMessage/default');

describe('EmptyState', () => {
    describe('when isSubscribed is true', () => {
        it('renders subscriber icon and message', () => {
            render(<EmptyState isSubscribed />);

            expect(screen.getByTestId('icon-subscribe')).toBeInTheDocument();
            expect(
                screen.getByText('Nueva herramienta para suscriptores.')
            ).toBeInTheDocument();
        });

        it('does not render BannerMessage', () => {
            render(<EmptyState isSubscribed />);

            expect(
                screen.queryByTestId('banner-message')
            ).not.toBeInTheDocument();
        });
    });

    describe('when isSubscribed is false', () => {
        it('renders BannerMessage with correct static props', () => {
            render(<EmptyState isSubscribed={false} />);

            expect(BannerMessage).toHaveBeenCalledWith(
                expect.objectContaining({
                    subtitle:
                        'Iniciá sesión o suscribite para interactuar con LA NACION IA.',
                    badge: { onlySuscriptors: true },
                    className: 'xl:col-span-10'
                }),
                undefined
            );
        });

        it('does not render subscriber content', () => {
            render(<EmptyState isSubscribed={false} />);

            expect(
                screen.queryByTestId('icon-subscribe')
            ).not.toBeInTheDocument();
            expect(
                screen.queryByText('Nueva herramienta para suscriptores.')
            ).not.toBeInTheDocument();
        });

        it('builds URLs using the encoded current location', () => {
            const encodedUrl = window.btoa(window.location.href);

            render(<EmptyState isSubscribed={false} />);

            expect(BannerMessage).toHaveBeenCalledWith(
                expect.objectContaining({
                    secondaryUrl: `https://login.example.com/?url=${encodedUrl}`,
                    specialUrl: `https://secure.example.com/ln/suscribirme?callback=${encodedUrl}`
                }),
                undefined
            );
        });
    });

    it('matches snapshot when isSubscribed is true', () => {
        const { container } = render(<EmptyState isSubscribed />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('matches snapshot when isSubscribed is false', () => {
        const { container } = render(<EmptyState isSubscribed={false} />);
        expect(container.firstChild).toMatchSnapshot();
    });
});
