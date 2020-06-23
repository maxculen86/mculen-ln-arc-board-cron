/* eslint-disable react/no-danger */

import React from 'react';
import Context from 'fusion:context';
import get from 'lodash.get';

import ForwardUrl from './component';

const index = props => {
    const isAdmin = get(props, 'isAdmin');
    const forwardURL = get(
        props,
        'globalContent.related_content.redirect[0].redirect_url'
    );

    if (!forwardURL || isAdmin) return null;

    return <ForwardUrl url={forwardURL} />;
};

export default Context(index);
