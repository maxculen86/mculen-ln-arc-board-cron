import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import LoginSubscribeButtons from '../../../../../../../../components/features/foodit-global/common/Header/components/LoginSubscribeButtons';
import useGetUserConfig from '../../../../../../../../components/features/foodit-global/hooks/useGetUserConfig';

jest.mock('fusion:content');
jest.mock(
    '../../../../../../../../components/features/foodit-global/hooks/useGetUserConfig'
);

// Mock environment variables
jest.mock('fusion:environment', () => ({
    FOODIT_LOGIN_URL: 'https://login.test/',
    SITIO_SEGURO_REGISTRACION: 'https://register.test'
}));

describe('LoginSubscribeButtons', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        delete window.location;
        window.location = { href: 'http://test.com' };
        window.btoa = jest.fn(str => str);
    });

    const mockUserConfig = userType => {
        useGetUserConfig.mockReturnValue({
            promotions: {
                buttonLogginText: 'Login',
                buttonSubscribeText: 'Subscribe'
            },
            userType
        });
    };

    it('should display the tooltip with the exact text when userType is "unlogged"', async () => {
        mockUserConfig('unlogged');

        const termicasData = {
            tooltip_subscribe_foodit_text: 'Subscribe now!!!',
            tooltip_subscribe_foodit_show: 'true'
        };

        render(<LoginSubscribeButtons termicasData={termicasData} />);

        await waitFor(() => {
            expect(screen.getByRole('tooltip')).toBeInTheDocument();
            expect(screen.getByText('Subscribe now!!!')).toBeInTheDocument();
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
            expect(screen.getByText('Subscribe now!!!')).toBeInTheDocument();
        });
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

    it('should always render login button regardless of userType', () => {
        mockUserConfig('unlogged');

        render(<LoginSubscribeButtons />);

        expect(screen.getByTitle('Login')).toBeInTheDocument();
    });
});
