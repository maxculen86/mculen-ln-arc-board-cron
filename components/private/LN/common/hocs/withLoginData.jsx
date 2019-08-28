import React from 'react';
import useCookie from '../utils/useCookie';

function withLoginData(WrappedComponent) {
    const { getCookie } = useCookie();

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
