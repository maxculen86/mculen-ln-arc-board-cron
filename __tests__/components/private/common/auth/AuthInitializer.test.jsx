import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import AuthInitializer from '../../../../../components/private/common/auth/AuthInitializer';
import initializeAuth, {
    initializeGoogleOneTap
} from '../../../../../components/private/common/auth/helper/loginHelper';

jest.mock('../../../../../components/private/common/auth/helper/loginHelper');

describe('components - private - common - auth - AuthInitializer', () => {
    let dispatchEventSpy;

    beforeEach(() => {
        jest.clearAllMocks();
        delete window.UCL;
        dispatchEventSpy = jest.spyOn(window, 'dispatchEvent');
    });

    afterEach(() => {
        dispatchEventSpy.mockRestore();
        delete window.UCL;
    });

    it('should render children', () => {
        initializeAuth.mockResolvedValue(undefined);

        render(
            <AuthInitializer>
                <div>Test Content</div>
            </AuthInitializer>
        );

        expect(screen.getByText('Test Content')).toBeInTheDocument();
    });

    it('should initialize Google One Tap for LN after UCL is ready', async () => {
        initializeAuth.mockImplementation(async () => {
            window.UCL = {};
        });
        initializeGoogleOneTap.mockResolvedValue(undefined);

        render(
            <AuthInitializer>
                <div>Test Content</div>
            </AuthInitializer>
        );

        await waitFor(() => {
            expect(initializeGoogleOneTap).toHaveBeenCalledWith('la-nacion-ar');
        });

        expect(dispatchEventSpy).toHaveBeenCalledWith(expect.any(CustomEvent));
        expect(
            dispatchEventSpy.mock.calls.some(
                ([event]) => event.type === 'ucl-ready'
            )
        ).toBe(true);
    });

    it('should not initialize Google One Tap directly for non-LN websites', async () => {
        initializeAuth.mockImplementation(async () => {
            window.UCL = {};
        });
        initializeGoogleOneTap.mockResolvedValue(undefined);

        render(
            <AuthInitializer website="foodit">
                <div>Test Content</div>
            </AuthInitializer>
        );

        await waitFor(() => {
            expect(dispatchEventSpy).toHaveBeenCalledWith(
                expect.any(CustomEvent)
            );
        });

        expect(initializeGoogleOneTap).toHaveBeenCalledWith('foodit');
    });

    it('should not fail when Google One Tap is unavailable', async () => {
        initializeAuth.mockImplementation(async () => {
            window.UCL = {};
        });

        render(
            <AuthInitializer>
                <div>Test Content</div>
            </AuthInitializer>
        );

        await waitFor(() => {
            expect(dispatchEventSpy).toHaveBeenCalledWith(
                expect.any(CustomEvent)
            );
        });
    });
});
