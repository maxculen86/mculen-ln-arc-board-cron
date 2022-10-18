/* eslint-disable react/state-in-constructor */
import React, { PureComponent } from 'react';
import Consumer from 'fusion:consumer';

function WithArticlesData(WrappedArticles, filter) {
    return Consumer(
        class extends PureComponent {
            state = {
                articles: undefined,
                mostrarBtnMasNotas: true,
                page: 1
            };

            constructor(props) {
                super(props);
                const { section_id, size, obtenerMasNotas } = props;
                const { page } = this.state;
                const { cached, fetched } = this.getContent({
                    sourceName: 'acuArticlesSource',
                    query: {
                        section_id,
                        size,
                        page
                    },
                    filter
                });

                this.state = {
                    page,
                    articles: cached.content_elements,
                    obtenerMasNotas,
                    mostrarBtnMasNotas: cached.content_elements < 30
                };

                fetched.then(response => {
                    this.setState({
                        page,
                        articles: response.content_elements,
                        mostrarBtnMasNotas: response.content_elements < 30
                    });
                });
            }

            obtenerMasNotas = () => {
                let { page } = this.state;
                const { section_id, size } = this.props;
                const { articles } = this.state;
                page++;
                const { cached, fetched } = this.getContent({
                    sourceName: 'articlesSource',
                    query: {
                        section_id,
                        size,
                        page
                    },
                    filter
                });

                if (cached && cached.content_elements) {
                    cached.content_elements.forEach(art => articles.push(art));
                    const mostrarBtnMasNotas = cached.content_elements < 30;
                    this.setState({
                        page,
                        articles,
                        mostrarBtnMasNotas
                    });
                }

                fetched.then(response => {
                    if (response.content_elements) {
                        response.content_elements.forEach(art =>
                            articles.push(art)
                        );
                        const mostrarBtnMasNotas =
                            response.content_elements < 30;
                        this.setState({
                            page,
                            articles,
                            mostrarBtnMasNotas
                        });
                    }
                });
            };

            render() {
                const { articles, mostrarBtnMasNotas } = this.state;
                return (
                    <WrappedArticles
                        articles={articles}
                        obtenerMasNotas={this.obtenerMasNotas}
                        mostrarBtnMasNotas={mostrarBtnMasNotas}
                        {...this.props}
                    />
                );
            }
        }
    );
}

export default WithArticlesData;
