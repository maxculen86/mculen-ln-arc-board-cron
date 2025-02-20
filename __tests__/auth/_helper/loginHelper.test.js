import initializeAuth, {
    _UserClientLibs,
    getAuthFromCookie,
    setMultiplyCookies,
    setupCookies
} from '../../../auth/helper/loginHelper';
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

describe('Tests functions loginHelper', () => {
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

            setupCookies(userData);

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

            setupCookies(userData);

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
            const accessToken = 'accessToken123';

            setMultiplyCookies({ userData, newToken, accessToken });

            expect(eraseCookie).toHaveBeenCalledWith('token');
            expect(setCookie).toHaveBeenCalledWith('token', newToken);
            expect(handleCookie().setCookie).toHaveBeenCalled();
        });
    });

    describe('Test function getAuthFromCookie', () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });

        test('should call BuildBearerAccessTokenAsync for access-token', async () => {
            const mockToken = 'mockAccessToken';
            window.UserClientLibs.BuildBearerAccessTokenAsync.mockResolvedValue(
                mockToken
            );

            const token = await getAuthFromCookie('access-token');

            expect(
                window.UserClientLibs.BuildBearerAccessTokenAsync
            ).toHaveBeenCalled();
            expect(token).toBe(mockToken);
        });

        test('should call getIdTokenCookie for default token', async () => {
            const mockToken = 'mockIdToken';
            window.UserClientLibs.getIdTokenCookie.mockResolvedValue(mockToken);

            const token = await getAuthFromCookie();

            expect(window.UserClientLibs.getIdTokenCookie).toHaveBeenCalled();
            expect(token).toBe(mockToken);
        });
    });

    describe('initializeAuth', () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });

        jest.mock('../../../auth/helper/loginHelper', () => {
            const originalModule = jest.requireActual(
                '../../../auth/helper/loginHelper'
            );
            return {
                __esModule: true,
                ...originalModule,
                setUserData: jest.fn()
            };
        });

        test('should log info message if login is required', async () => {
            const error = new Error('Test error');
            window.UserClientLibs.GetAccessTokenValidatedAsync.mockRejectedValue(
                error
            );

            console.error = jest.fn();

            await initializeAuth();

            expect(console.error).toHaveBeenCalledWith(
                'Error occurred while executing token rotation',
                error
            );
        });
    });
});
