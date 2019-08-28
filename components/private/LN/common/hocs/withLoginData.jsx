import React from 'react';
import expiredCookie from '../utils/expiredCookie';

// const logueado = false;

// TODO: sacar consumer. No debe conocer el contexto donde se usa. Solo administra newsletters
function withLoginData(WrappedComponent) {
    const { getCookie } = expiredCookie();

    return class withAuthentication extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                logueado: false
            };
        }

        componentDidMount() {
            // LEER COOKIE
            this.setState({
                logueado: getCookie()
            });
        }

        render() {
            const { logueado } = this.state;
            return <WrappedComponent logueado={logueado} {...this.props} />;
        }
    };
}

export default withLoginData;
