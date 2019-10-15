import React from 'react';
import PropTypes from 'fusion:prop-types';

const arcAds = ({ deployment, contextPath }) => {
    return (
        <script
            src={deployment(`${contextPath}/resources/common/js/arcAds.js`)}
        />
    );
};

arcAds.propTypes = {
    deployment: PropTypes.func.isRequired,
    contextPath: PropTypes.string
};

arcAds.defaultProps = {
    contextPath: ''
};

export default arcAds;
