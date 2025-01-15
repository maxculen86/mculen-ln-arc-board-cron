import { API_INGRESAR, DATADOG_CONFIG } from 'fusion:environment';
import { init } from '@ln/user.client.libs';
import get from '../../components/private/common/utils/get';
import handleCookie from '../../components/private/LN/common/utils/handleCookie';

const { setCookie, getCookie, eraseCookie, DiccionarioCookiesAGuardar } =
    handleCookie();

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

    Object.keys(userData).forEach(key => {
        if (
            DiccionarioCookiesAGuardar.indexOf(key) > -1 &&
            typeof userData[key] === 'string'
        ) {
            const cookieKey = cookieMappings[key] || key;
            const cookieValue = userData[key];

            eraseCookie(cookieKey);
            setCookie(cookieKey, cookieValue);
        }
    });
};

export const setMultiplyCookies = ({ userData, newToken, RefreshAsync }) => {
    eraseCookie('token');
    setCookie('token', newToken);
    setupCookies(userData);
    RefreshAsync();
};

export const userClientLibs = func =>
    window.UserClientLibs && window.UserClientLibs[func]
        ? window.UserClientLibs[func]
        : () => {};

export const getAuthTokens = async () => {
    // TODO: Usar unicamente funciones GetIdTokenValidatedAsync y BuildBearerAccessTokenAsync que vienen de window.UCL cuando se haya migrado todo LN a lib UCL
    const getToken =
        window?.UCL?.GetIdTokenValidatedAsync ||
        userClientLibs('getIdTokenCookie');

    const getAccessToken =
        window?.UCL?.BuildBearerAccessTokenAsync ||
        userClientLibs('BuildBearerAccessTokenAsync');

    const token = await getToken();
    const accessToken = await getAccessToken();

    return {
        token,
        accessToken
    };
};

export const logout = (callback = () => {}) => {
    // TODO: Usar funcion LogoutAsync unicamente que se encuentra en window.UCL una vez que se haya migrado todo LN a lib UCL
    const logoutFunction =
        window?.UCL?.LogoutAsync || userClientLibs('LogoutAsync');

    logoutFunction({
        embedShortCircuit: true,
        redirectToLogin: false,
        isVoluntary: true
    }).then(response => {
        callback(response);
    });

    window?.viafoura?.session?.logout();
};

export const setUserData = async (token, accessToken, RefreshAsync) => {
    const userEmail = getCookie('usuarioemail');
    // TODO: Usar unicamente el token y accessToken que se recibe por parametro una vez se haya migrado todo LN a lib UCL
    const newToken = token || getCookie('token');
    const newAccessToken = accessToken || getCookie('accessToken');

    if (!userEmail && newToken && newAccessToken) {
        eraseCookie('ProductoPremiumId');

        try {
            const result = await fetch(`${API_INGRESAR}/UsuarioV1/me`, {
                method: 'POST',
                headers: {
                    Authorization: newAccessToken,
                    'X-Token': newToken
                }
            });

            const { response } = await result.json();

            const { Usuario: userData } = JSON.parse(response) || {};
            setMultiplyCookies({
                userData,
                newToken,
                RefreshAsync
            });

            return userData;
        } catch (error) {
            console.error('Error during getMe:', error);
            return {};
        }
    }

    return {};
};

export const initializeAuthV2 = async ({
    website = 'la-nacion-ar',
    setTokens
} = {}) => {
    try {
        if (getCookie('token')) {
            const keyDatadog = get(
                DATADOG_CONFIG,
                `${website}.clientTokenLogs`,
                ''
            );

            const methodsUCL = init({ keyDatadog }) || {};
            window.UCL = methodsUCL;

            const {
                BuildBearerAccessTokenAsync,
                GetIdTokenValidatedAsync,
                RefreshAsync
            } = methodsUCL;

            const token = await GetIdTokenValidatedAsync();
            const accessToken = await BuildBearerAccessTokenAsync();

            await setUserData(token, accessToken, RefreshAsync);
            setTokens({
                token,
                accessToken
            });
        }
    } catch (error) {
        console.error('Error occurred while executing token rotation', error);
    }
};

// TODO: Eliminar esta función cuando se haya migrado todo a lib UCL.
const initializeAuth = async callback => {
    try {
        await userClientLibs('GetAccessTokenValidatedAsync')();
        await setUserData();
        return callback && callback(true);
    } catch (error) {
        console.error('Error occurred while executing token rotation', error);
        return {};
    }
};

export default initializeAuth;
