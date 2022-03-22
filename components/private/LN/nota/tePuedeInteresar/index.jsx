/* eslint-disable react/prop-types */
/* eslint-disable no-console */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Consumer from 'fusion:consumer';
import CajaTema from '../../common/cajaTema';

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

        const { fetched } = this.getContent({
            sourceName: 'liftigniterSource',
            query: {
                cantidadNotas,
                referrer: url,
                imageConfig: 'boxArticles',
                idArticle,
                userId,
                sessionId,
                excludeItems,
                arcSite,
                action: 'model'
            }
        });

        fetched.then((response = []) => {
            if (response && response.length) {
                this.setState({ articles: response });
                this.registerActivity('widget_shown', response);
            }
        });

        this.myRef = React.createRef();
        this.handleClick = this.handleClick.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
        this.isVisible = false;
    }

    componentDidMount() {
        typeof window === 'object' &&
            window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        typeof window === 'object' &&
            window.removeEventListener('scroll', this.handleScroll);
    }

    handleClick = (event, nextUrl) => {
        const { articles } = this.state;
        event.preventDefault();
        const fetched = this.registerActivity('widget_click', articles);
        fetched.then(response => {
            if (typeof window === 'object') {
                window.location.href = nextUrl;
            }
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
                typeof window === 'object' &&
                    window.removeEventListener('scroll', this.handleScroll);
                this.registerActivity('widget_visible', articles);
                this.isVisible = true;
            }
        }
    }

    registerActivity(widgetType, articles = []) {
        const { sessionId, url, idArticle, arcSite } = this.props;

        const { fetched } = this.getContent({
            source: 'liftigniterSource',
            query: {
                referrer: url,
                idArticle,
                sessionId,
                arcSite,
                action: 'activity',
                widgetType,
                articles: articles.map(article => article.website_url)
            }
        });

        return fetched;
    }

    render = () => {
        const { articles, outputType } = this.state;
        const { dataLayerSection } = this.props;

        return (
            articles &&
            articles.length > 0 && (
                <div className="row interest" ref={this.myRef}>
                    <CajaTema
                        title="Te puede interesar"
                        sectionName={dataLayerSection}
                        articles={articles}
                        position="toi"
                        outputType={outputType}
                        handleClick={this.handleClick}
                        withVolanta
                    />
                </div>
            )
        );
    };
}

Index.propTypes = {
    cantidadNotas: PropTypes.number,
    userId: PropTypes.string,
    sessionId: PropTypes.string,
    outputType: PropTypes.string,
    idArticle: PropTypes.string,
    url: PropTypes.string.isRequired,
    excludeItems: PropTypes.arrayOf(PropTypes.string),
    arcSite: PropTypes.string,
    dataLayerSection: PropTypes.string.isRequired
};

Index.defaultProps = {
    userId: null,
    excludeItems: [],
    idArticle: null,
    sessionId: null,
    arcSite: 'la-nacion-ar',
    outputType: 'default',
    cantidadNotas: 6
};

export default Consumer(Index);
