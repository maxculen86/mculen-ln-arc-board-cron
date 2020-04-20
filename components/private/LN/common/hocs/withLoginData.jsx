/* eslint-disable no-restricted-globals */ // TODO: Modificar codigo para evitar excluir esta regla
import React from 'react';
import PropTypes from 'fusion:prop-types';
import {
    LOGIN_URL,
    SITIO_SEGURO_REGISTRACION,
    RELOGIN_VALIDATION
} from 'fusion:environment';
import apiIngresar from '../../../common/services/apIngresar';
import handleCookie from '../utils/handleCookie';

import useGlobal from '../../../common/hooks/useGlobal';

const {
    setCookie,
    getCookie,
    eraseCookie,
    DiccionarioCookiesAGuardar
} = handleCookie();

// TODO: Move this HOC out
function withUseGlobal(Component) {
    return function WrappedComponent(props) {
        const { setAuth } = useGlobal();
        return <Component {...props} setAuth={setAuth} />;
    };
}

function withLoginData(WrappedComponent) {
    return withUseGlobal(
        class withAuthentication extends React.Component {
            static get propTypes() {
                return {
                    mockApi: PropTypes.func
                };
            }

            static get defaultProps() {
                return {
                    mockApi: undefined
                };
            }

            constructor(props) {
                super(props);
                this.state = {
                    logueado: false,
                    loginData: {
                        subscription: false,
                        userName: 'Sin nombre',
                        goToLoginUrl: () => {
                            location.href =
                                LOGIN_URL + window.btoa(location.href);
                        },
                        loading: true
                    }
                };
            }

            componentDidMount = () => {
                // TODO: los tests no deberia requerir que se modifique el codigo. Pendiente buscar otra manera
                const { mockApi, setAuth } = this.props;
                if (mockApi) return mockApi;

                const setUserData = res => {
                    if (res.response) {
                        if (!getCookie('shouldrelogin')) {
                            setCookie('shouldrelogin', 'true', 12 * 60);
                            setCookie('usuariodata', res.response, 12 * 60);
                        }

                        const { Usuario } = JSON.parse(res.response);
                        let subscription = false;

                        if (Usuario && Usuario.ProductoPremiumId) {
                            subscription = Usuario.ProductoPremiumId.includes(
                                '2'
                            );
                        }

                        setAuth(true);

                        this.setState({
                            logueado: true,
                            loginData: {
                                subscription,
                                userName: `${Usuario.UsuarioDetalleEmail.substring(
                                    0,
                                    16
                                )}...`,
                                goToLoginUrl: () => {
                                    location.href =
                                        LOGIN_URL + window.btoa(location.href);
                                },
                                loading: false
                            }
                        });
                    }

                    /**
                     * TODO: Handler bad codes of /me
                     */
                };

                // TODO: Agregar aqui validadion de de diff de dias para hacer relogin
                /* 
            Nota. Considerar casos de res.code para relogin
            Validar set Xvalue Token 
            Dejar -todo- nota para res.response.Usuario
            Fin de la tarea
            */

                /**
                 * Validamos que hayan pasado cinco dias desde la ultima sesion
                 */
                if (this.mustRelogin()) {
                    const token = getCookie('token');
                    const xvalue = getCookie('xvalue');

                    if ((token, xvalue)) {
                        apiIngresar.reLogin(token, xvalue).then(res => {
                            const newToken = this.getTokenBodyHelper(
                                res.response,
                                1
                            );
                            const newXvalue = this.getTokenBodyHelper(
                                res.response,
                                2
                            );

                            if (res.code === '0000') {
                                apiIngresar
                                    .getMe(true, newToken, newXvalue)
                                    .then(userData => {
                                        setUserData(userData);
                                        this.reMeHandler(
                                            userData,
                                            newToken,
                                            newXvalue
                                        );
                                    });
                            }
                        });
                        return null;
                    }

                    this.goToLogout();
                }

                getCookie('token')
                    ? apiIngresar.getMe().then(res => setUserData(res))
                    : this.setState({
                          loginData: {
                              subscription: false,
                              goToLoginUrl: () => {
                                  location.href =
                                      LOGIN_URL + window.btoa(location.href);
                              },
                              loading: false
                          }
                      });

                return true;
            };

            reMeHandler = (res, token, xvalue) => {
                switch (res.code) {
                    case '0000':
                        eraseCookie('token');
                        eraseCookie('xvalue');

                        setCookie('token', token);
                        setCookie('xvalue', xvalue);
                        this.setupCookies(JSON.parse(res.response) || {});
                        break;
                    case '0001':
                        /**
                     * TODO: manejo de Logger
                     Logger.Error("ReMe | Error Controlado ", JSON.stringify(res) );
                     */
                        this.goToLogout();
                        break;
                    case '0002':
                        /**
                     * TODO: manejo de Logger
                     Logger.Error("ReMe | Token inválido ", JSON.stringify(res)); //{ 'response' : res ,  'tokens': { 'X-Token': Cookie.LeerCookie("token") || '', 'X-Value': Cookie.LeerCookie("xvalue") || '' }});
                     */
                        this.goToLogout();
                        break;
                    default:
                        /**
                     * TODO: manejo de Logger
                     Logger.Error("ReMe | Error (Handler) ", JSON.stringify(res) );
                     */
                        this.goToLogout();
                }
            };

            setupCookies = obj => {
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

            mustRelogin = () => {
                let syncValue = getCookie('syncLfLN');
                const cookieSalt = getCookie('token');

                try {
                    let result = true;
                    // Se parsea cookie syncLfLN para que no tenga am/pm .
                    // Convirtiendo la hora en formato de 24hrs y no de 12hrs .
                    // Cookie de ejemplo : 09/06/2017 06:52:46 p.m.
                    if (
                        syncValue.indexOf('/') > -1 &&
                        (syncValue.indexOf('a.m.') > -1 ||
                            syncValue.indexOf('p.m.') > -1)
                    ) {
                        const arrFullDate = syncValue.split(' '); // [0] : 09/06/2017 - [1] : 06:52:46 - [2] : p.m.

                        // La fecha está en DD/MM/YYYY . La convierto a MM/DD/YYYY ;
                        // let daysDate = arrFullDate[0];
                        const arrDays = arrFullDate[0].split('/');
                        const daysDate = `${arrDays[1]}/${arrDays[0]}/${arrDays[2]}`;

                        const time = this.convertTo24Hour(
                            arrFullDate[1] + arrFullDate[2]
                        );
                        arrFullDate[1] = time;
                        syncValue = `${daysDate} ${arrFullDate[1]}`; // Vuelvo a armar la cookie con el date actualizado.
                    }

                    if (cookieSalt === '') return false;

                    if (syncValue !== '') {
                        const syncDate = new Date(syncValue);
                        if (isNaN(syncDate)) {
                            /* 
                            Logger.Error(`Relogin | SyncDate Invalid Date => ${  syncValue}`, e); 
                        */
                            return false;
                        }
                        if (
                            new Date() <
                            new Date(syncDate.getTime() - RELOGIN_VALIDATION)
                        ) {
                            result = false;
                        }
                    }

                    return result;
                } catch (e) {
                    // TODO: Se deja la siguiente funcion para futuro looger
                    /* Logger.Error('Relogin | MustRelogin - Error restando fechas', {
                    syncValue: syncValue,
                    Date: new Date()
                }); */

                    return false;
                }
            };

            goToLogout = () => {
                const urlToLogout = `${SITIO_SEGURO_REGISTRACION}/logout/logout.html?pagina=${location.href}`;

                eraseCookie('shouldrelogin');
                eraseCookie('usuariodata');

                const ifrm = document.createElement('iframe');
                ifrm.setAttribute('src', urlToLogout);
                ifrm.style.width = '0px';
                ifrm.style.height = '0px';
                document.body.appendChild(ifrm);

                this.setState({
                    logueado: false,
                    loginData: {
                        subscription: false,
                        userName: 'Sin nombre',
                        goToLoginUrl: () => {
                            location.href =
                                LOGIN_URL + window.btoa(location.href);
                        },
                        loading: false
                    }
                });

                if (['undefined'].indexOf(typeof fyre)) fyre.conv.logout();

                const { setAuth } = this.props;
                setAuth(false);
            };

            /**
             * TODO: Considerar colocar esta funcion en utilitario
             */
            getTokenBodyHelper = (res, position) => {
                try {
                    return res.split('|')[position];
                } catch (ex) {
                    return null;
                }
            };

            /**
             * TODO: crear una formato valido de fecha
             * TODO: Considerar llevar la siguiente funcion a algun utilitario
             */
            convertTo24Hour = time => {
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

            render() {
                const { logueado, loginData } = this.state;

                return (
                    <WrappedComponent
                        logueado={logueado}
                        loginData={loginData}
                        goToLogout={this.goToLogout}
                        {...this.props}
                    />
                );
            }
        }
    );
}

export default withLoginData;
