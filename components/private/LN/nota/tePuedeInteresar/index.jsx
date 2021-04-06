/* eslint-disable no-console */
import React, { Component } from 'react';
import PropTypes from 'fusion:prop-types';
import Consumer from 'fusion:consumer';
import ArticleMain from '../../common/articleTypes/articleMain';
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

        this.myRef = React.createRef();
        this.handleClick = this.handleClick.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
        window.addEventListener('scroll', this.handleScroll);
        this.isVisible = false;
        this.isShownRegistred = false;
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleClick = (event, nextUrl) => {
        const { articles } = this.state;
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
                widgetType: 'widget_click',
                articles
            }
        });

        fetched.then(response => {
            window.location.href = nextUrl;
        });
    };

    handleScroll() {
        if (!this.isVisible) {
            const node = this.myRef.current;
            const bounds = node && node.getBoundingClientRect();
            const isInViewport =
                bounds &&
                Math.abs(bounds.top) < bounds.height &&
                bounds.bottom > 0;

            if (isInViewport) {
                const { articles } = this.state;
                window.removeEventListener('scroll', this.handleScroll);
                this.registerActivity('widget_visible', articles);
                this.isVisible = true;
            }
        }
    }

    registerActivity(widgetType, articles) {
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
                idArticle,
                userId,
                sessionId,
                excludeItems,
                arcSite,
                action: 'activity',
                widgetType,
                articles
            }
        });

        fetched.then(response => {});
    }

    registerShown() {
        const { articles } = this.state;
        this.registerActivity('widget_shown', articles);
        this.isShownRegistred = true;
    }

    render = () => {
        const { articles, outputType } = this.state;

        articles &&
            articles.length > 0 &&
            !this.isShownRegistred &&
            this.registerShown();

        return articles && articles.length > 0 ? (
            <div className="row interest" ref={this.myRef}>
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
