import React from 'react';
import PropTypes from 'fusion:prop-types';

const Social = ({ twitter, facebook, instagram }) => {
    return (
        <div className="com-share">
            <a href={facebook} target="_blank" rel="noreferrer noopener">
                <i className="icon-facebook" />
            </a>
            <a href={twitter} target="_blank" rel="noreferrer noopener">
                <i className="icon-twitter" />
            </a>
            <a href={instagram} target="_blank" rel="noreferrer noopener">
                <i className="icon-instagram" />
            </a>
        </div>
    );
};

Social.propTypes = {
    twitter: PropTypes.string.isRequired,
    facebook: PropTypes.string.isRequired,
    instagram: PropTypes.string.isRequired
};

export default Social;
