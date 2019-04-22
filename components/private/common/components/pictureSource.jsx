'use strict';

import React from 'react';
export default ({ media, srcset, className }) => {
    return <source media={media} srcset={srcset} className={className} />;
};
