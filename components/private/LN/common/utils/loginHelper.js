/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-underscore-dangle */
import { RELOGIN_VALIDATION } from 'fusion:environment';
import handleCookie from './handleCookie';
import apiIngresar from '../../../common/services/apIngresar';

const {
    setCookie,
    getCookie,
    eraseCookie,
    DiccionarioCookiesAGuardar
} = handleCookie();

const _UserClientLibs = func =>
    window.UserClientLibs && window.UserClientLibs[func]
        ? window.UserClientLibs[func]
        : () => {};

export const goToLogout = dispatch => {
    _UserClientLibs('LogoutAsync')().then(() => {
        eraseCookie('shouldrelogin');
        dispatch({
            type: 'SET_LOGIN',
            payload: {
                logueado: false,
                loginData: {
                    subscription: false,
                    userName: 'Sin nombre',
                    loading: false
                }
            }
        });
    });

    if (['undefined'].indexOf(typeof fyre)) fyre.conv.logout();

    window &&
        window.viafoura &&
        window.viafoura.session &&
        window.viafoura.session.logout();
};

const convertTo24Hour = time => {
    let newDate = time;
    const hours = time.substr(0, 2);

    if (time.indexOf('a.m.') != -1 && hours === 12) {
        newDate = time.replace('12', '00');
    }
    if (time.indexOf('p.m.') !== -1 && hours < 12) {
        newDate = time.replace(hours, parseInt(hours, 10) + 12);
    }

    return newDate.replace(/(a.m.|p.m.)/, '');
};

const getTokenBodyHelper = (res, position) => {
    try {
        return res.split('|')[position];
    } catch (ex) {
        return null;
    }
};

const mustRelogin = () => {
    let syncValue = getCookie('syncLfLN');
    const cookieSalt = getCookie('token');

    try {
        let result = true;
        // Se parsea cookie syncLfLN para que no tenga am/pm .
        // Convirtiendo la hora en formato de 24hrs y no de 12hrs .
        // Cookie de ejemplo : 09/06/2017 06:52:46 p.m.
        if (
            syncValue.indexOf('/') > -1 &&
            (syncValue.indexOf('a.m.') > -1 || syncValue.indexOf('p.m.') > -1)
        ) {
            const arrFullDate = syncValue.split(' '); // [0] : 09/06/2017 - [1] : 06:52:46 - [2] : p.m.

            // La fecha está en DD/MM/YYYY . La convierto a MM/DD/YYYY ;
            // let daysDate = arrFullDate[0];
            const arrDays = arrFullDate[0].split('/');
            const daysDate = `${arrDays[1]}/${arrDays[0]}/${arrDays[2]}`;

            const time = convertTo24Hour(arrFullDate[1] + arrFullDate[2]);
            arrFullDate[1] = time;
            syncValue = `${daysDate} ${arrFullDate[1]}`; // Vuelvo a armar la cookie con el date actualizado.
        }

        if (cookieSalt === '') return false;

        if (syncValue !== '') {
            const syncDate = new Date(syncValue);
            if (isNaN(syncDate)) {
                return false;
            }
            if (
                new Date() < new Date(syncDate.getTime() - RELOGIN_VALIDATION)
            ) {
                result = false;
            }
        }

        return result;
    } catch (e) {
        return false;
    }
};

const tryParseJSON = jsonString => {
    const userDefault = { UsuarioDetalleEmail: '', ProductoPremiumId: '' };
    try {
        const user = JSON.parse(jsonString);
        if (user && typeof user === 'object') {
            const { Usuario } = user;
            const { UsuarioDetalleEmail, ProductoPremiumId } = Usuario || {};
            return { UsuarioDetalleEmail, ProductoPremiumId };
        }
    } catch (e) {
        return userDefault;
    }
    return userDefault;
};

const setUserData = (res, dispatch) => {
    if (res.response) {
        if (!getCookie('shouldrelogin')) {
            setCookie('shouldrelogin', 'true', 12 * 60);
        }
        const { UsuarioDetalleEmail, ProductoPremiumId } = tryParseJSON(
            res.response
        );

        const subscription = ProductoPremiumId
            ? ProductoPremiumId.includes('2')
            : false;
        const userName = UsuarioDetalleEmail
            ? `${UsuarioDetalleEmail.substring(0, 16)}...`
            : '';

        dispatch({
            type: 'SET_LOGIN',
            payload: {
                logueado: true,
                loginData: {
                    subscription,
                    userName,
                    loading: false
                }
            }
        });
    }
};

const setupCookies = ({ Usuario: obj }) => {
    // eslint-disable-next-line guard-for-in
    for (const key in obj) {
        let aux;
        let cookie;
        if (
            DiccionarioCookiesAGuardar.indexOf(key) > -1 &&
            typeof obj[key] == 'string'
        ) {
            switch (key) {
                case 'UsuarioDetalleGuid':
                    aux = 'usuario%5Fdetalle%5Fguid';
                    cookie = `{${getCookie('token')}}`;
                    break;
                case 'UsuarioDetalleNick':
                    aux = 'usuario%5Fdetalle%5Fnick';
                    cookie = obj[key];
                    break;
                case 'UsuarioId':
                    aux = 'usuario%5Fid';
                    cookie = obj[key];
                    break;
                case 'UsuarioUsuario':
                    aux = 'usuario%5Fusuario';
                    cookie = obj[key];
                    break;
                case 'usuarioLogTkn':
                    aux = 'usuario%5Flogtkn';
                    cookie = obj[key];
                    break;
                case 'TokenJWT':
                    aux = 'PersoTKN';
                    cookie = obj[key];
                    break;
                default:
                    aux = key;
                    cookie = obj[key];
            }

            eraseCookie(aux);
            setCookie(aux, cookie);
        }
    }
};

const reMeHandler = (res, token, xvalue, dispatch) => {
    switch (res.code) {
        case '0000':
            eraseCookie('token');
            eraseCookie('xvalue');

            setCookie('token', token);
            setCookie('xvalue', xvalue);
            setupCookies(JSON.parse(res.response) || {});
            _UserClientLibs('RefreshAsync')();
            break;
        case '0001':
            /**
                 * TODO: manejo de Logger
                 Logger.Error("ReMe | Error Controlado ", JSON.stringify(res) );
                 */
            goToLogout(dispatch);
            break;
        case '0002':
            /**
                 * TODO: manejo de Logger
                 Logger.Error("ReMe | Token inválido ", JSON.stringify(res)); 
                 //{ 'response' : res ,  'tokens': { 'X-Token': Cookie.LeerCookie("token") 
                 || '', 'X-Value': Cookie.LeerCookie("xvalue") || '' }});
            */
            goToLogout(dispatch);
            break;
        default:
            /**
                 * TODO: manejo de Logger
                 Logger.Error("ReMe | Error (Handler) ", JSON.stringify(res) );
                 */
            goToLogout(dispatch);
    }
};

export const loginSetup = dispatch => {
    if (mustRelogin()) {
        const token = getCookie('token');
        const xvalue = getCookie('xvalue');

        if ((token, xvalue)) {
            apiIngresar.reLogin(token, xvalue).then(res => {
                const newToken = getTokenBodyHelper(res.response, 1);
                const newXvalue = getTokenBodyHelper(res.response, 2);
                if (res.code === '0000') {
                    apiIngresar
                        .getMe(true, newToken, newXvalue)
                        .then(userData => {
                            setUserData(userData, dispatch);
                            reMeHandler(
                                userData,
                                newToken,
                                newXvalue,
                                dispatch
                            );
                        });
                }
            });
            return;
        }
    }

    const ProductoPremiumId = getCookie('ProductoPremiumId');
    const UsuarioDetalleEmail = getCookie('usuarioemail');
    const IS_TOKEN_CREATED = getCookie('token');

    IS_TOKEN_CREATED
        ? setUserData(
              {
                  response: JSON.stringify({
                      Usuario: {
                          ProductoPremiumId,
                          UsuarioDetalleEmail
                      }
                  })
              },
              dispatch
          )
        : dispatch({
              type: 'SET_LOGIN',
              payload: {
                  loginData: {
                      subscription: false,
                      loading: false
                  }
              }
          });
};
