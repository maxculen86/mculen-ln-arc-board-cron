import {
    mustRelogin,
    getTokenBodyHelper
} from '../../../../../private/LN/common/utils/loginHelper';
import handleCookie from '../../../../../private/LN/common/utils/handleCookie';
import apiIngresar from '../../../../../private/common/services/apIngresar';
import get from '../../../../../private/common/utils/get';
import { _UserClientLibs } from '../../../../../private/LN/common/utils/loginHelper';

const {
    setCookie,
    getCookie,
    eraseCookie,
    DiccionarioCookiesAGuardar
} = handleCookie();

export const handleLogin = async callback => {
    if (mustRelogin()) {
        await handleRelogin(callback);
    }
};

const handleRelogin = async callback => {
    const token = getCookie('token');
    const xvalue = getCookie('xvalue');

    if (token && xvalue) {
        try {
            const res = await apiIngresar.reLogin(token, xvalue);

            await handleResponse(res, callback);
        } catch (error) {
            console.error('Error during reLogin:', error);
        }
    }
};

const setupCookies = (userData = {}) => {
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

export const setMultiplyCookies = ({
    userData,
    newToken,
    newXvalue,
    accessToken
}) => {
    eraseCookie('token');
    eraseCookie('xvalue');
    eraseCookie('access-token');
    setCookie('token', newToken);
    setCookie('xvalue', newXvalue);
    setCookie('access-token', accessToken);
    setupCookies(userData);
    _UserClientLibs('RefreshAsync')();
};

export const setReloginCookie = () =>
    !getCookie('shouldrelogin') && setCookie('shouldrelogin', 'true', 12 * 60);

const logoutViafoura = () => get(window, 'viafoura.session.logout', () => {})();

export const logout = (callback = () => {}) => {
    _UserClientLibs('LogoutAsync')({
        embedShortCircuit: true,
        redirectToLogin: false,
        isVoluntary: true
    }).then(response => {
        localStorage.removeItem('bookmarkFolders');
        localStorage.removeItem('bookmarkedItems');
        eraseCookie('shouldrelogin');
        callback(response);
    });

    logoutViafoura();
};

export const handleResponse = async (res, callback) => {
    const { code, response } = res || {};

    if (code === '0000') {
        const newToken = getTokenBodyHelper(response, 1);
        const newXvalue = getTokenBodyHelper(response, 2);
        const accessToken = getTokenBodyHelper(response, 3);

        try {
            const { response } =
                (await apiIngresar.getMe(newToken, newXvalue, true)) || {};
            const { Usuario } = JSON.parse(response);

            setReloginCookie();

            const {
                ProductoPremiumId = '',
                UsuarioDetalleEmail = '',
                UsuarioDetalleNombre = '',
                UsuarioDetalleApellido = ''
            } = Usuario || {};

            callback({
                ProductoPremiumId,
                UsuarioDetalleEmail,
                UsuarioDetalleNombre,
                UsuarioDetalleApellido
            });

            setMultiplyCookies({
                userData: Usuario,
                newToken,
                newXvalue,
                accessToken
            });
        } catch (error) {
            console.error('Error during getMe:', error);
        }
    } else {
        logout(callback);
    }
};

export const setInitialState = () => {
    if (getCookie('token')) {
        setReloginCookie();

        const userName = getCookie('usuario%5Fdetalle%5Fnombre');
        const userLastName = getCookie('usuario%5Fdetalle%5Fapellido');
        const userEmail = getCookie('usuarioemail');

        return {
            UsuarioDetalleNombre: userName,
            UsuarioDetalleEmail: userEmail,
            UsuarioDetalleApellido: userLastName,
            ProductoPremiumId: getCookie('ProductoPremiumId')
        };
    }

    return {
        ProductoPremiumId: '',
        UsuarioDetalleEmail: '',
        UsuarioDetalleNombre: '',
        UsuarioDetalleApellido: ''
    };
};
