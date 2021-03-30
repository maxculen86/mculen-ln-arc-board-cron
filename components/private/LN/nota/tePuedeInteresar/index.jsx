/* eslint-disable no-console */
import React, { Component } from 'react';
import PropTypes from 'fusion:prop-types';
import Consumer from 'fusion:consumer';
import ArticleMain from '../../common/articleTypes/articleMain';
//import ComTitle from '../../../common/com-title';
import HeaderSection from '../../../common/mod-headerSection';

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
            outputType,
            isShownRequest: false
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

    componentDidUpdate() {
        const { articles } = this.state;
        articles &&
            articles.length > 0 &&
            this.registerActivity('widget_shown');
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

        const { fetched } = this.getContent({
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
                nextUrl,
                action: 'activity',
                widgetType: 'widget_click'
            }
        });

        fetched.then(response => {
            window.location.href = nextUrl;
        });
    };

    registerActivity(widgetType) {
        const { isShownRequest } = this.state;

        if (!isShownRequest) {
            const {
                userId,
                sessionId,
                cantidadNotas,
                excludeItems,
                url,
                idArticle,
                arcSite
            } = this.props;

            this.getContent({
                source: 'liftigniterSource',
                query: {
                    cantidadNotas,
                    referrer: url,
                    idArticle,
                    userId,
                    sessionId,
                    excludeItems,
                    arcSite,
                    action: 'activity',
                    widgetType
                }
            });

            this.setState({ isShownRequest: true });
        }
    }

    render = () => {
        const { articles, outputType } = this.state;

        return articles && articles.length > 0 ? (
            <div className="row interest">
                <HeaderSection title="Te puede interesar" />
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
