import React from 'react';

function Petametrics({ location, globalContent: { type } = {} }) {
    return location === 'head' && type === 'story' ? (
        <link href="https://cdn.petametrics.com" rel="preconnect" />
    ) : null;
}

export default Petametrics;
