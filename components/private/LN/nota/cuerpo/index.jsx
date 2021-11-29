import React from 'react';
import PropTypes from 'prop-types';
import CuerpoDefault from './cuerpoDefault';
import addEventListener from '../../../common/hooks/useEventListener';
import handleScrollForNota from '../dataLayer/handleScrollForNota';
// TODO: tests
const index = props => {
    // TODO: Ver si este es el mejor lugar donde poner este script.
    // Setea eventos en el window
    if (typeof window !== 'undefined') {
        addEventListener('scroll', handleScrollForNota, window);
    }
    return <CuerpoDefault {...props} />;
};

index.propTypes = {
    globalContent: PropTypes.shape({
        subtype: PropTypes.string.isRequired
    }).isRequired
};

export default index;
