import React from 'react';
import PropTypes from 'prop-types';
import CuerpoDefault from './cuerpoDefault';
// import CuerpoReceta from './cuerpoReceta';
import addEventListener from '../../../common/hooks/useEventListener';
import handleScrollForNota from '../dataLayer/handleScrollForNota';
// TODO: tests
const index = props => {
    const {
        globalContent: { subtype }
    } = props;

    // TODO: Ver si este es el mejor lugar donde poner este script.
    // Setea eventos en el window
    if (typeof window !== 'undefined') {
        addEventListener('scroll', handleScrollForNota, window);
    }

    // if (subtype === '7') return <CuerpoReceta {...props} />;

    return <CuerpoDefault {...props} />;
};

index.propTypes = {
    bannerConfig: PropTypes.shape({
        background: PropTypes.bool,
        desktop: PropTypes.string,
        position: PropTypes.number,
        sticky: PropTypes.bool,
        table: PropTypes.string
    }).isRequired,
    globalContent: PropTypes.shape({
        subtype: PropTypes.string.isRequired
    }).isRequired
};

export default index;
