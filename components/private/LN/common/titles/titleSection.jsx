import React from 'react';
import PropTypes from 'fusion:prop-types';
import '../../../../../resources/dist/css/ln/components/title.css';

const titleSection = ({ size, text }) => {
    const className = `com-title-section-${size}`;
    return <h2 className={className}>{text}</h2>;
};

titleSection.propTypes = {
    size: PropTypes.string.isRequired,
    text: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
};

titleSection.defaultProps = {
    text: "I'm a fancy header"
};

export default titleSection;
