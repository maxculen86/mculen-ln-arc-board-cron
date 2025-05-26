import React from 'react';
import PropTypes from 'prop-types';

function MediaIframe({ html, className }) {
    return (
        // eslint-disable-next-line react/no-danger
        <div className={className} dangerouslySetInnerHTML={{ __html: html }} />
    );
}

MediaIframe.propTypes = {
    html: PropTypes.string.isRequired,
    className: PropTypes.string
};

MediaIframe.defaultProps = {
    className: ''
};

export default MediaIframe;
