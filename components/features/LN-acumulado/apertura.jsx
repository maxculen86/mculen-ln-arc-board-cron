import React from 'react';
import PropTypes from 'fusion:prop-types';
import NotaApertura from '../../private/LN/acumulado/notaApertura';
import filter from '../../../content/filters/LN/acumulado/articleAcu';
import withCollectionsInClass from '../../private/LN/acumulado/hocs/withCollectionsInClass';

class AperturaFeature extends React.Component {
    render() {
        const { outputType, articlesInCollection = [] } = this.props;

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

export default withCollectionsInClass(AperturaFeature, filter, 2);
