import React from 'react';
import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';
import NotaApertura from '../../private/LN/acumulado/notaApertura';
import filter from '../../../content/filters/LN/acumulado/articleAcu';
import withCollectionsInClass from '../../private/LN/acumulado/hocs/withCollectionsInClass';

class AperturaFeature extends React.Component {
    render() {
        const { outputType, articlesInCollection = [] } = this.props;

        // Se usa este evento para que GrillaNota pueda ver los articulos a excluir
        // doc https://lanacionar.arcpublishing.com/alc/arc-products/pagebuilder/fusion/documentation/recipes/messaging-between-components.md?version=2.6
        articlesInCollection.length > 0 &&
            this.dispatchEvent('articlesInBox', {
                articlesInBox: articlesInCollection,
                message: 'Articles.'
            });

        return (
            <NotaApertura
                {...this.props}
                articlesInCollection={articlesInCollection}
                outputType={outputType}
            />
        );
    }
}

AperturaFeature.propTypes = {
    outputType: PropTypes.func.isRequired,
    articlesInCollection: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string
        })
    )
};

AperturaFeature.label = 'LN-Acumulado-Apertura';

export default withCollectionsInClass(Consumer(AperturaFeature), filter, 2);
