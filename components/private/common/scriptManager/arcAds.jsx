import React from 'react';
import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';

const arcAds = ({ deployment }) => {
    return (
        <script defer src={deployment(`/pf/resources/common/js/arcAds.js`)} />
    );
};

arcAds.propTypes = {
    deployment: PropTypes.func.isRequired
};

export default Consumer(arcAds);
