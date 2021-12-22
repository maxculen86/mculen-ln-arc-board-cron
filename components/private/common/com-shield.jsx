import React from 'react';
import PropTypes from 'prop-types';
import ComLink from './com-link';
import SvgDefaultShield from './sportShields/svgDefaultShield';

const ComShield = props => {
    const { src, link, nameShield } = props;
    if (!src && !link) return null;
    return (
        <ComLink classCondition="--shield" link={link}>
            {src ? (
                <img
                    width="48"
                    height="48"
                    className="com-image"
                    src={src}
                    alt={nameShield}
                />
            ) : (
                <SvgDefaultShield />
            )}
        </ComLink>
    );
};

ComShield.propTypes = {
    src: PropTypes.string,
    link: PropTypes.string,
    nameShield: PropTypes.string
};

ComShield.defaultProps = {
    src: '',
    link: '',
    nameShield: ''
};

export default ComShield;
