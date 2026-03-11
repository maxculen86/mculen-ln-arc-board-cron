import React from 'react';

function MediaIframe({ html, className = '' }) {
    return (
        // eslint-disable-next-line react/no-danger
        <div className={className} dangerouslySetInnerHTML={{ __html: html }} />
    );
}

export default MediaIframe;
