import React from 'react';
import PropTypes from 'fusion:prop-types';
import Title from '../../private/LN/acumulado/acumuladoTitle';

function TitleFeature({ customFields: { idCollection } }) {
    return <Title idCollection={idCollection} />;
}

TitleFeature.label = 'LN-Acumulado-Titulo';

TitleFeature.propTypes = {
    customFields: PropTypes.shape({
        idCollection: PropTypes.string.tag({ label: 'Id de collection' }),
        prefixTitle: PropTypes.string.tag({ label: 'Prefijo del titulo' })
    })
};

TitleFeature.defaultProps = {
    customFields: {
        idCollection: undefined,
        prefixTitle: undefined
    }
};

export default TitleFeature;
