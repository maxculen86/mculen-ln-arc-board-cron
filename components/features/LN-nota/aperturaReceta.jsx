import React from 'react';
import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';
import AperturaRecetaComponent from '../../private/LN/nota/apertura/AperturaReceta/aperturaReceta';
import StaticContent from '../../private/common/staticContent';

// TODO hacer unit test

const aperturaReceta = props => {
    return (
        <StaticContent>
            <AperturaRecetaComponent {...props} />
        </StaticContent>
    );
};

aperturaReceta.label = 'LN-Nota-AperturaReceta';

aperturaReceta.propTypes = {
    id: PropTypes.string.isRequired
};

export default Consumer(aperturaReceta);
