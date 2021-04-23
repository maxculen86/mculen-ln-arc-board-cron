import React from 'react';
import PropTypes from 'fusion:prop-types';

const Petametrics = ({ location, globalContent: { type } }) => {
    return location === 'head' && type === 'story' ? (
        <link href="https://cdn.petametrics.com" rel="preconnect" />
    ) : (
        <></>
    );
};

Petametrics.defaultProps = {
    globalContent: {}
};

export default Petametrics;
