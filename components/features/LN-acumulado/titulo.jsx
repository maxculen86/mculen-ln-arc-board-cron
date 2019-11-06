import React from 'react';
import PropTypes from 'fusion:prop-types';
import Title from '../../private/LN/acumulado/acumuladoTitle';

function TitleFeature({ customFields: { idCollection } }) {
    return <Title idCollection={idCollection} />;
}

TitleFeature.label = 'LN-Acumulado-Titulo';

TitleFeature.propTypes = {
    customFields: PropTypes.shape({
        idCollection: PropTypes.string.tag({ label: 'Id de collection' })
    })
};

TitleFeature.defaultProps = {
    customFields: {
        idCollection: undefined
    }
};

export default TitleFeature;
