import React from 'react';
import PropTypes from 'fusion:prop-types';

const index = props => {
    return <h2>Cambiar a OutputType JSON para visualizar el contenido</h2>;
};

index.propTypes = {
    customFields: PropTypes.shape({
        size: PropTypes.number,
        paramUrlId: PropTypes.string
    })
};

export default index;
