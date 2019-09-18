import React from 'react';
import PropTypes from 'fusion:prop-types';
import CuerpoDefault from './cuerpoDefault';
import CuerpoReceta from './cuerpoReceta';

// TODO: tests
const index = props => {
    const {
        globalContent: { subtype }
    } = props;

    if (subtype === '7') return <CuerpoReceta {...props} />;

    return <CuerpoDefault {...props} />;
};

index.propTypes = {
    globalContent: PropTypes.shape({
        subtype: PropTypes.number.isRequired
    }).isRequired
};

export default index;
