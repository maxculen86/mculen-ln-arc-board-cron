import React, { PureComponent } from 'react';
import Consumer from 'fusion:consumer';

function WithColumnistData(WrappedColumnist, filter) {
    return Consumer(
        class extends PureComponent {
            state = {
                authors: undefined,
                mostrarBtnMasNotas: true
            };

            constructor(props) {
                super(props);

                const { last } = this.state;
                const { cached, fetched } = this.getContent({
                    sourceName: 'authorsColumnistSource',
                    query: {
                        last
                    }
                });
                this.state = {
                    last,
                    authors: cached.authors,
                    mostrarBtnMasNotas: cached.more
                };

                fetched.then(response => {
                    this.setState({
                        last: response.last,
                        authors: response.authors,
                        mostrarBtnMasNotas: response.more
                    });
                });
            }

            obtenerMasNotas = () => {
                const { last } = this.state;
                const { authors } = this.state;

                const { cached, fetched } = this.getContent({
                    sourceName: 'authorsColumnistSource',
                    query: {
                        last
                    },
                    filter
                });

                if (cached && cached.authors) {
                    cached.authors.forEach(authr => authors.push(authr));
                    const mostrarBtnMasNotas = cached.more;
                    this.setState({
                        last,
                        authors,
                        mostrarBtnMasNotas
                    });
                }

                fetched.then(response => {
                    if (response.authors) {
                        response.authors.forEach(authr => authors.push(authr));
                        const mostrarBtnMasNotas = response.more;
                        this.setState({
                            last: response.last,
                            authors,
                            mostrarBtnMasNotas
                        });
                    }
                });
            };

            render() {
                const { authors, mostrarBtnMasNotas } = this.state;
                return (
                    <WrappedColumnist
                        authors={authors}
                        obtenerMasNotas={this.obtenerMasNotas}
                        mostrarBtnMasNotas={!mostrarBtnMasNotas}
                    />
                );
            }
        }
    );
}

export default WithColumnistData;
