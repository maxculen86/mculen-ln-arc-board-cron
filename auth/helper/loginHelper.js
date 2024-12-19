import handleCookie from '../../components/private/LN/common/utils/handleCookie';
import { API_INGRESAR } from 'fusion:environment';

const {
    setCookie,
    getCookie,
    eraseCookie,
    DiccionarioCookiesAGuardar
} = handleCookie();

export const SUBSCRIBED_HELPER = {
    LN: '2',
    FOODIT: '22'
};

export const isSubscribed = valueSuscription => {
    const ProductoPremiumId = getCookie('ProductoPremiumId') || '';
    const cookieArray = ProductoPremiumId.split(',');
    return cookieArray.includes(valueSuscription);
};

export const setupCookies = (userData = {}) => {
    const cookieMappings = {
        UsuarioDetalleGuid: 'usuario%5Fdetalle%5Fguid',
        UsuarioDetalleNick: 'usuario%5Fdetalle%5Fnick',
        UsuarioDetalleNombre: 'usuario%5Fdetalle%5Fnombre',
        UsuarioDetalleApellido: 'usuario%5Fdetalle%5Fapellido',
        UsuarioId: 'usuario%5Fid',
        UsuarioUsuario: 'usuario%5Fusuario',
        usuarioLogTkn: 'usuario%5Flogtkn',
        TokenJWT: 'PersoTKN'
    };

    for (const key in userData) {
        if (
            DiccionarioCookiesAGuardar.indexOf(key) > -1 &&
            typeof userData[key] === 'string'
        ) {
            const cookieKey = cookieMappings[key] || key;
            const cookieValue = userData[key];

            eraseCookie(cookieKey);
            setCookie(cookieKey, cookieValue);
        }
    }
};

export const setMultiplyCookies = ({ userData, newToken }) => {
    eraseCookie('token');
    setCookie('token', newToken);
    setupCookies(userData);
    _UserClientLibs('RefreshAsync')();
};

export const _UserClientLibs = func =>
    window.UserClientLibs && window.UserClientLibs[func]
        ? window.UserClientLibs[func]
        : () => {};

export const getAuthFromCookie = async (cookie = 'token') => {
    try {
        if (cookie === 'access-token') {
            return await _UserClientLibs('BuildBearerAccessTokenAsync')();
        }
        return _UserClientLibs('getIdTokenCookie')();
    } catch (error) {
        console.error(`Ocurrió un error al obtener el ${cookie}`, error);
        return undefined;
    }
};

export const getAuthTokens = async () => {
    const token = await getAuthFromCookie();
    const accessToken = await getAuthFromCookie('access-token');
    return {
        token,
        accessToken
    };
};

export const logout = (callback = () => {}) => {
    _UserClientLibs('LogoutAsync')({
        embedShortCircuit: true,
        redirectToLogin: false,
        isVoluntary: true
    }).then(response => {
        callback(response);
    });

    window?.viafoura?.session?.logout();
};

export const setUserData = async () => {
    const userEmail = getCookie('usuarioemail');
    const token = getCookie('token');

    if (!userEmail && token) {
        eraseCookie('ProductoPremiumId');

        const newToken = await getAuthFromCookie();
        const accessToken = await getAuthFromCookie('access-token');

        try {
            const result = await fetch(`${API_INGRESAR}/UsuarioV1/me`, {
                method: 'POST',
                headers: {
                    Authorization: accessToken,
                    'X-Token': newToken
                }
            });

            const { response } = await result.json();

            const { Usuario: userData } = JSON.parse(response) || {};
            setMultiplyCookies({
                userData,
                newToken
            });

            return userData;
        } catch (error) {
            console.error('Error during getMe:', error);
            return {};
        }
    }
};

const initializeAuth = async callback => {
    try {
        await _UserClientLibs('GetAccessTokenValidatedAsync')();
        await setUserData();
        return callback && callback(true);
    } catch (error) {
        console.error('Error occurred while executing token rotation', error);
    }
};

export default initializeAuth;
