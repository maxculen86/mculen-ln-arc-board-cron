/* eslint-disable no-restricted-globals */ // TODO: Modificar codigo para evitar excluir esta regla
import React from 'react';
import PropTypes from 'fusion:prop-types';
import { API_ENV } from 'fusion:environment';
import apiIngresar from '../../../common/services/apIngresar';
import useCookie from '../utils/useCookie';

const { setCookie, getCookie, eraseCookie } = useCookie();

const { LoginUrl } = API_ENV || {
    LoginUrl: 'https://ingresar.lanacion.com.ar/ingresar/D/1/?callback='
};

function withLoginData(WrappedComponent) {
    return class withAuthentication extends React.Component {
        static propTypes = {
            mockApi: PropTypes.func
        };

        static defaultProps = {
            mockApi: undefined
        };

        constructor(props) {
            super(props);
            this.state = {
                logueado: false,
                loginData: {
                    subscription: false,
                    userName: 'Sin nombre',
                    goToLoginUrl: () => {
                        location.href = LoginUrl + window.btoa(location.href);
                    }
                }
            };
        }

        componentDidMount = () => {
            const { mockApi } = this.props;
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
                        subscription = Usuario.ProductoPremiumId.includes('2');
                    }

                    this.setState({
                        logueado: true,
                        loginData: {
                            subscription,
                            userName: `${Usuario.UsuarioDetalleEmail.substring(
                                0,
                                16
                            )}...`
                        }
                    });
                }

                /**
                 * TODO: Handler bad codes of /me
                 */
            };

            // TODO: Agregar aqui validadion de de diff de dias para hacer relogin
            /* 
            
            5. Cuando haces relogin tomar nuevo token y x-value
            6. Llamar a getMe con nuevo token y xvalue en header

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

                        if (res.code === '00001') {
                            apiIngresar
                                .getMe(true, newToken, newXvalue)
                                .then(userData => {
                                    setUserData(userData);
                                });
                        }
                    });
                    return null;
                }

                this.goToLogout();
            }

            if (getCookie('token'))
                apiIngresar.getMe().then(res => setUserData(res));
        };

        mustRelogin = () => {
            let syncValue = getCookie('syncLfLN');
            const cookieSalt = getCookie('token');

            try {
                let result = true;
                const { ReloginValidation } = API_ENV || {
                    ReloginValidation: 8121600000
                };

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
                    const daysDate = `${arrDays[1]}/${arrDays[0]}/${
                        arrDays[2]
                    }`;

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
                        new Date(syncDate.getTime() - ReloginValidation)
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
            const { APIingresar } = API_ENV || {};
            const urlApiIngresar =
                APIingresar || 'https://ingresar.lanacion.com.ar';
            const urlToLogout = `${urlApiIngresar}/logout/logout.html?pagina=${location.href}`;

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
                        location.href = LoginUrl + window.btoa(location.href);
                    }
                }
            });
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
                newDate = time.replace(hours, parseInt(hours) + 12);
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
    };
}

export default withLoginData;
