import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import LoginSubscribeButtons from '../../../../../../components/features/foodit-global/common/SubscribeLoginButton/foodit';
import useGetUserConfig from '../../../../../../components/features/foodit-global/hooks/useGetUserConfig';
import EmptyState from '../../../../../../components/features/foodit-global/common/emptyState/foodit';
import { addEventToDataLayerV2 } from '../../../../../../components/private/LN/common/utils/addEventToDataLayer';

jest.mock('fusion:content');
jest.mock(
    '../../../../../../components/features/foodit-global/hooks/useGetUserConfig'
);

jest.mock('fusion:environment', () => ({
    FOODIT_LOGIN_URL: 'https://login.test/',
    SITIO_SEGURO_REGISTRACION: 'https://register.test'
}));

jest.mock(
    '../../../../../../components/private/LN/common/utils/addEventToDataLayer',
    () => ({
        addEventToDataLayerV2: jest.fn()
    })
);

describe('LoginSubscribeButtons', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        delete window.location;
        window.location = { href: 'http://test.com' };
        window.btoa = jest.fn(() => 'encoded-url');
    });

    const mockUserConfig = (userType = 'guest') => {
        useGetUserConfig.mockReturnValue({
            promotions: {
                buttonLogginText:
                    userType === 'guest' ? 'Iniciá sesión' : 'Login',
                buttonSubscribeText:
                    userType === 'guest' ? 'Suscribite' : 'Subscribe',
                buttonSubscribeHeader:
                    userType === 'guest' ? 'SUSCRIBITE GRATIS' : 'Subscribe'
            },
            userType
        });
    };

    describe('Tooltip behavior', () => {
        it('should display the tooltip with the exact text when userType is "unlogged"', async () => {
            mockUserConfig('unlogged');

            const termicasData = {
                tooltip_subscribe_foodit_text: 'Subscribe now!!!',
                tooltip_subscribe_foodit_show: 'true'
            };

            render(<LoginSubscribeButtons termicasData={termicasData} />);

            await waitFor(() => {
                expect(screen.getByRole('tooltip')).toBeInTheDocument();
                expect(
                    screen.getByText('Subscribe now!!!')
                ).toBeInTheDocument();
            });
        });

        it('should display the tooltip with the exact text when userType is "logged"', async () => {
            mockUserConfig('logged');

            const termicasData = {
                tooltip_subscribe_foodit_text: 'Subscribe now!!!',
                tooltip_subscribe_foodit_show: 'true'
            };

            render(<LoginSubscribeButtons termicasData={termicasData} />);

            await waitFor(() => {
                expect(screen.getByRole('tooltip')).toBeInTheDocument();
                expect(
                    screen.getByText('Subscribe now!!!')
                ).toBeInTheDocument();
            });
        });

        it('should not show button subscribe if hide_subscribe_button_foodit is "true"', () => {
            mockUserConfig('unlogged');

            const termicasData = {
                hide_subscribe_button_foodit: 'true'
            };

            render(<LoginSubscribeButtons termicasData={termicasData} />);

            expect(
                screen.queryByTestId('button-suscribe')
            ).not.toBeInTheDocument();
        });

        it('should show button subscribe if hide_subscribe_button_foodit is "false"', () => {
            mockUserConfig('unlogged');

            const termicasData = {
                hide_subscribe_button_foodit: 'false'
            };

            render(<LoginSubscribeButtons termicasData={termicasData} />);

            expect(screen.queryByTestId('button-suscribe')).toBeInTheDocument();
        });

        it('should not show tooltip if tooltip_subscribe_foodit_show is "false" and userType is "unlogged"', () => {
            mockUserConfig('unlogged');

            const termicasData = {
                tooltip_subscribe_foodit_text: 'Subscribe now!!!',
                tooltip_subscribe_foodit_show: 'false'
            };

            render(<LoginSubscribeButtons termicasData={termicasData} />);

            expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
            expect(screen.getByTitle('Subscribe')).toBeInTheDocument();
        });

        it('should not show tooltip if tooltip_subscribe_foodit_show is "false" and userType is "logged"', () => {
            mockUserConfig('logged');

            const termicasData = {
                tooltip_subscribe_foodit_text: 'Subscribe now!!!',
                tooltip_subscribe_foodit_show: 'false'
            };

            render(<LoginSubscribeButtons termicasData={termicasData} />);

            expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
            expect(screen.getByTitle('Subscribe')).toBeInTheDocument();
        });

        it('should not show tooltip if termicasData is empty and userType is "unlogged"', () => {
            mockUserConfig('unlogged');

            render(<LoginSubscribeButtons termicasData={{}} />);

            expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
            expect(screen.getByTitle('Subscribe')).toBeInTheDocument();
        });

        it('should not show tooltip if termicasData is empty and userType is "logged"', () => {
            mockUserConfig('logged');

            render(<LoginSubscribeButtons termicasData={{}} />);

            expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
            expect(screen.getByTitle('Subscribe')).toBeInTheDocument();
        });

        it('should not display tooltip when userType is "subscribed"', () => {
            mockUserConfig('subscribed');

            render(<LoginSubscribeButtons />);

            expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
        });
    });

    describe('Button rendering', () => {
        it('should not render login button for SaleBox', () => {
            mockUserConfig();

            render(<LoginSubscribeButtons comesFrom="SaleBox" />);

            expect(
                screen.queryByRole('button', {
                    name: /iniciá sesión/i
                })
            ).not.toBeInTheDocument();

            expect(
                screen.getByRole('button', {
                    name: /Empezá hoy/i
                })
            ).toBeInTheDocument();
        });
    });

    describe('URL generation and redirection', () => {
        beforeEach(() => {
            mockUserConfig();
        });

        test.each([
            [
                'DialogFoodit',
                'modal_funcionalidades',
                '/suscripcion/V/4/?cv=670&fc=826&callback='
            ],
            ['SaleBox', 'home', '/suscripcion/V/4/?cv=670&fc=831&callback='],
            ['HeaderFoodit', 'header', '/suscripcion/V/3/?callback='],
            [
                'AnythingElse',
                'paginas_exclusivas',
                '/suscripcion/V/4/?cv=670&fc=826&callback='
            ]
        ])(
            'fires correct dataLayer event and builds URL for comesFrom="%s"',
            async (comesFrom, expectedEvent, expectedUrlStart) => {
                render(<LoginSubscribeButtons comesFrom={comesFrom} />);

                const subscribeButton = screen.getByTestId('button-suscribe');
                fireEvent.click(subscribeButton);

                expect(addEventToDataLayerV2).toHaveBeenCalledWith({
                    event: 'subscription_start',
                    button: expectedEvent
                });

                await new Promise(resolve => requestAnimationFrame(resolve));

                expect(window.location.href).toBe(
                    `https://register.test${expectedUrlStart}encoded-url`
                );
            }
        );
    });

    describe('Login button redirection', () => {
        beforeEach(() => {
            mockUserConfig();
        });

        it.each([
            ['DialogFoodit', 'modal_funcionalidades'],
            ['HeaderFoodit', 'header'],
            ['AnythingElse', 'paginas_exclusivas']
        ])(
            'should redirect to login URL for comesFrom="%s"',
            async (comesFrom, expectedCategory) => {
                render(<LoginSubscribeButtons comesFrom={comesFrom} />);

                const loginButton = screen.getByRole('button', {
                    name: /iniciá sesión/i
                });
                fireEvent.click(loginButton);

                expect(addEventToDataLayerV2).toHaveBeenCalledWith({
                    event: 'e_linkclick',
                    action: 'N/A',
                    category: expectedCategory,
                    label: 'inicia_sesion'
                });

                await new Promise(resolve => requestAnimationFrame(resolve));

                expect(window.location.href).toBe(
                    'https://login.test/encoded-url'
                );
            }
        );
    });
});
