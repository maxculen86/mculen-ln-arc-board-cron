import React from 'react';
import Consumer from 'fusion:consumer';
import ExpiredCookie from '../utils/expiredCookie';

// const logueado = false;

// TODO: sacar consumer. No debe conocer el contexto donde se usa. Solo administra newsletters
function withLoginData(WrappedComponent) {
    return Consumer(
        class withAuthentication extends React.Component {
            constructor(props) {
                super(props);
                this.loginService = new ExpiredCookie();
                this.state = {
                    logueado: false
                };
            }

            componentDidMount() {
                // LEER COOKIE
                const timeExpirationCookie = 10;
                if (timeExpirationCookie) {
                    this.setState({
                        logueado: this.loginService.setCookie(
                            timeExpirationCookie
                        )
                    });
                }
            }

            render() {
                const { logueado } = this.state;
                return (
                    <WrappedComponent
                        loginData={{ logueado }}
                        {...this.props}
                    />
                );
            }
        }
    );
}

export default withLoginData;
