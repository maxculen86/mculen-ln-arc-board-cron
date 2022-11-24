import React from 'react';
import PropTypes from 'prop-types';
import { useAppContext } from 'fusion:context';
import ComLink from './com-link';
import SvgDefaultShield from './sportShields/svgDefaultShield';
import ComImage from './com-image';

const ComShield = props => {
    const { src, link, nameShield } = props;
    const { outputType } = useAppContext();
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
                    amp={outputType === 'amp'}
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
