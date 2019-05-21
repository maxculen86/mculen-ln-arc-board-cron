'use strict';

import React from 'react';
export default ({ href, title, alt }) => {
    return (
        <h2 className={'title'}>
            <a href={href} alt={alt}>
                {title}
            </a>
        </h2>
    );
};
