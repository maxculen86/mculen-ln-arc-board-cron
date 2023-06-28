import React from 'react';
import PropTypes from 'prop-types';

export default function SetFixedHeight({
    elementId,
    heightMobile,
    heightTablet,
    heightDesktop
}) {
    return (
        <style>
            {`#${elementId}{height:${parseInt(
                heightMobile,
                10
            )}px}@media(min-width:768px){#${elementId}{height:${
                // eslint-disable-next-line prettier/prettier
                parseInt(heightTablet, 10)
            }px}}@media(min-width:1024px){#${elementId}{height:${
                // eslint-disable-next-line prettier/prettier
                parseInt(heightDesktop, 10)
            }px}}`}
        </style>
    );
}

SetFixedHeight.propTypes = {
    elementId: PropTypes.string.isRequired,
    heightMobile: PropTypes.number,
    heightTablet: PropTypes.number,
    heightDesktop: PropTypes.number
};

SetFixedHeight.defaultProps = {
    heightMobile: 0,
    heightTablet: 0,
    heightDesktop: 0
};
