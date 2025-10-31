import initializeAuth, {
    _UserClientLibs,
    setMultiplyCookies,
    setupCookies,
    getAuthTokens
} from '../../../components/private/common/auth/helper/loginHelper';
import { init } from '@ln/user.client.libs';
import handleCookie from '../../../components/private/LN/common/utils/handleCookie';

jest.mock('../../../components/private/LN/common/utils/handleCookie', () => ({
    __esModule: true,
    default: jest.fn().mockReturnValue({
        setCookie: jest.fn(),
        getCookie: jest.fn(),
        eraseCookie: jest.fn(),
        DiccionarioCookiesAGuardar: [
            'usuariosexo',
            'usuarioemail',
            'usuarioanio',
            'usuarioDetalleClubNacion',
            'UsuarioDetalleGuid',
            'UsuarioDetalleNick',
            'UsuarioDetalleNombre',
            'UsuarioDetalleApellido',
            'UsuarioId',
            'UsuarioUsuario',
            'usuario%5Fusuario',
            'usuarioLogTkn',
            'cookieLogin',
            'syncLfLN',
            'Provinciaid',
            'Paisid',
            'LNPreferencias',
            'Crm_id',
            'ProductoPremiumId',
            'token',
            'xvalue',
            'TokenJWT'
        ]
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
    }
}));

describe('Tests functions loginHelper', () => {
    const mockFunctionRefreshAsync = jest.fn();
    describe('Tests function setupCookies', () => {
        const { setCookie, eraseCookie } = handleCookie();

        beforeEach(() => {
            jest.clearAllMocks();
        });

        test('should set cookies for userData', () => {
            const userData = {
                UsuarioDetalleGuid: 'guid123',
                UsuarioDetalleNick: 'nick123'
            };

            setupCookies({
                ...userData,
                RefreshAsync: mockFunctionRefreshAsync
            });

            expect(eraseCookie).toHaveBeenCalledWith(
                'usuario%5Fdetalle%5Fguid'
            );
            expect(setCookie).toHaveBeenCalledWith(
                'usuario%5Fdetalle%5Fguid',
                'guid123'
            );
            expect(eraseCookie).toHaveBeenCalledWith(
                'usuario%5Fdetalle%5Fnick'
            );
            expect(setCookie).toHaveBeenCalledWith(
                'usuario%5Fdetalle%5Fnick',
                'nick123'
            );
        });

        test('should not set cookies for non-string values', () => {
            const userData = {
                UsuarioDetalleGuid: 12345
            };

            setupCookies({
                ...userData,
                RefreshAsync: mockFunctionRefreshAsync
            });

            expect(eraseCookie).not.toHaveBeenCalled();
            expect(setCookie).not.toHaveBeenCalled();
        });
    });

    describe('Tests function setMultiplyCookies', () => {
        const { setCookie, eraseCookie } = handleCookie();

        beforeEach(() => {
            jest.clearAllMocks();
        });

        test('should set multiple cookies and call setupCookies', () => {
            const userData = { id: 1, name: 'John Doe' };
            const newToken = 'newToken123';
            const dataUser = {
                ...userData,
                RefreshAsync: mockFunctionRefreshAsync
            };

            setMultiplyCookies({
                dataUser,
                newToken,
                RefreshAsync: mockFunctionRefreshAsync
            });

            expect(eraseCookie).toHaveBeenCalledWith('token');
            expect(setCookie).toHaveBeenCalledWith('token', newToken);
            expect(handleCookie().setCookie).toHaveBeenCalled();
        });
    });

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
                environment: expect.any(String)
            });
            expect(GetIdTokenValidatedAsync).toHaveBeenCalled();
            expect(BuildBearerAccessTokenAsync).toHaveBeenCalled();

            expect(mockSetTokens).toHaveBeenCalledWith({
                token: 'mockIdToken',
                accessToken: 'mockAccessToken'
            });
        });

        it('should not initialize if cookie does not exist', async () => {
            getCookie.mockReturnValue(null);

            await initializeAuth({ setTokens: mockSetTokens });

            expect(getCookie).toHaveBeenCalledWith('token');
            expect(init).not.toHaveBeenCalled();
            expect(mockSetTokens).not.toHaveBeenCalled();
        });

        it('should handle errors gracefully', async () => {
            getCookie.mockReturnValue('mockToken');
            init.mockImplementation(() => {
                throw new Error('Initialization failed');
            });

            await initializeAuth({ setTokens: mockSetTokens });

            expect(consoleErrorMock).toHaveBeenCalledWith(
                'Error occurred while executing token rotation',
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

        test('should return tokens correctly when UCL is available', async () => {
            window.UCL = {
                GetIdTokenValidatedAsync: jest
                    .fn()
                    .mockResolvedValue('mockedToken'),
                BuildBearerAccessTokenAsync: jest
                    .fn()
                    .mockResolvedValue('mockedAccessToken')
            };

            const result = await getAuthTokens();
            expect(result).toEqual({
                token: 'mockedToken',
                accessToken: 'mockedAccessToken'
            });
        });

        test('should return undefined if window.UCL is not defined', async () => {
            const result = await getAuthTokens();
            expect(result).toEqual({
                token: undefined,
                accessToken: undefined
            });
        });

        test('should return undefined if the methods are not defined in UCL', async () => {
            window.UCL = {};

            const result = await getAuthTokens();
            expect(result).toEqual({
                token: undefined,
                accessToken: undefined
            });
        });
    });
});
