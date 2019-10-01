import React from 'react';
import PropTypes from 'fusion:prop-types';

const logoBaseComponent = ({ path, styledNamed }) => {
    return (
        <a href={path}>
            <i className={`logo-${styledNamed}`} />
        </a>
    );
};

logoBaseComponent.propTypes = {
    path: PropTypes.string.isRequired,
    styledNamed: PropTypes.string.isRequired
};

export default logoBaseComponent;
