/* eslint-disable no-console */
import React, { Component } from 'react';
import PropTypes from 'fusion:prop-types';
import Consumer from 'fusion:consumer';
import ArticleMain from '../../common/articleTypes/articleMain';
import ComTitle from '../../../common/com-title';

/**
 * Este componente se mantiene en clase debido a que se necesita hacer uso
 * de un handlerClick en los childrren.
 * El useContent con el que se usa para obtener data del contentSource no es optimo
 * para ser usado como callback, o al menos no sabemos aun hacer buen uso de el
 * a la fecha
 */
class Index extends Component {
    constructor(props) {
        super(props);
        const {
            userId,
            sessionId,
            cantidadNotas,
            excludeItems,
            outputType,
            url,
            idArticle,
            arcSite
        } = props;

        this.state = {
            articles: [],
            outputType
        };

        this.fetchContent({
            articles: {
                source: 'liftigniterSource',
                query: {
                    cantidadNotas,
                    referrer: url,
                    imageConfig: 'm',
                    idArticle,
                    userId,
                    sessionId,
                    excludeItems,
                    arcSite,
                    action: 'model'
                }
            }
        });

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick = (event, nextUrl) => {
        event.preventDefault();

        const {
            userId,
            sessionId,
            cantidadNotas,
            excludeItems,
            url,
            idArticle,
            arcSite
        } = this.props;

        console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXx5');
        console.log(
            '🚀 ~ file: index.jsx ~ line 34 ~ handleClick ~ props',
            url,
            nextUrl
        );
        const status = this.getContent({
            source: 'liftigniterSource',
            query: {
                cantidadNotas,
                referrer: url,
                imageConfig: 'm',
                idArticle,
                userId,
                sessionId,
                excludeItems,
                arcSite,
                action: 'activity'
            }
        });
        console.log(
            '🚀 ~ file: index.jsx ~ line 51 ~ handleClick ~ status',
            status
        );
        // debugger;
    };

    render = () => {
        const { articles, outputType } = this.state;

        return articles && articles.length > 0 ? (
            <div className="row interest">
                <ComTitle tag="h4" size="--xl" content="Te puede interesar" />
                <section className="row-gap-tablet-3 row-gap-desksm-3">
                    {articles.map((article, index) => {
                        return (
                            <ArticleMain
                                articleData={article}
                                key={article._id}
                                outputType={outputType}
                                position={index + 1}
                                handleClick={this.handleClick}
                            />
                        );
                    })}
                </section>
            </div>
        ) : (
            <></>
        );
    };
}

/* = props => {
    const {
        userId,
        sessionId,
        cantidadNotas,
        excludeItems,
        outputType,
        url,
        idArticle,
        arcSite,
        getContent
    } = props;

    const articles = useContent({
        source: 'liftigniterSource',
        query: {
            cantidadNotas,
            referrer: url,
            imageConfig: 'm',
            idArticle,
            userId,
            sessionId,
            excludeItems,
            arcSite,
            action: 'model'
        }
    });
    console.log('🚀 ~ file: index.jsx ~ line 33 ~ articles', articles);

    const handleClick = (event, nextUrl) => {
        event.preventDefault();

        console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXx5');
        console.log(
            '🚀 ~ file: index.jsx ~ line 34 ~ handleClick ~ props',
            url,
            nextUrl
        );
        const status = getContent({
            source: 'liftigniterSource',
            query: {
                cantidadNotas,
                referrer: url,
                imageConfig: 'm',
                idArticle,
                userId,
                sessionId,
                excludeItems,
                arcSite,
                action: 'activity'
            }
        });
        console.log(
            '🚀 ~ file: index.jsx ~ line 51 ~ handleClick ~ status',
            status
        );
        debugger;
    };

    return articles && articles.length > 0 ? (
        <div className="row interest">
            <ComTitle tag="h4" size="--xl" content="Te puede interesar" />
            <section className="row-gap-tablet-3 row-gap-desksm-3">
                {articles.map((article, index) => {
                    return (
                        <ArticleMain
                            articleData={article}
                            key={article._id}
                            outputType={outputType}
                            position={index + 1}
                            handleClick={handleClick}
                        />
                    );
                })}
            </section>
        </div>
    ) : (
        <></>
    );
}; */

Index.propTypes = {
    cantidadNotas: PropTypes.number.isRequired,
    userId: PropTypes.string,
    sessionId: PropTypes.string.isRequired,
    outputType: PropTypes.string.isRequired,
    idArticle: PropTypes.string,
    url: PropTypes.string.isRequired,
    excludeItems: PropTypes.arrayOf(PropTypes.string),
    arcSite: PropTypes.string
};

Index.defaultProps = {
    userId: null,
    excludeItems: null,
    idArticle: null,
    arcSite: 'la-nacion-ar'
};

export default Consumer(Index);
