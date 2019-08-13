import React from 'react';
import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';
import Banner from '../../private/LN/common/banner';

const banner = props => {
    return <Banner {...props} />;
};

banner.propTypes = {
    customFields: PropTypes.shape({
        slotId: PropTypes.string
    })
};

export default Consumer(banner);
