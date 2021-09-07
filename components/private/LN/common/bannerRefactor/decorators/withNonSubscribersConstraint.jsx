/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import PropTypes from 'prop-types';

import { isSubscribed } from '../../utils/contextHelper';

export default Component => {
    if (!Component) return null;

    const Enhanced = props => {
        // if (subscription) return null;
        return <Component noShow subscription={isSubscribed()} {...props} />;
    };

    Enhanced.propTypes = {
        slotId: PropTypes.string.isRequired,
        device: PropTypes.string.isRequired,
        dfpId: PropTypes.string.isRequired,
        dimensions: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number))
            .isRequired,
        slotName: PropTypes.string.isRequired,
        targeting: PropTypes.shape({
            seccion: PropTypes.string,
            sitio: PropTypes.string
        }).isRequired,
        bidding: PropTypes.node.isRequired,
        background: PropTypes.string,
        closeButton: PropTypes.bool
    };

    Enhanced.defaultProps = {
        background: false,
        closeButton: false
    };

    return React.forwardRef((props, ref) => {
        return <Enhanced {...props} ref={ref} />;
    });
};
