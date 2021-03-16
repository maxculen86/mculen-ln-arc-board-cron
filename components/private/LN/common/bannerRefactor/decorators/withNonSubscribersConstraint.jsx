/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import PropTypes from 'fusion:prop-types';

import withLoginData from '../../hocs/withLoginData';

export default Component => {
    if (!Component) return null;

    const Enhanced = withLoginData(props => {
        const {
            loginData: { subscription }
        } = props;
        // if (subscription) return null;
        return <Component noShow subscription={subscription} {...props} />;
    });

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
        bidding: PropTypes.object.isRequired,
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
