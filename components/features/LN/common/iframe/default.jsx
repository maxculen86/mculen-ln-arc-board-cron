import React from 'react';

function MediaIframe({ html }) {
    if (!html) return null;

    return (
        <div
            className="border-1 border-neutral-200 -mx-16 md:mx-0 w-[calc(100%+2rem)] md:w-full max-md:max-w-none overflow-hidden"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: html }}
        />
    );
}

export default MediaIframe;
