import React from 'react';
import PropTypes from 'fusion:prop-types';
import ComLink from './com-link';
import SvgDefaultShield from './sportShields/svgDefaultShield';

const ComShield = props => {
    const { src, link, nameShield } = props;
    if (!src && !link) return null;
    return (
        <ComLink classCondition="--shield" link={link}>
            {src ? (
                <img
                    className="com-image"
                    src={src}
                    alt={`escudo-${nameShield}`}
                ></img>
            ) : (
                <SvgDefaultShield />
            )}
        </ComLink>
    );
};

export default ComShield;
