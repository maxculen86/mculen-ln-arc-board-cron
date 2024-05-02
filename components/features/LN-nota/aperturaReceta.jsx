import React from 'react';
import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';
import AperturaRecetaComponent from '../../private/LN/nota/apertura/AperturaReceta/aperturaReceta';

// TODO hacer unit test

const aperturaReceta = props => {
    return (
        <div>
            <AperturaRecetaComponent {...props} />
        </div>
    );
};

aperturaReceta.label = 'LN-Nota-AperturaReceta';

aperturaReceta.propTypes = {
    id: PropTypes.string.isRequired
};

export default Consumer(aperturaReceta);
