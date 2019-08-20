import React from 'react';
import Consumer from 'fusion:consumer';
import NewsletterAPI from '../utils/NewsLetter';

const logueado = true;

// TODO: sacar consumer. No debe conocer el contexto donde se usa. Solo administra newsletters
function withNewsLetterData(WrappedComponent) {
    return Consumer(
        class withAuthentication extends React.Component {
            constructor(props) {
                super(props);
                this.newsLetterService = new NewsletterAPI();
                this.state = {
                    service: []
                };
                this.subscriptionsCallBack = this.subscriptionsCallBack.bind(
                    this
                );
            }

            componentDidMount() {
                this.subscriptionsCallBack();
            }

            // TODO: renombrar
            subscriptionsCallBack() {
                const options = {
                    method: 'POST'
                };
                this.newsLetterService
                    .getSubscriptions(
                        '/Suscripcion/ObtenerSuscripcionesSugeridas',
                        options
                    )
                    .then(resData => {
                        this.setState({ service: resData });
                    })
                    .catch(error =>
                        console.error('ERROR en la API ::::: ', error)
                    );
            }

            render() {
                const { service } = this.state;

                return (
                    <WrappedComponent
                        service={service}
                        logueado={logueado}
                        subscriptionsCallBack={this.subscriptionsCallBack}
                        {...this.props}
                    />
                );
            }
        }
    );
}

export default withNewsLetterData;
