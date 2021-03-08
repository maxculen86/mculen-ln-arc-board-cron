import React from 'react';
import PropTypes from 'fusion:prop-types';
import Consumer from 'fusion:consumer';
import BtnMasNotas from '../../private/LN/acumulado/botonVerMasNotas';
import LoadingIcon from '../../private/LN/common/loadingIcon';
import get from '../../private/common/utils/get';
import filter from '../../../content/filters/LN/acumulado/articleAcu';
import { addHoursAndFormat } from '../../private/common/utils/dateAndTimeUtil';
import ArticlesAcum from '../../private/LN/acumulado/articlesAcum';

class UltimasNoticias extends React.Component {
    constructor(props) {
        super(props);
        const { customFields } = props;
        const { idCollection } = customFields;
        const { articles } = this.getArticles(
            ({ articles: articlesFetched, showMore }) => {
                this.setState({
                    articles: articlesFetched,
                    loading: false,
                    showMore,
                    from: 20
                });
            },
            idCollection,
            0
        );
        let loading = false;
        if (!articles.length) loading = true;
        this.state = {
            articles,
            from: 0,
            showMore: true,
            loading
        };
    }

    getArticles = (fetchedCallback, idCollection, from) => {
        const { cached, fetched } = this.getContent({
            source: 'collectionsSource',
            query: {
                id: idCollection,
                size: 20,
                website: 'la-nacion-ar',
                from,
                filterRecomendar: true,
                filterFutureDisplayDate: true,
                filter24hsAgo: true
            },
            filter
        });

        const articles = get(cached, 'content_elements', []);
        fetched.then(response => {
            const articlesFetched = get(response, 'content_elements', []);
            const artWithDatePlus3Hour = articlesFetched.map((art, i) => {
                return {
                    ...art,
                    display_date: addHoursAndFormat(3, art.display_date)
                };
            });
            fetchedCallback({
                articles: artWithDatePlus3Hour,
                showMore: artWithDatePlus3Hour.length > 0
            });
        });

        return {
            articles
        };
    };

    obtenerMasNotas = () => {
        const { articles, from } = this.state;
        const { customFields } = this.props;
        const { idCollection } = customFields;
        this.setState({ loading: true });
        this.getArticles(
            ({ articles: articlesFetched }) => {
                this.setState({
                    articles: [...articles, ...articlesFetched],
                    from: from + 20,
                    showMore: articlesFetched.length > 0,
                    loading: false
                });
            },
            idCollection,
            from
        );
    };

    showSeeMore = (outputType, showMore) => {
        return outputType !== 'amp' && showMore;
    };

    render() {
        const { articles, loading, showMore } = this.state;
        const { outputType } = this.props;
        const show = this.showSeeMore(outputType, showMore);
        return (
            <>
                <div className="row">
                    <div className="col-12">
                        <ArticlesAcum
                            articles={articles}
                            typeArticle="Timeline"
                            classCondition={show && 'hlp-degrade'}
                            outputType={outputType}
                            getBanner={() => {}}
                        />
                    </div>
                </div>
                {show && (
                    <section className="row">
                        <div className="col-12">
                            <BtnMasNotas
                                onClickHandler={() => this.obtenerMasNotas()}
                                loadingIcon={<LoadingIcon />}
                                loading={loading}
                            />
                        </div>
                    </section>
                )}
            </>
        );
    }
}

UltimasNoticias.label = 'LN Acumulado Ultimas Noticias';

UltimasNoticias.propTypes = {
    customFields: PropTypes.shape({
        idCollection: PropTypes.string.tag({
            label: 'ID',
            description: 'Ingrese aquí el ID de la collection',
            defaultValue: '',
            group: 'Collection'
        }).isRequired
    }).isRequired,
    outputType: PropTypes.string.isRequired
};

export default Consumer(UltimasNoticias);
