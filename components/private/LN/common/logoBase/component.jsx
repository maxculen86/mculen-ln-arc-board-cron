import React from 'react';
import PropTypes from 'fusion:prop-types';

const logoBaseComponent = props => {
    const { path, styledNamed } = props;
    return (
        <>
            {path ? (
                <a href={path}>
                    <i className={`logo-${styledNamed}`} />
                </a>
            ) : (
                <i className={`logo-${styledNamed}`} />
            )}
        </>
    );
};

logoBaseComponent.propTypes = {
    path: PropTypes.string.isRequired,
    styledNamed: PropTypes.string.isRequired
};

export default logoBaseComponent;
