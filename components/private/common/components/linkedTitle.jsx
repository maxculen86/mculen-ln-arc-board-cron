'use strict';

import React from 'react';
export default ({ href, title }) => {
    return (
        <h2 class="title">
            <a href={href}>{title}</a>
        </h2>
    );
};
