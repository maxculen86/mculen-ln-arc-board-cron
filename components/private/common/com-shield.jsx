import React from 'react';
import ComLink from './com-link';
import SvgDefaultShield from './sportShields/svgDefaultShield';
import ComImage from './com-image';

function ComShield({ src = '', link = '', nameShield = '' }) {
    if (!src && !link) return null;
    return (
        <ComLink classCondition="--shield" link={link}>
            {src ? (
                <ComImage
                    width="48"
                    height="48"
                    classCondition="com-image"
                    src={src}
                    alt={nameShield}
                />
            ) : (
                <SvgDefaultShield />
            )}
        </ComLink>
    );
}

export default ComShield;
