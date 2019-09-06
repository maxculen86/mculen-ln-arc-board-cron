import React from 'react';
import apiIngresar from '../../../common/services/apIngresar';

function withLoginData(WrappedComponent) {
    return class withAuthentication extends React.Component {
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

        componentDidMount() {
            const { mockApi } = this.props;
            if (mockApi) return mockApi;

            apiIngresar.getMe().then(res => {
                if (res.response) {
                    const { Usuario } = JSON.parse(res.response);
                    let subscription = false;

                    if (Usuario && Usuario.ProductoPremiumId) {
                        subscription = Usuario.ProductoPremiumId.includes('2');
                    }

                    this.setState({
                        logueado: true,
                        loginData: {
                            subscription,
                            userName: `${Usuario.UsuarioDetalleNombre} ${Usuario.UsuarioDetalleApellido}`
                        }
                    });
                }
            });
        }

        render() {
            const { logueado, loginData } = this.state;
            return (
                <WrappedComponent
                    logueado={logueado}
                    loginData={loginData}
                    {...this.props}
                />
            );
        }
    };
}

export default withLoginData;
