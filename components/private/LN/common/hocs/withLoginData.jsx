import React from 'react';
import Consumer from 'fusion:consumer';
import LoginAPI from '../utils/Login';

// const logueado = false;

// TODO: sacar consumer. No debe conocer el contexto donde se usa. Solo administra newsletters
function withLoginData(WrappedComponent) {
    return Consumer(
        class withAuthentication extends React.Component {
            constructor(props) {
                super(props);
                this.loginService = new LoginAPI();
                this.state = {
                    logeado: false
                };
            }

            componentDidMount() {
                //LEER COOKIE

                if (true) {
                    this.setState({ logeado: true });
                }
            }

            render() {
                return (
                    <WrappedComponent
                        loginData={{ logueado: this.state.logeado }}
                        {...this.props}
                    />
                );
            }
        }
    );
}

export default withLoginData;
