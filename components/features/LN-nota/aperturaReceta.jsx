/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';
import StaticValidation from '../../private/common/staticValidation';

import AperturaRecetaComponent from '../../private/LN/nota/apertura/AperturaReceta/aperturaReceta';

const aperturaReceta = props => {
    const { id: featureId } = props;
    return (
        <StaticValidation id={featureId} htmlOnly persistent>
            <AperturaRecetaComponent {...props} />
        </StaticValidation>
    );
};

aperturaReceta.label = 'LN-Nota-AperturaReceta';

aperturaReceta.propTypes = {
    id: PropTypes.string.isRequired
};

export default Consumer(aperturaReceta);
