import { API_INGRESAR, DATADOG_CONFIG } from 'fusion:environment';
import { init } from '@ln/user.client.libs';
import get from '../../utils/get';
import handleCookie from '../../../LN/common/utils/handleCookie';

const { setCookie, getCookie, eraseCookie, DiccionarioCookiesAGuardar } =
    handleCookie();

export const SUBSCRIBED_HELPER = {
    LN: '2',
    FOODIT: '22'
};

const siteIds = {
    'la-nacion-ar': 1,
    foodit: 19
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

export const getAuthTokens = async () => {
    const getToken = get(window, 'UCL.GetIdTokenValidatedAsync', () => {});
    const getAccessToken = get(
        window,
        'UCL.BuildBearerAccessTokenAsync',
        () => {}
    );

    const token = await getToken();
    const accessToken = await getAccessToken();

    return {
        token,
        accessToken
    };
};

export const logout = (callback = () => {}) => {
    const logoutFunction = window?.UCL?.LogoutAsync;

    logoutFunction({
        embedShortCircuit: true,
        redirect: null,
        isVoluntary: true
    }).then(response => {
        callback(response);
    });

    window?.viafoura?.session?.logout();
};

export const setUserData = async (token, accessToken, RefreshAsync) => {
    const userEmail = getCookie('usuarioemail');

    if (!userEmail && token && accessToken) {
        eraseCookie('ProductoPremiumId');

        try {
            const result = await fetch(`${API_INGRESAR}/UsuarioV1/me`, {
                method: 'POST',
                headers: {
                    Authorization: accessToken,
                    'X-Token': token
                }
            });

            const { response } = await result.json();

            const { Usuario: userData } = JSON.parse(response) || {};
            setMultiplyCookies({
                userData,
                newToken: token,
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

const initializeAuth = async ({ website = 'la-nacion-ar', setTokens } = {}) => {
    try {
        if (getCookie('token')) {
            const datadogConfig = get(DATADOG_CONFIG, website, {});
            const keyDatadog = get(datadogConfig, 'clientTokenLogs', '');
            const serviceDatadog = get(
                datadogConfig,
                'service',
                'lanacion-arc'
            );
            const environment = get(datadogConfig, 'env', 'prod');
            const siteId = siteIds[website];

            const methodsUCL =
                init({
                    keyDatadog,
                    serviceDatadog,
                    siteId,
                    environment
                }) || {};
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

export default initializeAuth;
