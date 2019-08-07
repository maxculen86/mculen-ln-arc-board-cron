import React from 'react';
import PropTypes from 'fusion:prop-types';

const logoBaseComponent = ({ styledNamed }) => {
    return <i className={`logo-${styledNamed}`} />;
};

logoBaseComponent.propTypes = {
    styledNamed: PropTypes.string.isRequired
};

export default logoBaseComponent;
