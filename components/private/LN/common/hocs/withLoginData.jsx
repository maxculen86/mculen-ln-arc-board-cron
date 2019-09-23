import React from 'react';
import PropTypes from 'fusion:prop-types';
import { API_ENV } from 'fusion:environment';
import apiIngresar from '../../../common/services/apIngresar';
import useCookie from '../utils/useCookie';

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
                    userName: 'Sin nombre'
                }
            };
        }

        componentDidMount = () => {
            const { mockApi } = this.props;
            if (mockApi) return mockApi;

            const { setCookie, getCookie } = useCookie();

            const setUserData = res => {
                if (res.response) {
                    if (!getCookie('shouldrelogin')) {
                        setCookie('shouldrelogin', 'true', 1);
                        setCookie('usuariodata', res.response, 1);
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
            };

            // TODO: Agregar aqui validadion de de diff de dias para hacer relogin
            /* 
            
            const token = getCookie('token');
            const xvalue = getCookie('xvalue');
            
            if (res.code && ['0001', '0002'].indexOf(res.code) !== -1) {
                apiIngresar.reLogin(token, xvalue).then(() => {
                    if (res.code === '0000') {
                        apiIngresar.getMe(true).then(userData => {
                            setUserData(userData);
                        });
                    }
                });
            } */

            apiIngresar.getMe().then(res => setUserData(res));
        };

        goToLogout = () => {
            const { APIingresar } = API_ENV || {};
            const urlApiIngresar =
                APIingresar || 'https://ingresar.lanacion.com.ar';
            const urlToLogout = `${urlApiIngresar}/logout/logout.html?pagina=${location.href}`;

            location.href = urlToLogout;
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
