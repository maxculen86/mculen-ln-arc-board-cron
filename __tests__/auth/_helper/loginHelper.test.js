import initializeAuth, {
    getAuthTokens,
    initializeGoogleOneTap
} from '../../../components/private/common/auth/helper/loginHelper';
import { init } from '@ln/user.client.libs';
import handleCookie from '../../../components/private/LN/common/utils/handleCookie';

jest.mock('../../../components/private/LN/common/utils/handleCookie', () => ({
    __esModule: true,
    default: jest.fn().mockReturnValue({
        getCookie: jest.fn()
    })
}));

jest.mock('../../../components/private/common/services/apIngresar', () => ({
    getMe: jest.fn()
}));

global.window.UserClientLibs = {
    RefreshAsync: jest.fn(),
    BuildBearerAccessTokenAsync: jest.fn(),
    getIdTokenCookie: jest.fn(),
    LogoutAsync: jest.fn(),
    GetAccessTokenValidatedAsync: jest.fn()
};

jest.mock('@ln/user.client.libs', () => ({
    init: jest.fn()
}));

jest.mock('fusion:environment', () => ({
    DATADOG_CONFIG: {
        'la-nacion-ar': {
            clientTokenLogs: 'mockClientTokenLogs',
            clientTokenRum: 'mockClientTokenRum',
            applicationId: 'mockApplicationId',
            site: 'mockSite',
            forwardErrorsToLogs: true,
            sampleRateLog: 100,
            sampleRateRum: 100,
            service: 'mockService',
            env: 'test',
            sessionReplaySampleRate: 100,
            trackResources: true,
            trackLongTasks: true,
            trackUserInteractions: true,
            trackSessionAcrossSubdomains: true,
            defaultPrivacyLevel: 'mask-user-input'
        }
    },
    GOOGLE_ONE_TAP: 'mock-google-client-id'
}));

describe('Tests functions loginHelper', () => {
    describe('initializeAuth', () => {
        const mockSetTokens = jest.fn();
        const { getCookie } = handleCookie();
        beforeEach(() => {
            jest.clearAllMocks();
            global.window.UCL = {
                RefreshAsync: jest.fn(),
                BuildBearerAccessTokenAsync: jest.fn(),
                getIdTokenCookie: jest.fn(),
                LogoutAsync: jest.fn(),
                GetAccessTokenValidatedAsync: jest.fn()
            };
        });

        const consoleErrorMock = jest
            .spyOn(console, 'error')
            .mockImplementation(() => {});

        it('should initialize and set tokens if cookie exists and methods succeed', async () => {
            getCookie.mockReturnValue('mockToken');
            const BuildBearerAccessTokenAsync = jest
                .fn()
                .mockResolvedValue('mockAccessToken');
            const GetIdTokenValidatedAsync = jest
                .fn()
                .mockResolvedValue('mockIdToken');
            const RefreshAsync = jest.fn();
            init.mockReturnValue({
                BuildBearerAccessTokenAsync,
                GetIdTokenValidatedAsync,
                RefreshAsync
            });

            await initializeAuth({
                setTokens: mockSetTokens,
                website: 'la-nacion-ar'
            });

            expect(getCookie).toHaveBeenCalledWith('token');
            expect(init).toHaveBeenCalledWith({
                keyDatadog: expect.any(String),
                serviceDatadog: expect.any(String),
                siteId: 1,
                environment: expect.any(String),
                googleIdClient: expect.any(String)
            });
            expect(GetIdTokenValidatedAsync).toHaveBeenCalled();
            expect(BuildBearerAccessTokenAsync).toHaveBeenCalled();

            expect(mockSetTokens).toHaveBeenCalledWith({
                token: 'mockIdToken',
                accessToken: 'mockAccessToken'
            });
        });

        it('should initialize UCL with Foodit site id when website is foodit', async () => {
            getCookie.mockReturnValue('mockToken');
            const BuildBearerAccessTokenAsync = jest
                .fn()
                .mockResolvedValue('mockFooditAccessToken');
            const GetIdTokenValidatedAsync = jest
                .fn()
                .mockResolvedValue('mockFooditIdToken');
            const RefreshAsync = jest.fn();
            init.mockReturnValue({
                BuildBearerAccessTokenAsync,
                GetIdTokenValidatedAsync,
                RefreshAsync
            });

            await initializeAuth({
                setTokens: mockSetTokens,
                website: 'foodit'
            });

            expect(init).toHaveBeenCalledWith({
                keyDatadog: '',
                serviceDatadog: 'lanacion-arc',
                siteId: 19,
                environment: 'prod',
                googleIdClient: 'mock-google-client-id'
            });
            expect(mockSetTokens).toHaveBeenCalledWith({
                token: 'mockFooditIdToken',
                accessToken: 'mockFooditAccessToken'
            });
        });

        it('should initialize UCL but not set tokens if cookie does not exist', async () => {
            getCookie.mockReturnValue(null);
            const RefreshAsync = jest.fn();
            init.mockReturnValue({
                BuildBearerAccessTokenAsync: jest.fn(),
                GetIdTokenValidatedAsync: jest.fn(),
                RefreshAsync
            });

            await initializeAuth({
                setTokens: mockSetTokens,
                website: 'la-nacion-ar'
            });

            expect(getCookie).toHaveBeenCalledWith('token');
            expect(init).toHaveBeenCalledWith({
                keyDatadog: 'mockClientTokenLogs',
                serviceDatadog: 'mockService',
                siteId: 1,
                environment: 'test',
                googleIdClient: 'mock-google-client-id'
            });
            expect(mockSetTokens).not.toHaveBeenCalled();
            expect(consoleErrorMock).toHaveBeenCalledWith(
                'No token found, UCL ready for Google One Tap login'
            );
        });

        it('should handle errors gracefully', async () => {
            getCookie.mockReturnValue('mockToken');
            init.mockImplementation(() => {
                throw new Error('Initialization failed');
            });

            await initializeAuth({ setTokens: mockSetTokens });

            expect(consoleErrorMock).toHaveBeenCalledWith(
                'Error occurred while executing UCL initialization',
                expect.any(Error)
            );

            expect(mockSetTokens).not.toHaveBeenCalled();
        });

        it('should handle missing methods gracefully', async () => {
            getCookie.mockReturnValue('mockToken');
            init.mockReturnValue({});

            await initializeAuth({ setTokens: mockSetTokens });

            expect(getCookie).toHaveBeenCalledWith('token');
            expect(mockSetTokens).not.toHaveBeenCalled();
        });
    });

    describe('getAuthTokens', () => {
        beforeEach(() => {
            delete window.UCL;
        });

        it('should return tokens correctly when UCL is available', async () => {
            window.UCL = {
                GetIdTokenValidatedAsync: jest
                    .fn()
                    .mockResolvedValue('mockedToken'),
                BuildBearerAccessTokenAsync: jest
                    .fn()
                    .mockResolvedValue('mockedAccessToken'),
                GetAccessTokenValidatedAsync: jest
                    .fn()
                    .mockResolvedValue('mockedAccessTokenValidated')
            };

            const result = await getAuthTokens();
            expect(result).toEqual({
                token: 'mockedToken',
                accessToken: 'mockedAccessToken',
                accessTokenValidated: 'mockedAccessTokenValidated'
            });
        });

        it('should return undefined if window.UCL is not defined', async () => {
            const result = await getAuthTokens();
            expect(result).toEqual({
                token: undefined,
                accessToken: undefined,
                accessTokenValidated: undefined
            });
        });

        it('should return undefined if the methods are not defined in UCL', async () => {
            window.UCL = {};

            const result = await getAuthTokens();
            expect(result).toEqual({
                token: undefined,
                accessToken: undefined,
                accessTokenValidated: undefined
            });
        });
    });

    describe('initializeGoogleOneTap', () => {
        afterEach(() => {
            delete window.UCL;
        });

        it('should execute Google One Tap for LN', async () => {
            const googleOneTap = jest.fn().mockResolvedValue(undefined);
            window.UCL = { GoogleOneTap: googleOneTap };

            await initializeGoogleOneTap('la-nacion-ar');

            expect(googleOneTap).toHaveBeenCalledTimes(1);
        });

        it('should not execute Google One Tap for non-LN websites', async () => {
            const googleOneTap = jest.fn().mockResolvedValue(undefined);
            window.UCL = { GoogleOneTap: googleOneTap };

            await initializeGoogleOneTap('foodit');

            expect(googleOneTap).not.toHaveBeenCalled();
        });

        it('should log errors when Google One Tap initialization fails', async () => {
            const error = new Error('One Tap failed');
            const consoleErrorSpy = jest
                .spyOn(console, 'error')
                .mockImplementation(() => {});

            window.UCL = {
                GoogleOneTap: jest.fn().mockRejectedValue(error)
            };

            await initializeGoogleOneTap('la-nacion-ar');

            expect(consoleErrorSpy).toHaveBeenCalledWith(
                'Error inicializando Google One Tap:',
                error
            );

            consoleErrorSpy.mockRestore();
        });
    });
});
