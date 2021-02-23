import React from 'react';
import PropTypes from 'fusion:prop-types';
import Consumer from 'fusion:consumer';
import CajaTemasPropiedades from './cajaTemasPropiedades';
import filter from '../../../../../content/filters/LN/acumulado/articleAcu';
import withCollectionsInClass from '../hocs/withCollectionsInClass';

class Index extends React.Component {
    validateArticles = articles => {
        if (!articles) return false;
        if (articles.length < 2) return false;
        return true;
    };

    render() {
        const {
            outputType,
            title,
            url,
            idCollection,
            articlesInCollection
        } = this.props;

        if (!this.validateArticles(articlesInCollection)) return null;
        const articlesToShow =
            articlesInCollection.length >= 3 && articlesInCollection.length < 6
                ? articlesInCollection.slice(0, 3)
                : articlesInCollection.slice(0, 6);

        // Se usa este evento para que GrillaNota pueda ver los articulos a excluir
        // doc https://lanacionar.arcpublishing.com/alc/arc-products/pagebuilder/fusion/documentation/recipes/messaging-between-components.md?version=2.6
        this.dispatchEvent('articlesInBox', {
            articlesInBox: articlesToShow,
            message: 'Articles.'
        });

        return (
            <CajaTemasPropiedades
                title={title}
                url={url}
                articlesToShow={articlesToShow}
                outputType={outputType}
                size="6"
                idCollection={idCollection}
            />
        );
    }
}

Index.propTypes = {
    articlesInCollection: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string
        })
    ).isRequired,
    outputType: PropTypes.string.isRequired,
    title: PropTypes.string,
    url: PropTypes.string,
    idCollection: PropTypes.string.isRequired
};

export default withCollectionsInClass(Consumer(Index), filter, 6, 'm');
