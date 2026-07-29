import { waitFor } from '@testing-library/react';
import {
    loginViafoura,
    syncViafouraSession,
    syncWhenUclIsReady
} from '../../../../../components/features/foodit/CommentFoodit/_helper';
import dynamicallyLoadScript from '../../../../../components/private/LN/common/utils/dynamicallyLoadScript';
import { getAuthTokens } from '../../../../../components/private/common/auth/helper/loginHelper';

jest.mock(
    '../../../../../components/private/LN/common/utils/dynamicallyLoadScript'
);

jest.mock(
    '../../../../../components/private/common/auth/helper/loginHelper',
    () => ({
        getAuthTokens: jest.fn()
    })
);

jest.mock(
    '../../../../../components/features/foodit-global/common/utils/pushFooditEvent',
    () => ({
        pushFooditEvent: jest.fn()
    })
);

describe('Components - features - foodit - CommentFoodit - Helper', () => {
    let consoleErrorSpy;
    const baseParams = {
        outputType: 'foodit',
        subscription: true,
        setIsReady: jest.fn(),
        dataLayerInfo: {}
    };

    beforeEach(() => {
        jest.clearAllMocks();
        consoleErrorSpy = jest
            .spyOn(console, 'error')
            .mockImplementation(() => {});
        dynamicallyLoadScript.mockResolvedValue();
        window.vfQ = [];
        window.UCL = {};
        window.vf = {
            $subscribe: jest.fn(),
            $publish: jest.fn(),
            $prepublish: jest.fn(),
            session: {
                login: {
                    openIdConnect: jest.fn().mockResolvedValue()
                }
            }
        };
    });

    afterEach(() => {
        consoleErrorSpy.mockRestore();
        delete window.vfQ;
        delete window.vf;
        delete window.UCL;
    });

    describe('loginViafoura', () => {
        it('syncs the Viafoura session with OIDC', async () => {
            getAuthTokens.mockResolvedValue({ token: 'oidc-id-token' });

            await loginViafoura(baseParams);
            window.vfQ[0]();

            await waitFor(() => {
                expect(
                    window.vf.session.login.openIdConnect
                ).toHaveBeenCalledWith('oidc-id-token');
            });
        });

        it('registers a ucl-ready retry listener when UCL is not ready yet', async () => {
            const addEventListenerSpy = jest.spyOn(window, 'addEventListener');
            getAuthTokens.mockResolvedValue({ token: 'oidc-id-token' });
            delete window.UCL;

            await loginViafoura(baseParams);
            window.vfQ[0]();

            expect(addEventListenerSpy).toHaveBeenCalledWith(
                'ucl-ready',
                expect.any(Function),
                { once: true }
            );

            addEventListenerSpy.mockRestore();
        });

        it('logs an error when the Viafoura script fails to load', async () => {
            dynamicallyLoadScript.mockRejectedValue(new Error('script failed'));
            getAuthTokens.mockResolvedValue({ token: 'oidc-id-token' });

            await loginViafoura(baseParams);

            await waitFor(() => {
                expect(consoleErrorSpy).toHaveBeenCalledWith(
                    'Ocurrió un error al intentar cargar el script de viafoura',
                    expect.any(Error)
                );
            });
        });
    });

    describe('syncViafouraSession', () => {
        it('logs an error when the OIDC login fails', async () => {
            window.vf.session.login.openIdConnect.mockRejectedValue(
                new Error('oidc failed')
            );

            await syncViafouraSession({
                subscription: true,
                outputType: 'foodit',
                token: 'oidc-id-token'
            });

            expect(consoleErrorSpy).toHaveBeenCalledWith(
                'Viafoura OIDC Login incorrecto ',
                { error: expect.any(Error), outputType: 'foodit' }
            );
        });

        it('does nothing when there is no subscription', async () => {
            await syncViafouraSession({
                subscription: false,
                outputType: 'foodit',
                token: 'oidc-id-token'
            });

            expect(
                window.vf.session.login.openIdConnect
            ).not.toHaveBeenCalled();
        });

        it('does nothing when there is no token', async () => {
            await syncViafouraSession({
                subscription: true,
                outputType: 'foodit',
                token: undefined
            });

            expect(
                window.vf.session.login.openIdConnect
            ).not.toHaveBeenCalled();
        });

        it('does nothing when Viafoura has no openIdConnect login method', async () => {
            window.vf.session.login = {};

            await syncViafouraSession({
                subscription: true,
                outputType: 'foodit',
                token: 'oidc-id-token'
            });

            expect(consoleErrorSpy).not.toHaveBeenCalled();
        });
    });

    describe('syncWhenUclIsReady', () => {
        it('does not register a listener when UCL is already ready', () => {
            const addEventListenerSpy = jest.spyOn(window, 'addEventListener');

            syncWhenUclIsReady({
                subscription: true,
                outputType: 'foodit',
                token: 'oidc-id-token'
            });

            expect(addEventListenerSpy).not.toHaveBeenCalledWith(
                'ucl-ready',
                expect.any(Function),
                expect.anything()
            );

            addEventListenerSpy.mockRestore();
        });

        it('registers a one-time ucl-ready listener when UCL is not ready', () => {
            delete window.UCL;
            const addEventListenerSpy = jest.spyOn(window, 'addEventListener');

            syncWhenUclIsReady({
                subscription: true,
                outputType: 'foodit',
                token: 'oidc-id-token'
            });

            expect(addEventListenerSpy).toHaveBeenCalledWith(
                'ucl-ready',
                expect.any(Function),
                { once: true }
            );

            addEventListenerSpy.mockRestore();
        });
    });

    describe('$prepublish authentication handling', () => {
        const triggerPrepublish = async (...args) => {
            await loginViafoura(baseParams);
            window.vfQ[0]();

            const [handler] = window.vf.$prepublish.mock.calls[0];
            return handler(...args);
        };

        it('closes the tray and triggers UCL login when authentication is needed', async () => {
            getAuthTokens.mockResolvedValue({ token: 'oidc-id-token' });
            window.UCL.LoginAsync = jest.fn();

            const result = await triggerPrepublish('authentication', 'needed');

            expect(window.vf.$publish).toHaveBeenCalledWith('tray', 'close');
            expect(window.UCL.LoginAsync).toHaveBeenCalled();
            expect(result).toBe(false);
        });

        it('passes through any other channel/event untouched', async () => {
            getAuthTokens.mockResolvedValue({ token: 'oidc-id-token' });
            window.UCL.LoginAsync = jest.fn();

            const result = await triggerPrepublish('comment', 'created', 'foo');

            expect(window.vf.$publish).not.toHaveBeenCalled();
            expect(window.UCL.LoginAsync).not.toHaveBeenCalled();
            expect(result).toEqual({
                channel: 'comment',
                event: 'created',
                args: ['foo']
            });
        });
    });
});
