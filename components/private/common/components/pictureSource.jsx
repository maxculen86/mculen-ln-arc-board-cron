'use strict';

import React from 'react';
export default ({ media, srcSet, className, alt }) => {
    return (
        <source media={media} srcSet={srcSet} className={className} alt={alt} />
    );
};
