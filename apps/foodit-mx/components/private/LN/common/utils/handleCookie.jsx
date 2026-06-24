import { COOKIE_EXPIRATION, DOMINIO_COOKIE } from 'fusion:environment';

const handleCookie = () => {
    const DiccionarioCookiesAGuardar = [
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
    ];

    function eraseCookie(nameCookie) {
        if (typeof document !== 'undefined') {
            document.cookie = `${nameCookie}=false; expires=${new Date().toUTCString()}; domain=${DOMINIO_COOKIE}; path=/`;
        }
    }

    function setCookie(nameCookie, valueCookie, timeExpiration) {
        const seconds = timeExpiration ? timeExpiration * 60 * 1000 : undefined;

        if (!nameCookie || typeof nameCookie !== 'string') return false;
        if (nameCookie.length === 0) return false;

        if (!valueCookie || typeof valueCookie !== 'string') return false;
        if (valueCookie.length === 0) return false;

        /**
         * crear timeExpiration en caso de no venir definido
         */
        let exp;
        if (!seconds) {
            const secondsDefault = parseInt(COOKIE_EXPIRATION);
            const date = new Date();
            exp = new Date(date.setTime(date.getTime() + secondsDefault));
        } else {
            exp = new Date(new Date().getTime() + seconds);
        }
        if (typeof document !== 'undefined') {
            document.cookie = `${nameCookie}=${valueCookie}; expires=${exp.toUTCString()}; domain=${DOMINIO_COOKIE}; path=/`;
        }
        return !!(
            document &&
            document.cookie &&
            document.cookie.indexOf(`${nameCookie}=${valueCookie}`) !== -1
        );
    }

    function getCookie(nameCookie) {
        if (!nameCookie) return undefined;

        const value = `; ${
            typeof document !== 'undefined' ? document.cookie : ''
        }`;
        const parts = value.split(`; ${nameCookie}=`);
        return parts.length === 2 ? parts.pop().split(';').shift() : undefined;
    }

    return {
        getCookie,
        setCookie,
        eraseCookie,
        DiccionarioCookiesAGuardar
    };
};

export default handleCookie;
