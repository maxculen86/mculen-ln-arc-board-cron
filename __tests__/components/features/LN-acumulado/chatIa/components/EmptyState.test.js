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
    describe('when the user is subscribed', () => {
        it('should render the subscriber icon', () => {
            render(<EmptyState isSubscribed />);

            expect(screen.getByTestId('icon-subscribe')).toBeInTheDocument();
        });

        it('should render the subscriber message', () => {
            render(<EmptyState isSubscribed />);

            expect(
                screen.getByText('Nueva herramienta para suscriptores.')
            ).toBeInTheDocument();
        });

        it('should not render the paywall banner', () => {
            render(<EmptyState isSubscribed />);

            expect(
                screen.queryByTestId('banner-message')
            ).not.toBeInTheDocument();
        });
    });

    describe('when the user is not subscribed', () => {
        it('should render the paywall banner with its static props', () => {
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

        it('should build the login and subscribe urls from the encoded location', () => {
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

        it('should not render the subscriber icon', () => {
            render(<EmptyState isSubscribed={false} />);

            expect(
                screen.queryByTestId('icon-subscribe')
            ).not.toBeInTheDocument();
        });

        it('should not render the subscriber message', () => {
            render(<EmptyState isSubscribed={false} />);

            expect(
                screen.queryByText('Nueva herramienta para suscriptores.')
            ).not.toBeInTheDocument();
        });
    });

    describe('snapshots', () => {
        it('should match snapshot when the user is subscribed', () => {
            const { container } = render(<EmptyState isSubscribed />);
            expect(container.firstChild).toMatchSnapshot();
        });

        it('should match snapshot when the user is not subscribed', () => {
            const { container } = render(<EmptyState isSubscribed={false} />);
            expect(container.firstChild).toMatchSnapshot();
        });
    });
});
