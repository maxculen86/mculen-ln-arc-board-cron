import { waitFor } from '@testing-library/react';
import {
    loadViafoura,
    syncViafouraSession
} from '../../../../../components/features/LN-nota/commentsViafoura/helper';
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
    '../../../../../components/private/common/utils/commentsHelper',
    () => ({
        getLoginAndRegistrationURLS: jest.fn(() => ({
            loginUrl: 'https://login.test',
            registracionUrl: 'https://register.test'
        })),
        CALLBACKS_BY_CHANNEL_AND_EVENT: {
            authentication: {
                required: jest.fn(() => false),
                needed: jest.fn(() => false)
            }
        }
    })
);

describe('Components - features - LN-nota - commentsViafoura - helper', () => {
    let consoleErrorSpy;
    const setMessage = jest.fn();
    const getCookie = jest.fn(() => 'session-token');
    const baseParams = {
        outputType: 'default',
        getCookie,
        subscription: true,
        setIsReady: jest.fn(),
        setMessage,
        articleId: 'article-id'
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

    it('syncs the Viafoura session with OIDC', async () => {
        getAuthTokens.mockResolvedValue({ token: 'oidc-id-token' });

        await loadViafoura(baseParams);
        window.vfQ[0]();

        await waitFor(() => {
            expect(window.vf.session.login.openIdConnect).toHaveBeenCalledWith(
                'oidc-id-token'
            );
        });
    });

    it('retries the login when UCL emits ucl-ready', async () => {
        const addEventListenerSpy = jest.spyOn(window, 'addEventListener');
        getAuthTokens
            .mockResolvedValueOnce({ token: undefined })
            .mockResolvedValueOnce({ token: 'oidc-id-token' });
        delete window.UCL;

        await loadViafoura(baseParams);
        window.vfQ[0]();

        const [, handler] = addEventListenerSpy.mock.calls.find(
            ([eventName]) => eventName === 'ucl-ready'
        );

        handler();

        await waitFor(() => {
            expect(window.vf.session.login.openIdConnect).toHaveBeenCalledWith(
                'oidc-id-token'
            );
        });

        addEventListenerSpy.mockRestore();
    });

    it('shows the subscription message when the OIDC login fails', async () => {
        getAuthTokens.mockResolvedValue({ token: 'oidc-id-token' });
        window.vf.session.login.openIdConnect.mockRejectedValue(
            new Error('oidc failed')
        );

        await syncViafouraSession({
            subscription: true,
            outputType: 'default',
            setMessage,
            loginUrl: 'https://login.test',
            registracionUrl: 'https://register.test'
        });

        expect(setMessage).toHaveBeenCalledWith({
            title: 'Ahora para comentar debés tener Acceso Digital.',
            subtitle: 'Iniciar sesión o suscribite',
            secondaryUrl: 'https://login.test',
            specialUrl: 'https://register.test',
            dark: true,
            isExclusive: true
        });
    });
});
