import React from 'react';

function MediaIframe({ html }) {
    if (!html) return null;

    return (
        // eslint-disable-next-line react/no-danger
        <div dangerouslySetInnerHTML={{ __html: html }} />
    );
}

export default MediaIframe;
