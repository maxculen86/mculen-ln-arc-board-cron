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
                const { cached, fetched } = this.getContent({
                    sourceName: 'articlesSource',
                    query: {
                        section_id: props.section_id,
                        size: props.size,
                        page: this.state.page
                    },
                    filter
                });

                this.state = {
                    page: this.state.page,
                    articles: cached.content_elements,
                    obtenerMasNotas: this.state.obtenerMasNotas,
                    mostrarBtnMasNotas: cached.content_elements < 30
                };

                fetched.then(response => {
                    this.setState({
                        page: this.state.page,
                        articles: response.content_elements,
                        mostrarBtnMasNotas: response.content_elements < 30
                    });
                });
            }

            obtenerMasNotas = () => {
                let page = this.state.page;
                const articles = this.state.articles;
                page++;
                console.log('ESTADO::', this.state);
                const { cached, fetched } = this.getContent({
                    sourceName: 'articlesSource',
                    query: {
                        section_id: this.props.section_id,
                        size: this.props.size,
                        page
                    },
                    filter
                });

                if (cached && cached.content_elements) {
                    cached.content_elements.forEach(art => articles.push(art));
                    const mostrarBtnMasNotas = response.content_elements < 30;
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
                return (
                    <WrappedArticles
                        articles={this.state.articles}
                        obtenerMasNotas={this.obtenerMasNotas}
                        mostrarBtnMasNotas={this.state.mostrarBtnMasNotas}
                        {...this.props}
                    />
                );
            }
        }
    );
}

export default WithArticlesData;
