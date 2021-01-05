import React from 'react';
import PropTypes from 'fusion:prop-types';
import ComLink from './com-link';

const ComShield = props => {
    const { src, link } = props;
    if (!src && !link) return null;
    return (
        <ComLink classCondition="com-link --shield" link={link}>
            <img className="com-image" src={src} alt="escudo"></img>
        </ComLink>
    );
};

export default ComShield;
